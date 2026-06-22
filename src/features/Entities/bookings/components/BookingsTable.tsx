'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';
import { FilterBar } from '@/shared/components/admin/data/FilterBar';

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
  statusRaw,
  paymentStatusRaw,
}: BookingsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) params.set('search', searchTerm);
        else params.delete('search');
        params.delete('page');
        router.push(`?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, searchParams, router]);

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set('status', e.target.value);
    else params.delete('status');
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const handlePaymentFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set('paymentStatus', e.target.value);
    else params.delete('paymentStatus');
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const columns: ColumnDef<Booking>[] = [
    {
      id: "guest",
      header: "Guest",
      cell: (row) => <p className="font-bold text-[14px] text-on-surface">{row.guest_name}</p>,
    },
    {
      id: "room",
      header: "Room",
      cell: (row) => <span className="text-on-surface-variant text-sm">{row.rooms?.name || 'N/A'}</span>,
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
      id: "amount_payment",
      header: "Amount & Payment",
      cell: (row) => (
        <div>
          <div className="font-bold text-on-surface">${row.amount}</div>
          <span className={`text-xs font-bold ${
            row.payment_status === 'Paid' ? 'text-secondary' : 'text-error'
          }`}>
            {row.payment_status}
          </span>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        let colorClass = 'bg-surface-variant text-on-surface-variant';
        if (row.status === 'Checked In' || row.status === 'Checked Out') colorClass = 'bg-primary-container text-on-primary-container';
        else if (row.status === 'Confirmed') colorClass = 'bg-secondary-container text-on-secondary-container';
        else if (row.status === 'Inquiry' || row.status === 'Availability Review') colorClass = 'bg-tertiary-container text-on-tertiary-container';
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
      header: <div className="text-right">Actions</div>,
      enableHiding: false,
      cell: (row) => (
        <div className="flex justify-end items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors flex items-center justify-center rounded-full hover:bg-secondary/10" title="More options">
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      ),
    },
  ];

  const additionalFilters = (
    <div className="flex gap-3">
      <select 
        className="py-2.5 pl-3 pr-8 bg-surface-container rounded-md border border-outline-variant/30 focus:ring-2 focus:ring-primary text-[14px] text-on-surface-variant cursor-pointer appearance-none shadow-sm"
        value={statusRaw || ''}
        onChange={handleStatusFilterChange}
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
        className="py-2.5 pl-3 pr-8 bg-surface-container rounded-md border border-outline-variant/30 focus:ring-2 focus:ring-primary text-[14px] text-on-surface-variant cursor-pointer appearance-none shadow-sm"
        value={paymentStatusRaw || ''}
        onChange={handlePaymentFilterChange}
      >
        <option value="">Payment Status</option>
        <option value="pending">Pending</option>
        <option value="partial">Partial</option>
        <option value="paid">Paid</option>
        <option value="refunded">Refunded</option>
      </select>
    </div>
  );

  return (
    <div className="space-y-4">
      <FilterBar 
        searchValue={searchTerm} 
        onSearchChange={setSearchTerm} 
        searchPlaceholder="Search guest names..."
      >
        {additionalFilters}
      </FilterBar>

      <DataTable 
        columns={columns} 
        data={bookings} 
        keyExtractor={(row) => row.id} 
        count={count}
        page={page}
        emptyMessage="No bookings found."
      />
    </div>
  );
}
