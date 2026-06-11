'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { eventsService } from '../services/events.service';

export async function getEvents() {
  const supabase = await createClient();
  try {
    const data = await eventsService.getAllEvents(supabase);
    return data as any[];
  } catch (error: any) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}

export async function createEvent(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  try {
    await eventsService.create(supabase, {
      name: rawData.name as string,
      description: (rawData.description as string) || null,
      venue: (rawData.venue as string) || null,
      capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
      status: (rawData.status as any) || 'Upcoming'
    });
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/events');
  return { success: true };
}

export async function updateEvent(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  
  try {
    await eventsService.update(supabase, id, {
      name: rawData.name as string,
      description: (rawData.description as string) || null,
      venue: (rawData.venue as string) || null,
      capacity: rawData.capacity ? parseInt(rawData.capacity as string) : null,
      status: rawData.status as any
    });
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
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/events');
  return { success: true };
}
