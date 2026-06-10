import { z } from "zod";

export const getMembersSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  role: z.string().optional(),
});

export type GetMembersInput = z.infer<typeof getMembersSchema>;

export const createMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  role: z.string().min(1),
});

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
