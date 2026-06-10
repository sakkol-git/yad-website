"use client";

import { Button } from "@/shared/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-surface px-4">
          <div className="text-center max-w-md">
            <span className="material-symbols-outlined text-6xl text-error mb-4">
              error
            </span>
            <h2 className="font-headline-md text-primary mb-4">
              Something went critically wrong
            </h2>
            <p className="text-on-surface-variant mb-8">
              A critical application error occurred. Our team has been notified.
            </p>
            <Button onClick={() => reset()} className="w-full">
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
