'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { createDonor, updateDonor } from '@/server/actions/donor.actions';

interface Donor {
  id: string;
  name: string;
  email: string | null;
  amount: number | null;
  donation_date: string | null;
  message: string | null;
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

  if (!isOpen) return null;

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
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-surface rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        <div className="px-6 py-4 border-b border-surface-variant/30 flex justify-between items-center bg-surface sticky top-0 z-10">
          <h2 className="text-xl font-headline-md font-bold text-on-surface">
            {mode === 'create' ? 'Add New Donor' : 'Edit Donor'}
          </h2>
          <button type="button" onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-container">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form action={handleSubmit} className="p-6 flex flex-col gap-5">
          {error && (
            <div className="bg-error-container/20 text-error p-3 rounded-xl text-sm font-medium border border-error-container flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Donor Name *</label>
              <input 
                name="name" 
                type="text" 
                required
                defaultValue={initialData?.name || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Email</label>
              <input 
                name="email" 
                type="email" 
                defaultValue={initialData?.email || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Donation Amount ($)</label>
              <input 
                name="amount" 
                type="number" 
                step="0.01"
                min="0"
                defaultValue={initialData?.amount || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Donation Date</label>
              <input 
                name="donation_date" 
                type="date" 
                defaultValue={initialData?.donation_date || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Status</label>
              <select 
                name="status" 
                required 
                defaultValue={initialData?.status || 'Active'}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Message / Note</label>
              <textarea 
                name="message" 
                rows={3}
                defaultValue={initialData?.message || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
              ></textarea>
            </div>
            
            <div className="flex items-center gap-3 md:col-span-2 mt-2 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <input 
                name="is_public" 
                type="checkbox" 
                id="is_public"
                defaultChecked={mode === 'create' ? true : initialData?.is_public}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              <label htmlFor="is_public" className="text-sm font-medium text-on-surface cursor-pointer select-none">
                Show publicly on the Donors Showcase page
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-variant/30">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className="rounded-full min-w-[120px]">
              {isLoading ? 'Saving...' : mode === 'create' ? 'Add Donor' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
