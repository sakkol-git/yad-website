import type { Metadata } from "next";
import { DonateHero } from "@/features/Entities/donations/components/DonateHero";
import { DonationOptions } from "@/features/Entities/donations/components/DonationOptions";
import { DonationImpact } from "@/features/Entities/donations/components/DonationImpact";

export const metadata: Metadata = {
  title: "Donate",
  description: "Invest in Cambodia's future leaders. Your contribution funds safe housing, digital literacy, and community education.",
};

export default function DonatePage() {
  return (
    <>
      <DonateHero />
      <DonationOptions />
      <DonationImpact />
    </>
  );
}
