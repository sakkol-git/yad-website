import { EventHero } from "@/features/Entities/events/components/EventHero";
import { EventGrid } from "@/features/Entities/events/components/EventGrid";
import { EventCTA } from "@/features/Entities/events/components/EventCTA";
import { Metadata } from "next";
import { EventsRepository } from "@/server/repositories/events";
import { createClient } from "@/shared/lib/supabase/server";
import type { EventItem } from "@/features/Entities/events/types/event.types";

export const metadata: Metadata = {
  title: "Events - Youth Advancement for Development",
  description:
    "Join us in creating sustainable change across Cambodia. Discover upcoming opportunities to get involved.",
};

const eventsRepo = new EventsRepository();

export default async function EventPage() {
  const supabase = await createClient();
  const dbEvents = await eventsRepo.getAllPublic(supabase);

  const events: EventItem[] = dbEvents.map((row) => ({
    id: row.slug || row.id,
    title: row.name,
    date: row.date || 'TBD',
    location: row.venue || 'TBD',
    description: row.description || '',
    imageUrl: row.image_url || '/assets/images/placeholder.jpg',
    imageAlt: row.image_alt || row.name,
    status: row.status === 'Upcoming' ? 'Upcoming' : 'Past Event',
    actionLabel: row.action_label || 'Learn More',
    actionIcon: row.action_icon || 'arrow_forward',
    joinUrl: row.join_url || undefined,
    donationUrl: row.donation_url || undefined,
  }));

  return (
    <>
      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-12 md:py-24">
        <EventHero />
        <EventGrid events={events} />
      </main>
      <EventCTA />
    </>
  );
}
