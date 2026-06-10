'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { DonorFormModal } from './DonorFormModal';
import { deleteDonor } from '@/server/actions/donor.actions';

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

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">Donors</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage donations and donor records.</p>
        </div>
        <Button 
          variant="default" 
          className="rounded-full shadow-md flex items-center gap-2 hover:scale-105"
          onClick={openCreate}
        >
          <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
          Add Donor
        </Button>
      </div>

      <div className="bg-surface rounded-3xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-lowest">
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Donor</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Visibility</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 bg-surface">
              {donors.map((donor) => (
                <tr key={donor.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-on-surface">
                    {donor.name}
                    {donor.email && <div className="text-xs font-normal text-on-surface-variant mt-0.5">{donor.email}</div>}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">
                    {donor.amount ? `$${donor.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {donor.donation_date ? new Date(donor.donation_date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    {donor.is_public ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                        <span className="material-symbols-outlined text-[16px]">visibility</span> Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">visibility_off</span> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                      ${donor.status === 'Active' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-variant text-on-surface-variant'}`}
                    >
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
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
                  </td>
                </tr>
              ))}
              
              {donors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant font-medium">
                    No donors found. Click "Add Donor" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DonorFormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        mode={modalState.mode}
        initialData={modalState.donor}
      />
    </>
  );
}
