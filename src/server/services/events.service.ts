import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/shared/types/supabase';
import { EventsRepository } from '../repositories/events';
import { getEventsSchema, GetEventsInput } from '../validators/event.schema';
import { requireAdmin } from '../permissions';

export class EventsService {
  private repository: EventsRepository;

  constructor() {
    this.repository = new EventsRepository();
  }

  async getEvents(supabase: SupabaseClient<Database>, input: GetEventsInput, isAdminRoute: boolean = false) {
    if (isAdminRoute) {
      await requireAdmin(supabase);
    }
    const validatedInput = getEventsSchema.parse(input);
    return this.repository.getPaginated(supabase, validatedInput.page, validatedInput.limit, validatedInput.search);
  }
}

export const eventsService = new EventsService();
