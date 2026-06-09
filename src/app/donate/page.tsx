import type { Metadata } from "next";
import { DonateHero } from "@/features/donate/components/DonateHero";
import { DonationOptions } from "@/features/donate/components/DonationOptions";
import { DonationImpact } from "@/features/donate/components/DonationImpact";

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
