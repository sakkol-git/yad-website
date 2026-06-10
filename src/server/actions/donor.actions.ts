'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getDonors() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('donors')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching donors:', error);
    throw new Error('Failed to fetch donors');
  }
  return data as any[];
}

export async function createDonor(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('donors').insert([{
    name: rawData.name as string,
    email: (rawData.email as string) || null,
    amount: rawData.amount ? parseFloat(rawData.amount as string) : null,
    donation_date: (rawData.donation_date as string) || null,
    message: (rawData.message as string) || null,
    is_public: rawData.is_public === 'on' || rawData.is_public === 'true',
    status: (rawData.status as any) || 'Active'
  }]);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/donors');
  return { success: true };
}

export async function updateDonor(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('donors').update({
    name: rawData.name as string,
    email: (rawData.email as string) || null,
    amount: rawData.amount ? parseFloat(rawData.amount as string) : null,
    donation_date: (rawData.donation_date as string) || null,
    message: (rawData.message as string) || null,
    is_public: rawData.is_public === 'on' || rawData.is_public === 'true',
    status: rawData.status as any
  }).eq('id', id);

  if (error) return { error: error.message };
  
  revalidatePath('/admin/donors');
  return { success: true };
}

export async function deleteDonor(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('donors').delete().eq('id', id);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/donors');
  return { success: true };
}
