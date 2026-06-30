import { z } from "zod";

const CURRENT_YEAR = new Date().getFullYear();
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export const uploadReportSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be under 200 characters"),
  year: z
    .number({ invalid_type_error: "Year must be a number" })
    .int("Year must be an integer")
    .min(2000, "Year must be 2000 or later")
    .max(CURRENT_YEAR + 1, `Year cannot be more than ${CURRENT_YEAR + 1}`),
});

export type UploadReportInput = z.infer<typeof uploadReportSchema>;

export const updateReportSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be under 200 characters"),
  year: z
    .number({ invalid_type_error: "Year must be a number" })
    .int("Year must be an integer")
    .min(2000, "Year must be 2000 or later")
    .max(CURRENT_YEAR + 1, `Year cannot be more than ${CURRENT_YEAR + 1}`),
});

export type UpdateReportInput = z.infer<typeof updateReportSchema>;

/**
 * Validates a File object for report uploads.
 * Returns an error string or null if valid.
 */
export function validateReportFile(file: File | null): string | null {
  if (!file || file.size === 0) return "A PDF file is required.";
  if (!file.name.toLowerCase().endsWith(".pdf")) return "Only PDF files are accepted.";
  if (file.size > MAX_FILE_SIZE_BYTES) return "File must be under 20 MB.";
  return null;
}
