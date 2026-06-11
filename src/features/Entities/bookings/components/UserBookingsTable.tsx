'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';

interface UserBookingsTableProps {
  bookings: any[];
}

export function UserBookingsTable({ bookings }: UserBookingsTableProps) {
  const router = useRouter();

  const handlePayment = (booking: any) => {
    router.push(`/payment?id=${booking.id}&type=booking`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">My Bookings</h1>
          <p className="text-on-surface-variant text-sm mt-1">Manage your homestay reservations.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
        {bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container/50 text-on-surface-variant text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-outline-variant/30">Room</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Check In</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Check Out</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Amount</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Status</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="p-4 text-on-surface font-medium">{booking.rooms?.name || 'Any Room'}</td>
                    <td className="p-4 text-on-surface-variant">{new Date(booking.check_in).toLocaleDateString()}</td>
                    <td className="p-4 text-on-surface-variant">{new Date(booking.check_out).toLocaleDateString()}</td>
                    <td className="p-4 text-on-surface-variant">${booking.amount || 0}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                        ${booking.status === 'Confirmed' || booking.status === 'Checked In' ? 'bg-primary/10 text-primary' : 
                          booking.status === 'Payment Pending' ? 'bg-tertiary/10 text-tertiary' : 
                          booking.status === 'Checked Out' ? 'bg-outline/10 text-on-surface-variant' : 
                          booking.status === 'Inquiry' || booking.status === 'Pending Confirmation' ? 'bg-secondary/10 text-secondary' :
                          'bg-error/10 text-error'}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {booking.status === 'Payment Pending' && (
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handlePayment(booking)}
                        >
                          Pay Now
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">bed</span>
            <p>You have no booking history.</p>
          </div>
        )}
      </div>
    </div>
  );
}

