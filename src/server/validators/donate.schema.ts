import { z } from "zod";

export const createDonationDraftSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export const getDonationByIdSchema = z.object({
  id: z.string().uuid("Invalid donation ID"),
});

export const submitLocalPaymentSchema = z.object({
  id: z.string().uuid("Invalid donation ID"),
  referenceId: z.string().min(1, "Reference ID is required"),
  method: z.enum(["khqr", "bank_transfer"]),
});
