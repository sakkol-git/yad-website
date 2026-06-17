"use server";

import { createAdminClient } from "@/shared/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import * as Sentry from "@sentry/nextjs";

export async function getInquiriesAction(page = 1, pageSize = 20) {
  try {
    const supabaseAdmin = createAdminClient();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabaseAdmin
      .from("inquiries")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    return { success: true, data, count };
  } catch (error: unknown) {
    console.error("[InquiryAction] Fetch error:", error);
    Sentry.captureException(error);
    return { success: false, error: "Failed to fetch inquiries" };
  }
}

export async function updateInquiryStatusAction(id: string, status: 'pending' | 'reviewed' | 'actioned') {
  try {
    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
      .from("inquiries")
      .update({ status } as any)
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error: unknown) {
    console.error("[InquiryAction] Update error:", error);
    Sentry.captureException(error);
    return { success: false, error: "Failed to update status" };
  }
}
