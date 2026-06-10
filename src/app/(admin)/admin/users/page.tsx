import { getUsers } from '@/server/actions/user.actions';
import { UsersTable } from '@/features/Entities/users/components/UsersTable';

export const metadata = {
  title: 'User Management - YAD Admin',
};

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
      <UsersTable users={users} />
    </div>
  );
}
