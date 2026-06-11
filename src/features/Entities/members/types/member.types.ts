export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  github?: string;
}

export interface ProfileData {
  biography?: string;
  quote?: string;
  vision?: string;
  education?: string[];
  experience?: string[];
  achievements?: string[];
  socialLinks?: SocialLinks;
}

export type MemberCategory = "founder" | "co-founder" | "resident" | "alumni";

export interface TeamMember {
  id: string;
  slug: string;
  category: MemberCategory;
  name: string;
  role: string;
  description?: string;
  image: string;
  href?: string;
  profile?: ProfileData;
}

export interface TeamMemberCardProps extends TeamMember {
  extra?: string;
}
