import { getPartners } from '@/server/actions/partner.actions';
import { PartnersTable } from '@/features/Entities/partners/components/PartnersTable';

export const metadata = {
  title: 'Partners Management - YAD Admin',
};

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
      <PartnersTable partners={partners} />
    </div>
  );
}
