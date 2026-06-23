import type { Metadata } from "next";
import { ServicesHero } from "@/features/Static/service/ServicesHero";
import { BookingSection } from "@/features/Entities/bookings/BookingSection";

export const metadata: Metadata = {
  title: "Homestay & Services",
  description: "Experience authentic Cambodia with the YAD Homestay. All proceeds support local youth development.",
};

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-section-gap">
      <ServicesHero />
    </main>
  );
}
