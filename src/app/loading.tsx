export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-secondary-container border-t-primary rounded-full animate-spin" />
        <p className="text-on-surface-variant font-body-md text-body-md">Loading...</p>
      </div>
    </div>
  );
}
