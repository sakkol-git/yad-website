import { z } from "zod";

export const getDonationsSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.string().optional(),
  method: z.string().optional(),
});

export type GetDonationsInput = z.infer<typeof getDonationsSchema>;

// Stage 1: Create Draft (Donation Intent)
export const createDonationDraftSchema = z.object({
  donor_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  country: z.string().optional(),
  amount: z.number().min(1, "Amount must be at least 1"),
  donation_type: z.enum(["One-Time", "Monthly"]).default("One-Time"),
  is_anonymous: z.boolean().default(false),
  message: z.string().optional(),
});

export type CreateDonationDraftInput = z.infer<typeof createDonationDraftSchema>;

// Stage 2 & 3: Payment
export const initiatePaymentSchema = z.object({
  donation_id: z.string().uuid(),
  method: z.enum(["card", "khqr", "cash", "bank_transfer"]),
});

export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;

export const verifyPaymentSchema = z.object({
  donation_id: z.string().uuid(),
  reference_id: z.string().optional(),
});

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;

export const updateDonationStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["Draft", "Pending Payment", "Processing", "Completed", "Failed", "Refunded"]),
  expectedCurrentStatus: z
    .enum(["Draft", "Pending Payment", "Processing", "Completed", "Failed", "Refunded"])
    .optional(),
});
export type UpdateDonationStatusInput = z.infer<typeof updateDonationStatusSchema>;
