'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
  return data as any[];
}

export async function createEvent(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('events').insert([{
    name: rawData.name as string,
    description: (rawData.description as string) || null,
    venue: (rawData.venue as string) || null,
    capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
    status: (rawData.status as any) || 'Upcoming'
  }]);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/events');
  return { success: true };
}

export async function updateEvent(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('events').update({
    name: rawData.name as string,
    description: (rawData.description as string) || null,
    venue: (rawData.venue as string) || null,
    capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
    status: rawData.status as any
  }).eq('id', id);

  if (error) return { error: error.message };
  
  revalidatePath('/admin/events');
  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('events').delete().eq('id', id);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/events');
  return { success: true };
}
