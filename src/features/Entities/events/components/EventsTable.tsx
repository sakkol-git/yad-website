'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { EventFormModal } from './EventFormModal';
import { deleteEvent } from '@/server/actions/event.actions';

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

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">Events</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage YAD events and activities.</p>
        </div>
        <Button 
          variant="default" 
          className="rounded-full shadow-md flex items-center gap-2 hover:scale-105"
          onClick={openCreate}
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Event
        </Button>
      </div>

      <div className="bg-surface rounded-3xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-lowest">
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Venue</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 bg-surface">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-on-surface">
                    {event.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {event.venue || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                      ${event.status === 'Ongoing' ? 'bg-primary-container text-on-primary-container' : 
                        event.status === 'Upcoming' ? 'bg-secondary-container text-on-secondary-container' : 
                        event.status === 'Completed' ? 'bg-surface-variant text-on-surface-variant' :
                        'bg-error-container text-on-error-container'}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {event.capacity || 'Unlimited'}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
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
                  </td>
                </tr>
              ))}
              
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant font-medium">
                    No events found. Click "New Event" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EventFormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        mode={modalState.mode}
        initialData={modalState.event}
      />
    </>
  );
}
