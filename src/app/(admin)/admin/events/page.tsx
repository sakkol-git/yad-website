import { getEvents } from '@/server/actions/event.actions';
import { EventsTable } from '@/features/Entities/events/components/EventsTable';

export const metadata = {
  title: 'Events Management - YAD Admin',
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
      <EventsTable events={events} />
    </div>
  );
}
