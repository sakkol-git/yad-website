"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table"

import Link from "next/link"

export interface ColumnDef<T> {
  header: string | React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  count?: number | null;
  page?: number;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "No results found.",
  count,
  page = 1
}: DataTableProps<T>) {
  const totalPages = count ? Math.ceil(count / 10) : 1;

  return (
    <div className="rounded-md border border-surface-variant/50 overflow-hidden bg-surface shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col, i) => (
                <TableHead key={i}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={keyExtractor(item)}>
                  {columns.map((col, i) => (
                    <TableCell key={i}>
                      {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey]) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {count !== undefined && count !== null && count > 0 && (
        <div className="p-4 border-t border-surface-variant/30 flex items-center justify-between bg-surface-bright text-on-surface-variant font-bold text-[14px] text-sm mt-auto">
          <div>
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, count)} of {count}
          </div>
          <div className="flex gap-2 items-center">
            <Link href={`?page=${Math.max(1, page - 1)}`} className={`p-1 rounded-md hover:bg-surface-container transition-colors ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
              <span className="material-symbols-outlined">chevron_left</span>
            </Link>
            <div className="w-8 h-8 rounded-md bg-secondary-container text-on-secondary-container flex items-center justify-center">{page}</div>
            {page + 1 <= totalPages && (
              <Link href={`?page=${Math.min(totalPages, page + 1)}`} className={`p-1 rounded-md hover:bg-surface-container transition-colors ${page >= totalPages ? 'opacity-50 pointer-events-none' : ''}`}>
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
