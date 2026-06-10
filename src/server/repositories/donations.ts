import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { BaseRepository } from './base';

export class DonationsRepository extends BaseRepository<'donations'> {
  constructor() {
    super('donations');
  }

  async getPaginated(
    supabase: SupabaseClient<Database>,
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string,
    method?: string
  ) {
    let query = supabase
      .from('donations')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('donor_name', `%${search}%`);
    }

    if (status && status !== 'All Statuses') {
      query = query.eq('status', status as any);
    }

    if (method && method !== 'All Methods') {
      query = query.eq('method', method as any);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data, count };
  }

  async createDraft(
    supabase: SupabaseClient<Database>,
    data: Database['public']['Tables']['donations']['Insert']
  ) {
    const { data: donation, error } = await supabase
      .from('donations')
      .insert({
        ...data,
        status: 'Draft'
      })
      .select()
      .single();

    if (error) throw error;
    return donation;
  }

  async updateDonationStatus(
    supabase: SupabaseClient<Database>,
    id: string,
    status: Database['public']['Tables']['donations']['Row']['status'],
    expectedCurrentStatus?: Database['public']['Tables']['donations']['Row']['status'],
    additionalData?: Partial<Database['public']['Tables']['donations']['Update']>
  ) {
    let query = supabase
      .from('donations')
      .update({ status, ...additionalData })
      .eq('id', id);

    if (expectedCurrentStatus) {
      query = query.eq('status', expectedCurrentStatus);
    }

    const { data, error } = await query.select().single();

    if (error) throw error;
    return data;
  }
}
