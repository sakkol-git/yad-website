"use server";

import { headers } from "next/headers";
import { quickFormSchema } from "../validations/contact.schema";
import { createAdminClient } from "@/shared/lib/supabase/admin";
import { rateLimitByIP } from "@/lib/rateLimit";
import { sendEmail } from "@/lib/email/send";
import VolunteerConfirmationEmail from "@/lib/email/templates/VolunteerConfirmationEmail";

export async function submitQuickFormAction(formData: FormData) {
  try {
    // Rate limit: max 5 per IP per 10 minutes
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
    const { success: rateLimitOk } = await rateLimitByIP(`quickform:${ip}`, 5, "10m");

    if (!rateLimitOk) {
      return { error: "Too many submissions. Please try again in a few minutes." };
    }

    const parsedData = quickFormSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      interest: formData.get("interest"),
      message: formData.get("message"),
    });

    if (!parsedData.success) {
      return { error: "Invalid form data. Please check your inputs." };
    }

    const { firstName, lastName, email, interest, message } = parsedData.data;

    const supabaseAdmin = createAdminClient();

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

    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Submission failed:", message);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}

