"use client";

import { useState } from "react";
import { uploadReportAction } from "@/server/actions/report.actions";
import { Button } from "@/shared/components/ui/Button";
import { toast } from "sonner";

export function UploadForm({ onSuccess }: { onSuccess: () => void }) {
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
    else if (!file.name.toLowerCase().endsWith(".pdf")) errs.file = "Only PDF files are accepted.";
    else if (file.size > 20 * 1024 * 1024) errs.file = "File must be under 20 MB.";
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
        <label htmlFor="upload-title" className="block text-sm font-bold mb-1">Title</label>
        <input
          id="upload-title"
          type="text"
          className="stripe-input"
          placeholder="e.g., Annual Impact & Financial Report 2025"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-error text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Year */}
      <div>
        <label htmlFor="upload-year" className="block text-sm font-bold mb-1">Fiscal Year</label>
        <input
          id="upload-year"
          type="number"
          className="stripe-input"
          placeholder={String(new Date().getFullYear())}
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
        />
        {errors.year && <p className="text-error text-xs mt-1">{errors.year}</p>}
      </div>

      {/* File */}
      <div>
        <label htmlFor="upload-file" className="block text-sm font-bold mb-1">PDF Document</label>
        <input
          id="upload-file"
          type="file"
          accept=".pdf"
          className="block w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-primary hover:file:bg-primary-container/80 cursor-pointer"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {errors.file && <p className="text-error text-xs mt-1">{errors.file}</p>}
      </div>

      <div className="flex justify-end mt-2">
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading…" : "Upload Report"}
        </Button>
      </div>
    </form>
  );
}
