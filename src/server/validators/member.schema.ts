import { z } from "zod";

export const getMembersSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  search: z.string().optional(),
  role: z.string().optional(),
});

export const memberDataSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  type: z.enum(["Board", "Executive", "Resident", "Volunteer", "Staff"]).default("Resident"),
  status: z.enum(["Pending", "Active", "Inactive"]).default("Pending"),
  bio: z.string().optional().or(z.literal("")),
  avatar_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  role: z.string().optional().or(z.literal("")),

  // Profile nested fields that we extract from raw data
  biography: z.string().optional(),
  khmer_biography: z.string().optional(),
  quote: z.string().optional(),
  vision: z.string().optional(),
  education: z.string().optional(),
  experience: z.string().optional(),
  achievements: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  github: z.string().optional(),
});

export const updateMemberSchema = z.object({
  id: z.string().uuid("Invalid member ID"),
  data: memberDataSchema,
});

export const deleteMemberSchema = z.object({
  id: z.string().uuid("Invalid member ID"),
});

export type GetMembersInput = z.infer<typeof getMembersSchema>;
