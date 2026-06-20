import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { BaseRepository } from './base';

export class MembersRepository extends BaseRepository<'members'> {
  constructor() {
    super('members');
  }

  // Extend base repository with custom queries if needed
  async getPaginated(
    supabase: SupabaseClient<Database>,
    page: number = 1,
    limit: number = 10,
    search?: string,
    role?: string,
    status?: string
  ) {
    let query = supabase
      .from('members')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (role && role !== 'All Roles') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query = query.eq('type', role as any);
    }

    if (status && status !== 'All Statuses') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query = query.eq('status', status as any);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data, count };
  }
  // Methods for the Public Website

  async getPublicMembersByCategory(
    supabase: SupabaseClient<Database>,
    category: string
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { data, error } = await sb
      .from('members')
      .select('*')
      .eq('status', 'Active')
      .eq('type', category)
      .order('created_at', { ascending: true });

    if (error) throw error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data as any[];
  }

  async getPublicMemberBySlug(
    supabase: SupabaseClient<Database>,
    slug: string
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { data, error } = await sb
      .from('members')
      .select('*')
      .eq('status', 'Active')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data as any;
  }

  async getAllPublicSlugs(supabase: SupabaseClient<Database>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { data, error } = await sb
      .from('members')
      .select('slug')
      .eq('status', 'Active')
      .not('slug', 'is', null);

    if (error) throw error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data as any[];
  }
}
