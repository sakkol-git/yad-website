'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';
import { FilterBar } from '@/shared/components/admin/data/FilterBar';
import { PortalPageLayout } from '@/shared/components/portal/layout/PortalPageLayout';
import { PortalPageHeader } from '@/shared/components/portal/layout/PortalPageHeader';

export interface UserBooking {
  id: string;
  rooms?: { name: string } | null;
  check_in: string;
  check_out: string;
  amount: number;
  status: string;
}

interface UserBookingsTableProps {
  bookings: UserBooking[];
}

export function UserBookingsTable({ bookings }: UserBookingsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Client-side filtering as the server action returns all user bookings
  const filteredBookings = bookings.filter(b => 
    b.rooms?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) params.set('search', searchTerm);
        else params.delete('search');
        router.push(`?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, searchParams, router]);

  const handlePayment = (booking: UserBooking) => {
    router.push(`/payment?id=${booking.id}&type=booking`);
  };

  const columns: ColumnDef<UserBooking>[] = [
    {
      id: "room",
      header: "Room",
      cell: (row) => <span className="font-headline-sm text-headline-sm text-on-surface">{row.rooms?.name || 'Any Room'}</span>,
    },
    {
      id: "dates",
      header: "Dates",
      cell: (row) => (
        <span className="text-on-surface-variant text-sm">
          {new Date(row.check_in).toLocaleDateString()} - {new Date(row.check_out).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "amount",
      header: "Amount",
      cell: (row) => <span className="text-on-surface-variant font-bold">${row.amount || 0}</span>,
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        let colorClass = 'bg-surface-variant text-on-surface-variant';
        if (row.status === 'Confirmed' || row.status === 'Checked In') colorClass = 'bg-primary-container text-on-primary-container';
        else if (row.status === 'Payment Pending') colorClass = 'bg-tertiary-container text-on-tertiary-container';
        else if (row.status === 'Inquiry' || row.status === 'Pending Confirmation') colorClass = 'bg-secondary-container text-on-secondary-container';
        else if (row.status === 'Cancelled' || row.status === 'No Show') colorClass = 'bg-error-container text-error';

        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClass}`}>
            {row.status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: <div className="text-right">Action</div>,
      enableHiding: false,
      cell: (row) => (
        <div className="flex justify-end items-center gap-2">
          {row.status === 'Payment Pending' ? (
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handlePayment(row)}
            >
              Pay Now
            </Button>
          ) : (
             <Button variant="outline" size="sm">
               View Details
             </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PortalPageLayout>
      <PortalPageHeader 
        title="My Bookings" 
        description="Manage your homestay reservations and track your upcoming trips."
      />

      <FilterBar 
        searchValue={searchTerm} 
        onSearchChange={setSearchTerm} 
        searchPlaceholder="Search rooms or statuses..."
      />

      <DataTable 
        columns={columns} 
        data={filteredBookings} 
        keyExtractor={(row) => row.id} 
        emptyMessage="You have no booking history matching this search."
      />
    </PortalPageLayout>
  );
}
