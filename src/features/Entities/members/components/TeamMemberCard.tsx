import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { TeamMemberCardProps } from "@/features/Entities/members/types/member.types";

export function TeamMemberCard({
  name,
  role,
  description,
  image,
  size = "md",
  borderColor = "border-primary",
  headlineClass = "font-headline-md text-headline-md",
  extra,
  href,
}: TeamMemberCardProps) {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  };

  const content = (
    <div className="flex flex-col items-center text-center">
      <div
        className={cn(
          "rounded-[2rem] overflow-hidden mb-6 border-4 relative transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg",
          sizeClasses[size as keyof typeof sizeClasses],
          borderColor
        )}
      >
        <Image
          alt={`Portrait of ${name}`}
          className="w-full h-full object-cover"
          src={image}
          fill
          sizes={
            size === "lg" ? "256px" : size === "md" ? "192px" : "96px"
          }
        />
      </div>
      <h3 className={cn("text-primary mb-2 group-hover:text-secondary transition-colors", headlineClass)}>
        {name}
      </h3>
      <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wide text-xs mb-4 block">
        {role}
      </span>
      {description && (
        <p className={cn("font-body-md text-body-md text-on-surface-variant max-w-sm text-left w-full", extra)}>
          {description}
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group cursor-pointer block">
        {content}
      </Link>
    );
  }

  return (
    <div className="group">
      {content}
    </div>
  );
}
