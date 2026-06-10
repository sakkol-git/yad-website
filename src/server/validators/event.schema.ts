import { z } from "zod";

export const getEventsSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
});

export type GetEventsInput = z.infer<typeof getEventsSchema>;

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string(),
  location: z.string().min(1, "Location is required"),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
