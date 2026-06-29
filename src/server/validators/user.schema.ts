import { z } from "zod";

export const getUsersSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  search: z.string().optional(),
});

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "manager", "user"]).default("user"),
});

export const updateUserRoleSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  role: z.enum(["admin", "manager", "user"]),
});

export const deleteUserSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});
