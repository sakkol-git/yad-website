import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";
import { BookingsRepository } from "../repositories/bookings";
import {
  getBookingsSchema,
  GetBookingsInput,
  createGuestInquirySchema,
  CreateGuestInquiryInput,
  approveAvailabilitySchema,
  ApproveAvailabilityInput,
  updateBookingStatusSchema,
  UpdateBookingStatusInput,
  ValidBookingTransitions,
  BookingStatusType,
} from "../validators/booking.schema";
import { requireAdmin } from "../permissions";

export class BookingsService {
  private repository: BookingsRepository;

  constructor() {
    this.repository = new BookingsRepository();
  }

  async getBookings(
    supabase: SupabaseClient<Database>,
    input: GetBookingsInput,
    isAdminRoute: boolean = false,
  ) {
    if (isAdminRoute) {
      await requireAdmin(supabase);
    }
    const validatedInput = getBookingsSchema.parse(input);
    return this.repository.getPaginated(
      supabase,
      validatedInput.page,
      validatedInput.limit,
      validatedInput.search,
      validatedInput.status,
      validatedInput.paymentStatus,
    );
  }

  async submitInquiry(supabase: SupabaseClient<Database>, input: CreateGuestInquiryInput) {
    const validatedInput = createGuestInquirySchema.parse(input);

    // Status inherently becomes 'Inquiry' in repository
    return this.repository.createInquiry(supabase, {
      guest_name: validatedInput.guest_name,
      email: validatedInput.email,
      phone: validatedInput.phone,
      country: validatedInput.country || null,
      check_in: validatedInput.check_in,
      check_out: validatedInput.check_out,
      guests_count: validatedInput.guests_count,
      room_preference: validatedInput.room_preference || null,
      special_request: validatedInput.special_request || null,
    });
  }

  async approveAvailability(supabase: SupabaseClient<Database>, input: ApproveAvailabilityInput) {
    await requireAdmin(supabase);
    const validatedInput = approveAvailabilitySchema.parse(input);

    return this.repository.updateBookingStatus(
      supabase,
      validatedInput.booking_id,
      "Pending Confirmation",
      "Inquiry", // Only inquiries can be approved
      {
        room_id: validatedInput.room_id,
        amount: validatedInput.amount,
      },
    );
  }

  async updateStatus(supabase: SupabaseClient<Database>, input: UpdateBookingStatusInput) {
    await requireAdmin(supabase);
    const validatedInput = updateBookingStatusSchema.parse(input);

    if (validatedInput.expectedCurrentStatus) {
      const allowedNextStates =
        ValidBookingTransitions[validatedInput.expectedCurrentStatus as BookingStatusType];
      if (!allowedNextStates.includes(validatedInput.status as BookingStatusType)) {
        throw new Error(
          `Invalid state transition from ${validatedInput.expectedCurrentStatus} to ${validatedInput.status}`,
        );
      }
    }

    return this.repository.updateBookingStatus(
      supabase,
      validatedInput.id,
      validatedInput.status,
      validatedInput.expectedCurrentStatus,
    );
  }
}

export const bookingsService = new BookingsService();
