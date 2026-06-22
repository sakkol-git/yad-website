import React from 'react';
import { FormLabel } from '@/shared/components/ui/FormLabel';
import { cn } from '@/shared/lib/utils';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  description,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <FormLabel htmlFor={htmlFor} className={cn('mb-0', error ? 'text-error' : 'text-on-surface-variant')}>
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </FormLabel>
      {description && (
        <p className="text-[13px] text-on-surface-variant/80 mb-1 leading-snug">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-[13px] font-medium text-error flex items-center gap-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
}
