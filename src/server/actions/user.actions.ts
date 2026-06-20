'use server';

import { createAdminClient } from '@/shared/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { usersService } from '../services/users.service';

export async function getUsers() {
  const supabase = createAdminClient();
  try {
    return await usersService.getAllUsersWithRoles(supabase);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as 'admin' | 'manager' | 'user';

  if (!email || !password || !role) {
    return { error: 'Email, password, and role are required' };
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  const supabaseAdmin = createAdminClient();

  try {
    await usersService.createUser(supabaseAdmin, email, password, role);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/users');
  return { success: true };
}

export async function updateUser(userId: string, role: 'admin' | 'manager' | 'user') {
  if (!userId || !role) {
    return { error: 'User ID and role are required' };
  }

  const supabaseAdmin = createAdminClient();

  try {
    await usersService.updateUserRole(supabaseAdmin, userId, role);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/users');
  return { success: true };
}

export async function deleteUser(userId: string) {
  if (!userId) return { error: 'User ID is required' };

  const supabaseAdmin = createAdminClient();

  try {
    await usersService.deleteUser(supabaseAdmin, userId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: error.message };
  }

  revalidatePath('/admin/users');
  return { success: true };
}
