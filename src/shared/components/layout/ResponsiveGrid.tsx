import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg" | "gutter";
}

export function ResponsiveGrid({
  children,
  className,
  columns = 3,
  gap = "gutter",
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: "gap-4 md:gap-6",
    md: "gap-6 md:gap-8",
    lg: "gap-8 md:gap-12",
    gutter: "gap-gutter",
  };

  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid w-full", colClasses[columns], gapClasses[gap], className)}>
      {children}
    </div>
  );
}
