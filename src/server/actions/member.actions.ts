'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { membersService } from '../services/members.service';

const csvToArray = (csv?: string) => csv ? csv.split(',').map(s => s.trim()).filter(Boolean) : undefined;

function extractProfileData(rawData: Record<string, any>) {
  return {
    quote: (rawData.quote as string) || undefined,
    vision: (rawData.vision as string) || undefined,
    education: csvToArray(rawData.education as string),
    experience: csvToArray(rawData.experience as string),
    achievements: csvToArray(rawData.achievements as string),
    socialLinks: {
      linkedin: (rawData.linkedin as string) || undefined,
      twitter: (rawData.twitter as string) || undefined,
      facebook: (rawData.facebook as string) || undefined,
      github: (rawData.github as string) || undefined,
    }
  };
}

export async function getMembers() {
  const supabase = await createClient();
  try {
    const members = await membersService.getAllMembers(supabase);
    return members as any[];
  } catch (error: any) {
    console.error('Error fetching members:', error);
    throw new Error('Failed to fetch members');
  }
}

export async function createMember(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  const profile = extractProfileData(rawData);
  
  try {
    await membersService.create(supabase, {
      first_name: rawData.first_name as string,
      last_name: rawData.last_name as string,
      email: rawData.email as string,
      type: (rawData.type as any) || 'Resident',
      status: (rawData.status as any) || 'Pending',
      bio: (rawData.bio as string) || null,
      profile: profile as any
    });
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/members');
  return { success: true };
}

export async function updateMember(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  const profile = extractProfileData(rawData);
  
  try {
    await membersService.update(supabase, id, {
      first_name: rawData.first_name as string,
      last_name: rawData.last_name as string,
      email: rawData.email as string,
      type: rawData.type as any,
      status: rawData.status as any,
      bio: (rawData.bio as string) || null,
      profile: profile as any
    });
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/members');
  return { success: true };
}

export async function deleteMember(id: string) {
  const supabase = await createClient();
  try {
    await membersService.delete(supabase, id);
  } catch (error: any) {
    return { error: error.message };
  }
  
  revalidatePath('/admin/members');
  return { success: true };
}
