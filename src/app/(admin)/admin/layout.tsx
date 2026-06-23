import { AdminLayoutClient } from '@/shared/components/admin/AdminLayoutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | YAD',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
