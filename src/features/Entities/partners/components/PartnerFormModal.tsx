'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { createPartner, updatePartner } from '@/server/actions/partner.actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/Dialog';

interface Partner {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  partnership_type: string | null;
  notes: string | null;
  logo_url: string | null;
}

interface PartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: Partner | null;
}

export function PartnerFormModal({ isOpen, onClose, mode, initialData }: PartnerFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'create') {
        const result = await createPartner(null, formData);
        if (result.error) throw new Error(result.error);
      } else if (mode === 'edit' && initialData) {
        const result = await updatePartner(initialData.id, null, formData);
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
            {mode === 'create' ? 'Create New Partner' : 'Edit Partner'}
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
              <label className="text-sm font-label-bold text-on-surface-variant">Organization Name</label>
              <input 
                name="name" 
                type="text" 
                required
                defaultValue={initialData?.name || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Contact Person</label>
              <input 
                name="contact_person" 
                type="text" 
                defaultValue={initialData?.contact_person || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Email</label>
              <input 
                name="email" 
                type="email" 
                defaultValue={initialData?.email || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Phone</label>
              <input 
                name="phone" 
                type="text" 
                defaultValue={initialData?.phone || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Partnership Type</label>
              <input 
                name="partnership_type" 
                type="text" 
                defaultValue={initialData?.partnership_type || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
                placeholder="e.g. Sponsor, NGO Partner"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Logo URL</label>
              <input 
                name="logo_url" 
                type="url" 
                defaultValue={initialData?.logo_url || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Notes</label>
              <textarea 
                name="notes" 
                rows={3}
                defaultValue={initialData?.notes || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform] resize-y"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-variant/30 sticky bottom-0 bg-surface">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className=" min-w-[120px]">
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Partner' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
