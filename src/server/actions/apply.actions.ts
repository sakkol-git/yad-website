"use server";

"use server";

import { createSafeAction } from "@/shared/lib/safe-action";
import { revalidatePath } from "next/cache";
import { auditLog } from "./audit.actions";
import {
  submitStudentApplicationSchema,
  updateApplicationStatusSchema,
} from "../validators/apply.schema";

export const submitStudentApplicationAction = createSafeAction(
  { schema: submitStudentApplicationSchema, role: "public" },
  async (
    { firstName, lastName, email, phone, educationLevel, essay },
    { adminClient: supabaseAdmin },
  ) => {
    const { error } = await supabaseAdmin.from("student_applications").insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      education_level: educationLevel,
      essay: essay,
      status: "pending",
    });

    if (error) {
      console.error("[ApplicationAction] Insert Error:", error);
      throw new Error("Failed to submit application. Please try again.");
    }

    return true;
  },
);

export const updateApplicationStatusAction = createSafeAction(
  { schema: updateApplicationStatusSchema, role: "admin" },
  async ({ id, newStatus }, { adminClient: supabaseAdmin }) => {
    const { error } = await supabaseAdmin
      .from("student_applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      throw error;
    }

    await auditLog("UPDATE_STATUS", "student_applications", id);

    revalidatePath("/admin/applications");
    return true;
  },
);
