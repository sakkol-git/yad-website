'use client';

import { logout } from '@/server/actions/auth.actions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminHeader() {
  const pathname = usePathname();
  
  // Extract the page name from the pathname (e.g., /admin/donations -> Donations)
  const pathParts = pathname?.split('/').filter(Boolean) || [];
  const currentPage = pathParts.length > 1 
    ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1)
    : 'Dashboard';

  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between px-6 shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-outline-variant">Admin</span>
        <span className="material-symbols-outlined text-outline-variant text-[18px]">chevron_right</span>
        <span className="font-bold text-on-surface text-[18px]">{currentPage}</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm font-bold text-primary hover:bg-primary-container hover:text-on-primary-container px-3 py-2 rounded-md transition-colors flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">public</span>
          View Website
        </Link>
        <div className="h-6 w-[1px] bg-outline-variant/30"></div>
        <form action={logout}>
          <button type="submit" className="text-sm font-bold text-error hover:bg-error-container hover:text-on-error-container px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
