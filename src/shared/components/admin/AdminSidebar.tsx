"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";
import { logout } from "@/server/actions/auth.actions";

// Grouped items to improve scannability and structure
const navGroups = [
  {
    label: "Core",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
      { name: "Events", href: "/admin/events", icon: "event" },
      { name: "Programs", href: "/admin/programs", icon: "school" },
      { name: "Applications", href: "/admin/applications", icon: "assignment" },
      { name: "Reports", href: "/admin/reports", icon: "description" },
    ],
  },
  {
    label: "People & Relations",
    items: [
      { name: "Donors", href: "/admin/donors", icon: "groups" },
      { name: "Members", href: "/admin/members", icon: "card_membership" },
      { name: "Partners", href: "/admin/partners", icon: "handshake" },
      { name: "Volunteers", href: "/admin/volunteers", icon: "assignment_ind" },
      { name: "Inquiries", href: "/admin/inquiries", icon: "inbox" },
      { name: "Users", href: "/admin/users", icon: "manage_accounts" },
    ],
  },
  {
    label: "Operations",
    items: [
      { name: "Donations", href: "/admin/donations", icon: "volunteer_activism" },
      { name: "Bookings", href: "/admin/bookings", icon: "book_online" },
      { name: "Homestays", href: "/admin/homestays", icon: "home" },
    ],
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile Overlay Scrim */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 z-20 transition-opacity lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col shadow-sm z-30 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header / Brand */}
        <div className="px-6 h-16 flex items-center justify-between border-b border-outline-variant/30 shrink-0">
          <Link
            href="/admin/dashboard"
            className="font-bold text-xl text-primary flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 -mx-1"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[28px] icon-fill text-primary">
              spa
            </span>
            YAD Admin
          </Link>

          {/* Mobile Close Button */}
          <button
            className="lg:hidden text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high p-2 rounded-full transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-[11px] font-bold text-outline uppercase tracking-wider mb-2 px-3">
                {group.label}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-200 ease-in-out font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          isActive
                            ? "bg-secondary-container text-on-secondary-container shadow-sm"
                            : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[22px] transition-transform duration-200 ${
                            isActive ? "icon-fill scale-110" : "group-hover:scale-110"
                          }`}
                        >
                          {item.icon}
                        </span>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Actionable User Footer */}
        <div className="p-4 border-t border-outline-variant/30 shrink-0">
          <div className="group flex items-center justify-between gap-3 px-3 py-2 bg-transparent hover:bg-surface-container-low rounded-md border border-transparent hover:border-outline-variant/30 transition-colors duration-150 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-inner">
                AD
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  Administrator
                </p>
                <p className="text-xs text-outline group-hover:text-on-surface-variant transition-colors">
                  System Access
                </p>
              </div>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-colors duration-200 ease-in-out p-1.5 rounded-full hover:bg-error/10 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
                aria-label="Log out"
                title="Log out"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
