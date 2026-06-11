import { AdminSidebar } from '@/shared/components/admin/AdminSidebar';
import { AdminHeader } from '@/shared/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface-container-low font-body-md text-body-md">
      <AdminSidebar />
      <div className="flex-1 ml-72 flex flex-col min-h-screen w-[calc(100%-18rem)]">
        <AdminHeader />
        <main className="flex-1 flex flex-col overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
