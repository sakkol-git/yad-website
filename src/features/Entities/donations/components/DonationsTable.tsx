"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, ColumnDef } from "@/shared/components/ui/DataTable";
import { FilterBar } from "@/shared/components/admin/data/FilterBar";

export interface Donation {
  id: string;
  donor_name?: string | null;
  donor_id?: string | null;
  amount: number;
  currency: string;
  method: string;
  status: string;
  created_at: string;
  receipt_url?: string | null;
}

interface DonationsTableProps {
  donations: Donation[];
  count: number | null;
  page: number;
  search?: string;
  statusRaw?: string;
  methodRaw?: string;
}

export function DonationsTable({
  donations,
  count,
  page,
  statusRaw,
  methodRaw,
}: DonationsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) params.set("search", searchTerm);
        else params.delete("search");
        params.delete("page");
        router.push(`?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, searchParams, router]);

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set("status", e.target.value);
    else params.delete("status");
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleMethodFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) params.set("method", e.target.value);
    else params.delete("method");
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const columns: ColumnDef<Donation>[] = [
    {
      id: "donor",
      header: "Donor",
      cell: (row) => (
        <>
          <p className="font-bold text-sm text-on-surface">{row.donor_name || "Anonymous"}</p>
          {row.donor_id && <p className="text-xs text-secondary font-medium">Registered User</p>}
        </>
      ),
    },
    {
      id: "amount",
      header: "Amount",
      cell: (row) => (
        <span className="font-bold text-base text-on-surface">
          {new Intl.NumberFormat("en-US", { style: "currency", currency: row.currency }).format(
            row.amount,
          )}
        </span>
      ),
    },
    {
      id: "method",
      header: "Method",
      cell: (row) => (
        <span className="inline-flex items-center gap-1 text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-base">
            {row.method === "Stripe"
              ? "credit_card"
              : row.method === "KHQR"
                ? "qr_code_scanner"
                : "payments"}
          </span>
          {row.method}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        let colorClass = "bg-surface-variant text-on-surface-variant";
        if (row.status === "Completed")
          colorClass = "bg-primary-container text-on-primary-container";
        else if (row.status === "Pending Payment" || row.status === "Draft")
          colorClass = "bg-tertiary-container text-on-tertiary-container";
        else if (row.status === "Processing")
          colorClass = "bg-secondary-container text-on-secondary-container";
        else if (row.status === "Failed" || row.status === "Refunded")
          colorClass = "bg-error-container text-error";

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClass}`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      id: "date",
      header: "Date",
      cell: (row) => (
        <span className="text-on-surface-variant text-sm">
          {new Date(row.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      id: "actions",
      header: <div className="text-right">Actions</div>,
      enableHiding: false,
      cell: (row) => (
        <div className="flex justify-end items-center gap-2">
          {row.receipt_url && (
            <a
              href={row.receipt_url}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-secondary hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-primary/10"
              title="View Receipt"
            >
              <span className="material-symbols-outlined text-lg">receipt_long</span>
            </a>
          )}
          <button
            className="p-2 text-on-surface-variant hover:text-secondary transition-colors flex items-center justify-center rounded-full hover:bg-secondary/10"
            title="More options"
          >
            <span className="material-symbols-outlined text-lg">more_vert</span>
          </button>
        </div>
      ),
    },
  ];

  const additionalFilters = (
    <div className="flex gap-3">
      <select
        className="py-2.5 pl-3 pr-8 bg-surface-container rounded-md border border-outline-variant/30 focus:ring-2 focus:ring-primary text-sm text-on-surface-variant cursor-pointer appearance-none shadow-sm"
        value={methodRaw || ""}
        onChange={handleMethodFilterChange}
      >
        <option value="">All Methods</option>
        <option value="stripe">Stripe</option>
        <option value="khqr">KHQR</option>
        <option value="cash">Cash</option>
        <option value="other">Other</option>
      </select>
      <select
        className="py-2.5 pl-3 pr-8 bg-surface-container rounded-md border border-outline-variant/30 focus:ring-2 focus:ring-primary text-sm text-on-surface-variant cursor-pointer appearance-none shadow-sm"
        value={statusRaw || ""}
        onChange={handleStatusFilterChange}
      >
        <option value="">All Statuses</option>
        <option value="Draft">Draft</option>
        <option value="Pending Payment">Pending Payment</option>
        <option value="Processing">Processing</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
        <option value="Refunded">Refunded</option>
      </select>
    </div>
  );

  return (
    <div className="space-y-4">
      <FilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search donors..."
      >
        {additionalFilters}
      </FilterBar>

      <DataTable
        columns={columns}
        data={donations}
        keyExtractor={(row) => row.id}
        count={count}
        page={page}
        emptyMessage="No donations found."
      />
    </div>
  );
}
