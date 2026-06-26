import type { NavLink, FooterLink } from "@/shared/types/navigation.types";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    subLinks: [
      { href: "/about", label: "Our Story" },
      { href: "/about/team", label: "Resident & Alumni" },
      { href: "/about/governance", label: "Leadership & Governance " },
      { href: "/about/financials", label: "Financial Transparency " },
    ]
  },
  {
    href: "/partner",
    label: "Partner & Donors",
    subLinks: [
      { href: "/partner", label: "Partners" },
      { href: "/donors", label: "Donors" },
    ]
  },

  {
    href: "/programs",
    label: "Our Work",
    subLinks: [
      { href: "/programs", label: "Core Programs" },
      { href: "/services", label: "Services" },
      { href: "/event", label: "Events" }
    ]
  },
  {
    href: "/impact",
    label: "Impact & Updates",
    subLinks: [
      { href: "/impact", label: "Our Impact" },
      { href: "/news", label: "News & Updates" },
      { href: "/report", label: "Transparency Reports" },
    ]
  },
  {
    href: "/get-involved",
    label: "Get Involved",
    subLinks: [
      { href: "/get-involved", label: "Volunteer" },
      { href: "/donate/flow", label: "Donate" },
      { href: "/partner", label: "Partner With Us" },
      { href: "/contact", label: "Contact Us" },
    ]
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/impact", label: "Impact Report" },
  { href: "/contact", label: "Contact Us" },
];

export const DONATE_NAV_LINKS: NavLink[] = [
  { href: "/impact", label: "Our Work" },
  { href: "/programs", label: "Projects" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

