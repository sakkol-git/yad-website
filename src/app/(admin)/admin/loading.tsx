import { AdminPageLayout } from "@/shared/components/admin/layout/AdminPageLayout";
import { SkeletonCard } from "@/shared/components/ui/SkeletonCard";

export default function AdminLoading() {
  return (
    <AdminPageLayout>
      <div className="space-y-8 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col gap-4 border-b border-outline-variant/30 pb-6 mb-6">
          <div className="h-10 bg-surface-variant/50 rounded-md w-1/3 skeleton-shimmer"></div>
          <div className="h-4 bg-surface-variant/50 rounded-md w-1/2 skeleton-shimmer"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <SkeletonCard variant="stat" count={4} />
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <SkeletonCard variant="list" count={5} />
        </div>
      </div>
    </AdminPageLayout>
  );
}
