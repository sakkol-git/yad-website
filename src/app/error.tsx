"use client";

import { useEffect } from "react";
import { Button } from "@/shared/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-headline-md font-bold text-primary">Something went wrong</h1>
        <p className="text-on-surface-variant mt-2 mb-6">
          An unexpected error occurred while rendering this page.
        </p>
        <Button onClick={() => reset()} variant="default" className="w-full sm:w-auto">
          Try again
        </Button>
      </div>
    </div>
  );
}
