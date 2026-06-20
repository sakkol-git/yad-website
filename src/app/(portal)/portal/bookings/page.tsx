import { getUserBookings } from '@/server/actions/portal.actions';
import { UserBookingsTable, UserBooking } from '@/features/Entities/bookings/components/UserBookingsTable';

export default async function PortalBookingsPage() {
  const { bookings } = await getUserBookings();

  return (
    <UserBookingsTable bookings={(bookings as unknown as UserBooking[]) || []} />
  );
}
