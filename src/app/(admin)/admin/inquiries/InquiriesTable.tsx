"use client";

import { useState, useTransition } from "react";
import { Button } from "@/shared/components/ui/Button";
import { DataTable, ColumnDef } from "@/shared/components/ui/DataTable";
import { updateInquiryStatusAction } from "@/server/actions/inquiry.actions";
import { toast } from "sonner";

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  interest: string;
  message?: string;
  status: "pending" | "reviewed" | "actioned";
  created_at: string;
}

export function InquiriesTable({ initialData, count, page }: { initialData: Inquiry[]; count?: number | null; page?: number }) {
  const [data, setData] = useState<Inquiry[]>(initialData);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: string, newStatus: Inquiry["status"]) => {
    startTransition(async () => {
      const result = await updateInquiryStatusAction(id, newStatus);
      if (result.error) {
        toast.error(result.error);
      } else {
        setData(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
        toast.success(`Inquiry marked as ${newStatus}`);
      }
    });
  };

  const columns: ColumnDef<Inquiry>[] = [
    {
      header: "Name",
      accessorKey: "first_name",
      cell: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Interest",
      accessorKey: "interest",
      cell: (row) => <span className="capitalize">{row.interest}</span>,
    },
    {
      header: "Message",
      accessorKey: "message",
      cell: (row) => {
        if (!row.message) return <span className="text-on-surface-variant italic">No message</span>;
        const isLong = row.message.length > 50;
        return (
          <div className="max-w-[200px]" title={row.message}>
            {isLong ? `${row.message.substring(0, 50)}...` : row.message}
          </div>
        );
      },
    },
    {
      header: "Submitted",
      accessorKey: "created_at",
      cell: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const colors = {
          pending: "bg-amber-100 text-amber-800 border-amber-200",
          reviewed: "bg-blue-100 text-blue-800 border-blue-200",
          actioned: "bg-green-100 text-green-800 border-green-200",
        };
        return (
          <span className={`px-2 py-1 text-xs font-bold rounded-full border ${colors[row.status] || "bg-surface-variant text-on-surface-variant"}`}>
            {row.status.toUpperCase()}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status === "pending" && (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleStatusChange(row.id, "reviewed")}
              disabled={isPending}
            >
              Mark Reviewed
            </Button>
          )}
          {row.status === "reviewed" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange(row.id, "actioned")}
              disabled={isPending}
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              Mark Actioned
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
