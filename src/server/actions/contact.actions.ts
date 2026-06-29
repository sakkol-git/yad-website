"use server";

"use server";

import { headers } from "next/headers";
import { quickFormSchema } from "../validations/contact.schema";
import { rateLimitByIP } from "@/lib/rateLimit";
import { sendEmail } from "@/lib/email/send";
import VolunteerConfirmationEmail from "@/lib/email/templates/VolunteerConfirmationEmail";
import { createSafeAction } from "@/shared/lib/safe-action";

export const submitQuickFormAction = createSafeAction(
  { schema: quickFormSchema, role: "public" },
  async ({ firstName, lastName, email, interest, message }, { adminClient: supabaseAdmin }) => {
    // Rate limit: max 5 per IP per 10 minutes
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    const { success: rateLimitOk } = await rateLimitByIP(`quickform:${ip}`, 5, "10m");

    if (!rateLimitOk) {
      throw new Error("Too many submissions. Please try again in a few minutes.");
    }

    const { error } = await supabaseAdmin
      .from("inquiries")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        interest: interest,
        message: message || "",
        status: "pending"
      });

    if (error) {
      console.error("[QuickForm] Insert error:", error);
      throw error;
    }

    await sendEmail({
      to: email,
      subject: "We've received your inquiry! - YAD Cambodia",
      template: VolunteerConfirmationEmail,
      props: {
        volunteerName: firstName,
        submittedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      },
    });

    return true;
  }
);
