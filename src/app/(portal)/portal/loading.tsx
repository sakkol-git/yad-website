import { PortalPageLayout } from '@/shared/components/portal/layout/PortalPageLayout';
import { SkeletonCard } from '@/shared/components/ui/SkeletonCard';

export default function PortalLoading() {
  return (
    <PortalPageLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 border-b border-outline-variant/30 pb-6 mb-6">
          <div className="h-10 bg-surface-variant/50 rounded-md w-1/3 skeleton-shimmer"></div>
          <div className="h-4 bg-surface-variant/50 rounded-md w-1/2 skeleton-shimmer"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard variant="stat" count={3} />
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <SkeletonCard variant="list" count={5} />
        </div>
      </div>
    </PortalPageLayout>
  );
}
