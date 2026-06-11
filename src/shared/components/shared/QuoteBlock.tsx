import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

interface QuoteBlockProps {
  children: ReactNode;
  className?: string;
}

export function QuoteBlock({ children, className }: QuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        "relative bg-surface-container-low rounded-lg p-6 border-l-4 border-secondary",
        className
      )}
    >
      <span
        className="absolute top-4 left-5 text-secondary/20 font-bold select-none"
        style={{ fontSize: "4rem", lineHeight: 1 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <div className="font-body-lg text-body-lg text-on-surface italic pl-4 relative z-10">
        {children}
      </div>
    </blockquote>
  );
}
