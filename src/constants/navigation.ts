import type { NavLink, FooterLink } from "@/types/navigation.types";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Features" },
  { href: "/impact", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/event", label: "Events" },
  { href: "/partner", label: "Partners" },
];

export const FOOTER_LINKS: FooterLink[] = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Impact Report" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Contact Us" },
];

export const DONATE_NAV_LINKS: NavLink[] = [
  { href: "/impact", label: "Our Work" },
  { href: "/programs", label: "Projects" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Contact" },
];
