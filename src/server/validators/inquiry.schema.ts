import { z } from "zod";

export const getInquiriesSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(20),
});

export const updateInquiryStatusSchema = z.object({
  id: z.string().uuid("Invalid inquiry ID"),
  status: z.enum(['pending', 'reviewed', 'actioned']),
});
