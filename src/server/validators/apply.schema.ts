import { z } from "zod";

export const submitStudentApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  essay: z.string().min(1, "Essay is required"),
});

export const updateApplicationStatusSchema = z.object({
  id: z.string().uuid("Invalid application ID"),
  newStatus: z.enum(["pending", "reviewed", "accepted", "rejected"]),
});
