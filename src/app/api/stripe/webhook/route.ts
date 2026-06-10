import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";

// Initialize Supabase with the Service Role Key to bypass RLS for server-to-server operations
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("Missing signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    
    const { type, referenceId } = session.metadata || {};

    if (type === "donation" && referenceId) {
      try {
        // Update donation status to Completed
        const { error } = await supabaseAdmin
          .from("donations")
          .update({ 
            status: "Completed",
            method: "card", // Assuming card if via Stripe Checkout, or could be mapped from payment intent
          })
          .eq("id", referenceId);

        if (error) {
          console.error("Failed to update donation status:", error);
          return new NextResponse("Database Error", { status: 500 });
        }
        console.log(`Successfully completed donation ${referenceId}`);
      } catch (err) {
        console.error("Error processing donation webhook:", err);
      }
    } else if (type === "booking" && referenceId) {
      try {
        // Update booking status to Confirmed
        const { error } = await supabaseAdmin
          .from("bookings")
          .update({ 
            status: "Confirmed",
          })
          .eq("id", referenceId);

        if (error) {
          console.error("Failed to update booking status:", error);
          return new NextResponse("Database Error", { status: 500 });
        }
        console.log(`Successfully completed booking ${referenceId}`);
      } catch (err) {
        console.error("Error processing booking webhook:", err);
      }
    } else {
      console.warn("Received checkout session without valid metadata:", session.metadata);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse("OK", { status: 200 });
}
