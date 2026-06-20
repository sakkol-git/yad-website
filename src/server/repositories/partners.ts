import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { BaseRepository } from './base';

export class PartnersRepository extends BaseRepository<'partners'> {
  constructor() {
    super('partners');
  }

  async getPaginated(
    supabase: SupabaseClient<Database>,
    page: number = 1,
    limit: number = 10,
    search?: string,
    type?: string
  ) {
    let query = supabase
      .from('partners')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`name.ilike.%${search}%,contact_person.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (type && type !== 'All Types') {
      query = query.eq('partnership_type', type);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data, count };
  }

  async getAllPublic(supabase: SupabaseClient<Database>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { data, error } = await sb
      .from('partners')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data as any[];
  }
}
