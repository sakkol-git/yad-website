/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/shared/lib/supabase/server';
import { UserDashboard } from '@/features/Static/dashboard/components/UserDashboard';

export default async function PortalDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch some summary data for the dashboard
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

  const { data: volunteer } = await (supabase as any)
    .from('event_volunteers')
    .select('status, events(name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1);

  const upcomingBooking = bookings?.[0] as any;
  const recentDonation = donations?.[0] as any;
  const recentVolunteer = volunteer?.[0] as any;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <UserDashboard
      user={user}
      upcomingBooking={upcomingBooking}
      recentDonation={recentDonation}
      recentVolunteer={recentVolunteer}
      greeting={getGreeting()}
    />
  );
}
