'use server';

import { createAdminClient } from '@/shared/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
  const supabase = createAdminClient();
  
  // Get all users from auth.users using admin API
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  
  if (authError) {
    console.error('Error fetching auth users:', authError);
    throw new Error('Failed to fetch users');
  }

  const { data, error: rolesError } = await supabase
    .from('user_roles')
    .select('*');
    
  const roles = data as any[];

  if (rolesError) {
    console.error('Error fetching roles:', rolesError);
    throw new Error('Failed to fetch user roles');
  }

  // Merge auth users with their roles
  const rolesData = roles || [];
  const usersWithRoles = users.map(user => {
    const roleRecord = rolesData.find(r => r.user_id === user.id);
    return {
      id: user.id,
      email: user.email || '',
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at || undefined,
      role: roleRecord?.role || 'user',
    };
  });

  // Sort by created_at descending
  return usersWithRoles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

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

  const supabase = createAdminClient();

  // Create user in auth.users
  const { data, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm email since admin created it
  });

  if (createError) {
    console.error('Error creating user:', createError);
    return { error: createError.message };
  }

  const newUserId = data.user.id;

  // Assign role in public.user_roles
  const { error: roleError } = await supabase
    .from('user_roles')
    .upsert({ user_id: newUserId, role });

  if (roleError) {
    console.error('Error assigning role:', roleError);
    // Cleanup auth user if role assignment fails
    await supabase.auth.admin.deleteUser(newUserId);
    return { error: 'Failed to assign role to user' };
  }

  revalidatePath('/admin/users');
  return { success: true };
}

export async function updateUser(userId: string, role: 'admin' | 'manager' | 'user') {
  if (!userId || !role) {
    return { error: 'User ID and role are required' };
  }

  const supabase = createAdminClient();

  // We are only allowing role updates for users for simplicity, not email/password changes
  const { error } = await supabase
    .from('user_roles')
    .upsert({ user_id: userId, role });

  if (error) {
    console.error('Error updating role:', error);
    return { error: 'Failed to update user role' };
  }

  revalidatePath('/admin/users');
  return { success: true };
}

export async function deleteUser(userId: string) {
  if (!userId) return { error: 'User ID is required' };

  const supabase = createAdminClient();

  // Deleting from auth.users automatically cascades to public.user_roles due to ON DELETE CASCADE
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error('Error deleting user:', error);
    return { error: 'Failed to delete user' };
  }

  revalidatePath('/admin/users');
  return { success: true };
}
