import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";

export class AuditLoggerService {
  async logAction(
    supabase: SupabaseClient<Database>,
    userId: string,
    entity: string,
    action: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changes?: any,
  ) {
    try {
      const { error } = await supabase.from("audit_logs").insert({
        user_id: userId,
        entity,
        action,
        changes: changes ? JSON.parse(JSON.stringify(changes)) : null,
      });

      if (error) {
        console.error("Failed to write audit log:", error);
      }
    } catch (e) {
      console.error("Audit logger threw an exception:", e);
    }
  }
}

export const auditLogger = new AuditLoggerService();
