import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
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
    <div className={cn(
      "relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px]",
      extra
    )}>
      <Image
        alt={`Portrait of ${name}`}
        src={image}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Text Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start text-left">
        <h3 className="text-white font-bold text-2xl mb-1 group-hover:text-primary-100 transition-colors">
          {name}
        </h3>
        <span className="text-white bg-primary py-1 px-2 rounded-md text-center font-medium  text-sm mb-3">
          {role}
        </span>
        {description && (
          <p className="text-gray-300 text-sm line-clamp-3">
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

  return (
    <div className="group h-full w-full">
      {content}
    </div>
  );
}
