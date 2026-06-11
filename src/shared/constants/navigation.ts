import type { NavLink, FooterLink } from "@/shared/types/navigation.types";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    subLinks: [
      { href: "/about", label: "Who We Are" },
      { href: "/partner", label: "Partners" },
      { href: "/donors", label: "Donors" },

    ]
  },
  {
    href: "/programs",
    label: "Programs",
    subLinks: [
      { href: "/programs", label: "Our Programs" },
      { href: "/services", label: "Services" },
      { href: "/event", label: "Events" }
    ]
  },
  { href: "/impact", label: "Our Impact" },
  { href: "/get-involved", label: "Contact Us" },
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
