import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { requireAdmin } from '../permissions';

export class UsersService {
  async getAllUsersWithRoles(supabaseAdmin: SupabaseClient<Database>, page: number = 1, limit: number = 10, search?: string) {
    // Supabase auth admin listUsers doesn't natively support robust text search
    // We'll fetch users and handle pagination/search in memory if there aren't too many
    // For a highly scalable app, we'd mirror users to a public.users table
    // Since this is just for the admin dashboard, we'll do best-effort
    const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1000 // Fetch up to 1000 to allow in-memory filtering for now
    });
    
    if (authError) {
      throw new Error('Failed to fetch users: ' + authError.message);
    }

    const { data: roles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('*');

    if (rolesError) {
      throw new Error('Failed to fetch user roles: ' + rolesError.message);
    }

    const rolesData = (roles || []) as { user_id: string; role: string }[];
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

    let filteredUsers = usersWithRoles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(u => u.email.toLowerCase().includes(searchLower) || u.role.toLowerCase().includes(searchLower));
    }

    const count = filteredUsers.length;
    const adminsCount = filteredUsers.filter(u => u.role === 'admin' || u.role === 'Admin').length;
    
    const from = (page - 1) * limit;
    const to = from + limit;
    
    const paginatedUsers = filteredUsers.slice(from, to);

    return { data: paginatedUsers, count, adminsCount };
  }

  async createUser(supabaseAdmin: SupabaseClient<Database>, email: string, password: string, role: string) {
    const { data, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) throw new Error(createError.message);

    const newUserId = data.user.id;

    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .upsert({ user_id: newUserId, role: role as any });

    if (roleError) {
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      throw new Error('Failed to assign role to user');
    }

    return true;
  }

  async updateUserRole(supabaseAdmin: SupabaseClient<Database>, userId: string, role: string) {
    const { error } = await supabaseAdmin
      .from('user_roles')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .upsert({ user_id: userId, role: role as any });

    if (error) throw new Error('Failed to update user role');
    return true;
  }

  async deleteUser(supabaseAdmin: SupabaseClient<Database>, userId: string) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw new Error('Failed to delete user');
    return true;
  }
}

export const usersService = new UsersService();
