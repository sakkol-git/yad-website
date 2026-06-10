export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="font-semibold text-gray-800">Admin Dashboard</div>
      <div>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign out</button>
      </div>
    </header>
  );
}
