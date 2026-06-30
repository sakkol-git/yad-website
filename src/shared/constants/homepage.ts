import heroImg1 from "../../../public/assets/images/yad-2.png";
import heroImg2 from "../../../public/assets/images/yad-6.png";
import heroImg3 from "../../../public/assets/images/yad-7.png";

export const HERO_IMAGES = [
  { src: heroImg1, alt: "Young Cambodian student looking thoughtfully into the distance" },
  { src: heroImg2, alt: "Cambodian youth engaging in educational activities" },
  { src: heroImg3, alt: "Students participating in community programs" },
];

export const METRICS = [
  {
    value: 500,
    suffix: "+",
    label: "Children Reached Weekly",
    description: "Through nutrition and community education programs.",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years of Impact",
    description: "Building youth leadership across Cambodia.",
  },
  {
    value: 1.2,
    suffix: "K+",
    decimals: 1,
    label: "Youth Empowered",
    description: "With housing, scholarships, and life skills training.",
  },
];

export const VOICES_DATA = [
  {
    quote:
      "The digital literacy program completely changed my trajectory. I now have the skills to build websites and help local businesses transition online.",
    initial: "S",
    name: "Sokhem",
    role: "Alumni, 2023 Cohort",
  },
  {
    quote:
      "Living in the YAD dormitory provided me the safe space and community I needed to focus entirely on my university studies.",
    initial: "C",
    name: "Charya",
    role: "Current Resident",
  },
];

export const PROGRAMS = [
  {
    id: "dormitory",
    index: "01",
    title: "Dormitory & Leadership",
    description:
      "Housing, scholarships, and extensive life skills for promising students from remote provinces. We build the infrastructure necessary for the next generation of Cambodian leaders to thrive in university and beyond.",
    imageSrc: "/assets/images/yad-2.png",
    imageAlt: "Students in the YAD Dormitory & Leadership program",
    href: "/programs/dltc",
    priority: true,
  },
  {
    id: "porridge",
    index: "02",
    title: "Porridge for Hope",
    description:
      "Combating malnutrition with bi-monthly nutrition programs for children in extreme poverty, ensuring food security as the absolute foundation for learning and cognitive development.",
    imageSrc: "/assets/images/yad-4.png",
    imageAlt: "Children in the Porridge for Hope nutrition program",
    href: "/programs/porridge-for-hope",
    priority: false,
  },
  {
    id: "community-schools",
    index: "03",
    title: "Community Schools",
    description:
      "Taking English and essential Life Skills education directly to urban slum communities, reaching children where access to formal public schooling is logistically or financially impossible.",
    imageSrc: "/assets/images/yad-5.png",
    imageAlt: "Community schools education session in Phnom Penh",
    href: "/programs/community-schools",
    priority: false,
  },
];

export const PARTNERS = [
  {
    name: "Partner 3",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6dWwRsNkyCewldHfYtCH2Ttlf6oSKn_kK5zLC25SfnnPH6R4qOtUlhUFb9rANJqJlMxVtQDqULeL6RPb-zYiblbo7ndiCgCPeuoRLKd4&s=10",
  },
];
