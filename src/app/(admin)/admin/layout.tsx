import { AdminSidebar } from '@/shared/components/admin/AdminSidebar';
import { AdminHeader } from '@/shared/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background font-body-md text-body-md">
      <AdminSidebar />
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
