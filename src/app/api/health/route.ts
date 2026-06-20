import { NextResponse } from "next/server";
import { createAdminClient } from "@/shared/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    // Check Supabase DB
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from('donations').select('id').limit(1);
    
    // Check Stripe
    await stripe.paymentIntents.list({ limit: 1 });

    return NextResponse.json(
      {
        status: "ok",
        services: {
          database: dbError ? "error" : "ok",
          stripe: "ok"
        },
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || "1.0.0",
      },
      { status: dbError ? 503 : 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
