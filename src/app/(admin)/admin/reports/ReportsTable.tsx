"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/Table";
import { Button } from "@/shared/components/ui/Button";
import { 
  Pagination, PaginationContent, PaginationItem, 
  PaginationLink, PaginationNext, PaginationPrevious 
} from "@/shared/components/ui/Pagination";
import { uploadReportAction, deleteReportAction } from "@/server/actions/report.actions";
import { toast } from "sonner";
import { Database } from "@/shared/types/supabase";

type Report = Database["public"]["Tables"]["annual_reports"]["Row"];

export function ReportsTable({ 
  initialReports,
  currentPage = 1,
  totalPages = 1
}: { 
  initialReports: Report[],
  currentPage?: number,
  totalPages?: number
}) {
  const [reports, setReports] = useState(initialReports);
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !year || !file) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year.toString());
    formData.append("file", file);

    const result = await uploadReportAction(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Report uploaded successfully");
      setShowForm(false);
      // Let Server Action revalidate and refresh the page data
      window.location.reload(); 
    }
    setIsUploading(false);
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm("Are you sure you want to delete this report? This action cannot be undone.")) return;

    const result = await deleteReportAction(id, fileUrl);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Report deleted successfully");
      setReports((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-on-surface">All Reports</h2>
        <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "primary"}>
          {showForm ? "Cancel" : "Upload New Report"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleUpload} className="mb-8 bg-surface-container-low p-6 rounded-lg border border-surface-variant flex flex-col gap-4 max-w-xl">
          <h3 className="font-bold text-primary">Upload Document</h3>
          
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input 
              type="text" 
              className="stripe-input" 
              placeholder="e.g., Annual Report 2023"
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
              placeholder="2023"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">PDF Document</label>
            <input 
              type="file" 
              accept=".pdf"
              className="block w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-primary hover:file:bg-primary-container/80 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="flex justify-end mt-2">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      )}

      {reports.length === 0 ? (
        <div className="text-center p-8 text-on-surface-variant bg-surface-container/30 rounded-lg">
          No reports found. Upload the first annual report.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Uploaded At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.year}</TableCell>
                <TableCell>{report.title}</TableCell>
                <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <a href={report.file_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">View PDF</Button>
                  </a>
                  <Button variant="outline" className="text-error border-error hover:bg-error-container" size="sm" onClick={() => handleDelete(report.id, report.file_url)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

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
                <span className="text-sm text-on-surface-variant px-4">
                  Page {currentPage} of {totalPages}
                </span>
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
    </div>
  );
}
