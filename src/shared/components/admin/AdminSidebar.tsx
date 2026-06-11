'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
  { name: 'Donations', href: '/admin/donations', icon: 'volunteer_activism' },
  { name: 'Donors', href: '/admin/donors', icon: 'groups' },
  { name: 'Events', href: '/admin/events', icon: 'event' },
  { name: 'Members', href: '/admin/members', icon: 'card_membership' },
  { name: 'Partners', href: '/admin/partners', icon: 'handshake' },
  { name: 'Programs', href: '/admin/programs', icon: 'local_activity' },
  { name: 'Users', href: '/admin/users', icon: 'manage_accounts' },
  { name: 'Bookings', href: '/admin/bookings', icon: 'book_online' },
  { name: 'Homestays', href: '/admin/homestays', icon: 'home' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col shadow-sm z-20">
      <div className="p-6 h-16 flex items-center border-b border-outline-variant/30">
        <div className="font-bold text-xl text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[28px] icon-fill">spa</span>
          YAD Admin
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-bold text-outline uppercase tracking-wider mb-2 px-3">Main Menu</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-secondary-container text-on-secondary-container shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'icon-fill' : ''}`}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-outline-variant/30">
        <div className="flex items-center gap-3 px-3 py-2 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">Administrator</p>
            <p className="text-xs text-outline">System Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
