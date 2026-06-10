'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { ProgramFormModal } from './ProgramFormModal';
import { deleteProgram } from '@/server/actions/program.actions';

interface Program {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  start_date: string | null;
  end_date: string | null;
  capacity: number | null;
  status: string;
}

export function ProgramsTable({ programs }: { programs: Program[] }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    program: Program | null;
  }>({
    isOpen: false,
    mode: 'create',
    program: null,
  });

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const openCreate = () => setModalState({ isOpen: true, mode: 'create', program: null });
  const openEdit = (program: Program) => setModalState({ isOpen: true, mode: 'edit', program });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to permanently delete this program?')) return;
    
    setIsDeleting(id);
    try {
      await deleteProgram(id);
    } catch (error) {
      alert('Failed to delete program');
    } finally {
      setIsDeleting(null);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline-lg font-bold text-on-surface">Programs</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage YAD programs and initiatives.</p>
        </div>
        <Button 
          variant="default" 
          className="rounded-full shadow-md flex items-center gap-2 hover:scale-105"
          onClick={openCreate}
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Program
        </Button>
      </div>

      <div className="bg-surface rounded-3xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-lowest">
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-4 font-label-bold text-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 bg-surface">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-on-surface">
                    {program.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {program.category || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                      ${program.status === 'Active' ? 'bg-primary-container text-on-primary-container' : 
                        program.status === 'Upcoming' ? 'bg-secondary-container text-on-secondary-container' : 
                        program.status === 'Completed' ? 'bg-surface-variant text-on-surface-variant' :
                        'bg-error-container text-on-error-container'}`}
                    >
                      {program.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {program.start_date ? new Date(program.start_date).toLocaleDateString() : 'TBD'}
                    {program.end_date ? ` - ${new Date(program.end_date).toLocaleDateString()}` : ''}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {program.capacity || 'Unlimited'}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button 
                      onClick={() => openEdit(program)}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
                      title="Edit Program"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(program.id)}
                      disabled={isDeleting === program.id}
                      className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
                      title="Delete Program"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              
              {programs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant font-medium">
                    No programs found. Click "New Program" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProgramFormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        mode={modalState.mode}
        initialData={modalState.program}
      />
    </>
  );
}
