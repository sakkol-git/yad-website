"use server";

import { createSafeAction } from "@/shared/lib/safe-action";
import { revalidatePath } from "next/cache";
import { membersService } from "../services/members.service";
import {
  getMembersSchema,
  memberDataSchema,
  updateMemberSchema,
  deleteMemberSchema,
} from "../validators/member.schema";

const csvToArray = (csv?: string) =>
  csv
    ? csv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;

function extractProfileData(rawData: any) {
  return {
    biography: rawData.biography || undefined,
    khmerBiography: rawData.khmer_biography || undefined,
    quote: rawData.quote || undefined,
    vision: rawData.vision || undefined,
    education: csvToArray(rawData.education),
    experience: csvToArray(rawData.experience),
    achievements: csvToArray(rawData.achievements),
    socialLinks: {
      linkedin: rawData.linkedin || undefined,
      twitter: rawData.twitter || undefined,
      facebook: rawData.facebook || undefined,
      github: rawData.github || undefined,
    },
  };
}

export const getMembers = createSafeAction(
  { schema: getMembersSchema, role: "admin" },
  async ({ page, limit, search }, { sessionClient }) => {
    const { data, count } = await membersService.getMembers(
      sessionClient,
      { page, limit, search },
      false,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { data: data as any[], count };
  },
);

export const createMember = createSafeAction(
  { schema: memberDataSchema, role: "admin" },
  async (parsedData, { sessionClient }) => {
    const profile = extractProfileData(parsedData);

    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const slug = `${parsedData.first_name}-${parsedData.last_name}-${randomSuffix}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const dataToSubmit = {
      first_name: parsedData.first_name,
      last_name: parsedData.last_name,
      email: parsedData.email || "",
      slug: slug,
      type: parsedData.type,
      status: parsedData.status,
      bio: parsedData.bio || null,
      avatar_url: parsedData.avatar_url || null,
      role: parsedData.role || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      profile: profile as any,
    };

    await membersService.create(sessionClient, dataToSubmit);
    revalidatePath("/admin/members");
    revalidatePath("/about/team/[slug]", "page");
    revalidatePath("/about/governance/[slug]", "page");
    revalidatePath("/", "layout");
    return true;
  },
);

export const updateMember = createSafeAction(
  { schema: updateMemberSchema, role: "admin" },
  async ({ id, data: parsedData }, { sessionClient }) => {
    const profile = extractProfileData(parsedData);

    const dataToSubmit = {
      first_name: parsedData.first_name,
      last_name: parsedData.last_name,
      email: parsedData.email || "",
      type: parsedData.type,
      status: parsedData.status,
      bio: parsedData.bio || null,
      avatar_url: parsedData.avatar_url || null,
      role: parsedData.role || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      profile: profile as any,
    };

    await membersService.update(sessionClient, id, dataToSubmit);
    revalidatePath("/admin/members");
    revalidatePath("/about/team/[slug]", "page");
    revalidatePath("/about/governance/[slug]", "page");
    revalidatePath("/", "layout");
    return true;
  },
);

export const deleteMember = createSafeAction(
  { schema: deleteMemberSchema, role: "admin" },
  async ({ id }, { sessionClient }) => {
    await membersService.delete(sessionClient, id);
    revalidatePath("/admin/members");
    return true;
  },
);
