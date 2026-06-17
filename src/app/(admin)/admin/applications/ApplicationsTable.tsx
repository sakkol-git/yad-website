"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/Table";
import { Button } from "@/shared/components/ui/Button";
import { 
  Pagination, PaginationContent, PaginationItem, 
  PaginationLink, PaginationNext, PaginationPrevious 
} from "@/shared/components/ui/Pagination";
import { updateApplicationStatusAction } from "@/server/actions/apply.actions";
import { toast } from "sonner";
import { Database } from "@/shared/types/supabase";

type Application = Database["public"]["Tables"]["student_applications"]["Row"];

export function ApplicationsTable({ 
  initialApplications,
  currentPage = 1,
  totalPages = 1
}: { 
  initialApplications: Application[],
  currentPage?: number,
  totalPages?: number
}) {
  const [applications, setApplications] = useState(initialApplications);

  const handleStatusChange = async (id: string, newStatus: Application["status"]) => {
    const result = await updateApplicationStatusAction(id, newStatus);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Application marked as ${newStatus}`);
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    }
  };

  return (
    <div className="p-6">
      {applications.length === 0 ? (
        <div className="text-center p-8 text-on-surface-variant bg-surface-container/30 rounded-lg">
          No applications found.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{new Date(app.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <p className="font-bold">{app.first_name} {app.last_name}</p>
                  <p className="text-xs text-on-surface-variant">{app.email}</p>
                  <p className="text-xs text-on-surface-variant">{app.phone}</p>
                </TableCell>
                <TableCell>{app.education_level}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                    app.status === 'accepted' ? 'bg-secondary-container text-on-secondary-container' :
                    app.status === 'rejected' ? 'bg-error-container text-on-error-container' :
                    app.status === 'reviewed' ? 'bg-tertiary-container text-on-tertiary-container' :
                    'bg-surface-variant text-on-surface-variant'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => alert(`Essay for ${app.first_name}:\n\n${app.essay}`)}>
                      Read Essay
                    </Button>
                    <select 
                      className="text-sm border border-surface-variant rounded px-2 py-1 bg-surface"
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as Application["status"])}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
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
                  href={currentPage > 1 ? `/admin/applications?page=${currentPage - 1}` : "#"} 
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
                  href={currentPage < totalPages ? `/admin/applications?page=${currentPage + 1}` : "#"} 
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
