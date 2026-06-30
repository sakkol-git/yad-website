import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";
import { EventsRepository } from "../repositories/events";
import {
  getEventsSchema,
  GetEventsInput,
  updateEventStatusSchema,
  UpdateEventStatusInput,
  ValidEventTransitions,
  EventStatusType,
} from "../validators/event.schema";
import { requireAdmin } from "../permissions";
import { cache } from "react";
import { auditLogger } from "./audit.service";

export class EventsService {
  private repository: EventsRepository;

  constructor() {
    this.repository = new EventsRepository();
  }

  async getEvents(
    supabase: SupabaseClient<Database>,
    input: GetEventsInput,
    isAdminRoute: boolean = false,
  ) {
    if (isAdminRoute) {
      await requireAdmin(supabase);
    }
    const validatedInput = getEventsSchema.parse(input);
    return this.repository.getPaginated(
      supabase,
      validatedInput.page,
      validatedInput.limit,
      validatedInput.search,
    );
  }

  async getAllEvents(supabase: SupabaseClient<Database>) {
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

  async updateStatus(supabase: SupabaseClient<Database>, input: UpdateEventStatusInput) {
    await requireAdmin(supabase);
    const validatedInput = updateEventStatusSchema.parse(input);

    if (validatedInput.expectedCurrentStatus) {
      const allowedNextStates =
        ValidEventTransitions[validatedInput.expectedCurrentStatus as EventStatusType];
      if (!allowedNextStates.includes(validatedInput.status as EventStatusType)) {
        throw new Error(
          `Invalid state transition from ${validatedInput.expectedCurrentStatus} to ${validatedInput.status}`,
        );
      }
    }

    const result = await this.repository.update(supabase, validatedInput.id, {
      status: validatedInput.status,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await auditLogger.logAction(supabase, user.id, "Event", "Update Status", {
        id: validatedInput.id,
        newStatus: validatedInput.status,
      });
    }

    return result;
  }

  async delete(supabase: SupabaseClient<Database>, id: string) {
    await requireAdmin(supabase);
    const result = await this.repository.delete(supabase, id);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await auditLogger.logAction(supabase, user.id, "Event", "Delete", { id });
    }

    return result;
  }

  getPublicEvents = cache(async (supabase: SupabaseClient<Database>) => {
    return this.repository.getAllPublic(supabase);
  });

  async getEventStats(supabase: SupabaseClient<Database>) {
    await requireAdmin(supabase);
    return this.repository.getEventStats(supabase);
  }
}

export const eventsService = new EventsService();
