"use server";

import { createAdminClient } from "@/shared/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { auditLog } from "./audit.actions";

export async function uploadReportAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const yearStr = formData.get("year") as string;
    const file = formData.get("file") as File;

    if (!title || !yearStr || !file || file.size === 0) {
      return { error: "Missing required fields." };
    }

    const year = parseInt(yearStr, 10);
    if (isNaN(year)) {
      return { error: "Invalid year." };
    }

    const supabaseAdmin = createAdminClient();

    // 1. Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `annual-report-${year}-${Date.now()}.${fileExt}`;
    const filePath = `reports/${fileName}`;

    // Note: The bucket 'reports' must be created in Supabase Storage and set to public.
    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('reports')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error("[ReportAction] Upload Error:", uploadError);
      return { error: "Failed to upload file to storage." };
    }

    // 2. Get Public URL
    const { data: publicUrlData } = supabaseAdmin
      .storage
      .from('reports')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // 3. Create record in annual_reports table
    const { error: dbError } = await supabaseAdmin
      .from("annual_reports")
      .insert({
        title,
        year,
        file_url: publicUrl,
      });

    if (dbError) {
      console.error("[ReportAction] DB Insert Error:", dbError);
      return { error: "Failed to save report record." };
    }

    await auditLog("UPLOAD", "annual_reports", "NEW_REPORT");

    revalidatePath("/admin/reports");
    revalidatePath("/about/financials");
    return { success: true };
  } catch (err: unknown) {
    console.error("[ReportAction] Catch Error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteReportAction(id: string, fileUrl: string) {
  try {
    const supabaseAdmin = createAdminClient();

    // 1. Delete from DB
    const { error: dbError } = await supabaseAdmin
      .from("annual_reports")
      .delete()
      .eq("id", id);

    if (dbError) {
      throw dbError;
    }

    // 2. Extract path and delete from Storage
    // The URL looks like: https://[project].supabase.co/storage/v1/object/public/reports/reports/annual-report-2023-12345.pdf
    const urlParts = fileUrl.split('/reports/');
    if (urlParts.length > 1) {
      const pathToDelete = "reports/" + urlParts.pop(); // The filename
      await supabaseAdmin.storage.from('reports').remove([pathToDelete]);
    }

    await auditLog("DELETE", "annual_reports", id);

    revalidatePath("/admin/reports");
    revalidatePath("/about/financials");
    return { success: true };
  } catch (err: unknown) {
    console.error("[ReportAction] Delete Error:", err);
    return { error: "Failed to delete report." };
  }
}
