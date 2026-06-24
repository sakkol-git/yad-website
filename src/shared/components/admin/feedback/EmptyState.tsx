import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon = 'inbox', action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface-container-lowest rounded-md-md border border-outline-variant/30">
      <div className="w-16 h-16 bg-surface-container rounded-md-full flex items-center justify-center mb-4 text-on-surface-variant">
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <h3 className="text-title-lg font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-body-md text-on-surface-variant max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
