'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPartners() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching partners:', error);
    throw new Error('Failed to fetch partners');
  }
  return data as any[];
}

export async function createPartner(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('partners').insert([{
    name: rawData.name as string,
    contact_person: (rawData.contact_person as string) || null,
    email: (rawData.email as string) || null,
    phone: (rawData.phone as string) || null,
    partnership_type: (rawData.partnership_type as string) || null,
    notes: (rawData.notes as string) || null
  }]);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/partners');
  return { success: true };
}

export async function updatePartner(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('partners').update({
    name: rawData.name as string,
    contact_person: (rawData.contact_person as string) || null,
    email: (rawData.email as string) || null,
    phone: (rawData.phone as string) || null,
    partnership_type: (rawData.partnership_type as string) || null,
    notes: (rawData.notes as string) || null
  }).eq('id', id);

  if (error) return { error: error.message };
  
  revalidatePath('/admin/partners');
  return { success: true };
}

export async function deletePartner(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('partners').delete().eq('id', id);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/partners');
  return { success: true };
}
