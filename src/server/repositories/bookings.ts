import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { BaseRepository } from './base';

export class BookingsRepository extends BaseRepository<'bookings'> {
  constructor() {
    super('bookings');
  }

  async getPaginated(
    supabase: SupabaseClient<Database>,
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string,
    paymentStatus?: string
  ) {
    let query = supabase
      .from('bookings')
      .select('*, rooms(name)', { count: 'exact' });

    if (search) {
      query = query.ilike('guest_name', `%${search}%`);
    }

    if (status && status !== 'All Statuses') {
      query = query.eq('status', status as any);
    }

    if (paymentStatus && paymentStatus !== 'All Payment Statuses') {
      query = query.eq('payment_status', paymentStatus as any);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query
      .order('check_in', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data, count };
  }

  async createInquiry(
    supabase: SupabaseClient<Database>,
    data: Database['public']['Tables']['bookings']['Insert']
  ) {
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        ...data,
        status: 'Inquiry',
        payment_status: 'Pending'
      })
      .select()
      .single();

    if (error) throw error;
    return booking;
  }

  async updateBookingStatus(
    supabase: SupabaseClient<Database>,
    id: string,
    status: Database['public']['Tables']['bookings']['Row']['status'],
    expectedCurrentStatus?: Database['public']['Tables']['bookings']['Row']['status'],
    additionalData?: Partial<Database['public']['Tables']['bookings']['Update']>
  ) {
    let query = supabase
      .from('bookings')
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
