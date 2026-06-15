import { TextReveal } from "@/shared/components/animations/TextReveal";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";

export function VisionSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-surface overflow-hidden">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-left">

        {/* Section Header */}
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <TextReveal 
            as="h2" 
            text="Empowering Youth in Cambodia for a Better Tomorrow" 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-6" 
          />
          <div className="w-24 h-1.5 bg-primary rounded-full mx-auto opacity-80" />
        </RevealOnScroll>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <StaggerGroup y={24} className="flex flex-col space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">
              A Vision for Sustainable Cambodian Development
            </h3>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Youth Advancement for Development (YAD) is a premier non-governmental organization (NGO) operating in Phnom Penh, Cambodia. We are deeply committed to breaking the cycle of intergenerational poverty through a multi-faceted approach centered around sustainable education, digital innovation, and grassroots community-driven support systems. Operating in the heart of Cambodia, we recognize that the true future of the nation rests in the hands of its youth. Our core mission is to actively equip these young minds with the practical skills, vital resources, and unshakable confidence they need to emerge as the leaders of tomorrow.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              We steadfastly believe that every child—regardless of their socioeconomic background, geography, or current circumstances—deserves equitable access to high-quality education. The educational disparity in marginalized communities often stifles immense potential. Through strategic partnerships with local public schools, international philanthropic donors, and a network of passionate local volunteers, YAD creates a holistic ecosystem of growth that bridges this gap.
            </p>
          </StaggerGroup>

          <StaggerGroup y={24} className="flex flex-col space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-primary">
              Core Initiatives Transforming Lives
            </h3>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Our approach is rooted in direct, high-impact intervention. We run comprehensive <strong className="font-semibold text-on-surface">Dormitory & Youth Training programs</strong> that provide safe, supportive havens for students relocating from remote rural provinces to the city for higher education. Without secure housing, the dream of a university degree is often unattainable.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Furthermore, to prepare our youth for the modern global economy, we spearhead cutting-edge <strong className="font-semibold text-on-surface">Digital Innovation bootcamps</strong>. These intensive technical training sessions focus on coding, digital literacy, and modern workplace technologies, ensuring that our graduates are highly competitive in the rapidly evolving Cambodian tech sector.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              At the grassroots level, our <strong className="font-semibold text-on-surface">Slum Community Education</strong> initiatives bring mobile classrooms and essential educational resources directly to high-risk, underprivileged communities, ensuring no child is left behind.
            </p>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
