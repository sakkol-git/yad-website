import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SummaryCardProps {
  title: string;
  icon: string;
  colorVariant: "primary" | "secondary" | "tertiary";
  href: string;
  actionText: string;
  children: React.ReactNode;
}

export function SummaryCard({
  title,
  icon,
  colorVariant,
  href,
  actionText,
  children,
}: SummaryCardProps) {
  const colors = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    tertiary: "bg-tertiary/10 text-tertiary",
  };

  const actionColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  };

  const iconClasses = colors[colorVariant];
  const actionTextClass = actionColors[colorVariant];

  return (
    <div className="group relative bg-surface-container rounded-md p-6 border border-outline-variant/30 hover:border-primary/40 transition-colors duration-300 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 ${iconClasses} rounded-sm flex items-center justify-center shrink-0 border border-outline-variant/30 group-hover:scale-105 transition-transform duration-300`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface">{title}</h2>
      </div>

      <div className="flex-1 mb-6">{children}</div>

      <Link
        href={href}
        className={`mt-auto flex items-center text-sm font-medium text-on-surface-variant hover:${actionTextClass} transition-colors w-fit group/link`}
      >
        <ArrowRight
          className={`w-4 h-4 mr-2 opacity-0 -ml-6 group-hover/link:opacity-100 group-hover/link:ml-0 transition-[transform,box-shadow,border-color] duration-300 ease-out ${actionTextClass}`}
        />
        <span>{actionText}</span>
      </Link>
    </div>
  );
}
