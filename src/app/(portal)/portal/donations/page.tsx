import { createClient } from '@/shared/lib/supabase/server';
import { UserDonationsTable } from '@/features/Entities/donations/components/UserDonationsTable';

export default async function PortalDonationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('donor_id', user.id)
    .order('created_at', { ascending: false });

  let totalDonated = 0;
  if (donations) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    totalDonated = donations.reduce((sum: number, donation: any) => 
      donation.status === 'Completed' ? sum + Number(donation.amount) : sum, 0
    );
  }

  return (
    <UserDonationsTable
      donations={donations || []}
      totalDonated={totalDonated}
    />
  );
}
