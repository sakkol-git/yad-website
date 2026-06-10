'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getMembers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching members:', error);
    throw new Error('Failed to fetch members');
  }
  return data as any[];
}

export async function createMember(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('members').insert([{
    first_name: rawData.first_name as string,
    last_name: rawData.last_name as string,
    email: rawData.email as string,
    type: (rawData.type as any) || 'Resident',
    status: (rawData.status as any) || 'Pending',
    bio: (rawData.bio as string) || null
  }]);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/members');
  return { success: true };
}

export async function updateMember(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  const { error } = await supabase.from('members').update({
    first_name: rawData.first_name as string,
    last_name: rawData.last_name as string,
    email: rawData.email as string,
    type: rawData.type as any,
    status: rawData.status as any,
    bio: (rawData.bio as string) || null
  }).eq('id', id);

  if (error) return { error: error.message };
  
  revalidatePath('/admin/members');
  return { success: true };
}

export async function deleteMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('members').delete().eq('id', id);
  
  if (error) return { error: error.message };
  
  revalidatePath('/admin/members');
  return { success: true };
}
