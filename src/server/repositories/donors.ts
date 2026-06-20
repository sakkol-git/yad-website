import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { BaseRepository } from './base';

export class DonorsRepository extends BaseRepository<'donors'> {
  constructor() {
    super('donors');
  }

  async getPaginated(
    supabase: SupabaseClient<Database>,
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string
  ) {
    let query = supabase
      .from('donors')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('name', `%${search}%`);
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
}
