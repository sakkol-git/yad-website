'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { createEvent, updateEvent } from '@/server/actions/event.actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/Dialog';
import { FormField } from '@/shared/components/admin/forms/FormField';
import { FormInput } from '@/shared/components/ui/FormInput';
import { FormSelect } from '@/shared/components/ui/FormSelect';
import { FormTextarea } from '@/shared/components/ui/FormTextarea';

interface Event {
  id: string;
  name: string;
  description: string | null;
  venue: string | null;
  capacity: number | null;
  status: string;
}

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: Event | null;
}

export function EventFormModal({ isOpen, onClose, mode, initialData }: EventFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'create') {
        const result = await createEvent(null, formData);
        if (result.error) throw new Error(result.error);
      } else if (mode === 'edit' && initialData) {
        const result = await updateEvent(initialData.id, null, formData);
        if (result.error) throw new Error(result.error);
      }
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-surface-variant/30 sticky top-0 bg-surface z-10">
          <DialogTitle className="text-xl font-headline-md font-bold text-on-surface">
            {mode === 'create' ? 'Create New Event' : 'Edit Event'}
          </DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto">
          {error && (
            <div className="bg-error-container/20 text-error p-3 rounded-lg text-sm font-medium border border-error-container flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <FormField label="Name" required>
                <FormInput 
                  name="name" 
                  type="text" 
                  required
                  defaultValue={initialData?.name || ''}
                  placeholder="Event name"
                  icon="event"
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField label="Description">
                <FormTextarea 
                  name="description" 
                  rows={3}
                  defaultValue={initialData?.description || ''}
                  placeholder="Detailed description of the event"
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField label="Venue">
                <FormInput 
                  name="venue" 
                  type="text" 
                  defaultValue={initialData?.venue || ''}
                  placeholder="Event location"
                  icon="location_on"
                />
              </FormField>
            </div>

            <div>
              <FormField label="Status" required>
                <FormSelect 
                  name="status" 
                  required 
                  defaultValue={initialData?.status || 'Upcoming'}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </FormSelect>
              </FormField>
            </div>

            <div>
              <FormField label="Capacity">
                <FormInput 
                  name="capacity" 
                  type="number" 
                  min="1"
                  defaultValue={initialData?.capacity || ''}
                  placeholder="Number of attendees"
                  icon="groups"
                />
              </FormField>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-variant/30 sticky bottom-0 bg-surface z-10">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className=" min-w-[120px]">
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Event' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
