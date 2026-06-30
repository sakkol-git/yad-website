import { getMembers } from "@/server/actions/member.actions";
import { MembersTable } from "@/features/Entities/members/components/MembersTable";

export const metadata = {
  title: "Members Management - YAD Admin",
};

export default async function MembersPage(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const result = await getMembers({ page, limit: 10, search });
  const members = result.success && result.data ? result.data.data : [];
  const count = result.success && result.data ? result.data.count : 0;

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
      <MembersTable members={members} count={count} page={page} />
    </div>
  );
}
