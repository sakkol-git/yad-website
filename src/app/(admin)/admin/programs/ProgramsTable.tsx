"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/shared/components/ui/Button";
import { DataTable, ColumnDef } from "@/shared/components/ui/DataTable";
import { deleteProgramAction } from "@/server/actions/program.actions";
import { ProgramFormModal } from "./ProgramFormModal";
import { ConfirmationDialog } from '@/shared/components/admin/feedback/ConfirmationDialog';
import { FilterBar } from '@/shared/components/admin/data/FilterBar';

interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "completed" | "upcoming";
  start_date: string;
  end_date?: string | null;
  beneficiaries_count: number;
  image_url?: string;
  created_at: string;
}

export function ProgramsTable({ initialData, count, page }: { initialData: Program[]; count?: number | null; page?: number }) {
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

  const [data, setData] = useState<Program[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; programId: string | null }>({
    isOpen: false,
    programId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = (programId: string) => setDeleteDialog({ isOpen: true, programId });
  const closeDeleteDialog = () => setDeleteDialog({ isOpen: false, programId: null });

  const handleDelete = async () => {
    if (!deleteDialog.programId) return;
    setIsDeleting(true);
    const result = await deleteProgramAction({ id: deleteDialog.programId });
    if (result.success) {
      toast.success("Program deleted successfully");
      setData(prev => prev.filter(p => p.id !== deleteDialog.programId));
      closeDeleteDialog();
    } else {
      toast.error("Failed to delete program: " + result.error);
    }
    setIsDeleting(false);
  };

  const openEditModal = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedProgram(null);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<Program>[] = [
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      cell: (row) => <span className="font-bold">{row.title}</span>,
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: (row) => <span className="capitalize">{row.category}</span>,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const colors = {
          upcoming: "bg-amber-100 text-amber-800",
          active: "bg-green-100 text-green-800",
          completed: "bg-surface-variant text-on-surface-variant",
        };
        return (
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${colors[row.status]}`}>
            {row.status.toUpperCase()}
          </span>
        );
      },
    },
    {
      id: "start_date",
      header: "Start Date",
      accessorKey: "start_date",
      cell: (row) => <span className="text-on-surface-variant">{new Date(row.start_date).toLocaleDateString()}</span>,
    },
    {
      id: "beneficiaries",
      header: "Beneficiaries",
      accessorKey: "beneficiaries_count",
    },
    {
      id: "actions",
      header: <div className="text-right">Actions</div>,
      enableHiding: false,
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => openEditModal(row)}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center"
            title="Edit Program"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button 
            onClick={() => confirmDelete(row.id)}
            disabled={isDeleting && deleteDialog.programId === row.id}
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
            title="Delete Program"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <FilterBar 
        searchValue={searchTerm} 
        onSearchChange={setSearchTerm} 
        searchPlaceholder="Search programs..."
      >
        <Button variant="default" onClick={openCreateModal} className="shadow-md flex items-center gap-2 hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Program
        </Button>
      </FilterBar>

      <DataTable 
        columns={columns} 
        data={data} 
        keyExtractor={(row) => row.id} 
        count={count}
        page={page}
        emptyMessage="No programs found."
      />

      {isModalOpen && (
        <ProgramFormModal
          initialData={selectedProgram}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            window.location.reload();
          }}
        />
      )}

      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Program"
        description="Are you sure you want to permanently delete this program? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
