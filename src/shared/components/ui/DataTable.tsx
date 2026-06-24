"use client"

import React, { useState, useMemo } from "react"
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
  id?: string;
  header: string | React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  enableHiding?: boolean;
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
  emptyMessage = "Nothing here yet — check back soon.",
  count,
  page = 1
}: DataTableProps<T>) {
  const totalPages = count ? Math.ceil(count / 10) : 1;

  // Derive an ID for each column for the visibility toggle
  const colsWithId = useMemo(() => {
    return columns.map((col, i) => ({
      ...col,
      id: col.id || (typeof col.header === 'string' ? col.header : `col-${i}`)
    }));
  }, [columns]);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    const initialVisibility: Record<string, boolean> = {};
    colsWithId.forEach(col => {
      initialVisibility[col.id] = true;
    });
    return initialVisibility;
  });

  const [showColumnToggle, setShowColumnToggle] = useState(false);

  const toggleColumn = (id: string) => {
    setVisibleColumns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeColumns = colsWithId.filter(col => visibleColumns[col.id]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <div className="relative">
          <button 
            onClick={() => setShowColumnToggle(!showColumnToggle)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-on-surface border border-outline-variant/50 rounded-md bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">view_column</span>
            Columns
          </button>
          
          {showColumnToggle && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest border border-outline-variant/30 rounded-md shadow-lg z-10 p-2 animate-in fade-in zoom-in-95">
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 px-2">Toggle Columns</div>
              {colsWithId.filter(c => c.enableHiding !== false).map(col => (
                <label key={col.id} className="flex items-center gap-2 px-2 py-1.5 hover:bg-surface rounded-md cursor-pointer text-sm text-on-surface">
                  <input 
                    type="checkbox" 
                    checked={visibleColumns[col.id]} 
                    onChange={() => toggleColumn(col.id)}
                    className="rounded-md border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="truncate">{typeof col.header === 'string' ? col.header : col.id}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md border border-surface-variant/50 overflow-hidden bg-surface shadow-sm flex flex-col relative">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-surface-container-lowest sticky top-0 z-10 shadow-sm">
              <TableRow className="hover:bg-transparent">
                {activeColumns.map((col, i) => (
                  <TableHead key={col.id} className="font-bold text-on-surface-variant whitespace-nowrap">
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={activeColumns.length} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[32px] mb-2 opacity-50">inbox</span>
                      <p>{emptyMessage}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={keyExtractor(item)} className="hover:bg-surface-container-lowest/50 transition-colors">
                    {activeColumns.map((col, i) => (
                      <TableCell key={col.id}>
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
          <div className="p-4 border-t border-surface-variant/30 flex flex-col sm:flex-row items-center justify-between bg-surface-bright text-on-surface-variant font-bold text-sm mt-auto gap-4">
            <div>
              Showing <span className="text-on-surface">{(page - 1) * 10 + 1}</span> to <span className="text-on-surface">{Math.min(page * 10, count)}</span> of <span className="text-on-surface">{count}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Link href={`?page=${Math.max(1, page - 1)}`} className={`p-1 rounded-md hover:bg-surface-container transition-colors ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </Link>
              <div className="w-8 h-8 rounded-md bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">{page}</div>
              {page + 1 <= totalPages && (
                <Link href={`?page=${Math.min(totalPages, page + 1)}`} className={`p-1 rounded-md hover:bg-surface-container transition-colors ${page >= totalPages ? 'opacity-50 pointer-events-none' : ''}`}>
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
