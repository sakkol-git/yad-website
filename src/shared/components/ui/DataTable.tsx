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
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "No results found."
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border border-surface-variant/50 overflow-hidden bg-surface shadow-sm">
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
  )
}
