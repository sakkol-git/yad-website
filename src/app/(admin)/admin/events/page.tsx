import { getEvents } from '@/server/actions/event.actions';
import { EventsTable } from '@/features/Entities/events/components/EventsTable';
import { Suspense } from 'react';
import { createClient } from '@/shared/lib/supabase/server';
import { AdminPageLayout } from '@/shared/components/admin/layout/AdminPageLayout';
import { AdminPageHeader } from '@/shared/components/admin/layout/AdminPageHeader';
import { StatCard } from '@/shared/components/admin/data/StatCard';
import { StatsGrid } from '@/shared/components/admin/data/StatsGrid';
import { Button } from '@/shared/components/ui/Button';

export const metadata = {
  title: 'Events Management - YAD Admin',
};

export default async function EventsPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const { data: events, count } = await getEvents(page, 10, search);

  const supabase = await createClient();
  const { data: allEvents } = await supabase.from('events').select('date, capacity');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const upcomingCount = allEvents?.filter((e: any) => new Date(e.date) >= new Date()).length || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalCapacity = allEvents?.reduce((acc: number, e: any) => acc + (e.capacity || 0), 0) || 0;

  const headerActions = (
    <Button variant="outline" className="flex items-center gap-2 shadow-sm">
      <span className="material-symbols-outlined text-[20px]">download</span> Export
    </Button>
  );

  return (
    <AdminPageLayout>
      <AdminPageHeader 
        title="Events Management" 
        description="Create, update, and manage upcoming and past events."
        actions={headerActions}
      />

      <StatsGrid>
        <StatCard title="Total Events" value={count || 0} icon="event" colorVariant="primary" />
        <StatCard title="Upcoming Events" value={upcomingCount} icon="event_available" colorVariant="secondary" />
        <StatCard title="Total Capacity" value={totalCapacity} icon="people" colorVariant="tertiary" />
      </StatsGrid>

      <Suspense fallback={<div className="p-8 text-center text-on-surface-variant">Loading events...</div>}>
        <EventsTable events={events} count={count} page={page} />
      </Suspense>
    </AdminPageLayout>
  );
}
