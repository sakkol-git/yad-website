'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { donorsService } from '../services/donors.service';

export async function getDonors(page: number = 1, limit: number = 10, search?: string) {
  const supabase = await createClient();
  try {
    const { data, count } = await donorsService.getDonors(supabase, page, limit, search, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { data: data as any[], count };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching donors:', error);
    throw new Error('Failed to fetch donors');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createDonor(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);

  try {
    await donorsService.create(supabase, {
      name: rawData.name as string,
      email: (rawData.email as string) || null,
      amount: rawData.amount ? parseFloat(rawData.amount as string) : null,
      donation_date: (rawData.donation_date as string) || null,
      description: (rawData.description as string) || null,
      avatar_url: (rawData.avatar_url as string) || null,
      country: (rawData.country as string) || null,
      is_public: rawData.is_public === 'on' || rawData.is_public === 'true',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status: (rawData.status as any) || 'Active'
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/donors');
  return { success: true };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateDonor(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);

  try {
    await donorsService.update(supabase, id, {
      name: rawData.name as string,
      email: (rawData.email as string) || null,
      amount: rawData.amount ? parseFloat(rawData.amount as string) : null,
      donation_date: (rawData.donation_date as string) || null,
      description: (rawData.description as string) || null,
      avatar_url: (rawData.avatar_url as string) || null,
      country: (rawData.country as string) || null,
      is_public: rawData.is_public === 'on' || rawData.is_public === 'true',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status: rawData.status as any
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/donors');
  return { success: true };
}

export async function deleteDonor(id: string) {
  const supabase = await createClient();
  try {
    await donorsService.delete(supabase, id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/donors');
  return { success: true };
}
