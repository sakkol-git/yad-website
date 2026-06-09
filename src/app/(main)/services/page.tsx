import type { Metadata } from "next";
import { ServicesHero } from "@/features/services/components/ServicesHero";
import { BookingSection } from "@/features/services/components/BookingSection";

export const metadata: Metadata = {
  title: "Homestay & Services",
  description: "Experience authentic Cambodia with the YAD Homestay. All proceeds support local youth development.",
};

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-section-gap">
      <ServicesHero />
      <BookingSection />
    </main>
  );
}
