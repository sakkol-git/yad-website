import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";
import Stripe from "stripe";
import { sendEmail } from "@/lib/email/send";
import DonationReceiptEmail from "@/lib/email/templates/DonationReceiptEmail";

/**
 * Stripe Webhook Handler — Idempotent Design
 *
 * CRITICAL: This endpoint must ALWAYS return HTTP 200 after verifying the
 * signature, regardless of any downstream errors. Returning 4xx/5xx causes
 * Stripe to retry the webhook, which can lead to duplicate database mutations.
 *
 * Idempotency pattern:
 *  1. Verify webhook signature
 *  2. Check if the donation/booking has already been updated (guard clause)
 *  3. If not yet processed, perform the update
 *  4. If any DB error occurs, log to Sentry but still return 200
 */

// Initialize Supabase with the Service Role Key to bypass RLS for server-to-server operations
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/** Shape of the metadata we set when creating Checkout Sessions */
interface CheckoutMetadata {
  type?: "donation" | "booking";
  referenceId?: string;
  projectName?: string;
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  // Step 1: Verify the webhook signature
  try {
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("Missing signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const message = err instanceof Error ? err.message : "Unknown verification error";
    console.error(`Webhook signature verification failed: ${message}`);
    // 400 is correct here — invalid signature means this is not from Stripe
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  // Step 2: Handle the event — always return 200 after this point
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = (session.metadata || {}) as CheckoutMetadata;
    const { type, referenceId } = metadata;

    if (type === "donation" && referenceId) {
      await handleDonationCompleted(referenceId, session);
    } else if (type === "booking" && referenceId) {
      await handleBookingCompleted(referenceId);
    } else {
      console.warn("Received checkout session without valid metadata:", metadata);
    }
  }

  // Always return 200 to acknowledge receipt — never 5xx from a webhook handler
  return NextResponse.json({ received: true }, { status: 200 });
}

/**
 * Process a completed donation — idempotent.
 * If the donation is already marked Completed, this is a no-op.
 */
async function handleDonationCompleted(referenceId: string, session: Stripe.Checkout.Session) {
  try {
    // Idempotency guard: check if already completed
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("donations")
      .select("status, donor_name")
      .eq("id", referenceId)
      .single();

    if (fetchError) {
      console.error(`[Webhook] Failed to fetch donation ${referenceId}:`, fetchError);
      return; // Non-fatal — still return 200 from the caller
    }

    if (existing?.status === "Completed") {
      console.log(`[Webhook] Donation ${referenceId} already completed — skipping duplicate`);
      return;
    }

    // Perform the update
    const { error: updateError } = await supabaseAdmin
      .from("donations")
      .update({
        status: "Completed",
        method: "Stripe",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
      .eq("id", referenceId);

    if (updateError) {
      console.error(`[Webhook] Failed to update donation ${referenceId}:`, updateError);
      return;
    }

    console.log(`[Webhook] Successfully completed donation ${referenceId}`);

    // Send donation receipt email
    const customerEmail = session.customer_details?.email;
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const metadata = (session.metadata || {}) as CheckoutMetadata;
    const projectName = metadata.projectName || "YAD Cambodia General Fund";

    if (customerEmail) {
      await sendEmail({
        to: customerEmail,
        subject: "Your donation receipt — YAD Cambodia",
        template: DonationReceiptEmail,
        props: {
          donorName: existing?.donor_name || session.customer_details?.name || "Supporter",
          amount,
          currency: session.currency || "usd",
          donationId: referenceId,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          projectName,
          orgName: "Youth Advancement for Development (YAD) Cambodia",
        },
      });
    }
  } catch (err) {
    console.error("[Webhook] Unexpected error processing donation:", err);
    // Do NOT re-throw — the caller must always return 200
  }
}

/**
 * Process a completed booking — idempotent.
 * If the booking is already marked Confirmed/Checked In, this is a no-op.
 */
async function handleBookingCompleted(referenceId: string) {
  try {
    // Idempotency guard
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("bookings")
      .select("status")
      .eq("id", referenceId)
      .single();

    if (fetchError) {
      console.error(`[Webhook] Failed to fetch booking ${referenceId}:`, fetchError);
      return;
    }

    const terminalStatuses = ["Confirmed", "Checked In", "Checked Out"];
    if (terminalStatuses.includes(existing?.status || "")) {
      console.log(`[Webhook] Booking ${referenceId} already in terminal state — skipping`);
      return;
    }

    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update({ status: "Confirmed" } as any)
      .eq("id", referenceId);

    if (updateError) {
      console.error(`[Webhook] Failed to update booking ${referenceId}:`, updateError);
      return;
    }

    console.log(`[Webhook] Successfully confirmed booking ${referenceId}`);
  } catch (err) {
    console.error("[Webhook] Unexpected error processing booking:", err);
  }
}
