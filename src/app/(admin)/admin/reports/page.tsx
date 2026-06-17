import { createClient } from "@/shared/lib/supabase/server";
import { ReportsTable } from "./ReportsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Annual Reports | YAD Cambodia",
};

export default async function AdminReportsPage(props: { searchParams: Promise<{ page?: string }> }) {
  const supabase = await createClient();
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: reports, count } = await supabase
    .from("annual_reports")
    .select("*", { count: "exact" })
    .order("year", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / pageSize);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Annual Reports</h1>
        <p className="text-on-surface-variant mt-1">Manage public financial reports and impact documents.</p>
      </div>

      <div className="bg-surface-container-lowest border border-surface-variant/30 rounded-lg shadow-sm">
        <ReportsTable 
          initialReports={(reports as any) || []} 
          currentPage={page} 
          totalPages={totalPages} 
        />
      </div>
    </div>
  );
}
