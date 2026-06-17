"use server";

import { quickFormSchema } from "../validations/contact.schema";
import { createAdminClient } from "@/shared/lib/supabase/admin";

export async function submitQuickFormAction(formData: FormData) {
  try {
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
        message: message,
        status: "Pending"
      });

    if (error) {
      console.error("[QuickForm] Insert error:", error);
      throw error;
    }

    return { success: true };
  } catch (err: any) {
    console.error("Submission failed", err);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
