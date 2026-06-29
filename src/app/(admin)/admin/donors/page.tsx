import { getDonors } from '@/server/actions/donor.actions';
import { DonorsTable } from '@/features/Entities/donations/components/DonorsTable';

export const metadata = {
  title: 'Donors Management - YAD Admin',
};

export default async function DonorsPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const result = await getDonors({ page, limit: 10, search });
  const donors = result.success && result.data ? result.data.data : [];
  const count = result.success && result.data ? result.data.count : 0;

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
      <DonorsTable donors={donors} count={count} page={page} />
    </div>
  );
}
