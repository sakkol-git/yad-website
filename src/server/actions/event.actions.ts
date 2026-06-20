'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { eventsService } from '../services/events.service';

export async function getEvents(page: number = 1, limit: number = 10, search?: string) {
  const supabase = await createClient();
  try {
    const { data, count } = await eventsService.getEvents(supabase, { page, limit, search }, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { data: data as any[], count };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createEvent(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  try {
    await eventsService.create(supabase, {
      name: rawData.name as string,
      description: (rawData.description as string) || null,
      venue: (rawData.venue as string) || null,
      capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status: (rawData.status as any) || 'Upcoming'
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/events');
  return { success: true };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateEvent(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  try {
    await eventsService.update(supabase, id, {
      name: rawData.name as string,
      description: (rawData.description as string) || null,
      venue: (rawData.venue as string) || null,
      capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status: rawData.status as any
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/events');
  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  
  try {
    await eventsService.delete(supabase, id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/events');
  return { success: true };
}
