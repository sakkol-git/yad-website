"use client";

import Link from "next/link";
import { useGlowFollow } from "@/shared/hooks/useGlowFollow";

interface ImpactPathCardProps {
  colorKey: "primary" | "secondary" | "tertiary";
  iconBg: string;
  iconColor: string;
  icon: string;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
  linkColor: string;
  glowBg: string;
  glowHoverBg: string;
  offset: boolean;
}

export function ImpactPathCard({
  iconBg,
  iconColor,
  icon,
  title,
  description,
  linkLabel,
  linkHref,
  linkColor,
  glowBg,
  glowHoverBg,
  offset,
}: ImpactPathCardProps) {
  const { cardRef, glowRef, handleMouseMove, handleMouseLeave } = useGlowFollow();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group rounded-md overflow-hidden hover:-translate-y-2 transition-transform duration-500 ease-out border border-outline-variant/30 bg-surface flex flex-col h-full`}
    >
      {/* Subtle border highlight on hover instead of background tint */}
      <div className="absolute inset-0 z-0 border-2 border-transparent transition-colors duration-500 ease-out group-hover:border-primary/20 pointer-events-none" />

      {/* Cursor-following ambient glow */}
      <div
        ref={glowRef}
        className="absolute w-48 h-48 rounded-full bg-primary/10 blur-2xl pointer-events-none transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2 z-[1]"
        style={{
          left: "var(--glow-x, 50%)",
          top: "var(--glow-y, 50%)",
          opacity: 0,
        }}
      />

      {/* Static tint overlay on hover */}
      <div
        className={`absolute inset-0 z-0 ${glowBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none`}
      />

      {/* Card content */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        <div
          className={`w-16 h-16 rounded-md border border-outline-variant/30 flex items-center justify-center mb-8 text-on-surface-variant transition-colors duration-500 group-hover:${iconColor} group-hover:${iconBg}`}
        >
          <span className="material-symbols-outlined text-4xl font-light">{icon}</span>
        </div>
        <h3 className="text-2xl font-light tracking-tight text-on-surface mb-4">{title}</h3>
        <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-10 flex-grow">
          {description}
        </p>
        <Link
          className={`text-primary kicker-label flex items-center gap-2 group-hover:gap-4 transition-[gap] duration-500 ease-out`}
          href={linkHref}
        >
          {linkLabel} <span className="material-symbols-outlined text-base">arrow_right_alt</span>
        </Link>
        <div
          className={`absolute -right-4 -bottom-4 w-32 h-32 ${glowBg} rounded-full blur-2xl -z-10 group-hover:${glowHoverBg} transition-colors`}
        />
      </div>
    </div>
  );
}
