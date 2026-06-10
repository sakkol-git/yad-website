import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { ProgramsRepository } from '../repositories/programs';
import { requireAdmin } from '../permissions';

export class ProgramsService {
  private repository: ProgramsRepository;

  constructor() {
    this.repository = new ProgramsRepository();
  }

  async getPrograms(supabase: SupabaseClient<Database>, page: number = 1, limit: number = 10, search?: string, isAdminRoute: boolean = false) {
    if (isAdminRoute) {
      await requireAdmin(supabase);
    }
    return this.repository.getPaginated(supabase, page, limit, search);
  }
}

export const programsService = new ProgramsService();
