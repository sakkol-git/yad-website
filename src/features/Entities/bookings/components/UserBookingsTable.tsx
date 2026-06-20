/* eslint-disable @typescript-eslint/no-explicit-any */
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

      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/30 overflow-hidden shadow-sm">
        {bookings && bookings.length > 0 ? (
          <div className="w-full">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-6 gap-4 bg-surface-container/50 text-on-surface-variant text-sm uppercase tracking-wider p-4 border-b border-outline-variant/30">
              <div className="font-bold">Room</div>
              <div className="font-bold">Check In</div>
              <div className="font-bold">Check Out</div>
              <div className="font-bold">Amount</div>
              <div className="font-bold">Status</div>
              <div className="font-bold">Action</div>
            </div>
            
            <div className="divide-y divide-outline-variant/20">
              {bookings.map((booking: any) => (
                <div key={booking.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4 p-4 hover:bg-surface-container/30 transition-colors items-center">
                  <div className="flex justify-between md:block items-center">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Room</span>
                    <span className="text-on-surface font-medium">{booking.rooms?.name || 'Any Room'}</span>
                  </div>
                  <div className="flex justify-between md:block items-center">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Check In</span>
                    <span className="text-on-surface-variant">{new Date(booking.check_in).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between md:block items-center">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Check Out</span>
                    <span className="text-on-surface-variant">{new Date(booking.check_out).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between md:block items-center">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Amount</span>
                    <span className="text-on-surface-variant">${booking.amount || 0}</span>
                  </div>
                  <div className="flex justify-between md:block items-center mt-2 md:mt-0">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Status</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                      ${booking.status === 'Confirmed' || booking.status === 'Checked In' ? 'bg-primary/10 text-primary' : 
                        booking.status === 'Payment Pending' ? 'bg-tertiary/10 text-tertiary' : 
                        booking.status === 'Checked Out' ? 'bg-outline/10 text-on-surface-variant' : 
                        booking.status === 'Inquiry' || booking.status === 'Pending Confirmation' ? 'bg-secondary/10 text-secondary' :
                        'bg-error/10 text-error'}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-4 md:mt-0 flex justify-end md:justify-start">
                    {booking.status === 'Payment Pending' && (
                      <Button 
                        variant="primary" 
                        className="w-full md:w-auto min-h-[44px]"
                        onClick={() => handlePayment(booking)}
                      >
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
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

