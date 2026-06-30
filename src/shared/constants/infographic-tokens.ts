/**
 * YAD INFOGRAPHIC DESIGN TOKENS
 * ──────────────────────────────
 * All visualization components MUST consume these tokens.
 * Never hardcode hex values in chart components.
 *
 * These map to the MD3 CSS custom properties defined in globals.css.
 * Recharts accepts CSS variable strings via `fill` / `stroke` props
 * when the component is rendered client-side.
 */

/* ── Color Tokens ── */

export const CHART_COLORS = {
  // Primary series — impact data, success metrics
  primary: "var(--color-primary)",
  primaryContainer: "var(--color-primary-container)",
  onPrimary: "var(--color-on-primary)",
  onPrimaryContainer: "var(--color-on-primary-container)",

  // Secondary series — comparative / supporting data
  secondary: "var(--color-secondary)",
  secondaryContainer: "var(--color-secondary-container)",
  onSecondaryContainer: "var(--color-on-secondary-container)",

  // Tertiary series — accent / highlight data points
  tertiary: "var(--color-tertiary)",
  tertiaryContainer: "var(--color-tertiary-container)",
  onTertiaryContainer: "var(--color-on-tertiary-container)",

  // Neutral series — grid lines, axis labels, backgrounds
  surface: "var(--color-surface)",
  surfaceContainer: "var(--color-surface-container)",
  surfaceContainerHigh: "var(--color-surface-container-high)",
  surfaceVariant: "var(--color-surface-variant)",
  outline: "var(--color-outline)",
  outlineVariant: "var(--color-outline-variant)",
  onSurface: "var(--color-on-surface)",
  onSurfaceVariant: "var(--color-on-surface-variant)",

  // Error series
  error: "var(--color-error)",
  errorContainer: "var(--color-error-container)",
} as const;

/* ── Resolved hex colors for Recharts/SVG (CSS vars don't work in all SVG contexts) ── */

export const CHART_HEX = {
  primary: "#0F4C3A",
  primaryContainer: "#4D7B6B",
  secondary: "#e08c00",
  secondaryContainer: "#fff0c2",
  tertiary: "#1a7fa8",
  tertiaryContainer: "#d6f0f9",
  surfaceVariant: "#E2E4E1",
  outline: "#5e8068",
  outlineVariant: "#afc4b5",
  onSurface: "#111413",
  onSurfaceVariant: "#3A4440",
  error: "#ba1a1a",
} as const;

/* ── Animation Tokens ── */

export const ANIMATION_TOKENS = {
  durationFast: 0.3,
  durationMedium: 0.8,
  durationSlow: 1.4,
  durationEpic: 2.2,
  easingStandard: "power2.out",
  easingEmphasized: "power3.out",
} as const;

/* ── Map Tokens ── */

export const MAP_TOKENS = {
  cambodiaFill: "#E2E4E1", // surfaceVariant
  cambodiaFillActive: "#fff0c2", // secondaryContainer
  cambodiaStroke: "#afc4b5", // outlineVariant
  impactNodeColor: "#0F4C3A", // primary
  impactNodePulse: "#4D7B6B", // primaryContainer
  tooltipBg: "#F9F9F8", // surface
  tooltipBorder: "#afc4b5", // outlineVariant
  tooltipText: "#111413", // onSurface
} as const;

/* ── Allocation Data (Financials page) ── */
// TODO: Replace with real YAD financial data
export const ALLOCATION_DATA = [
  {
    name: "Student Programs",
    percentage: 80,
    description: "Direct scholarship, dormitory, mentorship costs",
    colorKey: "primary" as const,
  },
  {
    name: "Operations",
    percentage: 15,
    description: "Staff, facilities, administration",
    colorKey: "secondary" as const,
  },
  {
    name: "Fundraising",
    percentage: 5,
    description: "Communications and donor relations",
    colorKey: "tertiary" as const,
  },
];

