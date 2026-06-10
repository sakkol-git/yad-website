import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { PartnersRepository } from '../repositories/partners';
import { getPartnersSchema, GetPartnersInput } from '../validators/partner.schema';
import { requireAdmin } from '../permissions';

export class PartnersService {
  private repository: PartnersRepository;

  constructor() {
    this.repository = new PartnersRepository();
  }

  async getPartners(supabase: SupabaseClient<Database>, input: GetPartnersInput, isAdminRoute: boolean = false) {
    if (isAdminRoute) {
      await requireAdmin(supabase);
    }
    const validatedInput = getPartnersSchema.parse(input);
    return this.repository.getPaginated(supabase, validatedInput.page, validatedInput.limit, validatedInput.search);
  }
}

export const partnersService = new PartnersService();
