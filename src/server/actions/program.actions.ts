'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { programsService } from '../services/programs.service';

export async function getPrograms() {
  const supabase = await createClient();
  try {
    const data = await programsService.getAllPrograms(supabase);
    return data as any[];
  } catch (error: any) {
    console.error('Error fetching programs:', error);
    throw new Error('Failed to fetch programs');
  }
}

export async function createProgram(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  try {
    await programsService.create(supabase, {
      title: rawData.title as string,
      description: (rawData.description as string) || null,
      category: (rawData.category as string) || null,
      start_date: (rawData.start_date as string) || null,
      end_date: (rawData.end_date as string) || null,
      capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
      status: (rawData.status as any) || 'Upcoming'
    });
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/programs');
  return { success: true };
}

export async function updateProgram(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  try {
    await programsService.update(supabase, id, {
      title: rawData.title as string,
      description: (rawData.description as string) || null,
      category: (rawData.category as string) || null,
      start_date: (rawData.start_date as string) || null,
      end_date: (rawData.end_date as string) || null,
      capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
      status: rawData.status as any
    });
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/programs');
  return { success: true };
}

export async function deleteProgram(id: string) {
  const supabase = await createClient();
  try {
    await programsService.delete(supabase, id);
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/programs');
  return { success: true };
}
