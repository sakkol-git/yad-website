import { getEvents } from '@/server/actions/event.actions';
import { EventsTable } from '@/features/Entities/events/components/EventsTable';

export const metadata = {
  title: 'Events Management - YAD Admin',
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
            Events Management
          </h1>
          <p className="text-on-surface-variant">
            Create, update, and manage upcoming and past events.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="py-2.5 px-5 bg-surface-container-lowest border border-outline-variant/50 text-on-surface rounded-xl font-bold text-sm hover:bg-surface-container transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span> Export
          </button>
          <button className="py-2.5 px-5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:bg-primary-container hover:text-on-primary-container transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-[20px]">event_note</span> Create Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">event</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Total Events</p>
            <h3 className="text-2xl font-bold text-on-surface">{events?.length || 0}</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">event_available</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Upcoming Events</p>
            <h3 className="text-2xl font-bold text-on-surface">
              {events?.filter((e: any) => new Date(e.date) >= new Date()).length || 0}
            </h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-4 hover-lift">
          <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">people</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm font-medium mb-1">Total Capacity</p>
            <h3 className="text-2xl font-bold text-on-surface">
              {events?.reduce((acc: number, e: any) => acc + (e.capacity || 0), 0) || 0}
            </h3>
          </div>
        </div>
      </div>

      <EventsTable events={events} />
    </div>
  );
}
