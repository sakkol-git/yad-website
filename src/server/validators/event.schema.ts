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

const validEventStatuses = ["Upcoming", "Ongoing", "Completed", "Cancelled"] as const;
export type EventStatusType = typeof validEventStatuses[number];

export const ValidEventTransitions: Record<EventStatusType, EventStatusType[]> = {
  "Upcoming": ["Ongoing", "Cancelled", "Completed"],
  "Ongoing": ["Completed", "Cancelled"],
  "Completed": [],
  "Cancelled": []
};

export const updateEventStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(validEventStatuses),
  expectedCurrentStatus: z.enum(validEventStatuses).optional(),
});

export type UpdateEventStatusInput = z.infer<typeof updateEventStatusSchema>;
