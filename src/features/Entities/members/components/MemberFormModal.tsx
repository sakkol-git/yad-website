'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { createMember, updateMember } from '@/server/actions/member.actions';

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  status: string;
  bio: string | null;
}

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: Member | null;
}

export function MemberFormModal({ isOpen, onClose, mode, initialData }: MemberFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'create') {
        const result = await createMember(null, formData);
        if (result.error) throw new Error(result.error);
      } else if (mode === 'edit' && initialData) {
        const result = await updateMember(initialData.id, null, formData);
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
            {mode === 'create' ? 'Create New Member' : 'Edit Member'}
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
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">First Name</label>
              <input 
                name="first_name" 
                type="text" 
                required
                defaultValue={initialData?.first_name || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Last Name</label>
              <input 
                name="last_name" 
                type="text" 
                required
                defaultValue={initialData?.last_name || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Email</label>
              <input 
                name="email" 
                type="email" 
                required
                defaultValue={initialData?.email || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-label-bold text-on-surface-variant">Bio</label>
              <textarea 
                name="bio" 
                rows={3}
                defaultValue={initialData?.bio || ''}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Member Type</label>
              <select 
                name="type" 
                required 
                defaultValue={initialData?.type || 'Resident'}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
              >
                <option value="Founder">Founder</option>
                <option value="Resident">Resident</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Status</label>
              <select 
                name="status" 
                required 
                defaultValue={initialData?.status || 'Pending'}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-variant/30">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className="rounded-full min-w-[120px]">
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Member' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
