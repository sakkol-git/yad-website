'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/Button';
import { EventFormModal } from './EventFormModal';
import { deleteEvent } from '@/server/actions/event.actions';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';

interface Event {
  id: string;
  name: string;
  description: string | null;
  venue: string | null;
  capacity: number | null;
  status: string;
  date?: string | null;
  time?: string | null;
}

export function EventsTable({ events, count, page }: { events: Event[]; count?: number | null; page?: number }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    event: Event | null;
  }>({
    isOpen: false,
    mode: 'create',
    event: null,
  });

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const openCreate = () => setModalState({ isOpen: true, mode: 'create', event: null });
  const openEdit = (event: Event) => setModalState({ isOpen: true, mode: 'edit', event });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to permanently delete this event?')) return;
    
    setIsDeleting(id);
    try {
      await deleteEvent(id);
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Failed to delete event');
    } finally {
      setIsDeleting(null);
    }
  }

  const columns: ColumnDef<Event>[] = [
    {
      header: 'Event Name',
      cell: (event) => (
        <>
          <span className="font-bold">{event.name}</span>
          {event.description && (
            <div className="text-xs font-normal text-on-surface-variant mt-0.5 line-clamp-1 max-w-[250px]">
              {event.description}
            </div>
          )}
        </>
      )
    },
    {
      header: 'Date & Time',
      cell: (event) => (
        <>
          <span className="font-medium">
            {event.date ? new Date(event.date).toLocaleDateString() : '-'}
          </span>
          <div className="text-xs text-on-surface-variant mt-0.5">
            {event.time || 'Time TBD'}
          </div>
        </>
      )
    },
    {
      header: 'Venue',
      cell: (event) => (
        <span className="text-on-surface-variant font-medium">
          {event.venue || 'TBA'}
        </span>
      )
    },
    {
      header: 'Capacity',
      cell: (event) => (
        <span className="text-on-surface-variant">
          {event.capacity ? `${event.capacity} people` : 'Unlimited'}
        </span>
      )
    },
    {
      header: 'Status',
      cell: (event) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
          ${event.status === 'Upcoming' ? 'bg-secondary-container text-on-secondary-container' : 
            event.status === 'Ongoing' ? 'bg-primary-container text-on-primary-container' : 
            event.status === 'Completed' ? 'bg-tertiary-container text-on-tertiary-container' : 
            'bg-error-container text-error'}`}
        >
          {event.status}
        </span>
      )
    },
    {
      header: <div className="text-right">Actions</div>,
      cell: (event) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => openEdit(event)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
            title="Edit Event"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button 
            onClick={() => handleDelete(event.id)}
            disabled={isDeleting === event.id}
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
            title="Delete Event"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Event List</h2>
          <p className="text-on-surface-variant mt-1 text-sm">All registered events in the system.</p>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          <input
            className="w-full md:w-64 pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-md focus:ring-2 focus:ring-primary text-[14px] placeholder-on-surface-variant/70 shadow-sm"
            placeholder="Search events..."
            type="text"
          />
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={events} 
        keyExtractor={(e) => e.id}
        emptyMessage='No events found. Click "Create Event" to add one.'
        count={count}
        page={page}
      />

      <EventFormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        mode={modalState.mode}
        initialData={modalState.event}
      />
    </>
  );
}
