"use client";

import { useEffect } from "react";

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
        <h1 className="text-xl font-bold text-primary">Something went wrong</h1>
        <button
          onClick={() => reset()}
          className="mt-6 px-6 py-3 rounded-full bg-secondary-container text-on-secondary-container font-bold"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
