import React from 'react';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">
          {title}
        </h1>
        {description && (
          <p className="text-body-md text-on-surface-variant font-medium mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap gap-3 items-center">
          {actions}
        </div>
      )}
    </div>
  );
}
