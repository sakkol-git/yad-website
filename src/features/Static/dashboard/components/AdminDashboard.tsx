import Link from 'next/link';

export function AdminDashboard() {
  return (
    <div className="flex-1">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-[32px] font-bold text-primary tracking-tight mb-1">
            Welcome back, Admin.
          </h2>
          <p className="text-on-surface-variant">
            Here&apos;s what&apos;s happening with YAD Cambodia today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container border border-outline-variant/30 text-on-surface px-5 py-2.5 rounded-xl font-label-bold text-sm hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span> Last 30 Days
          </button>
          <button className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-ambient hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container/30 text-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            </div>
            <span className="bg-secondary-container/50 text-secondary px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">Total Members</p>
          <h3 className="text-3xl font-bold text-primary">2,450</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-ambient hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 text-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
            </div>
            <span className="bg-surface-variant text-on-surface-variant px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">horizontal_rule</span> 0%
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">Active Programs</p>
          <h3 className="text-3xl font-bold text-primary">18</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-ambient hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/30 text-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <span className="bg-secondary-container/50 text-secondary px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +5.4%
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">Monthly Donations</p>
          <h3 className="text-3xl font-bold text-primary">$12,840</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-ambient hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-2 h-full bg-error"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-error-container/50 text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>home_work</span>
            </div>
            <span className="bg-error/10 text-error px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">priority_high</span> Action Needed
            </span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant mb-1">Pending Homestays</p>
          <h3 className="text-3xl font-bold text-error">7</h3>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Recent Activity */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-7 shadow-ambient">
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
            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-container/50 transition-colors group cursor-pointer">
              <div className="mt-1 w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-on-surface">New member registration: <span className="font-bold text-primary">Sokha Chen</span></p>
                  <span className="text-xs font-medium text-on-surface-variant bg-surface px-2 py-0.5 rounded-md">2 hrs ago</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-1">Joined the <span className="font-medium text-secondary">&quot;Youth Leadership&quot;</span> program.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-container/50 transition-colors group cursor-pointer">
              <div className="mt-1 w-10 h-10 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-on-surface">Donation received: <span className="font-bold text-secondary">$500</span></p>
                  <span className="text-xs font-medium text-on-surface-variant bg-surface px-2 py-0.5 rounded-md">5 hrs ago</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-1">From anonymous donor via website portal.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-container/50 transition-colors group cursor-pointer bg-error/5 border border-error/10">
              <div className="mt-1 w-10 h-10 rounded-full bg-error-container/50 text-error flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">home_work</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-on-surface">Homestay Request: <span className="font-bold text-error">Family Vong</span></p>
                  <span className="text-xs font-bold text-error bg-error-container/50 px-2 py-0.5 rounded-md">Action Required</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-1">Awaiting approval for 3 guests. <Link className="text-secondary hover:underline font-medium ml-1" href="#">Review request</Link></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-7 shadow-ambient">
            <h3 className="text-[18px] font-bold text-primary mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">bolt</span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/members" className="bg-surface border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-surface-container-low transition-all group">
                <span className="material-symbols-outlined text-[28px] text-primary group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>group_add</span>
                <span className="text-xs font-bold text-on-surface">Add Member</span>
              </Link>
              <Link href="/admin/events" className="bg-surface border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-tertiary hover:bg-surface-container-low transition-all group">
                <span className="material-symbols-outlined text-[28px] text-tertiary group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>event_note</span>
                <span className="text-xs font-bold text-on-surface">Create Event</span>
              </Link>
              <Link href="/admin/donors" className="bg-surface border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-secondary hover:bg-surface-container-low transition-all group">
                <span className="material-symbols-outlined text-[28px] text-secondary group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_1</span>
                <span className="text-xs font-bold text-on-surface">Manage Donors</span>
              </Link>
              <Link href="/admin/homestays" className="bg-error/5 border border-error/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-error/10 transition-all group relative">
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse"></span>
                <span className="material-symbols-outlined text-[28px] text-error group-hover:-translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                <span className="text-xs font-bold text-error">Approvals</span>
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-ambient flex-1">
            <h3 className="text-[16px] font-bold text-on-surface mb-4">System Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-on-surface-variant">Storage Quota</span>
                  <span className="text-primary">68%</span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-secondary-container/50 flex items-center justify-center">
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
