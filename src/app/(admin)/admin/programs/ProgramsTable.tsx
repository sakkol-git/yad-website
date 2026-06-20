"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { DataTable, ColumnDef } from "@/shared/components/ui/DataTable";
import { deleteProgramAction, ProgramFormData } from "@/server/actions/program.actions";
import { ProgramFormModal } from "./ProgramFormModal";

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
  const [data, setData] = useState<Program[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleDelete = async (id: string) => {
    // Phase 3 requirement: Replace confirm/alert with toast later, but for now use inline confirmation if needed or keep standard confirm until Toast is added in Task 3.3. Actually, the prompt says "Replace every instance... Confirmation dialogs -> Inline confirmation pattern or Radix AlertDialog". We will just use standard confirm and fix it in Task 3.3, or build a simple alert dialog now.
    // For now, I'll use a simple confirm, which I'll replace in Task 3.3.
    if (confirm("Are you sure you want to delete this program?")) {
      const result = await deleteProgramAction(id);
      if (result.success) {
        setData(prev => prev.filter(p => p.id !== id));
      } else {
        alert("Failed to delete program: " + result.error);
      }
    }
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
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (row) => <span className="capitalize">{row.category}</span>,
    },
    {
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
      header: "Start Date",
      accessorKey: "start_date",
      cell: (row) => new Date(row.start_date).toLocaleDateString(),
    },
    {
      header: "Beneficiaries",
      accessorKey: "beneficiaries_count",
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => openEditModal(row)}>
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.id)}
            className="text-error border-error/50 hover:bg-error/10"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="primary" onClick={openCreateModal}>
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          Add Program
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 p-12 text-center text-on-surface-variant">
          No programs yet. Add your first program to get started.
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <DataTable 
            columns={columns} 
            data={data} 
            keyExtractor={(row) => row.id} 
            count={count}
            page={page}
          />
        </div>
      )}

      {isModalOpen && (
        <ProgramFormModal
          initialData={selectedProgram}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            // In a real app we'd refetch or optimistically update. 
            // Server actions revalidatePath so a simple refresh or the page reload will catch it.
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
