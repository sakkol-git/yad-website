import { Metadata } from "next";
import { Suspense } from "react";
import { getInquiriesAction } from "@/server/actions/inquiry.actions";
import { InquiriesTable } from "./InquiriesTable";
import { AdminPageLayout } from '@/shared/components/admin/layout/AdminPageLayout';
import { AdminPageHeader } from '@/shared/components/admin/layout/AdminPageHeader';
import { StatCard } from '@/shared/components/admin/data/StatCard';
import { StatsGrid } from '@/shared/components/admin/data/StatsGrid';

export const metadata: Metadata = {
  title: "Inquiries | YAD Admin",
};

export default async function AdminInquiriesPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  
  const result = await getInquiriesAction(page, 10);

  if (!result.success) {
    return (
      <AdminPageLayout>
        <div className="p-8 text-center text-error">
          Failed to load inquiries. {result.error}
        </div>
      </AdminPageLayout>
    );
  }

  const inquiries = result.data || [];
  const count = result.count || 0;

  return (
    <AdminPageLayout>
      <AdminPageHeader 
        title="Inquiries" 
        description="Review and respond to messages submitted via the QuickForm."
      />

      <StatsGrid>
        <StatCard title="Total Inquiries" value={count} icon="forum" colorVariant="primary" />
      </StatsGrid>

      <Suspense fallback={<div className="p-8 text-center text-on-surface-variant">Loading inquiries...</div>}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <InquiriesTable initialData={inquiries as any} count={count} page={page} />
      </Suspense>
    </AdminPageLayout>
  );
}
