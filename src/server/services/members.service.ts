import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { MembersRepository } from '../repositories/members';
import { getMembersSchema, GetMembersInput } from '../validators/member.schema';
import { requireAdmin } from '../permissions';

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
}

export const membersService = new MembersService();
