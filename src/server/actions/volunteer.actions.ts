"use server";

import { createAdminClient } from "@/shared/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function getVolunteerRequestsAction() {
  try {
    const supabaseAdmin = createAdminClient();

    // 1. Fetch volunteers with their associated event
    const { data: volunteers, error } = await supabaseAdmin
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
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[VolunteerAction] Fetch error:", error);
      throw error;
    }

    // 2. Fetch all users from auth to map emails
    // In a huge production app this wouldn't scale perfectly without a public.profiles table,
    // but for an admin dashboard it's sufficient and standard for Supabase.
    const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (authError) {
      console.error("[VolunteerAction] Auth users fetch error:", authError);
      // We can gracefully degrade and just not show emails
    }

    // 3. Map the data
    const mappedData = (volunteers || []).map((v: any) => {
      const user = users?.find(u => u.id === v.user_id);
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

    return { data: mappedData };
  } catch (err: any) {
    console.error("Failed to fetch volunteers:", err);
    return { error: "Failed to fetch volunteer requests." };
  }
}

export async function updateVolunteerStatusAction(id: string, newStatus: "Pending" | "Approved" | "Rejected" | "Completed") {
  try {
    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
      .from("event_volunteers")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("[VolunteerAction] Update error:", error);
      throw error;
    }

    revalidatePath("/admin/volunteers");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to update status:", err);
    return { error: "Failed to update volunteer status." };
  }
}
