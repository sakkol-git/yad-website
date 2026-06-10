'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPrograms() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching programs:', error);
    throw new Error('Failed to fetch programs');
  }
  return data as any[];
}

export async function createProgram(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('programs').insert([{
    title: rawData.title as string,
    description: (rawData.description as string) || null,
    category: (rawData.category as string) || null,
    start_date: (rawData.start_date as string) || null,
    end_date: (rawData.end_date as string) || null,
    capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
    status: (rawData.status as any) || 'Upcoming'
  }]);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/programs');
  return { success: true };
}

export async function updateProgram(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('programs').update({
    title: rawData.title as string,
    description: (rawData.description as string) || null,
    category: (rawData.category as string) || null,
    start_date: (rawData.start_date as string) || null,
    end_date: (rawData.end_date as string) || null,
    capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
    status: rawData.status as any
  }).eq('id', id);

  if (error) return { error: error.message };
  
  revalidatePath('/admin/programs');
  return { success: true };
}

export async function deleteProgram(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('programs').delete().eq('id', id);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/programs');
  return { success: true };
}
