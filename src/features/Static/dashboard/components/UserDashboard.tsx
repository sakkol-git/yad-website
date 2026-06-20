import Link from 'next/link';
import { User } from '@supabase/supabase-js';

interface UserDashboardProps {
  user: User;
  upcomingBooking: { check_in: string; rooms?: { name: string } | null } | null;
  recentDonation: { amount: number; status: string; created_at: string } | null;
  recentVolunteer: { status: string; events?: { name: string } | null } | null;
  greeting: string;
}

export function UserDashboard({
  user,
  upcomingBooking,
  recentDonation,
  recentVolunteer,
  greeting
}: UserDashboardProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-6 md:p-8 border border-outline-variant/30 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-2 md:mb-3 leading-tight">
            {greeting}, {user.user_metadata?.first_name || 'Friend'}! 👋
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-sm md:text-base leading-relaxed">
            Welcome to your personal YAD Cambodia portal. Here you can manage your homestay bookings, track your donation history, and find new opportunities to volunteer with our community.
          </p>
        </div>
      </div>

      {/* Quick Actions & Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Bookings Card */}
        <div className="bg-surface-container-lowest rounded-lg p-5 md:p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">bed</span>
            </div>
            <h2 className="text-lg font-bold text-on-surface">Homestays</h2>
          </div>
          
          <div className="flex-1">
            {upcomingBooking ? (
              <div className="bg-surface-container p-4 rounded-lg">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Upcoming Stay</p>
                <p className="font-medium text-on-surface">{upcomingBooking.rooms?.name}</p>
                <p className="text-sm text-on-surface-variant mt-1">Check-in: {new Date(upcomingBooking.check_in).toLocaleDateString()}</p>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant">You don't have any upcoming bookings.</p>
            )}
          </div>
          
          <Link href="/portal/bookings" className="mt-4 flex items-center justify-between text-sm font-bold text-primary hover:bg-primary/5 p-2 md:p-3 rounded-md transition-colors min-h-[44px]">
            Manage Bookings
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {/* Donations Card */}
        <div className="bg-surface-container-lowest rounded-lg p-5 md:p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">volunteer_activism</span>
            </div>
            <h2 className="text-lg font-bold text-on-surface">Donations</h2>
          </div>
          
          <div className="flex-1">
            {recentDonation ? (
              <div className="bg-surface-container p-4 rounded-lg">
                <p className="text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Recent Contribution</p>
                <p className="font-bold text-xl text-on-surface">${recentDonation.amount}</p>
                <p className="text-sm text-on-surface-variant mt-1">Status: {recentDonation.status}</p>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant leading-relaxed">You haven't made any donations yet. Your support helps us empower the youth of Cambodia.</p>
            )}
          </div>
          
          <Link href="/portal/donations" className="mt-4 flex items-center justify-between text-sm font-bold text-tertiary hover:bg-tertiary/5 p-2 md:p-3 rounded-md transition-colors min-h-[44px]">
            View History
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {/* Volunteer Card */}
        <div className="bg-surface-container-lowest rounded-lg p-5 md:p-6 border border-outline-variant/30 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">group</span>
            </div>
            <h2 className="text-lg font-bold text-on-surface">Volunteer</h2>
          </div>
          
          <div className="flex-1">
            {recentVolunteer ? (
              <div className="bg-surface-container p-4 rounded-lg">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Latest Engagement</p>
                <p className="font-medium text-on-surface">{recentVolunteer.events?.name}</p>
                <p className="text-sm text-on-surface-variant mt-1">Status: {recentVolunteer.status}</p>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant leading-relaxed">Join our volunteer network and make a direct impact in the community.</p>
            )}
          </div>
          
          <Link href="/portal/volunteer" className="mt-4 flex items-center justify-between text-sm font-bold text-secondary hover:bg-secondary/5 p-2 md:p-3 rounded-md transition-colors min-h-[44px]">
            Find Opportunities
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
