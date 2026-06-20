'use client';

import Link from 'next/link';

export interface Booking {
  id: string;
  guest_name: string;
  rooms?: { name: string } | null;
  check_in: string;
  check_out: string;
  amount: number;
  payment_status: string;
  status: string;
}

interface BookingsTableProps {
  bookings: Booking[];
  count: number | null;
  page: number;
  search?: string;
  statusRaw?: string;
  paymentStatusRaw?: string;
}

export function BookingsTable({
  bookings,
  count,
  page,
  search,
  statusRaw,
  paymentStatusRaw,
}: BookingsTableProps) {
  const totalPages = count ? Math.ceil(count / 10) : 1;

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-surface-variant/30 overflow-hidden">
      <div className="p-4 border-b border-surface-variant/30 flex flex-wrap gap-4 items-center justify-between bg-surface-bright">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input
              className="w-full pl-9 pr-3 py-2 bg-surface-container rounded-md border-none focus:ring-2 focus:ring-secondary text-[14px] placeholder-on-surface-variant/70"
              placeholder="Search guest names..."
              type="text"
              defaultValue={search}
            />
          </div>
          <select 
            className="py-2 pl-3 pr-8 bg-surface-container rounded-md border-none focus:ring-2 focus:ring-secondary text-[14px] text-on-surface-variant cursor-pointer"
            defaultValue={statusRaw || ''}
          >
            <option value="">All Statuses</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Availability Review">Availability Review</option>
            <option value="Pending Confirmation">Pending Confirmation</option>
            <option value="Payment Pending">Payment Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Checked In">Checked In</option>
            <option value="Checked Out">Checked Out</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
          <select 
            className="py-2 pl-3 pr-8 bg-surface-container rounded-md border-none focus:ring-2 focus:ring-secondary text-[14px] text-on-surface-variant cursor-pointer"
            defaultValue={paymentStatusRaw || ''}
          >
            <option value="">Payment Status</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px] text-sm">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-bold text-[14px] border-b border-surface-variant/50">
              <th className="p-3 pl-6 font-medium">Guest</th>
              <th className="p-3 font-medium">Room</th>
              <th className="p-3 font-medium">Dates</th>
              <th className="p-3 font-medium">Amount & Payment</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 pr-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[16px] text-on-background divide-y divide-surface-variant/30">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="p-3 pl-6">
                    <p className="font-bold text-[14px] text-on-background">{booking.guest_name}</p>
                  </td>
                  <td className="p-3 text-on-surface-variant text-sm">{booking.rooms?.name || 'N/A'}</td>
                  <td className="p-3 text-on-surface-variant text-sm">
                    {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm">
                    <div className="font-bold text-on-background">${booking.amount}</div>
                    <span className={`text-xs font-bold ${
                      booking.payment_status === 'Paid' ? 'text-secondary' : 'text-error'
                    }`}>
                      {booking.payment_status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      booking.status === 'Checked In' || booking.status === 'Checked Out' ? 'bg-primary-container text-on-primary-container' : 
                      booking.status === 'Confirmed' ? 'bg-secondary-container text-on-secondary-container' :
                      booking.status === 'Inquiry' || booking.status === 'Availability Review' ? 'bg-tertiary-container text-on-tertiary-container' :
                      booking.status === 'Cancelled' || booking.status === 'No Show' ? 'bg-error-container text-error' :
                      'bg-surface-variant text-on-surface-variant'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3 pr-6 text-right">
                    <button className="text-on-surface-variant hover:text-secondary transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <span className="material-symbols-outlined text-sm">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center text-on-surface-variant">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {count !== null && count > 0 && (
        <div className="p-4 border-t border-surface-variant/30 flex items-center justify-between bg-surface-bright text-on-surface-variant font-bold text-[14px] text-sm">
          <div>
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, count)} of {count} bookings
          </div>
          <div className="flex gap-2 items-center">
            <Link href={`?page=${Math.max(1, page - 1)}`} className={`p-1 rounded-md hover:bg-surface-container transition-colors ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
              <span className="material-symbols-outlined">chevron_left</span>
            </Link>
            <div className="w-8 h-8 rounded-md bg-secondary-container text-on-secondary-container flex items-center justify-center">{page}</div>
            {page + 1 <= totalPages && (
              <Link href={`?page=${Math.min(totalPages, page + 1)}`} className={`p-1 rounded-md hover:bg-surface-container transition-colors ${page >= totalPages ? 'opacity-50 pointer-events-none' : ''}`}>
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
