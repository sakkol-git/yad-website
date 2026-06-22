import { createClient } from '@/shared/lib/supabase/server';
import { BookingsRepository } from '@/server/repositories/bookings';
import { BookingsTable, Booking } from '@/features/Entities/bookings/components/BookingsTable';
import { AdminPageLayout } from '@/shared/components/admin/layout/AdminPageLayout';
import { AdminPageHeader } from '@/shared/components/admin/layout/AdminPageHeader';
import { StatCard } from '@/shared/components/admin/data/StatCard';
import { StatsGrid } from '@/shared/components/admin/data/StatsGrid';
import { Button } from '@/shared/components/ui/Button';

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const repo = new BookingsRepository();

  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const search = typeof params.search === 'string' ? params.search : undefined;

  const statusRaw = typeof params.status === 'string' ? params.status : undefined;
  const status = statusRaw ? statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1) : undefined;

  const paymentStatusRaw = typeof params.paymentStatus === 'string' ? params.paymentStatus : undefined;
  const paymentStatus = paymentStatusRaw ? paymentStatusRaw.charAt(0).toUpperCase() + paymentStatusRaw.slice(1) : undefined;

  const { data: bookings, count } = await repo.getPaginated(supabase, page, 10, search, status, paymentStatus);

  const { data: allBookings } = await supabase.from('bookings').select('status, check_in, check_out');
  
  const metrics = {
    newInquiries: 0,
    pendingConfirmations: 0,
    upcomingArrivals: 0,
    currentGuests: 0,
    checkOutToday: 0,
  };

  const todayStr = new Date().toISOString().split('T')[0];

  if (allBookings) {
    allBookings.forEach(b => {
      if (b.status === 'Inquiry') metrics.newInquiries++;
      if (b.status === 'Pending Confirmation') metrics.pendingConfirmations++;
      if (b.status === 'Confirmed') metrics.upcomingArrivals++;
      if (b.status === 'Checked In') metrics.currentGuests++;
      
      if (b.status === 'Checked In' && b.check_out && b.check_out.startsWith(todayStr)) {
        metrics.checkOutToday++;
      }
    });
  }

  const headerActions = (
    <Button variant="default" className="flex items-center gap-2 shadow-sm">
      <span className="material-symbols-outlined text-[20px]">add</span>
      New Inquiry
    </Button>
  );

  return (
    <AdminPageLayout>
      <AdminPageHeader 
        title="Booking Workflow" 
        description="Manage reservations and track the guest lifecycle."
        actions={headerActions}
      />

      <StatsGrid>
        <StatCard title="New Inquiries" value={metrics.newInquiries} icon="inbox" colorVariant="primary" />
        <StatCard title="Pending Conf." value={metrics.pendingConfirmations} icon="hourglass_empty" colorVariant="warning" />
        <StatCard title="Upcoming Arrivals" value={metrics.upcomingArrivals} icon="flight_land" colorVariant="secondary" />
        <StatCard title="Current Guests" value={metrics.currentGuests} icon="hotel" colorVariant="tertiary" />
        <StatCard title="Check-Out Today" value={metrics.checkOutToday} icon="flight_takeoff" colorVariant="error" />
      </StatsGrid>

      <BookingsTable
        bookings={(bookings as unknown as Booking[]) || []}
        count={count}
        page={page}
        search={search}
        statusRaw={statusRaw}
        paymentStatusRaw={paymentStatusRaw}
      />
    </AdminPageLayout>
  );
}
