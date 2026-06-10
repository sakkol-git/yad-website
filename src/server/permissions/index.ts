import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';

export class PermissionsError extends Error {
  constructor(message: string = 'Forbidden: Insufficient permissions') {
    super(message);
    this.name = 'PermissionsError';
  }
}

export const requireAuth = async (supabase: SupabaseClient<Database>) => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session?.user) {
    throw new PermissionsError('Unauthorized: You must be logged in');
  }
  return session.user;
};

export const requireRole = async (supabase: SupabaseClient<Database>, allowedRoles: string[]) => {
  const user = await requireAuth(supabase);
  
  // Example implementation assuming role is in user metadata or a roles table
  const role = user.user_metadata?.role || 'user'; // Replace with actual role fetching logic
  
  if (!allowedRoles.includes(role)) {
    throw new PermissionsError(`Forbidden: Requires one of roles: ${allowedRoles.join(', ')}`);
  }
  
  return user;
};

export const requireAdmin = async (supabase: SupabaseClient<Database>) => {
  return requireRole(supabase, ['admin', 'super_admin']);
};
