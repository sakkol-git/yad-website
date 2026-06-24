'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { createProgramAction as createProgram, updateProgramAction as updateProgram } from '@/server/actions/program.actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/Dialog';

interface Program {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  start_date: string | null;
  end_date: string | null;
  capacity: number | null;
  status: string;
}

interface ProgramFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: Program | null;
}

export function ProgramFormModal({ isOpen, onClose, mode, initialData }: ProgramFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    try {
      const payload = {
        title: formData.get("title") as string || "",
        description: formData.get("description") as string || "",
        category: formData.get("category") as string || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: (formData.get("status") as any) || "upcoming",
        start_date: formData.get("start_date") as string || "",
        end_date: (formData.get("end_date") as string) || null,
        beneficiaries_count: Number(formData.get("capacity")) || 0,
        image_url: null
      };

      if (mode === 'create') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await createProgram(payload as any);
        if (result.error) throw new Error(result.error);
      } else if (mode === 'edit' && initialData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await updateProgram(initialData.id, payload as any);
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
            {mode === 'create' ? 'Create New Program' : 'Edit Program'}
          </DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto">
          {error && (
            <div className="bg-error-container/20 text-error p-3 rounded-md text-sm font-medium border border-error-container flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Title</label>
              <input 
                name="title" 
                type="text" 
                required
                defaultValue={initialData?.title || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
                placeholder="Program title"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Description</label>
              <textarea 
                name="description" 
                rows={3}
                defaultValue={initialData?.description || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform] resize-y"
                placeholder="Detailed description of the program"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Category</label>
              <input 
                name="category" 
                type="text" 
                defaultValue={initialData?.category || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
                placeholder="e.g. Education, Health"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Status</label>
              <select 
                name="status" 
                required 
                defaultValue={initialData?.status || 'Upcoming'}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform] appearance-none cursor-pointer"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Start Date</label>
              <input 
                name="start_date" 
                type="date" 
                defaultValue={initialData?.start_date ? initialData.start_date.split('T')[0] : ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">End Date</label>
              <input 
                name="end_date" 
                type="date" 
                defaultValue={initialData?.end_date ? initialData.end_date.split('T')[0] : ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Capacity</label>
              <input 
                name="capacity" 
                type="number" 
                min="1"
                defaultValue={initialData?.capacity || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
                placeholder="Number of participants"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-variant/30 sticky bottom-0 bg-surface">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className=" min-w-[120px]">
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Program' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
