"use server";

"use server";

import { createSafeAction } from "@/shared/lib/safe-action";
import { revalidatePath } from "next/cache";
import {
  getProgramsSchema,
  programDataSchema,
  updateProgramSchema,
  deleteProgramSchema,
} from "../validators/program.schema";
import { z } from "zod";

export type ProgramFormData = z.infer<typeof programDataSchema>;

export const getProgramsAction = createSafeAction(
  { schema: getProgramsSchema, role: "admin" },
  async ({ page, limit, search }, { adminClient: supabaseAdmin }) => {
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

    return { data, count };
  },
);

export const createProgramAction = createSafeAction(
  { schema: programDataSchema, role: "admin" },
  async (data, { adminClient: supabaseAdmin }) => {
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
    return true;
  },
);

export const updateProgramAction = createSafeAction(
  { schema: updateProgramSchema, role: "admin" },
  async ({ id, data }, { adminClient: supabaseAdmin }) => {
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
    return true;
  },
);

export const deleteProgramAction = createSafeAction(
  { schema: deleteProgramSchema, role: "admin" },
  async ({ id }, { adminClient: supabaseAdmin }) => {
    const { error } = await supabaseAdmin.from("programs").delete().eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/programs");
    revalidatePath("/");
    revalidatePath("/programs");
    return true;
  },
);
