import { z } from "zod";

export const getVolunteersSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export const updateVolunteerStatusSchema = z.object({
  id: z.string().uuid("Invalid volunteer ID"),
  newStatus: z.enum(["Pending", "Approved", "Rejected", "Completed"]),
});
