"use server";

import { createAdminClient } from "@/shared/lib/supabase/server";
import { Database } from "@/shared/types/supabase";

export interface GenericPaymentDetails {
  id: string;
  name: string;
  email: string;
  amount: number;
  description: string;
  status: string;
  referenceId?: string;
  type: "donation" | "booking";
}

export async function getPaymentTargetAction(
  id: string,
  type: "donation" | "booking"
): Promise<{ success: true; data: GenericPaymentDetails } | { success: false; error: string }> {
  try {
    const supabaseAdmin = createAdminClient();
    if (type === "donation") {
      const { data, error } = await supabaseAdmin
        .from("donations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Donation draft not found");

      const donation = data as Database['public']['Tables']['donations']['Row'];

      return {
        success: true,
        data: {
          id: donation.id,
          name: donation.donor_name || "Anonymous Donor",
          email: donation.email || "",
          amount: Number(donation.amount),
          description: `Donation to YAD Cambodia`,
          status: donation.status,
          referenceId: donation.reference_id || undefined,
          type,
        },
      };
    } else {
      // type === "booking"
      const { data, error } = await supabaseAdmin
        .from("bookings")
        .select("id, guest_name, amount, status")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Booking not found");

      const booking = data as any; // Cast to any to avoid type errors since we are bypassing the generated types

      return {
        success: true,
        data: {
          id: booking.id,
          name: booking.guest_name || "Guest",
          email: "",
          amount: Number(booking.amount) || 0,
          description: `Homestay Booking Reservation`,
          status: booking.status,
          referenceId: booking.id,
          type,
        },
      };
    }  } catch (error: any) {
    console.error(`Failed to retrieve payment details for ${type} #${id}:`, error);
    return { success: false, error: error.message || "Failed to fetch payment details" };
  }
}

export async function submitGenericLocalPaymentAction(
  id: string,
  type: "donation" | "booking",
  referenceId: string,
  method: "khqr" | "bank_transfer"
): Promise<{ success: true; data: any } | { success: false; error: string }> {
  try {
    const supabaseAdmin = createAdminClient();

    if (type === "donation") {
      const { data, error } = await supabaseAdmin
        .from("donations")
        .update({
          status: "Processing",
          method,
          reference_id: referenceId,
          updated_at: new Date().toISOString(),
        } as any)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // type === "booking"
      const { data, error } = await supabaseAdmin
        .from("bookings")
        .update({
          status: "Pending Confirmation",
          payment_status: "Pending",
          updated_at: new Date().toISOString(),
        } as any)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    }
  } catch (error: any) {
    console.error(`Failed to submit local payment for ${type} #${id}:`, error);
    return { success: false, error: error.message || "Failed to submit local payment verification" };
  }
}
