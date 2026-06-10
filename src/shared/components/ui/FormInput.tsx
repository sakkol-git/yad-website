import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-md border border-outline-variant bg-surface-container-low py-2 font-body-md text-sm text-on-surface ring-offset-background file:border-0 file:bg-transparent file:font-label-bold file:text-sm placeholder:text-on-surface-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            icon ? "pl-10 pr-3" : "px-3",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none">
            {icon}
          </span>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
