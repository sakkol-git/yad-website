'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { partnersService } from '../services/partners.service';

export async function getPartners() {
  const supabase = await createClient();
  try {
    const data = await partnersService.getAllPartners(supabase);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data as any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching partners:', error);
    throw new Error('Failed to fetch partners');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPartner(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);

  try {
    await partnersService.create(supabase, {
      name: rawData.name as string,
      contact_person: (rawData.contact_person as string) || null,
      email: (rawData.email as string) || null,
      phone: (rawData.phone as string) || null,
      partnership_type: (rawData.partnership_type as string) || null,
      notes: (rawData.notes as string) || null,
      logo_url: (rawData.logo_url as string) || null
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/partners');
  return { success: true };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updatePartner(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);

  try {
    await partnersService.update(supabase, id, {
      name: rawData.name as string,
      contact_person: (rawData.contact_person as string) || null,
      email: (rawData.email as string) || null,
      phone: (rawData.phone as string) || null,
      partnership_type: (rawData.partnership_type as string) || null,
      notes: (rawData.notes as string) || null,
      logo_url: (rawData.logo_url as string) || null
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/partners');
  return { success: true };
}

export async function deletePartner(id: string) {
  const supabase = await createClient();

  try {
    await partnersService.delete(supabase, id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/partners');
  return { success: true };
}
