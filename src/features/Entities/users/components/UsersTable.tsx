'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/Button';
import { UserFormModal } from './UserFormModal';
import { deleteUser } from '@/server/actions/user.actions';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';
import { ConfirmationDialog } from '@/shared/components/admin/feedback/ConfirmationDialog';
import { FilterBar } from '@/shared/components/admin/data/FilterBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

export function UsersTable({ users, count, page }: { users: User[]; count?: number | null; page?: number }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    user: User | null;
  }>({
    isOpen: false,
    mode: 'create',
    user: null,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) params.set('search', searchTerm);
        else params.delete('search');
        params.delete('page');
        router.push(`?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, searchParams, router]);

  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; userId: string | null }>({
    isOpen: false,
    userId: null,
  });

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const openCreate = () => setModalState({ isOpen: true, mode: 'create', user: null });
  const openEdit = (user: User) => setModalState({ isOpen: true, mode: 'edit', user });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  const confirmDelete = (userId: string) => setDeleteDialog({ isOpen: true, userId });
  const closeDeleteDialog = () => setDeleteDialog({ isOpen: false, userId: null });

  async function handleDelete() {
    if (!deleteDialog.userId) return;
    setIsDeleting(true);
    try {
      await deleteUser(deleteDialog.userId);
      toast.success('User deleted successfully');
      closeDeleteDialog();
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: ColumnDef<User>[] = [
    { 
      id: 'email',
      header: 'Email', 
      cell: (user) => <span className="font-medium">{user.email}</span> 
    },
    { 
      id: 'role',
      header: 'Role', 
      cell: (user) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md-full text-xs font-bold uppercase tracking-wider
          ${user.role === 'admin' ? 'bg-error-container text-on-error-container' : 
            user.role === 'manager' ? 'bg-secondary-container text-on-secondary-container' : 
            'bg-surface-variant text-on-surface-variant'}`}
        >
          {user.role}
        </span>
      )
    },
    { 
      id: 'created',
      header: 'Created At', 
      cell: (user) => (
        <span>
          {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      )
    },
    { 
      id: 'last_signin',
      header: 'Last Sign In', 
      cell: (user) => (
        <span>
          {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' }) : 'Never'}
        </span>
      )
    },
    { 
      id: 'actions',
      header: <div className="text-right">Actions</div>, 
      enableHiding: false,
      cell: (user) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => openEdit(user)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md-full transition-colors flex items-center justify-center"
            title="Edit Role"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button 
            onClick={() => confirmDelete(user.id)}
            disabled={isDeleting && deleteDialog.userId === user.id}
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-md-full transition-colors flex items-center justify-center disabled:opacity-50"
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
      <FilterBar 
        searchValue={searchTerm} 
        onSearchChange={setSearchTerm} 
        searchPlaceholder="Search users by email or role..."
      >
        <Button 
          variant="default" 
          className="shadow-md flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={openCreate}
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Create User
        </Button>
      </FilterBar>

      <DataTable 
        columns={columns} 
        data={users} 
        keyExtractor={(u) => u.id}
        emptyMessage="No users found."
        count={count}
        page={page}
      />

      <UserFormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        mode={modalState.mode}
        initialData={modalState.user}
      />

      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="Delete User"
        description="Are you sure you want to permanently delete this user? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </>
  );
}
