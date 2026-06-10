import { getPrograms } from '@/server/actions/program.actions';
import { ProgramsTable } from '@/features/Entities/programs/components/ProgramsTable';

export const metadata = {
  title: 'Programs Management - YAD Admin',
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full animate-fade-in">
      <ProgramsTable programs={programs} />
    </div>
  );
}
