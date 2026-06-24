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
            "flex h-14 w-full rounded-none border border-outline-variant/30 bg-surface px-4 py-2 text-sm font-light text-on-surface ring-offset-background file:border-0 file:bg-transparent file:font-label-bold file:text-sm placeholder:text-on-surface-variant/50 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-[border-color,box-shadow] duration-150",
            icon ? "pl-12 pr-4" : "px-4",
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
