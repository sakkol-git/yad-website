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
import { FormField } from '@/shared/components/admin/forms/FormField';
import { FormInput } from '@/shared/components/ui/FormInput';
import { FormSelect } from '@/shared/components/ui/FormSelect';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            <div className="bg-error-container/20 text-error p-3 rounded-md-md text-sm font-medium border border-error-container flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <FormField label="Email Address" required={mode === 'create'}>
            <FormInput 
              name="email" 
              type="email" 
              required={mode === 'create'}
              disabled={mode === 'edit'}
              defaultValue={initialData?.email || ''}
              placeholder="user@example.com"
              icon="mail"
            />
          </FormField>

          {mode === 'create' && (
            <FormField label="Password" required description="Minimum 6 characters">
              <FormInput 
                name="password" 
                type="password" 
                required 
                minLength={6}
                placeholder="Enter a strong password"
                icon="lock"
              />
            </FormField>
          )}

          <FormField label="Role" required>
            <FormSelect 
              name="role" 
              required 
              defaultValue={initialData?.role || 'user'}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </FormSelect>
          </FormField>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isLoading} className=" min-w-[100px]">
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create User' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
