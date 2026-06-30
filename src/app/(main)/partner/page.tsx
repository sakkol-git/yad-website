import { PartnerHero } from "@/features/Entities/partners/components/PartnerHero";
import { PartnerGrid } from "@/features/Entities/partners/components/PartnerGrid";
import { PartnerCTA } from "@/features/Entities/partners/components/PartnerCTA";
import { Metadata } from "next";
import { PartnersRepository } from "@/server/repositories/partners";
import { createClient } from "@/shared/lib/supabase/server";
import type { PartnerItem } from "@/features/Entities/partners/types/partner.types";

export const metadata: Metadata = {
  title: "Our Partners - Youth Advancement for Development",
  description: "Driving Change Through Strategic Partnerships.",
};

const partnersRepo = new PartnersRepository();

export default async function PartnerPage() {
  const supabase = await createClient();
  const dbPartners = await partnersRepo.getAllPublic(supabase);

  const partners: PartnerItem[] = dbPartners.map((row) => ({
    id: row.id,
    name: row.name,
    icon: row.icon || "public",
    category: row.category || "Local Organizations",
    websiteUrl: row.website_url || "#",
    featured: row.featured || false,
    logoUrl: row.logo_url || null,
  }));

  return (
    <main className="flex-grow">
      <PartnerHero />
      <PartnerGrid partners={partners} />
      <PartnerCTA />
    </main>
  );
}
