import React from 'react';

interface AdminPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminPageLayout({ children, className = '' }: AdminPageLayoutProps) {
  return (
    <main className={`flex-1 p-6 lg:p-10 max-w-[1600px] w-full mx-auto animate-fade-in ${className}`}>
      {children}
    </main>
  );
}
