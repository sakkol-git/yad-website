'use client';

import { useEffect } from 'react';
import { PortalPageLayout } from '@/shared/components/portal/layout/PortalPageLayout';
import { Button } from '@/shared/components/ui/Button';

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Portal Error:', error);
  }, [error]);

  return (
    <PortalPageLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-surface-container-lowest rounded-md border border-error/20 shadow-sm">
        <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[32px]">warning</span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Something went wrong</h2>
        <p className="text-on-surface-variant max-w-md mb-8">
          We encountered an unexpected error while loading this page. Our team has been notified.
        </p>
        <div className="flex gap-4">
          <Button variant="default" onClick={() => reset()} className="min-h-[44px]">
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/portal/dashboard'} className="min-h-[44px]">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </PortalPageLayout>
  );
}
