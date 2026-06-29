"use server";

import { createSafeAction } from "@/shared/lib/safe-action";
import { revalidatePath } from "next/cache";
import { donorsService } from "../services/donors.service";
import { getDonorsSchema, donorDataSchema, updateDonorSchema, deleteDonorSchema } from "../validators/donor.schema";

export const getDonors = createSafeAction(
  { schema: getDonorsSchema, role: "admin" },
  async ({ page, limit, search }, { sessionClient }) => {
    const { data, count } = await donorsService.getDonors(sessionClient, page, limit, search, false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { data: data as any[], count };
  }
);

export const createDonor = createSafeAction(
  { schema: donorDataSchema, role: "admin" },
  async (parsedData, { sessionClient }) => {
    const dataToSubmit = {
      name: parsedData.name,
      email: parsedData.email || null,
      amount: parsedData.amount || null,
      donation_date: parsedData.donation_date || null,
      description: parsedData.description || null,
      avatar_url: parsedData.avatar_url || null,
      country: parsedData.country || null,
      is_public: parsedData.is_public,
      status: parsedData.status
    };

    await donorsService.create(sessionClient, dataToSubmit);
    revalidatePath("/admin/donors");
    return true;
  }
);

export const updateDonor = createSafeAction(
  { schema: updateDonorSchema, role: "admin" },
  async ({ id, data: parsedData }, { sessionClient }) => {
    const dataToSubmit = {
      name: parsedData.name,
      email: parsedData.email || null,
      amount: parsedData.amount || null,
      donation_date: parsedData.donation_date || null,
      description: parsedData.description || null,
      avatar_url: parsedData.avatar_url || null,
      country: parsedData.country || null,
      is_public: parsedData.is_public,
      status: parsedData.status
    };

    await donorsService.update(sessionClient, id, dataToSubmit);
    revalidatePath("/admin/donors");
    return true;
  }
);

export const deleteDonor = createSafeAction(
  { schema: deleteDonorSchema, role: "admin" },
  async ({ id }, { sessionClient }) => {
    await donorsService.delete(sessionClient, id);
    revalidatePath("/admin/donors");
    return true;
  }
);
