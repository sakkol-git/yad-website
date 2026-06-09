import { EventHero } from "@/features/event/components/EventHero";
import { EventGrid } from "@/features/event/components/EventGrid";
import { EventCTA } from "@/features/event/components/EventCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events - Youth Advancement for Development",
  description:
    "Join us in creating sustainable change across Cambodia. Discover upcoming opportunities to get involved.",
};

export default function EventPage() {
  return (
    <>
      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-12 md:py-24">
        <EventHero />
        <EventGrid />
      </main>
      <EventCTA />
    </>
  );
}
