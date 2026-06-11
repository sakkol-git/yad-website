'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { UserFormModal } from './UserFormModal';
import { deleteUser } from '@/server/actions/user.actions';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

export function UsersTable({ users }: { users: User[] }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    user: User | null;
  }>({
    isOpen: false,
    mode: 'create',
    user: null,
  });

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const openCreate = () => setModalState({ isOpen: true, mode: 'create', user: null });
  const openEdit = (user: User) => setModalState({ isOpen: true, mode: 'edit', user });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  async function handleDelete(userId: string) {
    if (!confirm('Are you sure you want to permanently delete this user?')) return;
    
    setIsDeleting(userId);
    try {
      await deleteUser(userId);
    } catch (error) {
      alert('Failed to delete user');
    } finally {
      setIsDeleting(null);
    }
  }

  const columns: ColumnDef<User>[] = [
    { 
      header: 'Email', 
      cell: (user) => <span className="font-medium">{user.email}</span> 
    },
    { 
      header: 'Role', 
      cell: (user) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
          ${user.role === 'admin' ? 'bg-error-container text-on-error-container' : 
            user.role === 'manager' ? 'bg-secondary-container text-on-secondary-container' : 
            'bg-surface-variant text-on-surface-variant'}`}
        >
          {user.role}
        </span>
      )
    },
    { 
      header: 'Created At', 
      cell: (user) => (
        <span>
          {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      )
    },
    { 
      header: 'Last Sign In', 
      cell: (user) => (
        <span>
          {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' }) : 'Never'}
        </span>
      )
    },
    { 
      header: <div className="text-right">Actions</div>, 
      cell: (user) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => openEdit(user)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
            title="Edit Role"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button 
            onClick={() => handleDelete(user.id)}
            disabled={isDeleting === user.id}
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
            title="Delete User"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">User Management</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage platform users and their roles.</p>
        </div>
        <Button 
 variant="default" 
 className=" shadow-md flex items-center gap-2 hover:scale-105"
 onClick={openCreate}
 >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Create User
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={users} 
        keyExtractor={(u) => u.id}
        emptyMessage="No users found."
      />

      <UserFormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        mode={modalState.mode}
        initialData={modalState.user}
      />
    </>
  );
}
