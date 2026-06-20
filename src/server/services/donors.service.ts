import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { DonorsRepository } from '../repositories/donors';
import { requireAdmin } from '../permissions';
import { createAdminClient } from '@/shared/lib/supabase/server';

export class DonorsService {
  private repository: DonorsRepository;

  constructor() {
    this.repository = new DonorsRepository();
  }

  async getDonors(supabase: SupabaseClient<Database>, page: number = 1, limit: number = 10, search?: string, isAdminRoute: boolean = false) {
    if (isAdminRoute) {
      await requireAdmin(supabase);
    }
    return this.repository.getPaginated(supabase, page, limit, search);
  }

  async getAllDonors(supabase: SupabaseClient<Database>) {
    await requireAdmin(supabase);
    return this.repository.getAll(supabase);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(supabase: SupabaseClient<Database>, payload: any) {
    await requireAdmin(supabase);
    const adminClient = createAdminClient();
    return this.repository.create(adminClient, payload);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(supabase: SupabaseClient<Database>, id: string, payload: any) {
    await requireAdmin(supabase);
    const adminClient = createAdminClient();
    return this.repository.update(adminClient, id, payload);
  }

  async delete(supabase: SupabaseClient<Database>, id: string) {
    await requireAdmin(supabase);
    const adminClient = createAdminClient();
    return this.repository.delete(adminClient, id);
  }
}

export const donorsService = new DonorsService();
