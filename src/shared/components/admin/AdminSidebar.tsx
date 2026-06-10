import Link from 'next/link';

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-gray-900 text-white flex flex-col">
      <div className="p-6 font-bold text-xl border-b border-gray-800">
        YAD Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/admin/dashboard" className="block p-2 hover:bg-gray-800 rounded">Dashboard</Link>
        <Link href="/admin/donations" className="block p-2 hover:bg-gray-800 rounded">Donations</Link>
        <Link href="/admin/donors" className="block p-2 hover:bg-gray-800 rounded">Donors</Link>
        <Link href="/admin/events" className="block p-2 hover:bg-gray-800 rounded">Events</Link>
        <Link href="/admin/members" className="block p-2 hover:bg-gray-800 rounded">Members</Link>
        <Link href="/admin/partners" className="block p-2 hover:bg-gray-800 rounded">Partners</Link>
        <Link href="/admin/programs" className="block p-2 hover:bg-gray-800 rounded">Programs</Link>
        <Link href="/admin/users" className="block p-2 hover:bg-gray-800 rounded">Users</Link>
        <Link href="/admin/bookings" className="block p-2 hover:bg-gray-800 rounded">Bookings</Link>
        <Link href="/admin/homestays" className="block p-2 hover:bg-gray-800 rounded">Homestays</Link>
      </nav>
    </aside>
  );
}
