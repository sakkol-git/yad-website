"use server";

import { createClient } from "@/shared/lib/supabase/server";
import { donationsService } from "../services/donations.service";

export async function createDonationDraftAction(
  amount: number,
  firstName: string,
  lastName: string,
  email: string
) {
  try {
    const supabase = await createClient();
    const donorName = `${firstName} ${lastName}`.trim();
    
    // Create draft donation
    const draft = await donationsService.createDonationIntent(supabase, {
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
