import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "secondary" | "primary" | "tertiary";
  className?: string;
}

const variantClasses: Record<string, string> = {
  secondary:
    "bg-secondary-container text-on-secondary-container",
  primary:
    "bg-primary-container text-on-primary-container",
  tertiary:
    "bg-tertiary-container text-on-tertiary-container",
};

export function Badge({
  children,
  variant = "secondary",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-4 py-1 rounded-full font-label-bold text-label-bold text-xs tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
