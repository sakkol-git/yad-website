import { PortalPageLayout } from '@/shared/components/portal/layout/PortalPageLayout';

export default function PortalLoading() {
  return (
    <PortalPageLayout>
      <div className="animate-pulse space-y-8">
        <div className="flex flex-col gap-4 border-b border-outline-variant/30 pb-6 mb-6">
          <div className="h-10 bg-surface-variant/50 rounded-md w-1/3"></div>
          <div className="h-4 bg-surface-variant/50 rounded-md w-1/2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-48 bg-surface-container-lowest rounded-xl border border-outline-variant/30"></div>
          <div className="h-48 bg-surface-container-lowest rounded-xl border border-outline-variant/30"></div>
          <div className="h-48 bg-surface-container-lowest rounded-xl border border-outline-variant/30"></div>
        </div>

        <div className="h-96 bg-surface-container-lowest rounded-xl border border-outline-variant/30"></div>
      </div>
    </PortalPageLayout>
  );
}
