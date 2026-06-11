'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { createUser, updateUser } from '@/server/actions/user.actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/Dialog';

interface User {
  id: string;
  email: string;
  role: string;
}

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: User | null;
}

export function UserFormModal({ isOpen, onClose, mode, initialData }: UserFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'create') {
        const result = await createUser(null, formData);
        if (result.error) {
          setError(result.error);
        } else {
          onClose();
        }
      } else if (mode === 'edit' && initialData) {
        const role = formData.get('role') as 'admin' | 'manager' | 'user';
        const result = await updateUser(initialData.id, role);
        if (result.error) {
          setError(result.error);
        } else {
          onClose();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-w-md overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-surface-variant/30 sticky top-0 bg-surface z-10">
          <DialogTitle className="text-xl font-headline-md font-bold text-on-surface">
            {mode === 'create' ? 'Create New User' : 'Edit User Role'}
          </DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto">
          {error && (
            <div className="bg-error-container/20 text-error p-3 rounded-lg text-sm font-medium border border-error-container flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-label-bold text-on-surface-variant">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required={mode === 'create'}
              disabled={mode === 'edit'}
              defaultValue={initialData?.email || ''}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="user@example.com"
            />
          </div>

          {mode === 'create' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-label-bold text-on-surface-variant">Password</label>
              <input 
                name="password" 
                type="password" 
                required 
                minLength={6}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Minimum 6 characters"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-label-bold text-on-surface-variant">Role</label>
            <select 
              name="role" 
              required 
              defaultValue={initialData?.role || 'user'}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className="rounded-full min-w-[100px]">
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create User' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
