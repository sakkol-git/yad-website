import { z } from "zod";

export const getEventsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  search: z.string().optional(),
});

export const eventDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().or(z.literal("")),
  venue: z.string().optional().or(z.literal("")),
  capacity: z.coerce.number().positive().optional().or(z.literal("")),
  status: z.enum(["Upcoming", "Ongoing", "Completed"]).default("Upcoming"),
});

export const updateEventSchema = z.object({
  id: z.string().uuid("Invalid event ID"),
  data: eventDataSchema,
});

export const deleteEventSchema = z.object({
  id: z.string().uuid("Invalid event ID"),
});

export type GetEventsInput = z.infer<typeof getEventsSchema>;

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
