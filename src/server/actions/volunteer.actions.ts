"use server";

// TODO Phase 7.2: Replace auth.admin.listUsers() with public.profiles JOIN.
// The current approach fetches ALL auth users into server memory. At >500 users
// this becomes expensive. The proper fix is a profiles table with a trigger on
// auth.users INSERT. See Phase 7.2 of the remediation plan.

import { createAdminClient } from "@/shared/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { auditLog } from "./audit.actions";

const MAX_USERS_FETCH = 500;

export async function getVolunteerRequestsAction(page: number = 1, limit: number = 10) {
  try {
    const supabaseAdmin = createAdminClient();

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // 1. Fetch volunteers with their associated event
    const { data: volunteers, count, error } = await supabaseAdmin
      .from("event_volunteers")
      .select(`
        id,
        user_id,
        status,
        created_at,
        event_id,
        events (
          name
        )
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("[VolunteerAction] Fetch error:", error);
      throw error;
    }

    // 2. Fetch users from auth to map emails — capped for safety
    let users: Array<{ id: string; email?: string }> = [];
    try {
      const { data, error: authError } = await supabaseAdmin.auth.admin.listUsers({
        perPage: MAX_USERS_FETCH,
        page: 1,
      });

      if (authError) {
        console.error("[VolunteerAction] Auth users fetch error:", authError);
      } else {
        users = data?.users || [];
        if (users.length >= MAX_USERS_FETCH - 100) {
          console.warn(
            `[VolunteerAction] WARNING: ${users.length} users fetched, approaching limit of ${MAX_USERS_FETCH}. ` +
            `Migrate to public.profiles JOIN immediately (see Phase 7.2).`
          );
        }
      }
    } catch (authErr) {
      console.error("[VolunteerAction] Auth fetch crashed:", authErr);
    }

    // 3. Map the data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedData = (volunteers || []).map((v: any) => {
      const user = users.find(u => u.id === v.user_id);
      return {
        id: v.id,
        userId: v.user_id,
        userEmail: user?.email || "Unknown User",
        eventId: v.event_id,
        eventTitle: v.events?.name || "Unknown Event",
        status: v.status,
        createdAt: v.created_at,
      };
    });

    return { data: mappedData, count };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to fetch volunteers:", message);
    return { error: "Failed to fetch volunteer requests." };
  }
}

export async function updateVolunteerStatusAction(
  id: string,
  newStatus: "Pending" | "Approved" | "Rejected" | "Completed"
) {
  try {
    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
      .from("event_volunteers")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update({ status: newStatus.toLowerCase() as any })
      .eq("id", id);

    if (error) {
      console.error("[VolunteerAction] Update error:", error);
      throw error;
    }

    await auditLog("UPDATE_STATUS", "event_volunteers", id);

    revalidatePath("/admin/volunteers");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to update status:", message);
    return { error: "Failed to update volunteer status." };
  }
}
