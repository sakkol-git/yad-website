'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { createDonor, updateDonor } from '@/server/actions/donor.actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/Dialog';

interface Donor {
  id: string;
  name: string;
  email: string | null;
  amount: number | null;
  donation_date: string | null;
  description: string | null;
  avatar_url?: string | null;
  country?: string | null;
  is_public: boolean;
  status: string;
}

interface DonorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: Donor | null;
}

export function DonorFormModal({ isOpen, onClose, mode, initialData }: DonorFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'create') {
        const result = await createDonor(null, formData);
        if (result.error) throw new Error(result.error);
      } else if (mode === 'edit' && initialData) {
        const result = await updateDonor(initialData.id, null, formData);
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
            {mode === 'create' ? 'Create New Donor Record' : 'Edit Donor Record'}
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
              <label className="text-sm font-label-bold text-on-surface-variant">Donor Name</label>
              <input
                name="name"
                type="text"
                required
                defaultValue={initialData?.name || ''}
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
              <label className="text-sm font-label-bold text-on-surface-variant">Amount (USD)</label>
              <input
                name="amount"
                type="number"
                step="0.01"
                min="0"
                defaultValue={initialData?.amount || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Donation Date</label>
              <input
                name="donation_date"
                type="date"
                defaultValue={initialData?.donation_date ? initialData.donation_date.split('T')[0] : ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Status</label>
              <select
                name="status"
                required
                defaultValue={initialData?.status || 'Active'}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform] appearance-none cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="flex items-center gap-3 p-4 bg-surface-container-lowest border border-outline-variant rounded-md cursor-pointer">
                <input
                  name="is_public"
                  type="checkbox"
                  value="true"
                  defaultChecked={initialData?.is_public ?? true}
                  className="w-5 h-5 text-primary border-outline-variant rounded-md focus:ring-primary"
                />
                <div>
                  <div className="font-label-bold text-on-surface">Make Public</div>
                  <div className="text-xs text-on-surface-variant">Allow this donor to be displayed publicly on the website</div>
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Avatar URL</label>
              <input 
                name="avatar_url" 
                type="url"
                placeholder="https://example.com/avatar.jpg"
                defaultValue={initialData?.avatar_url || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Country</label>
              <input 
                name="country" 
                type="text"
                placeholder="e.g. United States, Cambodia, Australia"
                defaultValue={initialData?.country || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform]"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Description</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={initialData?.description || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-[opacity,transform] resize-y"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-variant/30 sticky bottom-0 bg-surface">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className=" min-w-[120px]">
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Donor' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
