import { AdminDashboard } from '@/features/Static/dashboard/components/AdminDashboard';
import { getDashboardMetrics } from '@/server/actions/dashboard.actions';
import { AdminPageLayout } from '@/shared/components/admin/layout/AdminPageLayout';

export default async function AdminDashboardOverview() {
  const result = await getDashboardMetrics({});
  
  if (!result.success || !result.data) {
    return (
      <AdminPageLayout>
        <div className="p-8 text-center text-error">Failed to load dashboard metrics.</div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout>
      <AdminDashboard initialData={result.data} />
    </AdminPageLayout>
  );
}
