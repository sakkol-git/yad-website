import { z } from "zod";

export const getBookingsSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
});

export type GetBookingsInput = z.infer<typeof getBookingsSchema>;

// Stage 1: Guest Inquiry
export const createGuestInquirySchema = z.object({
  guest_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  country: z.string().optional(),
  check_in: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  check_out: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  guests_count: z.number().int().min(1),
  room_preference: z.string().optional(),
  special_request: z.string().optional(),
});

export type CreateGuestInquiryInput = z.infer<typeof createGuestInquirySchema>;

// Stage 2: Availability Review
export const approveAvailabilitySchema = z.object({
  booking_id: z.string().uuid(),
  room_id: z.string().uuid(),
  amount: z.number().min(0),
});

export type ApproveAvailabilityInput = z.infer<typeof approveAvailabilitySchema>;

const validBookingStatuses = [
  "Inquiry",
  "Availability Review",
  "Pending Confirmation",
  "Payment Pending",
  "Confirmed",
  "Checked In",
  "Checked Out",
  "Cancelled",
  "No Show",
] as const;

export type BookingStatusType = (typeof validBookingStatuses)[number];

export const ValidBookingTransitions: Record<BookingStatusType, BookingStatusType[]> = {
  Inquiry: ["Availability Review", "Pending Confirmation", "Cancelled"],
  "Availability Review": ["Pending Confirmation", "Cancelled"],
  "Pending Confirmation": ["Payment Pending", "Cancelled"],
  "Payment Pending": ["Confirmed", "Cancelled"],
  Confirmed: ["Checked In", "Cancelled", "No Show"],
  "Checked In": ["Checked Out"],
  "Checked Out": [],
  Cancelled: [],
  "No Show": [],
};

// Stage 3-5: State Transitions
export const updateBookingStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(validBookingStatuses),
  expectedCurrentStatus: z.enum(validBookingStatuses).optional(),
});

export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