/* ── Growth Data (Year-over-year) ── */
// TODO: Replace with real YAD data
export const GROWTH_DATA = [
  { year: "2020", studentsServed: 134, graduates: 67 },
  { year: "2021", studentsServed: 198, graduates: 112 },
  { year: "2022", studentsServed: 287, graduates: 178 },
  { year: "2023", studentsServed: 412, graduates: 254 },
  { year: "2024", studentsServed: 581, graduates: 367 },
  { year: "2025", studentsServed: 743, graduates: 489 },
];

/* ── Efficiency Data (Cost-per-outcome) ── */
// TODO: Replace with real YAD data
export const EFFICIENCY_DATA = [
  { name: "Full Scholarship Year", cost: 847, icon: "school" },
  { name: "Dormitory (monthly)", cost: 42, icon: "home" },
  { name: "Career Placement", cost: 156, icon: "work" },
  { name: "Mentorship Package", cost: 23, icon: "groups" },
];

/* ── Cambodia Impact Nodes ── */
// TODO: Replace with real YAD operational data
export interface ImpactNode {
  id: string;
  name: string;
  geoName: string;
  coordinates: [number, number]; // [longitude, latitude]
  studentsReached: number;
  programTypes: string[];
  keyMetric: string;
}

export const IMPACT_NODES: ImpactNode[] = [
  {
    id: "phnom-penh",
    name: "Phnom Penh",
    geoName: "Phnom Penh",
    coordinates: [104.928, 11.556],
    studentsReached: 480,
    programTypes: ["Dormitory", "Scholarship", "Leadership"],
    keyMetric: "94% university placement",
  },
  {
    id: "siem-reap",
    name: "Siem Reap",
    geoName: "Siemréab",
    coordinates: [103.86, 13.367],
    studentsReached: 120,
    programTypes: ["Community Schools"],
    keyMetric: "340 children in English programs",
  },
  {
    id: "battambang",
    name: "Battambang",
    geoName: "Batdâmbâng",
    coordinates: [102.99, 13.096],
    studentsReached: 85,
    programTypes: ["Porridge for Hope"],
    keyMetric: "500+ meals served monthly",
  },
  {
    id: "kampong-cham",
    name: "Kampong Cham",
    geoName: "Kâmpóng Cham",
    coordinates: [105.462, 11.994],
    studentsReached: 58,
    programTypes: ["Community Schools"],
    keyMetric: "3 active community schools",
  },
];

/* ── Student Journey Stages ── */
export interface JourneyStage {
  id: string;
  icon: string;
  title: string;
  description: string;
  statNumber: string;
  statLabel: string;
  pathPosition: number;
  donorImpact?: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "discovery",
    icon: "search",
    title: "Discovery",
    description:
      "YAD scouts identify promising youth in remote provinces and urban slum communities.",
    statNumber: "25",
    statLabel: "provinces reached",
    pathPosition: 0.0,
  },
  {
    id: "selection",
    icon: "assignment_turned_in",
    title: "Selection",
    description:
      "Rigorous interview process ensuring youth with highest potential and need are chosen.",
    statNumber: "200+",
    statLabel: "applicants annually",
    pathPosition: 0.2,
  },
  {
    id: "dormitory",
    icon: "home",
    title: "Safe Housing",
    description:
      "Students receive safe dormitory housing with meals, utilities, and a supportive community.",
    statNumber: "$42",
    statLabel: "per month per student",
    pathPosition: 0.4,
    donorImpact: "Your $42/month funds this stage",
  },
  {
    id: "scholarship",
    icon: "school",
    title: "Full Scholarship",
    description:
      "Complete tuition coverage at partnered universities, removing all financial barriers.",
    statNumber: "$847",
    statLabel: "per year per student",
    pathPosition: 0.6,
    donorImpact: "Your $847 funds a full year",
  },
  {
    id: "mentorship",
    icon: "groups",
    title: "Mentorship",
    description: "1-on-1 pairing with working professionals for career guidance and life skills.",
    statNumber: "1:1",
    statLabel: "mentor ratio",
    pathPosition: 0.8,
  },
  {
    id: "graduation",
    icon: "emoji_events",
    title: "Graduation & Career",
    description: "University completion with career placement support and alumni network access.",
    statNumber: "94%",
    statLabel: "career placement rate",
    pathPosition: 1.0,
  },
];
