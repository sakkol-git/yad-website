import { logout } from '@/server/actions/auth.actions';
import Link from 'next/link';

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="font-semibold text-gray-800">Admin Dashboard</div>
      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">public</span>
          Back to Website
        </Link>
        <form action={logout}>
          <button type="submit" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
