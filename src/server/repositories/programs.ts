import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { BaseRepository } from './base';

export class ProgramsRepository extends BaseRepository<'programs'> {
  constructor() {
    super('programs');
  }

  async getPaginated(
    supabase: SupabaseClient<Database>,
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string
  ) {
    let query = supabase
      .from('programs')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,category.ilike.%${search}%`);
    }

    if (status && status !== 'All Statuses') {
      query = query.eq('status', status as any);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query
      .order('start_date', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data, count };
  }
}
