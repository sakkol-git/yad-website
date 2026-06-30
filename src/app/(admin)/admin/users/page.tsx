import { getUsers } from "@/server/actions/user.actions";
import { UsersTable } from "@/features/Entities/users/components/UsersTable";
import { Suspense } from "react";
import { AdminPageLayout } from "@/shared/components/admin/layout/AdminPageLayout";
import { AdminPageHeader } from "@/shared/components/admin/layout/AdminPageHeader";
import { StatCard } from "@/shared/components/admin/data/StatCard";
import { StatsGrid } from "@/shared/components/admin/data/StatsGrid";
import { Button } from "@/shared/components/ui/Button";

export const metadata = {
  title: "User Management - YAD Admin",
};

export default async function UsersPage(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const result = await getUsers({ page, limit: 10, search });

  if (!result.success || !result.data) {
    return <div className="p-8 text-center text-error">Failed to load users: {result.error}</div>;
  }

  const { data: users, count, adminsCount } = result.data;

  const headerActions = (
    <Button variant="outline" className="flex items-center gap-2 shadow-sm">
      <span className="material-symbols-outlined text-xl">download</span> Export
    </Button>
  );

  return (
    <AdminPageLayout>
      <AdminPageHeader
        title="User Management"
        description="Manage system users, their roles, and access permissions."
        actions={headerActions}
      />

      <StatsGrid>
        <StatCard title="Total Users" value={count || 0} icon="group" colorVariant="primary" />
        <StatCard
          title="Admins"
          value={adminsCount || 0}
          icon="admin_panel_settings"
          colorVariant="secondary"
        />
        <StatCard
          title="Active Accounts"
          value={count || 0}
          icon="verified_user"
          colorVariant="tertiary"
        />
      </StatsGrid>

      <Suspense
        fallback={<div className="p-8 text-center text-on-surface-variant">Loading users...</div>}
      >
        <UsersTable users={users} count={count} page={page} />
      </Suspense>
    </AdminPageLayout>
  );
}
