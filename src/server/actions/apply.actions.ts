"use server";

import { createAdminClient } from "@/shared/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { auditLog } from "./audit.actions";

export async function submitStudentApplicationAction(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const educationLevel = formData.get("educationLevel") as string;
    const essay = formData.get("essay") as string;

    if (!firstName || !lastName || !email || !phone || !educationLevel || !essay) {
      return { error: "Please fill out all required fields." };
    }

    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
      .from("student_applications")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        education_level: educationLevel,
        essay: essay,
        status: "pending"
      });

    if (error) {
      console.error("[ApplicationAction] Insert Error:", error);
      return { error: "Failed to submit application. Please try again." };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("[ApplicationAction] Catch Error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function updateApplicationStatusAction(id: string, newStatus: 'pending' | 'reviewed' | 'accepted' | 'rejected') {
  try {
    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
      .from("student_applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      throw error;
    }

    await auditLog("UPDATE_STATUS", "student_applications", id);

    revalidatePath("/admin/applications");
    return { success: true };
  } catch (err: unknown) {
    console.error("[ApplicationAction] Update Error:", err);
    return { error: "Failed to update application status." };
  }
}
