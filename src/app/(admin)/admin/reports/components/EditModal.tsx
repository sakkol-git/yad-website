"use client";

import { useState } from "react";
import { updateReportAction } from "@/server/actions/report.actions";
import { Button } from "@/shared/components/ui/Button";
import { toast } from "sonner";
import { Database } from "@/shared/types/supabase";

type Report = Database["public"]["Tables"]["annual_reports"]["Row"];

export function EditModal({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-md border border-outline-variant/30 shadow-xl max-w-md w-full p-6">
        <h3 className="font-bold text-primary text-lg mb-4">Edit Report</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-bold mb-1">Title</label>
            <input
              id="edit-title"
              type="text"
              className="stripe-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="edit-year" className="block text-sm font-bold mb-1">Fiscal Year</label>
            <input
              id="edit-year"
              type="number"
              className="stripe-input"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
              required
            />
          </div>

          {error && (
            <p className="text-error text-sm bg-error-container/30 px-3 py-2 rounded-md">{error}</p>
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
