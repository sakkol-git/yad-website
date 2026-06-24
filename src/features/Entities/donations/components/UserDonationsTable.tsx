'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';
import { FilterBar } from '@/shared/components/admin/data/FilterBar';
import { PortalPageLayout } from '@/shared/components/portal/layout/PortalPageLayout';
import { PortalPageHeader } from '@/shared/components/portal/layout/PortalPageHeader';
import { Button } from '@/shared/components/ui/Button';

export interface UserDonation {
  id: string;
  amount: number;
  method: string;
  status: string;
  created_at: string;
  receipt_url?: string | null;
}

interface UserDonationsTableProps {
  donations: UserDonation[];
  totalDonated: number;
}

export function UserDonationsTable({ donations, totalDonated }: UserDonationsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Client-side filtering as the server action returns all user donations
  const filteredDonations = donations.filter(d => 
    d.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.method.toLowerCase().includes(searchTerm.toLowerCase())
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

  const headerActions = (
    <div className="bg-surface-container-low px-6 py-4 rounded-md-md border border-outline-variant/30 flex items-center justify-between gap-6 shadow-sm">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Total Contributed</span>
        <span className="font-headline-md text-headline-md text-tertiary">${totalDonated.toFixed(2)}</span>
      </div>
      <Button variant="default" onClick={() => router.push('/donate')} className="bg-tertiary text-on-tertiary hover:bg-tertiary/90 shadow-sm border-none rounded-md-md">
        Donate Again
      </Button>
    </div>
  );

  const columns: ColumnDef<UserDonation>[] = [
    {
      id: "date",
      header: "Date",
      cell: (row) => <span className="text-on-surface-variant text-sm font-medium">{new Date(row.created_at).toLocaleDateString()}</span>,
    },
    {
      id: "amount",
      header: "Amount",
      cell: (row) => <span className="font-body-lg text-body-lg font-bold text-on-surface">${row.amount}</span>,
    },
    {
      id: "method",
      header: "Method",
      cell: (row) => (
        <span className="inline-flex items-center gap-1 text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-[16px]">
            {row.method === 'Stripe' ? 'credit_card' : row.method === 'KHQR' ? 'qr_code_scanner' : 'payments'}
          </span>
          {row.method}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        let colorClass = 'bg-surface-variant text-on-surface-variant';
        if (row.status === 'Completed') colorClass = 'bg-tertiary-container text-on-tertiary-container';
        else if (row.status === 'Pending') colorClass = 'bg-primary-container text-on-primary-container';
        else if (row.status === 'Failed' || row.status === 'Refunded') colorClass = 'bg-error-container text-error';

        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md-full text-xs font-bold ${colorClass}`}>
            {row.status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: <div className="text-right">Receipt</div>,
      enableHiding: false,
      cell: (row) => (
        <div className="flex justify-end items-center">
          {row.receipt_url ? (
            <a href={row.receipt_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-tertiary hover:text-tertiary/80 transition-colors p-2 rounded-md-md hover:bg-tertiary/10">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download
            </a>
          ) : (
            <span className="text-on-surface-variant text-sm italic pr-4">N/A</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <PortalPageLayout>
      <PortalPageHeader 
        title="My Donations" 
        description="Track your past contributions and download tax receipts."
        actions={headerActions}
      />

      <FilterBar 
        searchValue={searchTerm} 
        onSearchChange={setSearchTerm} 
        searchPlaceholder="Search by status or method..."
      />

      <DataTable 
        columns={columns} 
        data={filteredDonations} 
        keyExtractor={(row) => row.id} 
        emptyMessage="You haven't made any donations yet."
      />
    </PortalPageLayout>
  );
}
