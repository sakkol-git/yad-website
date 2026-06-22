import React from 'react';

interface PortalPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

/**
 * Standardized header for Portal pages.
 * Displays page title, description, and an optional slot for primary actions.
 */
export function PortalPageHeader({ title, description, actions }: PortalPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/30 pb-6 mb-6">
      <div>
        <h1 className="text-[28px] md:text-[36px] font-bold text-on-background leading-tight tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm md:text-base text-on-surface-variant mt-2 max-w-3xl">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 w-full sm:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
