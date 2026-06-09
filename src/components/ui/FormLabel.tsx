import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-label-bold text-on-surface leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
          className
        )}
        {...props}
      />
    );
  }
);
FormLabel.displayName = "FormLabel";
