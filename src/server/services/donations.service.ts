import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/supabase";
import { DonationsRepository } from "../repositories/donations";
import {
  getDonationsSchema,
  GetDonationsInput,
  createDonationDraftSchema,
  CreateDonationDraftInput,
  initiatePaymentSchema,
  InitiatePaymentInput,
  verifyPaymentSchema,
  VerifyPaymentInput,
  updateDonationStatusSchema,
  UpdateDonationStatusInput,
} from "../validators/donation.schema";
import { requireAdmin } from "../permissions";

export class DonationsService {
  private repository: DonationsRepository;

  constructor() {
    this.repository = new DonationsRepository();
  }

  async getDonations(supabase: SupabaseClient<Database>, input: GetDonationsInput) {
    // 1. Enforce RBAC
    await requireAdmin(supabase);

    // 2. Validate Input
    const validatedInput = getDonationsSchema.parse(input);

    // 3. Business Logic / Orchestration
    return this.repository.getPaginated(
      supabase,
      validatedInput.page,
      validatedInput.limit,
      validatedInput.search,
      validatedInput.status,
      validatedInput.method,
    );
  }

  async createDonationIntent(supabase: SupabaseClient<Database>, input: CreateDonationDraftInput) {
    const validatedInput = createDonationDraftSchema.parse(input);

    // Create Draft
    return this.repository.createDraft(supabase, {
      donor_name: validatedInput.donor_name,
      email: validatedInput.email || null,
      phone: validatedInput.phone || null,
      country: validatedInput.country || null,
      amount: validatedInput.amount,
      donation_type: validatedInput.donation_type,
      is_anonymous: validatedInput.is_anonymous,
      message: validatedInput.message || null,
    });
  }

  async initiatePayment(supabase: SupabaseClient<Database>, input: InitiatePaymentInput) {
    const validatedInput = initiatePaymentSchema.parse(input);

    // Transition from Draft to Pending Payment
    return this.repository.updateDonationStatus(
      supabase,
      validatedInput.donation_id,
      "Pending Payment",
      "Draft",
      { method: validatedInput.method },
    );
  }

  async verifyPayment(supabase: SupabaseClient<Database>, input: VerifyPaymentInput) {
    const validatedInput = verifyPaymentSchema.parse(input);

    // Transition from Pending Payment/Processing to Completed
    // In a real system, we'd verify with Stripe/Bank APIs here
    return this.repository.updateDonationStatus(
      supabase,
      validatedInput.donation_id,
      "Completed",
      undefined, // Could be from Pending Payment or Processing
      { reference_id: validatedInput.reference_id || null },
    );
  }

  async updateStatus(supabase: SupabaseClient<Database>, input: UpdateDonationStatusInput) {
    await requireAdmin(supabase);
    const validatedInput = updateDonationStatusSchema.parse(input);

    return this.repository.updateDonationStatus(
      supabase,
      validatedInput.id,
      validatedInput.status,
      validatedInput.expectedCurrentStatus,
    );
  }
}

export const donationsService = new DonationsService();
