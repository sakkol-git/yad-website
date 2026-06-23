import Image from "next/image";
import Link from "next/link";
import { EventItem } from "@/features/Entities/events/types/event.types";
import { Button } from "@/shared/components/ui/Button";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

function EventCard({
  event,
  featured = false,
}: {
  event: EventItem;
  featured?: boolean;
}) {
  return (
    <article
      className={`bg-surface border border-outline-variant/30 flex flex-col relative group cursor-pointer transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-on-surface hover:bg-surface-container-lowest ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div
        className={`w-full relative overflow-hidden bg-surface-variant ${
          featured ? "h-64 md:h-80" : "h-48 md:h-56"
        }`}
      >
        <Image
          src={event.imageUrl}
          alt={event.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
            event.status === "Completed" ? "grayscale" : "grayscale-[50%] group-hover:grayscale-0"
          }`}
        />
        {event.status === "Upcoming" && featured && (
          <div className="absolute top-4 left-4 bg-on-surface text-surface px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
            Upcoming
          </div>
        )}
        {event.status === "Completed" && (
          <div className="absolute top-4 left-4 bg-surface text-on-surface border border-outline-variant/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
            Past Event
          </div>
        )}
      </div>

      <div
        className={`flex flex-col flex-grow ${
          featured ? "p-8 md:p-12 justify-between" : "p-6 md:p-8"
        }`}
      >
        <div>
          <div
            className={`flex items-center gap-4 text-on-surface-variant mb-4 text-[10px] uppercase tracking-[0.1em] font-bold`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>{" "}
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                location_on
              </span>{" "}
              {event.location}
            </span>
          </div>
          <h2
            className={`font-light tracking-tight mb-4 text-on-surface ${
              featured ? "text-[2rem] leading-tight" : "text-2xl"
            }`}
          >
            {event.title}
          </h2>
          <p
            className={`text-on-surface-variant font-light flex-grow leading-relaxed ${
              featured ? "mb-8 text-lg line-clamp-3" : "mb-6 text-sm line-clamp-4"
            }`}
          >
            {event.description}
          </p>
        </div>

        {featured ? (
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-4">
              {event.joinUrl && (
                <Button variant="default" className="rounded-none bg-on-surface text-surface h-12 px-6 hover:bg-surface-variant uppercase text-xs tracking-wider font-bold transition-[transform,box-shadow,border-color] duration-300 ease-out" asChild>
                  <Link href={event.joinUrl}>
                    {event.actionLabel}{" "}
                    <span className="material-symbols-outlined text-sm ml-2">
                      {event.actionIcon}
                    </span>
                  </Link>
                </Button>
              )}
              {event.donationUrl && (
                <Button variant="outline" className="rounded-none border-on-surface text-on-surface h-12 px-6 hover:bg-on-surface hover:text-surface uppercase text-xs tracking-wider font-bold transition-[transform,box-shadow,border-color] duration-300 ease-out" asChild>
                  <Link href={event.donationUrl}>Donate</Link>
                </Button>
              )}
            </div>
            {event.capacity && (
              <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
                <span>Capacity:</span>
                <span className="text-on-surface">{event.capacity}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/30">
            {event.joinUrl && (
              <Link
                href={event.joinUrl}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 group-hover:text-on-surface transition-colors ${
                  event.status === "Completed"
                    ? "text-on-surface-variant"
                    : "text-on-surface-variant"
                }`}
              >
                {event.actionLabel}{" "}
                <span className="material-symbols-outlined text-sm">
                  {event.actionIcon}
                </span>
              </Link>
            )}
             {event.donationUrl && (
               <Button variant="ghost" size="sm" className="rounded-none text-on-surface-variant hover:text-on-surface uppercase text-[10px] tracking-wider font-bold" asChild>
                 <Link href={event.donationUrl}>Donate</Link>
               </Button>
             )}
          </div>
        )}
      </div>
    </article>
  );
}

export function EventGrid({ events }: { events: EventItem[] }) {
  return (
    <StaggerGroup y={28} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-section-gap">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} featured={index === 0} />
      ))}
    </StaggerGroup>
  );
}
