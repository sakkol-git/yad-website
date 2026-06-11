'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { ProgramFormModal } from './ProgramFormModal';
import { deleteProgram } from '@/server/actions/program.actions';
import { DataTable, ColumnDef } from '@/shared/components/ui/DataTable';

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

  const columns: ColumnDef<Program>[] = [
    { 
      header: 'Title', 
      cell: (program) => <span className="font-bold">{program.title}</span> 
    },
    { 
      header: 'Category', 
      cell: (program) => <span>{program.category || '-'}</span> 
    },
    { 
      header: 'Status', 
      cell: (program) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
          ${program.status === 'Active' ? 'bg-primary-container text-on-primary-container' : 
            program.status === 'Upcoming' ? 'bg-secondary-container text-on-secondary-container' : 
            program.status === 'Completed' ? 'bg-surface-variant text-on-surface-variant' :
            'bg-error-container text-on-error-container'}`}
        >
          {program.status}
        </span>
      )
    },
    { 
      header: 'Dates', 
      cell: (program) => (
        <span>
          {program.start_date ? new Date(program.start_date).toLocaleDateString() : 'TBD'}
          {program.end_date ? ` - ${new Date(program.end_date).toLocaleDateString()}` : ''}
        </span>
      )
    },
    { 
      header: 'Capacity', 
      cell: (program) => <span>{program.capacity || 'Unlimited'}</span> 
    },
    { 
      header: <div className="text-right">Actions</div>, 
      cell: (program) => (
        <div className="flex justify-end gap-2">
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
        </div>
      )
    }
  ];

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

      <DataTable 
        columns={columns} 
        data={programs} 
        keyExtractor={(p) => p.id}
        emptyMessage='No programs found. Click "New Program" to create one.'
      />

      <ProgramFormModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        mode={modalState.mode}
        initialData={modalState.program}
      />
    </>
  );
}
