import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

export type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-sm border border-outline-variant bg-surface-container-low px-3 py-2 font-body-md text-sm text-on-surface ring-offset-background placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors appearance-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
FormSelect.displayName = "FormSelect";
