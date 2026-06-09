import { notFound } from "next/navigation";
import { getMemberBySlug, TEAM_MEMBERS } from "@/constants/team";
import { MemberProfile } from "@/features/about/components/MemberProfile";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const member = getMemberBySlug(resolvedParams.slug);

  if (!member) {
    return {
      title: "Member Not Found",
    };
  }

  return {
    title: `${member.name} | Youth Action for Development`,
    description: `Learn more about ${member.name}, ${member.role} at Youth Action for Development.`,
  };
}

// Generate static params for all known members at build time
export async function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPage({ params }: PageProps) {
  const resolvedParams = await params;
  const member = getMemberBySlug(resolvedParams.slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="pt-24 pb-section-gap">
      {/* Back Navigation */}
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-8">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md group"
        >
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform duration-200">
            arrow_back
          </span>
          Back to Team
        </Link>
      </div>

      <MemberProfile member={member} />
    </main>
  );
}
