import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AdminDashboard({ initialData }: { initialData?: any }) {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const formatTimeAgo = (dateString: string) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDifference === 0) {
      const hoursDifference = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60));
      if (hoursDifference === 0) {
        const minDiff = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60));
        return rtf.format(minDiff, 'minute');
      }
      return rtf.format(hoursDifference, 'hour');
    }
    return rtf.format(daysDifference, 'day');
  };

  const metrics = initialData?.metrics || {
    totalMembers: 0,
    activePrograms: 0,
    monthlyDonations: 0,
    pendingHomestays: 0
  };

  const { users = [], donations = [] } = initialData?.recentActivities || {};

  return (
    <div className="flex-1">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-light text-primary tracking-tighter leading-[1.0] mb-2">
            Welcome back, Admin.
          </h2>
          <p className="text-sm font-light text-on-surface-variant">
            Here&apos;s what&apos;s happening with YAD Cambodia today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container border border-outline-variant/30 text-on-surface px-5 py-2.5 rounded-md font-bold text-[10px] tracking-widest uppercase hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-not-allowed opacity-70">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span> Last 30 Days
          </button>
          <button className="bg-primary text-white px-5 py-2.5 rounded-md font-bold text-[10px] tracking-widest uppercase hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-not-allowed opacity-70">
            <span className="material-symbols-outlined text-[18px]">download</span> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-md p-6   hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-md bg-primary-container/30 text-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            </div>
            <span className="bg-secondary-container/50 text-secondary px-2.5 py-1 rounded-sm text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">Total Members</p>
          <h3 className="text-3xl font-bold text-primary">{metrics.totalMembers.toLocaleString()}</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-md p-6   hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-md bg-tertiary-container/30 text-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
            </div>
            <span className="bg-surface-variant text-on-surface-variant px-2.5 py-1 rounded-sm text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">horizontal_rule</span> 0%
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">Active Programs</p>
          <h3 className="text-3xl font-bold text-primary">{metrics.activePrograms}</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-md p-6   hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-md bg-secondary-container/30 text-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <span className="bg-secondary-container/50 text-secondary px-2.5 py-1 rounded-sm text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +5.4%
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">Monthly Donations</p>
          <h3 className="text-3xl font-bold text-primary">{formatCurrency(metrics.monthlyDonations)}</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-md p-6   hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
          {metrics.pendingHomestays > 0 && <div className="absolute right-0 top-0 w-2 h-full bg-error"></div>}
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-md ${metrics.pendingHomestays > 0 ? 'bg-error-container/50 text-error' : 'bg-surface-variant text-on-surface-variant'} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>home_work</span>
            </div>
            {metrics.pendingHomestays > 0 ? (
              <span className="bg-error/10 text-error px-2.5 py-1 rounded-sm text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">priority_high</span> Action Needed
              </span>
            ) : (
              <span className="bg-surface-variant text-on-surface-variant px-2.5 py-1 rounded-sm text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check</span> All Clear
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">Pending Homestays</p>
          <h3 className={`text-3xl font-bold ${metrics.pendingHomestays > 0 ? 'text-error' : 'text-primary'}`}>{metrics.pendingHomestays}</h3>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Recent Activity */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-md p-7  ">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/20">
            <h3 className="text-[20px] font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">history</span>
              Recent Activity
            </h3>
            <button className="text-sm font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-1">
            {/* Activity Items */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {users.map((user: any) => (
              <div key={user.id} className="flex items-start gap-4 p-3 rounded-md hover:bg-surface-container/50 transition-colors group cursor-pointer">
                <div className="mt-1 w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-on-surface">New member registration: <span className="font-bold text-primary">{user.email}</span></p>
                    <span className="text-xs font-medium text-on-surface-variant bg-surface px-2 py-0.5 rounded-md">{formatTimeAgo(user.created_at)}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">Assigned role: <span className="font-medium text-secondary capitalize">{user.role}</span></p>
                </div>
              </div>
            ))}

            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {donations.map((donation: any) => (
              <div key={donation.id} className="flex items-start gap-4 p-3 rounded-md hover:bg-surface-container/50 transition-colors group cursor-pointer">
                <div className="mt-1 w-10 h-10 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-on-surface">Donation received: <span className="font-bold text-secondary">{formatCurrency(donation.amount)}</span></p>
                    <span className="text-xs font-medium text-on-surface-variant bg-surface px-2 py-0.5 rounded-md">{formatTimeAgo(donation.created_at)}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">
                    From {donation.first_name ? `${donation.first_name} ${donation.last_name || ''}` : 'anonymous donor'} via {donation.method?.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-md p-7  ">
            <h3 className="text-[18px] font-bold text-primary mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">bolt</span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/members" className="bg-surface border border-outline-variant/30 rounded-md p-4 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-surface-container-low transition-[transform,box-shadow,border-color] duration-300 ease-out group">
                <span className="material-symbols-outlined text-[28px] text-primary group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>group_add</span>
                <span className="text-xs font-bold text-on-surface">Add Member</span>
              </Link>
              <Link href="/admin/events" className="bg-surface border border-outline-variant/30 rounded-md p-4 flex flex-col items-center justify-center gap-2 hover:border-tertiary hover:bg-surface-container-low transition-[transform,box-shadow,border-color] duration-300 ease-out group">
                <span className="material-symbols-outlined text-[28px] text-tertiary group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>event_note</span>
                <span className="text-xs font-bold text-on-surface">Create Event</span>
              </Link>
              <Link href="/admin/donors" className="bg-surface border border-outline-variant/30 rounded-md p-4 flex flex-col items-center justify-center gap-2 hover:border-secondary hover:bg-surface-container-low transition-[transform,box-shadow,border-color] duration-300 ease-out group">
                <span className="material-symbols-outlined text-[28px] text-secondary group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_1</span>
                <span className="text-xs font-bold text-on-surface">Manage Donors</span>
              </Link>
              <Link href="/admin/homestays" className="bg-error/5 border border-error/20 rounded-md p-4 flex flex-col items-center justify-center gap-2 hover:bg-error/10 transition-[transform,box-shadow,border-color] duration-300 ease-out group relative">
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse"></span>
                <span className="material-symbols-outlined text-[28px] text-error group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                <span className="text-xs font-bold text-error">Approvals</span>
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-md p-6   flex-1">
            <h3 className="text-[16px] font-bold text-on-surface mb-4">System Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-on-surface-variant">Storage Quota</span>
                  <span className="text-primary">68%</span>
                </div>
                <div className="w-full bg-surface-variant rounded-none h-1.5">
                  <div className="bg-primary h-1.5 rounded-none" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-md bg-secondary-container/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">All systems operational</p>
                  <p className="text-xs text-on-surface-variant">Last synced 2 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
