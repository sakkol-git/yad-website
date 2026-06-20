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

  let role = 'user';
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    role = (data as any).role;
  }

  if (!allowedRoles.includes(role)) {
    throw new PermissionsError(`Forbidden: Requires one of roles: ${allowedRoles.join(', ')}`);
  }

  return user;
};

export const requireAdmin = async (supabase: SupabaseClient<Database>) => {
  return requireRole(supabase, ['admin', 'super_admin']);
};

export const requireAdminOrManager = async (supabase: SupabaseClient<Database>) => {
  return requireRole(supabase, ['admin', 'super_admin', 'manager']);
};
