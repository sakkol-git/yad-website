import { auditLogger } from "@/server/services/audit.service";
import { createAdminClient } from "@/shared/lib/supabase/admin";
import { createClient } from "@/shared/lib/supabase/server";

export async function auditLog(action: string, entity: string, recordId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const supabaseAdmin = createAdminClient();
    await auditLogger.logAction(
      supabaseAdmin,
      user?.id || "system",
      entity,
      action,
      { recordId }
    );
  } catch (error) {
    console.error("[AuditLog] Failed to write audit log:", error);
  }
}
