import { Metadata } from "next";
import { getVolunteerRequestsAction } from "@/server/actions/volunteer.actions";
import { VolunteersTable } from "./VolunteersTable";
import { AdminPageLayout } from '@/shared/components/admin/layout/AdminPageLayout';
import { AdminPageHeader } from '@/shared/components/admin/layout/AdminPageHeader';
import { StatCard } from '@/shared/components/admin/data/StatCard';
import { StatsGrid } from '@/shared/components/admin/data/StatsGrid';

export const metadata: Metadata = {
  title: "Volunteer Management | YAD Admin",
};

export default async function AdminVolunteersPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  
  const result = await getVolunteerRequestsAction(page, 10);

  if (!result || result.error) {
    return (
      <AdminPageLayout>
        <div className="p-8 text-center text-error">
          Failed to load volunteers. {result?.error}
        </div>
      </AdminPageLayout>
    );
  }

  const volunteers = result.data || [];
  const count = result.count || 0;

  return (
    <AdminPageLayout>
      <AdminPageHeader 
        title="Volunteer Requests" 
        description="Review and approve event volunteer applications."
      />

      <StatsGrid>
        <StatCard title="Total Requests" value={count} icon="volunteer_activism" colorVariant="primary" />
      </StatsGrid>

      <VolunteersTable initialData={volunteers} count={count} page={page} />
    </AdminPageLayout>
  );
}
