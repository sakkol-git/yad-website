import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <p className="mt-4 text-on-surface-variant">Page not found</p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 rounded-full bg-secondary-container text-on-secondary-container font-bold"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
