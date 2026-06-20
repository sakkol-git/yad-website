import { getUsers } from '@/server/actions/user.actions';
import { UsersTable } from '@/features/Entities/users/components/UsersTable';

export const metadata = {
  title: 'User Management - YAD Admin',
};

export default async function UsersPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const { data: users, count, adminsCount } = await getUsers(page, 10, search);

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
            User Management
          </h1>
          <p className="text-on-surface-variant">
            Manage system users, their roles, and access permissions.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="py-2.5 px-5 bg-surface-container-lowest border border-outline-variant/50 text-on-surface rounded-lg font-bold text-sm hover:bg-surface-container transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span> Export
          </button>
          <button className="py-2.5 px-5 bg-primary text-on-primary rounded-lg font-bold text-sm shadow-md hover:shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">person_add</span> Add User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">group</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Total Users</p>
            <h3 className="text-2xl font-bold text-on-surface">{count || 0}</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">admin_panel_settings</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Admins</p>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <h3 className="text-2xl font-bold text-on-surface">{adminsCount || 0}</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Active Accounts</p>
            <h3 className="text-2xl font-bold text-on-surface">{count || 0}</h3>
          </div>
        </div>
      </div>

      <UsersTable users={users} count={count} page={page} />
    </div>
  );
}
