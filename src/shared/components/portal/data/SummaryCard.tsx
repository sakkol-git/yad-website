import React from 'react';
import Link from 'next/link';

interface SummaryCardProps {
  title: string;
  icon: string;
  colorVariant: 'primary' | 'secondary' | 'tertiary';
  href: string;
  actionText: string;
  children: React.ReactNode;
}

export function SummaryCard({ title, icon, colorVariant, href, actionText, children }: SummaryCardProps) {
  const colors = {
    primary: 'bg-primary/10 text-primary hover:bg-primary/5 text-primary',
    secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/5 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary hover:bg-tertiary/5 text-tertiary',
  };

  const iconBg = colors[colorVariant].split(' ')[0];
  const iconText = colors[colorVariant].split(' ')[1];
  const hoverBg = colors[colorVariant].split(' ')[2];
  const actionColor = colors[colorVariant].split(' ')[3];

  return (
    <div className="bg-surface rounded-none p-5 md:p-8 border border-outline-variant/30 flex flex-col group h-full transition-colors hover:border-primary">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-12 h-12 ${iconBg} ${iconText} rounded-none flex items-center justify-center shrink-0 border border-outline-variant/30`}>
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
        <h2 className="text-2xl font-light tracking-tight text-on-surface">{title}</h2>
      </div>
      
      <div className="flex-1 mb-5">
        {children}
      </div>
      
      <Link href={href} className={`mt-auto flex items-center justify-between text-[10px] font-bold tracking-widest uppercase ${actionColor} ${hoverBg} p-4 border border-outline-variant/30 rounded-none transition-colors group-hover:bg-opacity-100`}>
        {actionText}
        <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </Link>
    </div>
  );
}
