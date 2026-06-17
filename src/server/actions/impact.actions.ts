"use server";

import { createClient } from "@/shared/lib/supabase/server";
import { unstable_cache } from "next/cache";

export const getImpactStatsAction = unstable_cache(
  async () => {
    try {
      const supabase = await createClient();

      const { count: eventsCount } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true });

      const { count: residentsCount } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true })
        .eq("type", "Resident");

      return {
        communitiesReached: (eventsCount || 0) + 240, 
        youthHoused: (residentsCount || 0) + 10,
        provincesReached: 5,
      };
    } catch (error) {
      console.error("Failed to fetch impact stats:", error);
      return { communitiesReached: 245, youthHoused: 10, provincesReached: 5 };
    }
  },
  ['impact-stats'],
  { revalidate: 3600, tags: ['impact'] }
);
