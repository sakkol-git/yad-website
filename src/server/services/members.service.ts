import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { MembersRepository } from '../repositories/members';
import { getMembersSchema, GetMembersInput } from '../validators/member.schema';
import { requireAdmin } from '../permissions';
import { cache } from 'react';

export class MembersService {
  private repository: MembersRepository;

  constructor() {
    this.repository = new MembersRepository();
  }

  async getMembers(supabase: SupabaseClient<Database>, input: GetMembersInput, isAdminRoute: boolean = false) {
    if (isAdminRoute) {
      await requireAdmin(supabase);
    }
    const validatedInput = getMembersSchema.parse(input);
    return this.repository.getPaginated(supabase, validatedInput.page, validatedInput.limit, validatedInput.search, validatedInput.role);
  }

  async getAllMembers(supabase: SupabaseClient<Database>) {
    await requireAdmin(supabase);
    return this.repository.getAll(supabase);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(supabase: SupabaseClient<Database>, payload: any) {
    await requireAdmin(supabase);
    return this.repository.create(supabase, payload);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(supabase: SupabaseClient<Database>, id: string, payload: any) {
    await requireAdmin(supabase);
    return this.repository.update(supabase, id, payload);
  }

  async delete(supabase: SupabaseClient<Database>, id: string) {
    await requireAdmin(supabase);
    return this.repository.delete(supabase, id);
  }

  getPublicMembersByCategory = cache(async (supabase: SupabaseClient<Database>, category: string) => {
    return this.repository.getPublicMembersByCategory(supabase, category);
  });

  getPublicMemberBySlug = cache(async (supabase: SupabaseClient<Database>, slug: string) => {
    return this.repository.getPublicMemberBySlug(supabase, slug);
  });
}

export const membersService = new MembersService();
