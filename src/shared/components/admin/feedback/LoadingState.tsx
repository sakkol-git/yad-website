import React from "react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Gathering your data..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
      <p className="text-body-md text-on-surface-variant animate-pulse">{message}</p>
    </div>
  );
}
