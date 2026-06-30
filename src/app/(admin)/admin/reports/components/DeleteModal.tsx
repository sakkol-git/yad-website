"use client";

import { useState } from "react";
import { deleteReportAction } from "@/server/actions/report.actions";
import { Button } from "@/shared/components/ui/Button";
import { toast } from "sonner";
import { Database } from "@/shared/types/supabase";

type Report = Database["public"]["Tables"]["annual_reports"]["Row"];

export function DeleteModal({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-md border border-outline-variant/30 shadow-xl max-w-sm w-full p-6">
        <h3 className="font-bold text-on-surface text-lg mb-2">Delete Report</h3>
        <p className="text-on-surface-variant text-sm mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-on-surface">{report.title}</span>? This will
          permanently remove the record and its PDF from storage.
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
