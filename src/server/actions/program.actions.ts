"use server";

import { createAdminClient } from "@/shared/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export interface ProgramFormData {
  title: string;
  description: string;
  category: string;
  status: "active" | "completed" | "upcoming";
  start_date: string;
  end_date?: string | null;
  beneficiaries_count: number;
  image_url?: string;
}

export async function getProgramsAction(page: number = 1, limit: number = 10, search?: string) {
  try {
    const supabaseAdmin = createAdminClient();
    
    let query = supabaseAdmin
      .from("programs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) {
      throw error;
    }

    return { success: true, data, count };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[ProgramAction] Fetch error:", error);
    return { success: false, error: "Failed to fetch programs" };
  }
}

export async function createProgramAction(data: ProgramFormData) {
  try {
    const supabaseAdmin = createAdminClient();
    
    const { error } = await supabaseAdmin
      .from("programs")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(data as any);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/programs");
    revalidatePath("/");
    revalidatePath("/programs");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[ProgramAction] Create error:", error);
    return { success: false, error: "Failed to create program" };
  }
}

export async function updateProgramAction(id: string, data: ProgramFormData) {
  try {
    const supabaseAdmin = createAdminClient();
    
    const { error } = await supabaseAdmin
      .from("programs")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(data as any)
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/programs");
    revalidatePath("/");
    revalidatePath("/programs");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[ProgramAction] Update error:", error);
    return { success: false, error: "Failed to update program" };
  }
}

export async function deleteProgramAction(id: string) {
  try {
    const supabaseAdmin = createAdminClient();
    
    const { error } = await supabaseAdmin
      .from("programs")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/programs");
    revalidatePath("/");
    revalidatePath("/programs");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("[ProgramAction] Delete error:", error);
    return { success: false, error: "Failed to delete program" };
  }
}
