'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { DonorFormModal } from './DonorFormModal';
import { deleteDonor } from '@/server/actions/donor.actions';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';

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

export function DonorsTable({ donors }: { donors: Donor[] }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    donor: Donor | null;
  }>({
    isOpen: false,
    mode: 'create',
    donor: null,
  });

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const openCreate = () => setModalState({ isOpen: true, mode: 'create', donor: null });
  const openEdit = (donor: Donor) => setModalState({ isOpen: true, mode: 'edit', donor });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to permanently delete this donor?')) return;

    setIsDeleting(id);
    try {
      await deleteDonor(id);
    } catch (error) {
      alert('Failed to delete donor');
    } finally {
      setIsDeleting(null);
    }
  }

  const columns: ColumnDef<Donor>[] = [
    {
      header: 'Donor',
      cell: (donor) => (
        <>
          <span className="font-bold">{donor.name}</span>
          {donor.email && <div className="text-xs font-normal text-on-surface-variant mt-0.5">{donor.email}</div>}
        </>
      )
    },
    {
      header: 'Amount',
      cell: (donor) => (
        <span className="font-medium text-primary">
          {donor.amount ? `$${donor.amount.toLocaleString()}` : '-'}
        </span>
      )
    },
    {
      header: 'Country',
      cell: (donor) => (
        <span className="text-on-surface-variant font-medium">
          {donor.country || '-'}
        </span>
      )
    },
    {
      header: 'Date',
      cell: (donor) => (
        <span className="text-on-surface-variant">
          {donor.donation_date ? new Date(donor.donation_date).toLocaleDateString() : '-'}
        </span>
      )
    },
    {
      header: 'Visibility',
      cell: (donor) => (
        <>
          {donor.is_public ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
              <span className="material-symbols-outlined text-[16px]">visibility</span> Public
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">visibility_off</span> Hidden
            </span>
          )}
        </>
      )
    },
    {
      header: 'Status',
      cell: (donor) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
          ${donor.status === 'Active' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-variant text-on-surface-variant'}`}
        >
          {donor.status}
        </span>
      )
    },
    {
      header: <div className="text-right">Actions</div>,
      cell: (donor) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => openEdit(donor)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
            title="Edit Donor"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={() => handleDelete(donor.id)}
            disabled={isDeleting === donor.id}
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
            title="Delete Donor"
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
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">Donors</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage donations and donor records.</p>
        </div>
        <Button
 variant="default"
 className=" shadow-md flex items-center gap-2 hover:scale-105"
 onClick={openCreate}
 >
          <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
          Add Donor
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={donors}
        keyExtractor={(d) => d.id}
        emptyMessage='No donors found. Click "Add Donor" to create one.'
      />

      <DonorFormModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        initialData={modalState.donor}
      />
    </>
  );
}
