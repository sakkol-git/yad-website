import { getPartners } from "@/server/actions/partner.actions";
import { PartnersTable } from "@/features/Entities/partners/components/PartnersTable";

export const metadata = {
  title: "Partners Management - YAD Admin",
};

export default async function PartnersPage(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const { data: partners, count } = await getPartners(page, 10, search);

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
      <PartnersTable partners={partners} count={count} page={page} />
    </div>
  );
}
