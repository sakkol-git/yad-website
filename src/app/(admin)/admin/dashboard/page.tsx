import { AdminDashboard } from '@/features/Static/dashboard/components/AdminDashboard';
import { getDashboardMetrics } from '@/server/actions/dashboard.actions';
import { AdminPageLayout } from '@/shared/components/admin/layout/AdminPageLayout';

export default async function AdminDashboardOverview() {
  const { data } = await getDashboardMetrics();

  return (
    <AdminPageLayout>
      <AdminDashboard initialData={data} />
    </AdminPageLayout>
  );
}
