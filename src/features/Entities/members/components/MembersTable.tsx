'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { MemberFormModal } from './MemberFormModal';
import { deleteMember } from '@/server/actions/member.actions';

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  status: string;
  bio: string | null;
}

export function MembersTable({ members }: { members: Member[] }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    member: Member | null;
  }>({
    isOpen: false,
    mode: 'create',
    member: null,
  });

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const openCreate = () => setModalState({ isOpen: true, mode: 'create', member: null });
  const openEdit = (member: Member) => setModalState({ isOpen: true, mode: 'edit', member });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to permanently delete this member?')) return;
    
    setIsDeleting(id);
    try {
      await deleteMember(id);
    } catch (error) {
      alert('Failed to delete member');
    } finally {
      setIsDeleting(null);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">Members</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage organization members and alumni.</p>
        </div>
        <Button 
          variant="default" 
          className="rounded-full shadow-md flex items-center gap-2 hover:scale-105"
          onClick={openCreate}
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add Member
        </Button>
      </div>

      <div className="bg-surface rounded-3xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-lowest">
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 bg-surface">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-on-surface">
                    {member.first_name} {member.last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {member.type}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                      ${member.status === 'Active' ? 'bg-primary-container text-on-primary-container' : 
                        member.status === 'Pending' ? 'bg-secondary-container text-on-secondary-container' : 
                        member.status === 'Inactive' ? 'bg-surface-variant text-on-surface-variant' :
                        'bg-error-container text-on-error-container'}`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button 
                      onClick={() => openEdit(member)}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
                      title="Edit Member"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      disabled={isDeleting === member.id}
                      className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
                      title="Delete Member"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant font-medium">
                    No members found. Click "Add Member" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MemberFormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        mode={modalState.mode}
        initialData={modalState.member}
      />
    </>
  );
}
