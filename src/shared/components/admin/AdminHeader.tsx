"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";

export function AdminHeader({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract the page name from the pathname (e.g., /admin/donations -> Donations)
  const pathParts = pathname?.split("/").filter(Boolean) || [];
  const currentPage =
    pathParts.length > 1
      ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1)
      : "Dashboard";

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between px-4 lg:px-6 shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        {onOpenSidebar && (
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 -ml-2 mr-1 text-on-surface hover:bg-surface-container rounded-md flex items-center justify-center transition-colors"
            aria-label="Open sidebar menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        )}
        <span className="text-outline-variant hidden sm:inline-block">Admin</span>
        <span className="material-symbols-outlined text-outline-variant text-lg hidden sm:inline-block">
          chevron_right
        </span>
        <span className="font-bold text-on-surface text-lg">{currentPage}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/"
          className="text-sm font-bold text-primary hover:bg-primary-container hover:text-on-primary-container px-2 sm:px-3 py-2 rounded-md transition-colors flex items-center gap-1.5"
          aria-label="View Website"
        >
          <span className="material-symbols-outlined text-lg">public</span>
          <span className="hidden sm:inline">View Website</span>
        </Link>
        <div className="h-6 w-[1px] bg-outline-variant/30 hidden sm:block"></div>
        <button
          onClick={handleLogout}
          className="text-sm font-bold text-error hover:bg-error-container hover:text-on-error-container px-2 sm:px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          aria-label="Sign out"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
