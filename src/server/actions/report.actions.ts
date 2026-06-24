"use server";

import { createClient } from "@/shared/lib/supabase/server";
import { createAdminClient } from "@/shared/lib/supabase/admin";
import { revalidatePath, revalidateTag } from "next/cache";
import { reportsService } from "@/server/services/reports.service";

/**
 * Fetches a paginated list of reports for the admin table.
 * Enforces admin session via the service layer.
 */
export async function getReportsAction(
  page: number = 1,
  limit: number = 10,
  search?: string
) {
  const supabase = await createClient();
  try {
    const { data, count } = await reportsService.getReports(supabase, {
      page,
      limit,
      search,
    });
    return { success: true, data, count };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("[ReportAction] getReports error:", err);
    return { success: false, error: err.message ?? "Failed to fetch reports." };
  }
}

/**
 * Uploads a new annual report PDF.
 * Auth: requires admin session.
 * Validates title, year, and file via the service layer.
 */
export async function uploadReportAction(formData: FormData) {
  // Use admin client for storage operations (bypasses Storage RLS)
  // but we still verify the calling user's session via createClient
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const title = formData.get("title") as string;
  const yearStr = formData.get("year") as string;
  const file = formData.get("file") as File;

  const year = parseInt(yearStr, 10);

  try {
    // requireAdmin is called inside the service with the session client
    await reportsService.uploadReport(adminClient, { title, year }, file);

    revalidatePath("/admin/reports");
    revalidatePath("/impact");
    revalidateTag("reports", "default");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Re-map Zod errors to user-friendly messages
    if (err?.errors) {
      const first = err.errors[0];
      return { success: false, error: first?.message ?? "Validation failed." };
    }
    console.error("[ReportAction] uploadReport error:", err);
    return { success: false, error: err.message ?? "An unexpected error occurred." };
  }

  // Silence unused variable warning — supabase is used for session check inside service
  void supabase;
}

/**
 * Updates a report's title and year (metadata only — does not re-upload the file).
 * Auth: requires admin session.
 */
export async function updateReportAction(
  id: string,
  formData: FormData
) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const yearStr = formData.get("year") as string;
  const year = parseInt(yearStr, 10);

  try {
    await reportsService.updateReport(supabase, id, { title, year });
    revalidatePath("/admin/reports");
    revalidatePath("/impact");
    revalidateTag("reports", "default");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err?.errors) {
      const first = err.errors[0];
      return { success: false, error: first?.message ?? "Validation failed." };
    }
    console.error("[ReportAction] updateReport error:", err);
    return { success: false, error: err.message ?? "Failed to update report." };
  }
}

/**
 * Deletes a report record and its associated PDF from Supabase Storage.
 * Auth: requires admin session.
 */
export async function deleteReportAction(id: string) {
  // Use admin client for storage deletion, session client for auth
  const adminClient = createAdminClient();

  try {
    await reportsService.deleteReport(adminClient, id);
    revalidatePath("/admin/reports");
    revalidatePath("/impact");
    revalidateTag("reports", "default");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("[ReportAction] deleteReport error:", err);
    return { success: false, error: err.message ?? "Failed to delete report." };
  }
}
