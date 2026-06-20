import { Metadata } from "next";
import { getInquiriesAction } from "@/server/actions/inquiry.actions";
import { InquiriesTable } from "./InquiriesTable";

export const metadata: Metadata = {
  title: "Inquiries | YAD Admin",
};

export default async function AdminInquiriesPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  // We fetch 10 per page instead of 50 to fit the new pagination model
  const result = await getInquiriesAction(page, 10);

  if (!result.success) {
    return (
      <div className="p-8 text-center text-error">
        Failed to load inquiries. {result.error}
      </div>
    );
  }

  const inquiries = result.data || [];
  const count = result.count || 0;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display-md text-on-surface font-bold">Inquiries</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Review and respond to messages submitted via the QuickForm.
          </p>
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <InquiriesTable initialData={inquiries as any} count={count} page={page} />
    </div>
  );
}
