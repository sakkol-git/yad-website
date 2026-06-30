import { getUserBookings } from "@/server/actions/portal.actions";
import {
  UserBookingsTable,
  UserBooking,
} from "@/features/Entities/bookings/components/UserBookingsTable";
import { Suspense } from "react";

export default async function PortalBookingsPage() {
  const { bookings } = await getUserBookings();

  return (
    <Suspense
      fallback={<div className="p-8 text-center text-on-surface-variant">Loading bookings...</div>}
    >
      <UserBookingsTable bookings={(bookings as unknown as UserBooking[]) || []} />
    </Suspense>
  );
}
