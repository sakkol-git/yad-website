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

// ---------------------------------------------------------------------------
// Upload Form
// ---------------------------------------------------------------------------
function UploadForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!year || year < 2000 || year > new Date().getFullYear() + 1)
      errs.year = "Enter a valid year (2000–present).";
    if (!file) errs.file = "A PDF file is required.";
    else if (!file.name.toLowerCase().endsWith(".pdf"))
      errs.file = "Only PDF files are accepted.";
    else if (file.size > 20 * 1024 * 1024)
      errs.file = "File must be under 20 MB.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year.toString());
    formData.append("file", file!);

    const result = await uploadReportAction(formData);

    if (!result.success) {
      toast.error(result.error ?? "Upload failed.");
    } else {
      toast.success("Report uploaded successfully.");
      onSuccess();
    }
    setIsUploading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-surface-container-low p-6 rounded-md border border-surface-variant flex flex-col gap-4 max-w-xl"
    >
      <h3 className="font-bold text-primary">Upload Document</h3>

      {/* Title */}
      <div>
        <label className="block text-sm font-bold mb-1">Title</label>
        <input
          type="text"
          className="stripe-input"
          placeholder="e.g., Annual Impact & Financial Report 2025"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-error text-xs mt-1">{errors.title}</p>
        )}
      </div>

      {/* Year */}
      <div>
        <label className="block text-sm font-bold mb-1">Fiscal Year</label>
        <input
          type="number"
          className="stripe-input"
          placeholder={String(new Date().getFullYear())}
          value={year}
          onChange={(e) =>
            setYear(parseInt(e.target.value) || new Date().getFullYear())
          }
        />
        {errors.year && (
          <p className="text-error text-xs mt-1">{errors.year}</p>
        )}
      </div>

      {/* File */}
      <div>
        <label className="block text-sm font-bold mb-1">PDF Document</label>
        <input
          type="file"
          accept=".pdf"
          className="block w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-primary hover:file:bg-primary-container/80 cursor-pointer"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {errors.file && (
          <p className="text-error text-xs mt-1">{errors.file}</p>
        )}
      </div>

      <div className="flex justify-end mt-2">
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading…" : "Upload Report"}
        </Button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Edit Modal
// ---------------------------------------------------------------------------
function EditModal({
  report,
  onClose,
  onSuccess,
}: {
  report: Report;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(report.title);
  const [year, setYear] = useState<number>(report.year);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year.toString());

    const result = await updateReportAction(report.id, formData);

    if (!result.success) {
      setError(result.error ?? "Update failed.");
    } else {
      toast.success("Report updated successfully.");
      onSuccess();
    }
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-md border border-outline-variant/30 shadow-xl max-w-md w-full p-6">
        <h3 className="font-bold text-primary text-lg mb-4">Edit Report</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input
              type="text"
              className="stripe-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Fiscal Year</label>
            <input
              type="number"
              className="stripe-input"
              value={year}
              onChange={(e) =>
                setYear(parseInt(e.target.value) || new Date().getFullYear())
              }
              required
            />
          </div>

          {error && (
            <p className="text-error text-sm bg-error-container/30 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Delete Confirmation Modal
// ---------------------------------------------------------------------------
function DeleteModal({
  report,
  onClose,
  onSuccess,
}: {
  report: Report;
  onClose: () => void;
  onSuccess: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteReportAction(report.id);
    if (!result.success) {
      toast.error(result.error ?? "Delete failed.");
    } else {
      toast.success("Report deleted.");
      onSuccess(report.id);
    }
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-md border border-outline-variant/30 shadow-xl max-w-sm w-full p-6">
        <h3 className="font-bold text-on-surface text-lg mb-2">Delete Report</h3>
        <p className="text-on-surface-variant text-sm mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-on-surface">{report.title}</span>?
          This will permanently remove the record and its PDF from storage.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outline"
            className="text-error border-error hover:bg-error-container"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

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
                <TableCell className="font-medium tabular-nums">
                  {report.year}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {report.title}
                </TableCell>
                <TableCell className="text-on-surface-variant text-sm">
                  {formatFileSize(report.file_size_bytes)}
                </TableCell>
                <TableCell className="text-on-surface-variant text-sm">
                  {new Date(report.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <a
                      href={report.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        View PDF
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingReport(report)}
                    >
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
                  href={
                    currentPage > 1
                      ? `/admin/reports?page=${currentPage - 1}`
                      : "#"
                  }
                  aria-disabled={currentPage <= 1}
                  className={
                    currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-on-surface-variant px-4">
                  of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={
                    currentPage < totalPages
                      ? `/admin/reports?page=${currentPage + 1}`
                      : "#"
                  }
                  aria-disabled={currentPage >= totalPages}
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
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
