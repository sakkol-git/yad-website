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
      className={`relative group rounded-md overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${
        offset ? "md:-translate-y-4" : ""
      }`}
    >
      {/* Card background */}
      <div className="absolute inset-0 z-0 bg-surface/60 backdrop-blur-xl border border-outline-variant/30 shadow-ambient transition-colors duration-300 group-hover:border-outline-variant/60" />

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
        className={`absolute inset-0 z-0 ${glowBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none`}
      />

      {/* Card content */}
      <div className="relative z-10 p-8 flex flex-col h-full">
        <div
          className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mb-6 ${iconColor} transition-transform group-hover:scale-110`}
        >
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-primary mb-3">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
          {description}
        </p>
        <Link
          className={`${linkColor} font-label-bold text-label-bold flex items-center gap-2 group-hover:gap-3 transition-[gap] duration-300 ease-out`}
          href={linkHref}
        >
          {linkLabel}{" "}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
        <div
          className={`absolute -right-4 -bottom-4 w-32 h-32 ${glowBg} rounded-full blur-2xl -z-10 group-hover:${glowHoverBg} transition-colors`}
        />
      </div>
    </div>
  );
}
