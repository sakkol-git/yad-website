/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/shared/lib/supabase/server';
import { RoomsRepository } from '@/server/repositories/rooms';
import { HomestaysTable } from '@/features/Entities/homestays/components/HomestaysTable';

export default async function HomestaysPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const repo = new RoomsRepository();

  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const search = typeof params.search === 'string' ? params.search : undefined;

  const statusRaw = typeof params.status === 'string' ? params.status : undefined;
  const status = statusRaw ? statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1) : undefined;

  const { data: rooms, count } = await repo.getPaginated(supabase, page, 10, search, status);

  return (
    <div className="flex-1 p-4 md:p-12 max-w-[1280px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[36px] md:text-[48px] font-bold leading-tight tracking-tight text-on-background mb-2">
            Homestay Management
          </h1>
          <p className="text-[16px] text-on-surface-variant">
            Manage rooms, occupancy, and check-ins.
          </p>
        </div>
        <button className="py-3 px-6 bg-secondary text-on-secondary rounded-full font-bold text-[14px] shadow-sm hover:scale-[1.02] hover:bg-secondary/90 transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap">
          <span className="material-symbols-outlined">add</span>
          Add Room
        </button>
      </div>

      <HomestaysTable
        rooms={rooms || []}
        count={count}
        page={page}
        search={search}
        statusRaw={statusRaw}
      />
    </div>
  );
}
