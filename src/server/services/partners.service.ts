import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { PartnersRepository } from '../repositories/partners';
import { getPartnersSchema, GetPartnersInput } from '../validators/partner.schema';
import { requireAdmin } from '../permissions';
import { cache } from 'react';

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

  async getAllPartners(supabase: SupabaseClient<Database>) {
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

  getPublicPartners = cache(async (supabase: SupabaseClient<Database>) => {
    return this.repository.getAllPublic(supabase);
  });
}

export const partnersService = new PartnersService();
