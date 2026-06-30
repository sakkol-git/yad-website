import { createClient } from "@/shared/lib/supabase/server";
import { Suspense } from "react";
import { donationsService } from "@/server/services/donations.service";
import { DonationsTable, Donation } from "@/features/Entities/donations/components/DonationsTable";
import { AdminPageLayout } from "@/shared/components/admin/layout/AdminPageLayout";
import { AdminPageHeader } from "@/shared/components/admin/layout/AdminPageHeader";
import { StatCard } from "@/shared/components/admin/data/StatCard";
import { StatsGrid } from "@/shared/components/admin/data/StatsGrid";
import { Button } from "@/shared/components/ui/Button";

export default async function DonationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();

  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const search = typeof params.search === "string" ? params.search : undefined;

  const statusRaw = typeof params.status === "string" ? params.status : undefined;
  const status = statusRaw ? statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1) : undefined;

  const methodRaw = typeof params.method === "string" ? params.method : undefined;
  const method = methodRaw ? methodRaw.charAt(0).toUpperCase() + methodRaw.slice(1) : undefined;

  const { data: donations, count } = await donationsService.getDonations(supabase, {
    page,
    limit: 10,
    search,
    status,
    method,
  });

  // Fetch metrics
  const { data: allDonations } = await supabase
    .from("donations")
    .select("amount, status, method, created_at");

  const metrics = {
    total: 0,
    pendingCount: 0,
    completedCount: 0,
    failedCount: 0,
    stripeRevenue: 0,
    khqrRevenue: 0,
    monthlyRevenue: 0,
  };

  const currentMonth = new Date().getMonth();

  if (allDonations) {
    metrics.total = allDonations.length;
    allDonations.forEach((d) => {
      if (d.status === "Pending Payment" || d.status === "Processing") metrics.pendingCount++;
      if (d.status === "Completed") metrics.completedCount++;
      if (d.status === "Failed") metrics.failedCount++;

      if (d.status === "Completed") {
        if (d.method === "card") metrics.stripeRevenue += Number(d.amount);
        if (d.method === "khqr") metrics.khqrRevenue += Number(d.amount);

        const dMonth = new Date(d.created_at).getMonth();
        if (dMonth === currentMonth) {
          metrics.monthlyRevenue += Number(d.amount);
        }
      }
    });
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const headerActions = (
    <>
      <Button variant="outline" className="flex items-center gap-2 shadow-sm">
        <span className="material-symbols-outlined text-xl">download</span> Export
      </Button>
      <Button variant="default" className="flex items-center gap-2 shadow-sm">
        <span className="material-symbols-outlined text-xl">add</span> Create Draft
      </Button>
    </>
  );

  return (
    <AdminPageLayout>
      <AdminPageHeader
        title="Donation Workflow"
        description="Track and report all incoming donations through the state machine lifecycle."
        actions={headerActions}
      />

      <StatsGrid>
        <StatCard
          title="Total Flow (Month)"
          value={formatCurrency(metrics.monthlyRevenue)}
          icon="calendar_month"
          colorVariant="primary"
        />
        <StatCard
          title="Pending"
          value={metrics.pendingCount}
          icon="pending_actions"
          colorVariant="warning"
        />
        <StatCard
          title="Stripe Revenue"
          value={formatCurrency(metrics.stripeRevenue)}
          icon="credit_card"
          colorVariant="secondary"
        />
        <StatCard
          title="KHQR Revenue"
          value={formatCurrency(metrics.khqrRevenue)}
          icon="qr_code_scanner"
          colorVariant="tertiary"
        />
      </StatsGrid>

      <Suspense
        fallback={
          <div className="p-8 text-center text-on-surface-variant">Loading donations...</div>
        }
      >
        <DonationsTable
          donations={(donations as unknown as Donation[]) || []}
          count={count}
          page={page}
          search={search}
          statusRaw={statusRaw}
          methodRaw={methodRaw}
        />
      </Suspense>
    </AdminPageLayout>
  );
}
