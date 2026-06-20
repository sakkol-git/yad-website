"use server";

import { createClient } from "@/shared/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getUserDashboardSummary() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { user: null };

  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, status, check_in, rooms(name)')
    .eq('guest_id', user.id)
    .order('check_in', { ascending: true })
    .limit(1);

  const { data: donations } = await supabase
    .from('donations')
    .select('amount, status, created_at')
    .eq('donor_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  const { data: volunteer } = await supabase
    .from('event_volunteers')
    .select('status, events(name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  const upcomingBooking = bookings?.[0] || null;
  const recentDonation = donations?.[0] || null;
  const recentVolunteer = volunteer?.[0] || null;

  return {
    user,
    upcomingBooking,
    recentDonation,
    recentVolunteer
  };
}

export async function getUserDonations() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { donations: [] };

  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('donor_id', user.id)
    .order('created_at', { ascending: false });

  return { donations: donations || [] };
}

export async function getUserBookings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { bookings: [] };

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, rooms(name)')
    .eq('guest_id', user.id)
    .order('check_in', { ascending: false });

  return { bookings: bookings || [] };
}

export async function getUserVolunteerEvents() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { upcomingEvents: [], myVolunteers: [] };

  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'Upcoming')
    .order('created_at', { ascending: false });

  const { data: myVolunteers } = await supabase
    .from('event_volunteers')
    .select('*, events(*)')
    .eq('user_id', user.id);

  return {
    upcomingEvents: upcomingEvents || [],
    myVolunteers: myVolunteers || []
  };
}

export async function signUpForEventAction(eventId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !eventId) return { error: "User or event ID not provided" };

  const { error } = await supabase
    .from('event_volunteers')
    .insert({
      user_id: user.id,
      event_id: eventId,
      status: 'pending'
    });

  if (error) {
    console.error("Error signing up for event:", error);
    return { error: error.message };
  }

  revalidatePath('/portal/volunteer');
  return { success: true };
}
