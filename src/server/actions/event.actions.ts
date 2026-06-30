"use server";

import { createSafeAction } from "@/shared/lib/safe-action";
import { revalidatePath } from "next/cache";
import { eventsService } from "../services/events.service";
import {
  getEventsSchema,
  eventDataSchema,
  updateEventSchema,
  deleteEventSchema,
} from "../validators/event.schema";

export const getEvents = createSafeAction(
  { schema: getEventsSchema, role: "admin" },
  async ({ page, limit, search }, { sessionClient }) => {
    const { data, count } = await eventsService.getEvents(
      sessionClient,
      { page, limit, search },
      false,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { data: data as any[], count };
  },
);

export const createEvent = createSafeAction(
  { schema: eventDataSchema, role: "admin" },
  async (parsedData, { sessionClient }) => {
    const dataToSubmit = {
      name: parsedData.name,
      description: parsedData.description || null,
      venue: parsedData.venue || null,
      capacity: parsedData.capacity || null,
      status: parsedData.status,
    };

    await eventsService.create(sessionClient, dataToSubmit);
    revalidatePath("/admin/events");
    return true;
  },
);

export const updateEvent = createSafeAction(
  { schema: updateEventSchema, role: "admin" },
  async ({ id, data: parsedData }, { sessionClient }) => {
    const dataToSubmit = {
      name: parsedData.name,
      description: parsedData.description || null,
      venue: parsedData.venue || null,
      capacity: parsedData.capacity || null,
      status: parsedData.status,
    };

    await eventsService.update(sessionClient, id, dataToSubmit);
    revalidatePath("/admin/events");
    return true;
  },
);

export const deleteEvent = createSafeAction(
  { schema: deleteEventSchema, role: "admin" },
  async ({ id }, { sessionClient }) => {
    await eventsService.delete(sessionClient, id);
    revalidatePath("/admin/events");
    return true;
  },
);
