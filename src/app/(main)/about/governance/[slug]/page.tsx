import { notFound } from "next/navigation";
import { MemberProfile } from "@/features/Entities/members/components/MemberProfile";
import Link from "next/link";
import { Metadata } from "next";
import { MembersRepository } from "@/server/repositories/members";
import { createStaticClient } from "@/shared/lib/supabase/server";
import type { TeamMember } from "@/features/Entities/members/types/member.types";

const membersRepo = new MembersRepository();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapToTeamMember(row: any): TeamMember {
  return {
    id: row.id,
    slug: row.slug || "",
    category: row.type.toLowerCase(),
    name: `${row.first_name} ${row.last_name}`.trim(),
    role: row.role || "",
    description: row.bio || "",
    image: row.avatar_url || "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: row.profile as any,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = createStaticClient();

  try {
    const memberRow = await membersRepo.getPublicMemberBySlug(supabase, resolvedParams.slug);
    if (!memberRow) return { title: "Member Not Found" };

    const member = mapToTeamMember(memberRow);
    return {
      title: `${member.name} | Youth Action for Development`,
      description: `Learn more about ${member.name}, ${member.role} at Youth Action for Development.`,
    };
  } catch {
    return { title: "Member Not Found" };
  }
}

// Generate static params for all known members at build time
export async function generateStaticParams() {
  const supabase = createStaticClient();
  try {
    const slugs = await membersRepo.getAllPublicSlugs(supabase);
    return slugs.map((row) => ({
      slug: row.slug,
    }));
  } catch {
    return [];
  }
}

export default async function TeamMemberPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = createStaticClient();

  let member: TeamMember | null = null;
  try {
    const memberRow = await membersRepo.getPublicMemberBySlug(supabase, resolvedParams.slug);
    if (memberRow) {
      member = mapToTeamMember(memberRow);
    }
  } catch (error) {
    console.error("Error fetching member:", error);
  }

  if (!member) {
    notFound();
  }

  return (
    <main className="pt-24 pb-section-gap">
      {/* Back Navigation */}
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-8">
        <Link
          href="/about/governance"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md group"
        >
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform duration-200">
            arrow_back
          </span>
          Back to Leadership & Governance
        </Link>
      </div>

      <MemberProfile member={member} />
    </main>
  );
}
