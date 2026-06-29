'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import { EventFormModal } from './EventFormModal';
import { deleteEvent } from '@/server/actions/event.actions';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';
import { ConfirmationDialog } from '@/shared/components/admin/feedback/ConfirmationDialog';
import { FilterBar } from '@/shared/components/admin/data/FilterBar';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) params.set('search', searchTerm);
        else params.delete('search');
        params.delete('page');
        router.push(`?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, searchParams, router]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    event: Event | null;
  }>({
    isOpen: false,
    mode: 'create',
    event: null,
  });

  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; eventId: string | null }>({
    isOpen: false,
    eventId: null,
  });

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const openCreate = () => setModalState({ isOpen: true, mode: 'create', event: null });
  const openEdit = (event: Event) => setModalState({ isOpen: true, mode: 'edit', event });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  const confirmDelete = (eventId: string) => setDeleteDialog({ isOpen: true, eventId });
  const closeDeleteDialog = () => setDeleteDialog({ isOpen: false, eventId: null });

  async function handleDelete() {
    if (!deleteDialog.eventId) return;
    
    setIsDeleting(true);
    try {
      const result = await deleteEvent({ id: deleteDialog.eventId });
      if (!result.success || result.error) throw new Error(result.error || "Failed to delete");
      toast.success('Event deleted successfully');
      closeDeleteDialog();
    } catch (error) {
      toast.error('Failed to delete event');
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: ColumnDef<Event>[] = [
    {
      id: 'name',
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
      id: 'datetime',
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
      id: 'venue',
      header: 'Venue',
      cell: (event) => (
        <span className="text-on-surface-variant font-medium">
          {event.venue || 'TBA'}
        </span>
      )
    },
    {
      id: 'capacity',
      header: 'Capacity',
      cell: (event) => (
        <span className="text-on-surface-variant">
          {event.capacity ? `${event.capacity} people` : 'Unlimited'}
        </span>
      )
    },
    {
      id: 'status',
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
      id: 'actions',
      header: <div className="text-right">Actions</div>,
      enableHiding: false,
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
            onClick={() => confirmDelete(event.id)}
            disabled={isDeleting && deleteDialog.eventId === event.id}
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
      <FilterBar 
        searchValue={searchTerm} 
        onSearchChange={setSearchTerm} 
        searchPlaceholder="Search events..."
      >
        <Button 
          variant="default" 
          className="shadow-md flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={openCreate}
        >
          <span className="material-symbols-outlined text-[20px]">event_note</span>
          Create Event
        </Button>
      </FilterBar>

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

      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Event"
        description="Are you sure you want to permanently delete this event? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </>
  );
}
