import { Metadata } from "next";
import { Suspense } from "react";
import { getProgramsAction } from "@/server/actions/program.actions";
import { ProgramsTable } from "./ProgramsTable";
import { AdminPageLayout } from '@/shared/components/admin/layout/AdminPageLayout';
import { AdminPageHeader } from '@/shared/components/admin/layout/AdminPageHeader';
import { StatCard } from '@/shared/components/admin/data/StatCard';
import { StatsGrid } from '@/shared/components/admin/data/StatsGrid';

export const metadata: Metadata = {
  title: "Programs | YAD Admin",
};

export default async function AdminProgramsPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const result = await getProgramsAction({ page, limit: 10, search });

  if (!result.success || !result.data) {
    return (
      <AdminPageLayout>
        <div className="p-8 text-center text-error">
          Failed to load programs. {result.error}
        </div>
      </AdminPageLayout>
    );
  }

  const programs = result.data.data || [];
  const count = result.data.count || 0;

  return (
    <AdminPageLayout>
      <AdminPageHeader 
        title="Programs" 
        description="Manage your organization's programs, initiatives, and impact metrics."
      />

      <StatsGrid>
        <StatCard title="Total Programs" value={count} icon="account_tree" colorVariant="primary" />
      </StatsGrid>

      <Suspense fallback={<div className="p-8 text-center text-on-surface-variant">Loading programs...</div>}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ProgramsTable initialData={programs as any} count={count} page={page} />
      </Suspense>
    </AdminPageLayout>
  );
}
