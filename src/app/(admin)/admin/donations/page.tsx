/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/shared/lib/supabase/server';
import { donationsService } from '@/server/services/donations.service';
import { DonationsTable } from '@/features/Entities/donations/components/DonationsTable';

export default async function DonationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();

  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const search = typeof params.search === 'string' ? params.search : undefined;

  const statusRaw = typeof params.status === 'string' ? params.status : undefined;
  const status = statusRaw ? statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1) : undefined;

  const methodRaw = typeof params.method === 'string' ? params.method : undefined;
  const method = methodRaw ? methodRaw.charAt(0).toUpperCase() + methodRaw.slice(1) : undefined;

  const { data: donations, count } = await donationsService.getDonations(supabase, {
    page,
    limit: 10,
    search,
    status,
    method
  });

  // Fetch metrics
  const { data: allDonations } = await supabase.from('donations').select('amount, status, method, created_at');
  
  const metrics = {
    total: 0,
    pendingCount: 0,
    completedCount: 0,
    failedCount: 0,
    stripeRevenue: 0,
    khqrRevenue: 0,
    monthlyRevenue: 0
  };

  const currentMonth = new Date().getMonth();

  if (allDonations) {
    metrics.total = allDonations.length;
    allDonations.forEach(d => {
      if (d.status === 'Pending Payment' || d.status === 'Processing') metrics.pendingCount++;
      if (d.status === 'Completed') metrics.completedCount++;
      if (d.status === 'Failed') metrics.failedCount++;

      if (d.status === 'Completed') {
        if (d.method === 'card') metrics.stripeRevenue += Number(d.amount);
        if (d.method === 'khqr') metrics.khqrRevenue += Number(d.amount);
        
        const dMonth = new Date(d.created_at).getMonth();
        if (dMonth === currentMonth) {
          metrics.monthlyRevenue += Number(d.amount);
        }
      }
    });
  }

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="flex-1 p-4 md:p-12 max-w-[1280px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[36px] md:text-[48px] font-bold leading-tight tracking-tight text-on-background mb-2">
            Donation Workflow
          </h1>
          <p className="text-[16px] text-on-surface-variant">
            Track and report all incoming donations through the state machine lifecycle.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="py-3 px-6 bg-surface-container border border-outline-variant/30 text-on-surface rounded-full font-bold text-[14px] hover:bg-surface-container-high transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">download</span> Export
          </button>
          <button className="py-3 px-6 bg-secondary text-on-secondary rounded-full font-bold text-[14px] shadow-sm hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined">add</span> Create Draft
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Total Flow (Month)</p>
          <h3 className="text-2xl font-bold text-on-background">{formatCurrency(metrics.monthlyRevenue)}</h3>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Pending Payments</p>
          <h3 className="text-2xl font-bold text-tertiary">{metrics.pendingCount}</h3>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Stripe Revenue</p>
          <h3 className="text-2xl font-bold text-primary">{formatCurrency(metrics.stripeRevenue)}</h3>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant/30 shadow-sm">
          <p className="text-on-surface-variant text-sm font-medium mb-1">KHQR Revenue</p>
          <h3 className="text-2xl font-bold text-secondary">{formatCurrency(metrics.khqrRevenue)}</h3>
        </div>
      </div>

      <DonationsTable
        donations={donations || []}
        count={count}
        page={page}
        search={search}
        statusRaw={statusRaw}
        methodRaw={methodRaw}
      />
    </div>
  );
}
