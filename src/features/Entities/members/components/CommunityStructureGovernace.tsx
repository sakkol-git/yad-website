import { TeamMemberCard } from './TeamMemberCard';
import { MembersRepository } from "@/server/repositories/members";
import { createClient } from "@/shared/lib/supabase/server";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import type { TeamMember } from "@/features/Entities/members/types/member.types";

const membersRepo = new MembersRepository();

function mapToTeamMember(row: any): TeamMember {
  return {
    id: row.id,
    slug: row.slug || '',
    category: row.type.toLowerCase(),
    name: `${row.first_name} ${row.last_name}`.trim(),
    role: row.role || '',
    description: row.bio || '',
    image: row.avatar_url || '',
    profile: row.profile as any,
  };
}

export async function CommunityStructureGovernance() {
  const supabase = await createClient();

  const [dbFounders,] = await Promise.all([
    membersRepo.getPublicMembersByCategory(supabase, 'Founder'),
  ]);

  const allFounders = dbFounders.map(mapToTeamMember);
  // Re-split founders into founder and co-founder based on slug or role
  // Since 'type' in DB is just 'Founder', we assume the main founder has slug 'sophea-morn'
  const founders = allFounders.filter(m => m.slug === 'sophea-morn');
  const founder = founders.length > 0 ? founders[0] : null;
  const coFounders = allFounders.filter(m => m.slug !== 'sophea-morn');



  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low/30">

      <div className="max-w-5xl mx-auto flex flex-col gap-[120px]">
        {/* Leadership Block (Tier 1 & Tier 2) */}
        <div className="flex flex-col gap-12 relative">
          {/* Tier 1: The Founder */}
          {founder && (
            <div className="relative">
              <div className="flex justify-center">
                <div className="w-full max-w-[340px]">
                  <TeamMemberCard
                    {...founder}
                    href={`/about/team/${founder.slug}`}
                  />
                </div>
              </div>
              <div className="hidden md:block absolute left-1/2 -bottom-10 w-px h-10 bg-gradient-to-b from-primary/50 to-transparent -translate-x-1/2" />
            </div>
          )}

          {/* Tier 2: Co-Founders & Board */}
          {coFounders.length > 0 && (
            <div className="relative">
              <StaggerGroup y={28} className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12">
                {coFounders.map((member) => (
                  <div key={member.id} className="w-full max-w-[320px] mx-auto md:mx-0">
                    <TeamMemberCard
                      {...member}
                      href={`/about/team/${member.slug}`}
                    />
                  </div>
                ))}
              </StaggerGroup>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
