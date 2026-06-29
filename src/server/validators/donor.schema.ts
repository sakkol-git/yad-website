import { z } from "zod";

export const getDonorsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  search: z.string().optional(),
});

export const donorDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  amount: z.coerce.number().positive().optional().or(z.literal("")),
  donation_date: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  avatar_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  is_public: z.coerce.boolean().default(false),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const updateDonorSchema = z.object({
  id: z.string().uuid("Invalid donor ID"),
  data: donorDataSchema,
});

export const deleteDonorSchema = z.object({
  id: z.string().uuid("Invalid donor ID"),
});
