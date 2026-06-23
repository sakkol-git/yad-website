import { logout } from '@/server/actions/auth.actions';
import { PortalHeader } from './components/PortalHeader';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <PortalHeader logoutAction={logout} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-container-max w-full mx-auto px-margin-mobile md:px-margin-desktop py-8">
        {children}
      </main>
    </div>
  );
}
