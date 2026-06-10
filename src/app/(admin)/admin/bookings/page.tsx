/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/shared/lib/supabase/server';
import { BookingsRepository } from '@/server/repositories/bookings';
import { BookingsTable } from '@/features/Entities/bookings/components/BookingsTable';

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

  return (
    <div className="flex-1 p-4 md:p-12 max-w-[1280px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[36px] md:text-[48px] font-bold leading-tight tracking-tight text-on-background mb-2">
            Booking Workflow
          </h1>
          <p className="text-[16px] text-on-surface-variant">
            Manage reservations and track the guest lifecycle.
          </p>
        </div>
        <button className="py-3 px-6 bg-secondary text-on-secondary rounded-full font-bold text-[14px] shadow-sm hover:scale-[1.02] hover:bg-secondary/90 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap">
          <span className="material-symbols-outlined">add</span>
          New Inquiry
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">New Inquiries</p>
          <h3 className="text-2xl font-bold text-on-background">{metrics.newInquiries}</h3>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Pending Conf.</p>
          <h3 className="text-2xl font-bold text-tertiary">{metrics.pendingConfirmations}</h3>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Upcoming Arrivals</p>
          <h3 className="text-2xl font-bold text-primary">{metrics.upcomingArrivals}</h3>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Current Guests</p>
          <h3 className="text-2xl font-bold text-secondary">{metrics.currentGuests}</h3>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Check-Out Today</p>
          <h3 className="text-2xl font-bold text-error">{metrics.checkOutToday}</h3>
        </div>
      </div>

      <BookingsTable
        bookings={bookings || []}
        count={count}
        page={page}
        search={search}
        statusRaw={statusRaw}
        paymentStatusRaw={paymentStatusRaw}
      />
    </div>
  );
}
