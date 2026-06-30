import { TeamMemberCard } from "./TeamMemberCard";
import { MembersRepository } from "@/server/repositories/members";
import { createClient } from "@/shared/lib/supabase/server";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
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

export async function ResidentsTeam() {
  const supabase = await createClient();

  const dbResidents = await membersRepo.getPublicMembersByCategory(supabase, "Resident");
  const residents = dbResidents.map(mapToTeamMember);

  if (residents.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto">
        <div>
          <StaggerGroup
            y={28}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-stretch"
          >
            {residents.map((member) => (
              <div key={member.id} className="w-full flex justify-center md:justify-start">
                <div className="w-full">
                  <TeamMemberCard {...member} href={`/about/team/resident/${member.slug}`} />
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
