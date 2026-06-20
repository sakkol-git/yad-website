import { AdminDashboard } from '@/features/Static/dashboard/components/AdminDashboard';
import { getDashboardMetrics } from '@/server/actions/dashboard.actions';

export default async function AdminDashboardOverview() {
  const { data } = await getDashboardMetrics();

  return (
    <main className="flex-1 p-8 xl:px-12 max-w-[1600px] w-full mx-auto">
      <AdminDashboard initialData={data} />
    </main>
  );
}
