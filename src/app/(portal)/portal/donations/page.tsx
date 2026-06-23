import { getUserDonations } from '@/server/actions/portal.actions';
import { UserDonationsTable, UserDonation } from '@/features/Entities/donations/components/UserDonationsTable';
import { Suspense } from 'react';

export default async function PortalDonationsPage() {
  const { donations } = await getUserDonations();

  let totalDonated = 0;
  if (donations) {
    totalDonated = (donations as UserDonation[]).reduce((sum: number, donation: UserDonation) => 
      donation.status === 'Completed' ? sum + Number(donation.amount) : sum, 0
    );
  }

  return (
    <Suspense fallback={<div className="p-8 text-center text-on-surface-variant">Loading donations...</div>}>
      <UserDonationsTable
        donations={(donations as unknown as UserDonation[]) || []}
        totalDonated={totalDonated}
      />
    </Suspense>
  );
}
