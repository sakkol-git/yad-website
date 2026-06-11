'use client';

interface UserDonationsTableProps {
  donations: any[];
  totalDonated: number;
}

export function UserDonationsTable({ donations, totalDonated }: UserDonationsTableProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">My Donations</h1>
          <p className="text-on-surface-variant text-sm mt-1">Track your contributions to YAD Cambodia.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Total Contributed</p>
          <p className="text-3xl font-bold text-tertiary">${totalDonated.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/30 overflow-hidden shadow-sm">
        {donations && donations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container/50 text-on-surface-variant text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-outline-variant/30">Date</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Amount</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Method</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Status</th>
                  <th className="p-4 font-bold border-b border-outline-variant/30">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {donations.map((donation: any) => (
                  <tr key={donation.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="p-4 text-on-surface-variant">{new Date(donation.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-on-surface font-medium">${donation.amount}</td>
                    <td className="p-4 text-on-surface-variant">{donation.method}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold
                        ${donation.status === 'Completed' ? 'bg-tertiary/10 text-tertiary' : 
                          donation.status === 'Pending' ? 'bg-primary/10 text-primary' : 
                          'bg-error/10 text-error'}`}
                      >
                        {donation.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {donation.receipt_url ? (
                        <a href={donation.receipt_url} target="_blank" rel="noreferrer" className="text-tertiary hover:underline text-sm font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">download</span>
                          Download
                        </a>
                      ) : (
                        <span className="text-on-surface-variant text-sm italic">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
