import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "surface-lowest" | "surface-low";
  containerSize?: "max" | "narrow" | "wide";
  padding?: "normal" | "large" | "none";
}

const variantClasses = {
  default: "bg-surface",
  "surface-lowest": "bg-surface-container-lowest",
  "surface-low": "bg-surface-container-low",
};

const sizeClasses = {
  max: "max-w-container-max",
  narrow: "max-w-container-narrow",
  wide: "max-w-container-wide",
};

const paddingClasses = {
  normal: "py-section-gap px-margin-mobile md:px-margin-desktop",
  large: "py-32 px-margin-mobile md:px-margin-desktop",
  none: "",
};

export function SectionContainer({
  children,
  className,
  id,
  variant = "default",
  containerSize = "max",
  padding = "normal",
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        variantClasses[variant],
        className
      )}
    >
      <div
        className={cn(
          "mx-auto",
          sizeClasses[containerSize],
          paddingClasses[padding]
        )}
      >
        {children}
      </div>
    </section>
  );
}
