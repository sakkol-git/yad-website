"use server";

"use server";

import { createSafeAction } from "@/shared/lib/safe-action";
import { revalidatePath } from "next/cache";
import * as Sentry from "@sentry/nextjs";
import { getInquiriesSchema, updateInquiryStatusSchema } from "../validators/inquiry.schema";

export const getInquiriesAction = createSafeAction(
  { schema: getInquiriesSchema, role: "admin" },
  async ({ page, pageSize }, { adminClient: supabaseAdmin }) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabaseAdmin
      .from("inquiries")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      Sentry.captureException(error);
      throw error;
    }

    return { data, count };
  },
);

export const updateInquiryStatusAction = createSafeAction(
  { schema: updateInquiryStatusSchema, role: "admin" },
  async ({ id, status }, { adminClient: supabaseAdmin }) => {
    const { error } = await supabaseAdmin
      .from("inquiries")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update({ status } as any)
      .eq("id", id);

    if (error) {
      Sentry.captureException(error);
      throw error;
    }

    revalidatePath("/admin/inquiries");
    return true;
  },
);
