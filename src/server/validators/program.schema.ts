import { z } from "zod";

export const getProgramsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  search: z.string().optional(),
});

export const programDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "completed", "upcoming"]),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  beneficiaries_count: z.number().int().min(0).default(0),
  image_url: z.string().optional(),
});

export const updateProgramSchema = z.object({
  id: z.string().uuid("Invalid program ID"),
  data: programDataSchema,
});

export const deleteProgramSchema = z.object({
  id: z.string().uuid("Invalid program ID"),
});
