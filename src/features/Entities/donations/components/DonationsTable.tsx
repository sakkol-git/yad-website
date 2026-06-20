'use client';

import Link from 'next/link';

interface DonationsTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  donations: any[];
  count: number | null;
  page: number;
  search?: string;
  statusRaw?: string;
  methodRaw?: string;
}

export function DonationsTable({
  donations,
  count,
  page,
  search,
  statusRaw,
  methodRaw
}: DonationsTableProps) {
  const totalPages = count ? Math.ceil(count / 10) : 1;

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-surface-variant/30 overflow-hidden">
      <div className="p-4 border-b border-surface-variant/30 flex flex-wrap gap-4 items-center justify-between bg-surface-bright">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input
              className="w-full pl-9 pr-3 py-2 bg-surface-container rounded-md border-none focus:ring-2 focus:ring-secondary text-[14px] placeholder-on-surface-variant/70"
              placeholder="Search donors..."
              type="text"
              defaultValue={search}
            />
          </div>
          <select 
            className="py-2 pl-3 pr-8 bg-surface-container rounded-md border-none focus:ring-2 focus:ring-secondary text-[14px] text-on-surface-variant cursor-pointer"
            defaultValue={methodRaw || ''}
          >
            <option value="">All Methods</option>
            <option value="stripe">Stripe</option>
            <option value="khqr">KHQR</option>
            <option value="cash">Cash</option>
            <option value="other">Other</option>
          </select>
          <select 
            className="py-2 pl-3 pr-8 bg-surface-container rounded-md border-none focus:ring-2 focus:ring-secondary text-[14px] text-on-surface-variant cursor-pointer"
            defaultValue={statusRaw || ''}
          >
            <option value="">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Pending Payment">Pending Payment</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px] text-sm">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-bold text-[14px] border-b border-surface-variant/50">
              <th className="p-3 pl-6 font-medium">Donor</th>
              <th className="p-3 font-medium">Amount</th>
              <th className="p-3 font-medium">Method</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 pr-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[16px] text-on-background divide-y divide-surface-variant/30">
            {donations && donations.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              donations.map((donation: any) => (
                <tr key={donation.id} className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="p-3 pl-6">
                    <p className="font-bold text-[14px] text-on-background">{donation.donor_name || 'Anonymous'}</p>
                    {donation.donor_id && <p className="text-xs text-secondary font-medium">Registered User</p>}
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-[16px] text-on-background">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: donation.currency }).format(donation.amount)}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface-variant text-sm">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        {donation.method === 'Stripe' ? 'credit_card' : donation.method === 'KHQR' ? 'qr_code_scanner' : 'payments'}
                      </span>
                      {donation.method}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      donation.status === 'Completed' ? 'bg-primary-container text-on-primary-container' : 
                      donation.status === 'Pending Payment' || donation.status === 'Draft' ? 'bg-tertiary-container text-on-tertiary-container' :
                      donation.status === 'Processing' ? 'bg-secondary-container text-on-secondary-container' :
                      'bg-error-container text-error'
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface-variant text-sm">
                    {new Date(donation.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-3 pr-6 text-right">
                    {donation.receipt_url && (
                       <a href={donation.receipt_url} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors p-1 mr-2 inline-block">
                         <span className="material-symbols-outlined text-sm">receipt_long</span>
                       </a>
                    )}
                    <button className="text-on-surface-variant hover:text-secondary transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <span className="material-symbols-outlined text-sm">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center text-on-surface-variant">
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {count !== null && count > 0 && (
        <div className="p-4 border-t border-surface-variant/30 flex items-center justify-between bg-surface-bright text-on-surface-variant font-bold text-[14px] text-sm">
          <div>
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, count)} of {count} donations
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
