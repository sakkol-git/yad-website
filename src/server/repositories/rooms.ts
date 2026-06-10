import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { BaseRepository } from './base';

export class RoomsRepository extends BaseRepository<'rooms'> {
  constructor() {
    super('rooms');
  }

  async getPaginated(
    supabase: SupabaseClient<Database>,
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string
  ) {
    let query = supabase
      .from('rooms')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    if (status && status !== 'All Statuses') {
      query = query.eq('status', status);
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
