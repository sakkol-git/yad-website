import { Metadata } from "next";
import { getProgramsAction } from "@/server/actions/program.actions";
import { ProgramsTable } from "./ProgramsTable";

export const metadata: Metadata = {
  title: "Programs | YAD Admin",
};

export default async function AdminProgramsPage(props: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search;

  const result = await getProgramsAction(page, 10, search);

  if (!result.success) {
    return (
      <div className="p-8 text-center text-error">
        Failed to load programs. {result.error}
      </div>
    );
  }

  const programs = result.data || [];
  const count = result.count || 0;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display-md text-on-surface font-bold">Programs</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Manage your organization's programs, initiatives, and impact metrics.
          </p>
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ProgramsTable initialData={programs as any} count={count} page={page} />
    </div>
  );
}
