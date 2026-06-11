import Image from "next/image";
import Link from "next/link";
import { EventItem } from "@/features/Entities/events/types/event.types";
import { Button } from "@/shared/components/ui/Button";

function EventCard({
  event,
  featured = false,
}: {
  event: EventItem;
  featured?: boolean;
}) {
  return (
    <article
      className={`event-card bg-surface/80 backdrop-blur-xl border border-white/20 shadow-ambient rounded-lg overflow-hidden flex flex-col relative group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div
        className={`w-full relative overflow-hidden bg-surface-variant ${
          featured ? "h-64 md:h-80" : "h-48"
        }`}
      >
        <Image
          src={event.imageUrl}
          alt={event.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
            event.status === "Completed" ? "grayscale-[20%]" : ""
          }`}
        />
        {event.status === "Upcoming" && featured && (
          <div className="absolute top-4 left-4 bg-primary text-on-primary px-4 py-2 rounded-full font-label-bold text-label-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              calendar_month
            </span>
            Upcoming
          </div>
        )}
        {event.status === "Completed" && (
          <div className="absolute top-3 left-3 bg-surface-variant/80 backdrop-blur-sm text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              check_circle
            </span>{" "}
            Past Event
          </div>
        )}
      </div>

      <div
        className={`flex flex-col flex-grow ${
          featured ? "p-8 justify-between" : "p-6"
        }`}
      >
        <div>
          <div
            className={`flex items-center gap-4 text-secondary mb-3 font-body-sm text-sm`}
          >
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>{" "}
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                location_on
              </span>{" "}
              {event.location}
            </span>
          </div>
          <h2
            className={`font-headline-md font-bold mb-3 ${
              event.status === "Completed" ? "text-tertiary" : "text-primary"
            } ${featured ? "text-headline-md mb-4" : "text-xl"}`}
          >
            {event.title}
          </h2>
          <p
            className={`text-on-surface-variant flex-grow ${
              featured ? "mb-6 font-body-lg text-body-lg line-clamp-3" : "mb-6 text-sm"
            }`}
          >
            {event.description}
          </p>
        </div>

        {featured ? (
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-variant">
            <div className="flex items-center gap-4">
              {event.joinUrl && (
                <Button variant="secondary" className="rounded-full shadow-sm" asChild>
                  <Link href={event.joinUrl}>
                    {event.actionLabel}{" "}
                    <span className="material-symbols-outlined text-sm ml-2">
                      {event.actionIcon}
                    </span>
                  </Link>
                </Button>
              )}
              {event.donationUrl && (
                <Button variant="outline" className="rounded-full shadow-sm" asChild>
                  <Link href={event.donationUrl}>Donate</Link>
                </Button>
              )}
            </div>
            {event.capacity && (
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-surface-container-lowest"></div>
                <div className="w-8 h-8 rounded-full bg-tertiary-container border-2 border-surface-container-lowest"></div>
                <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-surface-container-lowest flex items-center justify-center text-xs text-on-primary font-bold">
                  {event.capacity}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between mt-auto">
            {event.joinUrl && (
              <Link
                href={event.joinUrl}
                className={`font-label-bold text-label-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform ${
                  event.status === "Completed"
                    ? "text-tertiary"
                    : "text-secondary"
                }`}
              >
                {event.actionLabel}{" "}
                <span className="material-symbols-outlined text-sm">
                  {event.actionIcon}
                </span>
              </Link>
            )}
             {event.donationUrl && (
               <Button variant="ghost" size="sm" className="rounded-full shadow-none text-secondary" asChild>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-section-gap">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} featured={index === 0} />
      ))}
    </div>
  );
}
