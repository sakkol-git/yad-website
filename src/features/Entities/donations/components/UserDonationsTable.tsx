/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

interface UserDonationsTableProps {
  donations: any[];
  totalDonated: number;
}

export function UserDonationsTable({ donations, totalDonated }: UserDonationsTableProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-outline-variant/30 pb-4 gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">My Donations</h1>
          <p className="text-on-surface-variant text-sm mt-1">Track your contributions to YAD Cambodia.</p>
        </div>
        <div className="text-left sm:text-right bg-surface-container-low p-3 sm:p-0 rounded-lg sm:bg-transparent w-full sm:w-auto">
          <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Total Contributed</p>
          <p className="text-3xl font-bold text-tertiary">${totalDonated.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/30 overflow-hidden shadow-sm">
        {donations && donations.length > 0 ? (
          <div className="w-full">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 bg-surface-container/50 text-on-surface-variant text-sm uppercase tracking-wider p-4 border-b border-outline-variant/30">
              <div className="font-bold">Date</div>
              <div className="font-bold">Amount</div>
              <div className="font-bold">Method</div>
              <div className="font-bold">Status</div>
              <div className="font-bold">Receipt</div>
            </div>
            
            <div className="divide-y divide-outline-variant/20">
              {donations.map((donation: any) => (
                <div key={donation.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 p-4 hover:bg-surface-container/30 transition-colors items-center">
                  <div className="flex justify-between md:block items-center">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Date</span>
                    <span className="text-on-surface-variant">{new Date(donation.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between md:block items-center">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Amount</span>
                    <span className="text-on-surface font-medium">${donation.amount}</span>
                  </div>
                  <div className="flex justify-between md:block items-center">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Method</span>
                    <span className="text-on-surface-variant">{donation.method}</span>
                  </div>
                  <div className="flex justify-between md:block items-center mt-2 md:mt-0">
                    <span className="md:hidden font-bold text-on-surface-variant text-sm">Status</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                      ${donation.status === 'Completed' ? 'bg-tertiary/10 text-tertiary' : 
                        donation.status === 'Pending' ? 'bg-primary/10 text-primary' : 
                        'bg-error/10 text-error'}`}
                    >
                      {donation.status}
                    </span>
                  </div>
                  <div className="flex justify-end md:justify-start mt-2 md:mt-0">
                    {donation.receipt_url ? (
                      <a href={donation.receipt_url} target="_blank" rel="noreferrer" className="text-tertiary hover:underline text-sm font-medium flex items-center gap-1 min-h-[44px] md:min-h-0">
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        Download
                      </a>
                    ) : (
                      <span className="text-on-surface-variant text-sm italic">N/A</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">volunteer_activism</span>
            <p>You haven't made any donations yet.</p>
            <a href="/donate" className="inline-block mt-4 text-tertiary font-bold hover:underline">Support our cause →</a>
          </div>
        )}
      </div>
    </div>
  );
}
