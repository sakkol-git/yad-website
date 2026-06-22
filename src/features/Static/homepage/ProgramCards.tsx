import Image from "next/image";
import { StaggerGroup } from "@/shared/components/animations/StaggerGroup";
import { ImageRevealMask } from "@/shared/components/animations/ImageRevealMask";

// 1. Extract data outside the component to prevent recreation on re-renders
const PROGRAM_CARDS_DATA = [
  {
    id: "dormitory",
    title: "Dormitory & Leadership",
    description: "Housing, scholarships, and extensive life skills for promising students from remote provinces.",
    imageSrc: "/assets/images/yad-2.png",
    imageAlt: "Students participating in Dormitory & Leadership program",
    // Tailwind requires complete class strings to prevent them from being purged
    theme: {
      text: "text-primary",
      gradient: "from-primary/5",
      bgOverlay: "bg-primary/10",
    },
    priority: true, // Load the first image faster if above the fold
  },
  {
    id: "porridge",
    title: "Porridge for Hope",
    description: "Combating malnutrition with bi-monthly nutrition programs for children in extreme poverty.",
    imageSrc: "/assets/images/yad-4.png",
    imageAlt: "Children receiving nutrition from Porridge for Hope",
    theme: {
      text: "text-secondary",
      gradient: "from-secondary/5",
      bgOverlay: "bg-secondary/10",
    },
    priority: false,
  },
  {
    id: "community-schools",
    title: "Community Schools",
    description: "Taking English and essential Life Skills education directly to urban slum communities.",
    imageSrc: "/assets/images/yad-5.png",
    imageAlt: "Education session in urban slum community",
    theme: {
      text: "text-tertiary",
      gradient: "from-tertiary/5",
      bgOverlay: "bg-tertiary/10",
    },
    priority: false,
  },
];

export function ProgramCards() {
  return (
    <section className="relative z-20 mt-8 lg:-mt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <StaggerGroup
        y={32}
        scale={0.96}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {PROGRAM_CARDS_DATA.map((card) => (
          <div key={card.id}>
            <article
              className={`h-full bg-surface-container-lowest/95 backdrop-blur-3xl rounded-[32px] p-8 border border-outline-variant/30 shadow-ambient hover:shadow-ambient-hover hover:-translate-y-2 hover:bg-surface-container-lowest transition-all duration-500 group relative flex flex-col items-center text-center overflow-hidden`}
            >
              {/* Hover Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${card.theme.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                aria-hidden="true"
              />

              {/* Image Container */}
              <ImageRevealMask
                className={`w-36 h-36 rounded-2xl mb-8 relative shadow-md group-hover:scale-105 transition-transform duration-500 border border-white/50 overflow-hidden ${card.theme.bgOverlay}`}
              >
                <Image
                  alt={card.imageAlt}
                  className="w-full h-full object-cover"
                  src={card.imageSrc}
                  fill
                  sizes="144px"
                  priority={card.priority}
                />
              </ImageRevealMask>

              {/* Text Content */}
              <h3 className={`text-2xl font-bold mb-3 ${card.theme.text}`}>
                {card.title}
              </h3>
              <p className="text-on-surface-variant font-medium leading-relaxed">
                {card.description}
              </p>
            </article>
          </div>
        ))}
      </StaggerGroup>
    </section>
  );
}