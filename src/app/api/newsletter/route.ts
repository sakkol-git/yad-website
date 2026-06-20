import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { rateLimitByIP } from "@/lib/rateLimit";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";
import { sendEmail } from "@/lib/email/send";
import NewsletterWelcomeEmail from "@/lib/email/templates/NewsletterWelcomeEmail";

const newsletterSchema = z.object({
  email: z.string().email("A valid email address is required."),
});

// Initialize Supabase with the Service Role Key to bypass RLS
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Rate limit: max 3 per IP per hour
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    const { success: rateLimitOk } = await rateLimitByIP(`newsletter:${ip}`, 3, "1h");

    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Insert into DB
    const { error } = await supabaseAdmin
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .from("newsletter_subscribers" as any)
      .insert({ email });

    if (error) {
      if (error.code === '23505') { // Unique violation
        // Graceful handling for duplicate emails
        return NextResponse.json({ success: true, message: "You're already subscribed!" }, { status: 200 });
      }
      throw error;
    }

    console.log(`[Newsletter] New subscriber saved: ${email}`);

    // Send Welcome Email
    await sendEmail({
      to: email,
      subject: "Welcome to YAD Cambodia updates",
      template: NewsletterWelcomeEmail,
      props: { email },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Newsletter API Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

