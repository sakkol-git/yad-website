import { Metadata } from "next";
import { getVolunteerRequestsAction } from "@/server/actions/volunteer.actions";
import { VolunteersTable } from "./VolunteersTable";

export const metadata: Metadata = {
  title: "Volunteer Management | YAD Admin",
};

export default async function AdminVolunteersPage() {
  const result = await getVolunteerRequestsAction();

  if (result.error) {
    return (
      <div className="p-8 text-center text-error">
        Failed to load volunteer requests.
      </div>
    );
  }

  const volunteers = result.data || [];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display-md text-on-surface font-bold">Volunteer Requests</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Review and approve event volunteer applications.
          </p>
        </div>
      </div>

      <VolunteersTable initialData={volunteers} />
    </div>
  );
}
