"use server";

"use server";

import { createSafeAction } from "@/shared/lib/safe-action";
import { donationsService } from "../services/donations.service";
import { Database } from "@/shared/types/supabase";
import { createDonationDraftSchema } from "../validators/donate.schema";

type DonationRow = Partial<Database["public"]["Tables"]["donations"]["Row"]>;

export const createDonationDraftAction = createSafeAction(
  { schema: createDonationDraftSchema, role: "public" },
  async ({ amount, firstName, lastName, email }, { adminClient: supabaseAdmin }) => {
    const donorName = `${firstName} ${lastName}`.trim();

    // Create draft donation
    const draft = await donationsService.createDonationIntent(supabaseAdmin, {
      amount,
      donor_name: donorName,
      email,
      donation_type: "One-Time",
      is_anonymous: false,
    });

    return draft;
  },
);
