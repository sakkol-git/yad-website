import { MembersRepository } from "@/server/repositories/members";
import { createClient } from "@/shared/lib/supabase/server";
import { OrgChartTree } from "./OrgChartTree";
import type { TeamMember } from "@/features/Entities/members/types/member.types";

const membersRepo = new MembersRepository();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapToTeamMember(row: any): TeamMember {
  return {
    id: row.id,
    slug: row.slug || '',
    category: row.type.toLowerCase(),
    name: `${row.first_name} ${row.last_name}`.trim(),
    role: row.role || '',
    description: row.bio || '',
    image: row.avatar_url || '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <section className="py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-[120px]">
        {/* Leadership Block (Tier 1 & Tier 2 connected by SVG Tree) */}
        <OrgChartTree founder={founder} coFounders={coFounders} />
      </div>
    </section>
  );
}
