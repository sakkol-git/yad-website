"use server";

import { createAdminClient } from "@/shared/lib/supabase/server";
import { donationsService } from "../services/donations.service";
import { Database } from "@/shared/types/supabase";

type DonationRow = Database['public']['Tables']['donations']['Row'];

export async function createDonationDraftAction(
  amount: number,
  firstName: string,
  lastName: string,
  email: string
) {
  try {
    const supabaseAdmin = createAdminClient();
    const donorName = `${firstName} ${lastName}`.trim();
    
    // Create draft donation
    const draft = await donationsService.createDonationIntent(supabaseAdmin, {
      amount,
      donor_name: donorName,
      email,
      donation_type: "One-Time",
      is_anonymous: false,
    });

    return { success: true, data: draft };
  } catch (error: any) {
    console.error("Failed to create donation draft:", error);
    return { success: false, error: error.message || "Failed to create donation" };
  }
}

export async function getDonationByIdAction(id: string): Promise<
  | { success: true; data: DonationRow }
  | { success: false; error: string; data?: undefined }
> {
  try {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
      .from('donations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data: data as DonationRow };
  } catch (error: any) {
    console.error("Failed to get donation by ID:", error);
    return { success: false, error: error.message || "Failed to get donation details" };
  }
}

export async function submitLocalPaymentAction(
  id: string,
  referenceId: string,
  method: 'khqr' | 'bank_transfer'
): Promise<
  | { success: true; data: DonationRow }
  | { success: false; error: string; data?: undefined }
> {
  try {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin
      .from('donations')
      .update({
        status: 'Processing',
        method,
        reference_id: referenceId,
        updated_at: new Date().toISOString()
      } as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: data as DonationRow };
  } catch (error: any) {
    console.error("Failed to submit local payment:", error);
    return { success: false, error: error.message || "Failed to submit local payment verification" };
  }
}


