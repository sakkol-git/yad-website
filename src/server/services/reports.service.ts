import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { ReportsRepository, type Report } from '../repositories/reports';
import { requireAdmin } from '../permissions';
import { auditLogger } from './audit.service';
import { uploadReportSchema, updateReportSchema, validateReportFile } from '../validators/report.schema';

import { createClient } from '@/shared/lib/supabase/server';
import { createAdminClient } from '@/shared/lib/supabase/admin';

const STORAGE_BUCKET = 'reports';

export class ReportsService {
  private repository: ReportsRepository;

  constructor() {
    this.repository = new ReportsRepository();
  }

  /**
   * Admin: Paginated list of all reports with optional search.
   * Enforces admin role.
   */
  async getReports(
    supabase: SupabaseClient<Database>,
    { page = 1, limit = 10, search }: { page?: number; limit?: number; search?: string }
  ) {
    await requireAdmin(supabase);
    return this.repository.getPaginated(supabase, page, limit, search);
  }

  /**
   * Public: Cached list of all reports, ordered by year DESC.
   * No auth required. ISR-revalidated via the 'reports' cache tag.
   */
  async getPublicReports(): Promise<Report[]> {
    // Use a server-side client (no session needed for public read)
    const supabase = await createClient();
    return this.repository.getAllPublic(supabase);
  }

  /**
   * Admin: Upload a new report PDF and create the DB record.
   * Enforces admin role, validates inputs, uploads to Supabase Storage.
   */
  async uploadReport(
    supabase: SupabaseClient<Database>,
    rawData: { title: string; year: number },
    file: File
  ) {
    const user = await requireAdmin(supabase);

    // Validate metadata
    const validated = uploadReportSchema.parse(rawData);

    // Validate file
    const fileError = validateReportFile(file);
    if (fileError) throw new Error(fileError);

    // Build a deterministic, collision-safe storage path
    const fileExt = file.name.split('.').pop()?.toLowerCase() ?? 'pdf';
    const fileName = `annual-report-${validated.year}-${Date.now()}.${fileExt}`;
    const filePath = `reports/${fileName}`;

    // Upload to Supabase Storage using the admin client (service role)
    // to bypass Storage RLS, while the session client handles DB and auth.
    const adminClient = createAdminClient();
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await adminClient
      .storage
      .from(STORAGE_BUCKET)
      .upload(filePath, arrayBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'application/pdf'
      });

    if (uploadError) {
      console.error('[ReportsService] Storage upload error:', uploadError);
      throw new Error('Failed to upload file to storage. Please try again.');
    }

    // Get public URL
    const { data: publicUrlData } = adminClient
      .storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    const fileUrl: string = publicUrlData.publicUrl;

    // Insert DB record
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: report, error: dbError } = await (supabase as any)
      .from('annual_reports')
      .insert({
        title: validated.title,
        year: validated.year,
        file_url: fileUrl,
        file_path: filePath,
        file_size_bytes: file.size,
      })
      .select()
      .single();

    if (dbError) {
      // Best-effort: try to remove the orphaned file from storage
      await adminClient.storage.from(STORAGE_BUCKET).remove([filePath]);
      console.error('[ReportsService] DB insert error:', dbError);
      throw new Error('Failed to save report record. The uploaded file has been removed.');
    }

    await auditLogger.logAction(supabase, user.id, 'annual_reports', 'UPLOAD', { id: report.id, year: validated.year });
    return report as Report;
  }

  /**
   * Admin: Update report metadata (title and/or year) without changing the file.
   * Enforces admin role.
   */
  async updateReport(
    supabase: SupabaseClient<Database>,
    id: string,
    rawData: { title: string; year: number }
  ) {
    const user = await requireAdmin(supabase);
    const validated = updateReportSchema.parse(rawData);

    const updated = await this.repository.update(supabase, id, {
      title: validated.title,
      year: validated.year,
    });

    await auditLogger.logAction(supabase, user.id, 'annual_reports', 'UPDATE', { id, ...validated });
    return updated as Report;
  }

  /**
   * Admin: Delete a report record and its associated file from Storage.
   * Enforces admin role. Uses the stored file_path for reliable deletion.
   */
  async deleteReport(supabase: SupabaseClient<Database>, id: string) {
    const user = await requireAdmin(supabase);

    // Fetch the record first to get the storage path
    const report = await this.repository.getById(supabase, id) as Report;
    if (!report) throw new Error('Report not found.');

    // Determine storage path: prefer file_path column; fall back to parsing file_url
    const storagePath = report.file_path ?? this._extractFilePath(report.file_url);

    // 1. Delete DB record first
    await this.repository.delete(supabase, id);

    // 2. Delete from Storage (non-fatal if it fails — log but don't throw)
    if (storagePath) {
      const adminClient = createAdminClient();
      const { error: storageError } = await adminClient
        .storage
        .from(STORAGE_BUCKET)
        .remove([storagePath]);

      if (storageError) {
        console.error(
          `[ReportsService] Storage deletion failed for path "${storagePath}":`,
          storageError
        );
      }
    }

    await auditLogger.logAction(supabase, user.id, 'annual_reports', 'DELETE', { id });
    return true;
  }

  /**
   * Robustly extract the storage key from a Supabase public URL.
   * Handles the pattern: .../object/public/<bucket>/<path>
   * Returns the full path including bucket prefix (e.g., "reports/annual-report-2025.pdf").
   */
  private _extractFilePath(fileUrl: string): string | null {
    try {
      const url = new URL(fileUrl);
      // pathname looks like: /storage/v1/object/public/reports/reports/annual-report-...pdf
      const marker = `/object/public/${STORAGE_BUCKET}/`;
      const idx = url.pathname.indexOf(marker);
      if (idx === -1) return null;
      return url.pathname.slice(idx + marker.length - `${STORAGE_BUCKET}/`.length);
    } catch {
      return null;
    }
  }
}

export const reportsService = new ReportsService();
