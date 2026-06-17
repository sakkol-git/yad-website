'use client';

import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-container-low font-body-md text-body-md">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-72 lg:w-[calc(100%-18rem)] transition-all">
        <AdminHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex-1 flex flex-col overflow-x-hidden max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
