"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/Table";
import { Button } from "@/shared/components/ui/Button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/Pagination";
import {
  uploadReportAction,
  updateReportAction,
  deleteReportAction,
} from "@/server/actions/report.actions";
import { toast } from "sonner";
import { Database } from "@/shared/types/supabase";

type Report = Database["public"]["Tables"]["annual_reports"]["Row"];

/** Format bytes to human-readable string, e.g. "4.2 MB" */
function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes || bytes === 0) return "PDF";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB PDF`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB PDF`;
}

import { UploadForm } from "./components/UploadForm";
import { EditModal } from "./components/EditModal";
import { DeleteModal } from "./components/DeleteModal";

// ---------------------------------------------------------------------------
// Main ReportsTable Component
// ---------------------------------------------------------------------------
export function ReportsTable({
  initialReports,
  currentPage = 1,
  totalPages = 1,
}: {
  initialReports: Report[];
  currentPage?: number;
  totalPages?: number;
}) {
  const router = useRouter();
  const [reports, setReports] = useState(initialReports);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [deletingReport, setDeletingReport] = useState<Report | null>(null);

  const refreshData = () => {
    router.refresh();
    setShowUploadForm(false);
  };

  const handleDeleteSuccess = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    setDeletingReport(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-on-surface">All Reports</h2>
        <Button
          onClick={() => setShowUploadForm((v) => !v)}
          variant={showUploadForm ? "outline" : "primary"}
        >
          {showUploadForm ? "Cancel" : "Upload New Report"}
        </Button>
      </div>

      {/* Upload Form */}
      {showUploadForm && <UploadForm onSuccess={refreshData} />}

      {/* Table / Empty State */}
      {reports.length === 0 ? (
        <div className="text-center p-12 text-on-surface-variant bg-surface-container/30 rounded-md border border-dashed border-outline-variant/40">
          <span className="material-symbols-outlined text-4xl text-outline mb-3 block">
            description
          </span>
          <p className="font-medium">No reports found.</p>
          <p className="text-sm mt-1">Upload the first annual report above.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium tabular-nums">{report.year}</TableCell>
                <TableCell className="max-w-xs truncate">{report.title}</TableCell>
                <TableCell className="text-on-surface-variant text-sm">
                  {formatFileSize(report.file_size_bytes)}
                </TableCell>
                <TableCell className="text-on-surface-variant text-sm">
                  {new Date(report.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <a href={report.file_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        View PDF
                      </Button>
                    </a>
                    <Button variant="outline" size="sm" onClick={() => setEditingReport(report)}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="text-error border-error hover:bg-error-container"
                      size="sm"
                      onClick={() => setDeletingReport(report)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 border-t border-surface-variant pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={currentPage > 1 ? `/admin/reports?page=${currentPage - 1}` : "#"}
                  aria-disabled={currentPage <= 1}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-on-surface-variant px-4">of {totalPages}</span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={currentPage < totalPages ? `/admin/reports?page=${currentPage + 1}` : "#"}
                  aria-disabled={currentPage >= totalPages}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Modal */}
      {editingReport && (
        <EditModal
          report={editingReport}
          onClose={() => setEditingReport(null)}
          onSuccess={() => {
            setEditingReport(null);
            router.refresh();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingReport && (
        <DeleteModal
          report={deletingReport}
          onClose={() => setDeletingReport(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
