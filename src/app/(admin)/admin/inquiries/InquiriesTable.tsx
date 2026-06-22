"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/shared/components/ui/Button";
import { DataTable, ColumnDef } from "@/shared/components/ui/DataTable";
import { updateInquiryStatusAction } from "@/server/actions/inquiry.actions";
import { toast } from "sonner";
import { FilterBar } from '@/shared/components/admin/data/FilterBar';

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
      id: "name",
      header: "Name",
      accessorKey: "first_name",
      cell: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "interest",
      header: "Interest",
      accessorKey: "interest",
      cell: (row) => <span className="capitalize">{row.interest}</span>,
    },
    {
      id: "message",
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
      id: "submitted",
      header: "Submitted",
      accessorKey: "created_at",
      cell: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const colors = {
          pending: "bg-tertiary-container text-on-tertiary-container",
          reviewed: "bg-secondary-container text-on-secondary-container",
          actioned: "bg-primary-container text-on-primary-container",
        };
        return (
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${colors[row.status] || "bg-surface-variant text-on-surface-variant"}`}>
            {row.status.toUpperCase()}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: <div className="text-right">Actions</div>,
      accessorKey: "id",
      enableHiding: false,
      cell: (row) => (
        <div className="flex justify-end gap-2">
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
            >
              Mark Actioned
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <FilterBar 
        searchValue={searchTerm} 
        onSearchChange={setSearchTerm} 
        searchPlaceholder="Search inquiries..."
      />
      <DataTable columns={columns} data={data} keyExtractor={(row) => row.id} count={count} page={page} emptyMessage="No inquiries found." />
    </div>
  );
}
