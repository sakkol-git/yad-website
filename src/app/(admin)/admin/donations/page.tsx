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
    <div className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
            Donation Workflow
          </h1>
          <p className="text-on-surface-variant">
            Track and report all incoming donations through the state machine lifecycle.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="py-2.5 px-5 bg-surface-container-lowest border border-outline-variant/50 text-on-surface rounded-lg font-bold text-sm hover:bg-surface-container transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span> Export
          </button>
          <button className="py-2.5 px-5 bg-primary text-on-primary rounded-lg font-bold text-sm shadow-md hover:shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">add</span> Create Draft
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">calendar_month</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Total Flow (Month)</p>
            <h3 className="text-2xl font-bold text-on-surface">{formatCurrency(metrics.monthlyRevenue)}</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">pending_actions</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Pending</p>
            <h3 className="text-2xl font-bold text-on-surface">{metrics.pendingCount}</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">credit_card</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Stripe Revenue</p>
            <h3 className="text-2xl font-bold text-on-surface">{formatCurrency(metrics.stripeRevenue)}</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">KHQR Revenue</p>
            <h3 className="text-2xl font-bold text-on-surface">{formatCurrency(metrics.khqrRevenue)}</h3>
          </div>
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
