/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/shared/lib/supabase/server';
import { UserBookingsTable } from '@/features/Entities/bookings/components/UserBookingsTable';

export default async function PortalBookingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, rooms(name)')
    .eq('guest_id', user.id)
    .order('check_in', { ascending: false });

  return (
    <UserBookingsTable bookings={bookings || []} />
  );
}
