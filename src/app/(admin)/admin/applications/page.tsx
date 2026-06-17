import { createClient } from "@/shared/lib/supabase/server";
import { ApplicationsTable } from "./ApplicationsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Student Applications | YAD Cambodia",
};

export default async function AdminApplicationsPage(props: { searchParams: Promise<{ page?: string }> }) {
  const supabase = await createClient();
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: applications, count } = await supabase
    .from("student_applications")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / pageSize);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-headline-md text-headline-md text-primary">Student Applications</h1>
        <p className="text-on-surface-variant mt-1">Review and manage dormitory and scholarship applications.</p>
      </div>

      <div className="bg-surface-container-lowest border border-surface-variant/30 rounded-lg shadow-sm">
        <ApplicationsTable
          initialApplications={(applications as any) || []}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
