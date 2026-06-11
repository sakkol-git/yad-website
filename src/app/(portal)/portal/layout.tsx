import Link from 'next/link';
import { logout } from '@/server/actions/auth.actions';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Navigation */}
      <header className="bg-surface-container-lowest border-b border-outline-variant/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/portal/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-on-secondary text-[20px]">group</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-on-surface">YAD<span className="text-secondary">Portal</span></span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                <Link href="/portal/dashboard" className="px-4 py-2 rounded-md text-sm font-medium text-on-surface hover:bg-surface-container transition-colors">
                  Overview
                </Link>
                <Link href="/portal/bookings" className="px-4 py-2 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
                  My Bookings
                </Link>
                <Link href="/portal/donations" className="px-4 py-2 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
                  My Donations
                </Link>
                <Link href="/portal/volunteer" className="px-4 py-2 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
                  Volunteer
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" title="Back to Website" className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/50 text-sm font-medium text-on-surface hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-[18px]">public</span>
                <span className="hidden sm:inline">Website</span>
              </Link>
              
              <button className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-secondary transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              
              <form action={logout}>
                <button title="Sign Out" type="submit" className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/50 text-sm font-medium text-on-surface hover:bg-error-container hover:text-error hover:border-error-container transition-all">
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
