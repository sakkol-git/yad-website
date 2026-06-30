"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

interface CreateCheckoutSessionInput {
  type: "donation" | "booking";
  referenceId: string;
  amount: number; // in dollars, we will convert to cents
  currency?: string;
  metadata?: Record<string, string>;
  customerEmail?: string | null;
}

export async function createStripeEmbeddedSession({
  type,
  referenceId,
  amount,
  currency = "usd",
  metadata = {},
  customerEmail,
}: CreateCheckoutSessionInput) {
  try {
    const headersList = await headers();
    const origin =
      headersList.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (type === "donation" && referenceId) {
      const { createAdminClient } = await import("@/shared/lib/supabase/server");
      const supabaseAdmin = createAdminClient();
      const { data: donation } = await supabaseAdmin
        .from("donations")
        .select("amount")
        .eq("id", referenceId)
        .single();

      if (!donation || donation.amount !== amount) {
        throw new Error("Payment amount mismatch. Please try again.");
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionData: any = {
      ui_mode: "embedded_page",
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: type === "donation" ? "Donation to YAD Cambodia" : "Booking Payment",
              description: `Payment for ${type} #${referenceId.substring(0, 8)}`,
            },
            unit_amount: Math.round(amount * 100), // convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        ...metadata,
        type,
        referenceId,
      },
    };

    if (customerEmail) {
      sessionData.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionData);

    return { clientSecret: session.client_secret };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating Stripe embedded session:", error);
    return { error: error.message || "Something went wrong" };
  }
}
