import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
  padY?: boolean;
}

export function SectionContainer({
  children,
  className,
  as: Component = "section",
  id,
  padY = true,
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "w-full max-w-container-max mx-auto px-4 md:px-6 lg:px-8",
        padY && "py-12 md:py-16 lg:py-24",
        className
      )}
    >
      {children}
    </Component>
  );
}
