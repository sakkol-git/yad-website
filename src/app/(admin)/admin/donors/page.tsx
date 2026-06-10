import { getDonors } from '@/server/actions/donor.actions';
import { DonorsTable } from '@/features/Entities/donations/components/DonorsTable';

export const metadata = {
  title: 'Donors Management - YAD Admin',
};

export default async function DonorsPage() {
  const donors = await getDonors();

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
      <DonorsTable donors={donors} />
    </div>
  );
}
