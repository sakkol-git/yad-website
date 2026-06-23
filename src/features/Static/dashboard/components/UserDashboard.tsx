import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { PortalPageLayout } from '@/shared/components/portal/layout/PortalPageLayout';
import { SummaryCard } from '@/shared/components/portal/data/SummaryCard';

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
    <PortalPageLayout>
      {/* Premium Welcome Section */}
      <div className="bg-surface rounded-none p-8 md:p-12 border border-outline-variant/30 relative overflow-hidden">
        {/* Stark Editorial border element */}
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-light text-on-surface mb-6 tracking-tighter leading-[1.0]">
            {greeting}, {user.user_metadata?.first_name || 'Friend'}!
          </h1>
          <p className="text-sm font-light text-on-surface-variant leading-relaxed">
            Welcome to your personal YAD Cambodia portal. Manage your homestay bookings, track your donation history, and find new opportunities to volunteer with our community.
          </p>
        </div>
      </div>

      {/* Quick Actions & Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Homestays" 
          icon="bed" 
          colorVariant="primary" 
          href="/portal/bookings" 
          actionText="Manage Bookings"
        >
          {upcomingBooking ? (
            <div className="bg-surface-container p-4 rounded-none border border-outline-variant/10">
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Upcoming Stay</p>
              <p className="font-light text-lg text-on-surface tracking-tight mb-1">{upcomingBooking.rooms?.name}</p>
              <p className="text-sm font-light text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                {new Date(upcomingBooking.check_in).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center">
              <p className="text-sm font-light text-on-surface-variant leading-relaxed">You don't have any upcoming bookings. Plan your next stay with us!</p>
            </div>
          )}
        </SummaryCard>

        <SummaryCard 
          title="Donations" 
          icon="volunteer_activism" 
          colorVariant="tertiary" 
          href="/portal/donations" 
          actionText="View History"
        >
          {recentDonation ? (
            <div className="bg-surface-container p-4 rounded-none border border-outline-variant/10">
              <p className="text-[10px] font-bold text-tertiary uppercase tracking-[0.2em] mb-2">Recent Contribution</p>
              <p className="font-light tracking-tighter text-3xl text-on-surface mb-1">${recentDonation.amount}</p>
              <p className="text-sm font-light text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Status: {recentDonation.status}
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center">
              <p className="text-sm font-light text-on-surface-variant leading-relaxed">You haven't made any donations yet. Your support helps empower the youth of Cambodia.</p>
            </div>
          )}
        </SummaryCard>

        <SummaryCard 
          title="Volunteer" 
          icon="group" 
          colorVariant="secondary" 
          href="/portal/volunteer" 
          actionText="Find Opportunities"
        >
          {recentVolunteer ? (
            <div className="bg-surface-container p-4 rounded-none border border-outline-variant/10">
              <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-2">Latest Engagement</p>
              <p className="font-light text-lg text-on-surface mb-1 truncate tracking-tight" title={recentVolunteer.events?.name || ''}>{recentVolunteer.events?.name}</p>
              <p className="text-sm font-light text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Status: {recentVolunteer.status}
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center">
              <p className="text-sm font-light text-on-surface-variant leading-relaxed">Join our volunteer network and make a direct impact in the community.</p>
            </div>
          )}
        </SummaryCard>
      </div>
    </PortalPageLayout>
  );
}
