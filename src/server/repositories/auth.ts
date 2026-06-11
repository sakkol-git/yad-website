import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';

export class AuthRepository {
  async getUserRole(supabase: SupabaseClient<Database>, userId: string) {
    const sb = supabase as any;
    const { data, error } = await sb
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows returned
    return data;
  }
}
