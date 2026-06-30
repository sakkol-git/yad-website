import { createClient } from "@/shared/lib/supabase/server";
import { reportsService } from "@/server/services/reports.service";
import { ReportsTable } from "./ReportsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Annual Reports | YAD Cambodia",
};

export default async function AdminReportsPage(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const supabase = await createClient();
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search ?? undefined;
  const pageSize = 10;

  let reports: Awaited<ReturnType<typeof reportsService.getReports>>["data"] = [];
  let totalPages = 1;

  try {
    const { data, count } = await reportsService.getReports(supabase, {
      page,
      limit: pageSize,
      search,
    });
    reports = data;
    totalPages = Math.ceil((count || 0) / pageSize);
  } catch (err) {
    console.error("[AdminReportsPage] Failed to fetch reports:", err);
    // Will render with empty state
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Annual Reports</h1>
        <p className="text-on-surface-variant mt-1">
          Manage public financial reports and impact documents.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-surface-variant/30 rounded-md shadow-sm">
        <ReportsTable initialReports={reports} currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
