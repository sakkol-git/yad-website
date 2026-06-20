"use client";

import { useState, useTransition } from "react";
import { Button } from "@/shared/components/ui/Button";
import { DataTable, ColumnDef } from "@/shared/components/ui/DataTable";
import { updateVolunteerStatusAction } from "@/server/actions/volunteer.actions";
import { toast } from "sonner";

interface Volunteer {
  id: string;
  userId: string;
  userEmail: string;
  eventId: string;
  eventTitle: string;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  createdAt: string;
}

export function VolunteersTable({ initialData, count, page }: { initialData: Volunteer[]; count?: number | null; page?: number }) {
  const [data, setData] = useState<Volunteer[]>(initialData);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: string, newStatus: Volunteer["status"]) => {
    startTransition(async () => {
      const result = await updateVolunteerStatusAction(id, newStatus);
      if (result.error) {
        toast.error(result.error);
      } else {
        setData(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
        toast.success(`Volunteer status updated to ${newStatus}`);
      }
    });
  };

  const columns: ColumnDef<Volunteer>[] = [
    {
      header: "Applicant",
      accessorKey: "userEmail",
    },
    {
      header: "Event",
      accessorKey: "eventTitle",
    },
    {
      header: "Applied On",
      accessorKey: "createdAt",
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const colors = {
          Pending: "bg-tertiary-container text-on-tertiary-container",
          Approved: "bg-primary-container text-on-primary-container",
          Rejected: "bg-error-container text-on-error-container",
          Completed: "bg-surface-variant text-on-surface-variant",
        };
        return (
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${colors[row.status]}`}>
            {row.status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status === "Pending" && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleStatusChange(row.id, "Approved")}
                disabled={isPending}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange(row.id, "Rejected")}
                disabled={isPending}
                className="text-error border-error/50 hover:bg-error/10"
              >
                Reject
              </Button>
            </>
          )}
          {row.status === "Approved" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange(row.id, "Completed")}
              disabled={isPending}
            >
              Mark Completed
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
      <DataTable columns={columns} data={data} keyExtractor={(row) => row.id} count={count} page={page} />
    </div>
  );
}
