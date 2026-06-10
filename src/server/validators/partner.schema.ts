import { z } from "zod";

export const getPartnersSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
});

export type GetPartnersInput = z.infer<typeof getPartnersSchema>;

export const createPartnerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo_url: z.string().url().optional(),
  type: z.string().min(1),
});

export type CreatePartnerInput = z.infer<typeof createPartnerSchema>;
