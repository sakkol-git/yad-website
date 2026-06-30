import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";
import type { TeamMemberCardProps } from "@/features/Entities/members/types/member.types";

export function TeamMemberCard({
  name,
  role,
  description,
  image,
  extra,
  href,
}: TeamMemberCardProps) {
  const content = (
    <div className={cn("relative w-full group", extra)}>
      {/* Image Block */}
      <div className="relative w-full aspect-[4/5] overflow-hidden mb-5">
        <ImageRevealMask className="w-full h-full">
          <Image
            alt={`Portrait of ${name}`}
            src={image}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </ImageRevealMask>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start text-left">
        <span className="kicker-label text-on-surface-variant/70 mb-2">{role}</span>
        <h3 className="text-2xl font-light text-on-surface tracking-tight mb-3 transition-colors group-hover:text-primary">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-on-surface-variant font-light line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group cursor-pointer block h-full w-full">
        {content}
      </Link>
    );
  }

  return <div className="group h-full w-full">{content}</div>;
}
