import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";
import { BaseRepository } from "./base";

export type Report = Database["public"]["Tables"]["annual_reports"]["Row"];

export class ReportsRepository extends BaseRepository<"annual_reports"> {
  constructor() {
    super("annual_reports");
  }

  async getPaginated(
    supabase: SupabaseClient<Database>,
    page: number = 1,
    limit: number = 10,
    search?: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    let query = sb.from("annual_reports").select("*", { count: "exact" });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query.order("year", { ascending: false }).range(from, to);

    if (error) throw error;
    return { data: data as Report[], count: count as number };
  }

  async getAllPublic(supabase: SupabaseClient<Database>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { data, error } = await sb
      .from("annual_reports")
      .select("*")
      .order("year", { ascending: false });

    if (error) throw error;
    return data as Report[];
  }
}

export const reportsRepository = new ReportsRepository();
