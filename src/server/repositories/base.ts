/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';

type TableName = keyof Database['public']['Tables'] | string;

export class BaseRepository<T extends TableName> {
  protected table: T;

  constructor(table: T) {
    this.table = table;
  }

  async getAll(supabase: SupabaseClient<Database>) {
    const sb = supabase as any;
    const { data, error } = await sb.from(this.table).select('*');
    if (error) throw error;
    return data;
  }

  async getById(supabase: SupabaseClient<Database>, id: string) {
    const sb = supabase as any;
    const { data, error } = await sb.from(this.table).select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(supabase: SupabaseClient<Database>, payload: any) {
    const sb = supabase as any;
    const { data, error } = await sb.from(this.table).insert(payload).select().single();
    if (error) throw error;
    return data;
  }

  async update(supabase: SupabaseClient<Database>, id: string, payload: any) {
    const sb = supabase as any;
    const { data, error } = await sb
      .from(this.table)
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(supabase: SupabaseClient<Database>, id: string) {
    const sb = supabase as any;
    const { error } = await sb.from(this.table).delete().eq('id', id);
    if (error) throw error;
    return true;
  }
}
