'use client';

import { useState } from 'react';
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
}

export function EventsTable({ events }: { events: Event[] }) {
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
    } catch (error) {
      alert('Failed to delete event');
    } finally {
      setIsDeleting(null);
    }
  }

  const columns: ColumnDef<Event>[] = [
    { 
      header: 'Name', 
      cell: (event) => <span className="font-bold">{event.name}</span> 
    },
    { 
      header: 'Venue', 
      cell: (event) => <span>{event.venue || '-'}</span> 
    },
    { 
      header: 'Status', 
      cell: (event) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
          ${event.status === 'Ongoing' ? 'bg-primary-container text-on-primary-container' : 
            event.status === 'Upcoming' ? 'bg-secondary-container text-on-secondary-container' : 
            event.status === 'Completed' ? 'bg-surface-variant text-on-surface-variant' :
            'bg-error-container text-on-error-container'}`}
        >
          {event.status}
        </span>
      )
    },
    { 
      header: 'Capacity', 
      cell: (event) => <span>{event.capacity || 'Unlimited'}</span> 
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
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">Events</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage YAD events and activities.</p>
        </div>
        <Button 
 variant="default" 
 className=" shadow-md flex items-center gap-2 hover:scale-105"
 onClick={openCreate}
 >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Event
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={events} 
        keyExtractor={(e) => e.id}
        emptyMessage='No events found. Click "New Event" to create one.'
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
