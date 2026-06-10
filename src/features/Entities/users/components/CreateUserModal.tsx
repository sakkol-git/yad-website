'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { createUser } from '@/server/actions/user.actions';

export function CreateUserModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await createUser(null, formData);
      if (result.error) {
        setError(result.error);
      } else {
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-surface-variant/30 flex justify-between items-center">
          <h2 className="text-xl font-headline-md font-bold text-on-surface">Create New User</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-container">
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

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-label-bold text-on-surface-variant">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="user@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-label-bold text-on-surface-variant">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              minLength={6}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-label-bold text-on-surface-variant">Role</label>
            <select 
              name="role" 
              required 
              defaultValue="user"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
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
              {isLoading ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
