# 🏆 ULTIMATE AGENTIC IMPLEMENTATION GUIDE

## YAD Web Infographic System — World #1 NGO Visual Standard

**Version:** 1.0 FINAL | **Target Agent:** Claude Opus (Agentic Mode)
**Prepared by:** Lead Graphic & Web Information Designer
**Date:** June 30, 2026

---

## ⚡ AGENT PRIME DIRECTIVE

You are the **Lead Visual Systems Architect** for YAD (Youth as Developers), a Cambodian youth NGO. Your mission is to design, build, and deliver a **world-leading infographic and data visualization system** that surpasses charity: water, UNICEF, Malala Fund, and WOSM in visual storytelling sophistication, emotional impact, and technical execution — while remaining perfectly faithful to YAD's existing **Material Design 3 (MD3) token system** and Playfair Display + premium sans-serif typography stack.

**You do NOT copy these organizations. You SURPASS them.**

---

## 🧠 DESIGN PHILOSOPHY: THE YAD VISUAL MANIFESTO

Before writing a single line of code, internalize these principles:

### Principle 1: "Data as Poetry"

Numbers at YAD are not metrics — they are testimonies. Every chart, every map node, every progress visualization must carry the **emotional weight of a human story**. A bar representing "342 students graduated" should feel like a standing ovation, not a spreadsheet row.

### Principle 2: "Cambodian Visual DNA"

All infographic aesthetics must feel rooted in Cambodia's visual culture — the geometry of Angkor Wat's repeating stone patterns, the silk textile color gradations of Cambodian weaving (krama), the organic curves of the Mekong Delta. This is NOT clip art of temples. It is **abstract structural language** extracted from culture.

### Principle 3: "Trust Through Transparency"

Every financial infographic is a trust transaction. Donors need to feel that their $1 is respected, tracked, and honored. Visualizations must feel auditable, precise, and irreproachably honest.

### Principle 4: "Motion is Meaning"

Animation is never decorative at YAD. Every motion has a semantic reason: numbers count up because impact GREW. A map node pulses because a community is ALIVE. A path animates because a student WALKED it. No gratuitous easing.

### Principle 5: "Surpassing Requires Specificity"

charity: water uses beautiful photography + simple donut charts. UNICEF uses dense data grids. YAD's differentiator is **narrative specificity** — Cambodia-specific, YAD-specific, student-specific visual systems that no other NGO could claim.

---

## 📦 PHASE 0: ENVIRONMENT AUDIT & DEPENDENCY SETUP

### Agent Task 0.1 — Scan Existing Codebase

```bash
# Run these scans to understand what exists before building
find . -name "*.tsx" | xargs grep -l "AnimatedCounter\|MeasurableImpact\|Impact"
find . -name "*.tsx" | xargs grep -l "recharts\|d3\|visx\|mapbox\|three"
cat package.json | grep -E "recharts|d3|mapbox|visx|framer|gsap"
```

**Identify and document:**

- Existing `AnimatedCounter` implementation (preserve its scroll-trigger logic)
- Current MD3 color token file (CSS custom properties or Tailwind config)
- Existing typography scale (Playfair Display sizes in use)
- Current Impact/Statistics section component structure
- Any existing map or chart attempts

### Agent Task 0.2 — Install Visualization Stack

```bash
npm install recharts
npm install @visx/visx          # For bespoke D3-powered charts
npm install framer-motion        # If not already installed — for orchestrated animation
npm install react-intersection-observer  # Scroll-trigger support
npm install react-spring         # Physics-based number counting
# For maps — choose ONE based on project needs:
npm install mapbox-gl            # Option A: Mapbox (requires API key)
# OR
npm install react-simple-maps    # Option B: Zero-API-key SVG maps (RECOMMENDED for YAD)
```

**Agent Decision Rule:** If a Mapbox API key is NOT configured in `.env`, default to `react-simple-maps` with a custom-styled Cambodia SVG. Do not block on API setup.

### Agent Task 0.3 — Establish Infographic Token System

Create `/src/design-system/infographic-tokens.ts`:

```typescript
/**
 * YAD INFOGRAPHIC DESIGN TOKENS
 * All visualization components MUST consume these tokens.
 * Never hardcode hex values in chart components.
 */
export const CHART_TOKENS = {
  // Primary series — impact data, success metrics
  primary: "var(--md-sys-color-primary)",
  primaryContainer: "var(--md-sys-color-primary-container)",
  onPrimary: "var(--md-sys-color-on-primary)",

  // Secondary series — comparative/supporting data
  secondary: "var(--md-sys-color-secondary)",
  secondaryContainer: "var(--md-sys-color-secondary-container)",

  // Tertiary series — accent/highlight data points
  tertiary: "var(--md-sys-color-tertiary)",
  tertiaryContainer: "var(--md-sys-color-tertiary-container)",

  // Neutral series — grid lines, axis labels, background fills
  surfaceVariant: "var(--md-sys-color-surface-variant)",
  outline: "var(--md-sys-color-outline)",
  outlineVariant: "var(--md-sys-color-outline-variant)",
  onSurfaceVariant: "var(--md-sys-color-on-surface-variant)",

  // Error/Warning series
  error: "var(--md-sys-color-error)",

  // Typography
  fontDisplay: '"Playfair Display", Georgia, serif',
  fontBody: 'var(--font-body, "Inter", system-ui, sans-serif)',
  fontMono: '"IBM Plex Mono", monospace', // For data labels
};

export const ANIMATION_TOKENS = {
  durationFast: 0.3,
  durationMedium: 0.8,
  durationSlow: 1.4,
  durationEpic: 2.2, // For hero stat counters
  easingStandard: [0.2, 0, 0, 1], // MD3 standard easing
  easingEmphasized: [0.05, 0.7, 0.1, 1], // MD3 emphasized (for entries)
  easingSpring: { type: "spring", stiffness: 100, damping: 15 },
};

export const MAP_TOKENS = {
  cambodiaFill: "var(--md-sys-color-surface-variant)",
  cambodiaStroke: "var(--md-sys-color-outline-variant)",
  provinceHoverFill: "var(--md-sys-color-secondary-container)",
  impactNodeColor: "var(--md-sys-color-primary)",
  impactNodePulseColor: "var(--md-sys-color-primary-container)",
  tooltipBackground: "var(--md-sys-color-surface)",
  tooltipText: "var(--md-sys-color-on-surface)",
};
```

---

## 🗺️ PHASE 1: INTERACTIVE CAMBODIA IMPACT MAP

### Specification: What World #1 Looks Like

The best NGO maps (charity: water, WaterAid) show WHERE impact happens with emotional specificity. YAD's map must show the 25 provinces of Cambodia with:

- **Pulsing nodes** at exact locations where YAD programs operate
- **Hover tooltips** with student counts, program names, and a micro-stat
- **Scroll-triggered entrance** — the map draws itself as the user scrolls into view
- **Province-level highlighting** — provinces with YAD presence glow differently

### Agent Task 1.1 — Build `CambodiaImpactMap.tsx`

```tsx
/**
 * CAMBODIA IMPACT MAP COMPONENT
 *
 * Implementation spec for agent:
 * 1. Use react-simple-maps with Cambodia GeoJSON
 * 2. Source GeoJSON: https://raw.githubusercontent.com/wmgeolab/geoBoundaries/main/releaseData/gbOpen/KHM/ADM1/geoBoundaries-KHM-ADM1.geojson
 * 3. Apply MD3 color tokens from infographic-tokens.ts
 * 4. Add framer-motion staggered entrance for provinces
 * 5. Add pulsing SVG circles for impact nodes
 * 6. Mobile-responsive: collapses to list view below 768px
 */

// Impact node data structure — Agent MUST populate with real YAD data:
interface ImpactNode {
  id: string;
  name: string;           // Province/city name
  coordinates: [number, number]; // [longitude, latitude]
  studentsReached: number;
  programTypes: string[]; // e.g., ['Dormitory', 'Scholarship', 'Leadership']
  yearEstablished: number;
  keyMetric: string;      // e.g., "94% university placement rate"
}

// Minimum nodes to implement (research and verify actual YAD locations):
const IMPACT_NODES: ImpactNode[] = [
  { id: 'phnom-penh', name: 'Phnom Penh', coordinates: [104.9282, 11.5564], ... },
  { id: 'siem-reap', name: 'Siem Reap', coordinates: [103.8597, 13.3671], ... },
  { id: 'battambang', name: 'Battambang', coordinates: [102.9898, 13.0957], ... },
  // Continue for ALL provinces where YAD operates
];

// Agent implementation requirements:
// - Pulse animation: CSS keyframe scale(1) → scale(2.5) → scale(1), 2s infinite
// - Node sizes proportional to studentsReached (min 8px, max 24px radius)
// - Tooltip appears on hover with framer-motion AnimatePresence
// - Province fill opacity = 0.15 for non-active, 0.4 for active provinces
// - Map projection: geoMercator centered on Cambodia [104.5, 12.5], scale 3500
```

### Agent Task 1.2 — Province Statistics Panel

Beside the map, build a **sortable statistics sidebar** showing:

- Province name
- Students reached (animated number)
- Top program type (icon)
- "View Stories" CTA per province

This panel must sync bidirectionally with the map — clicking a province card highlights the map, clicking a node highlights the card.

### Agent Task 1.3 — Map Section Layout

```
DESKTOP LAYOUT:
┌─────────────────────────────────────────────────────────┐
│  WHERE WE WORK                    [eyebrow label]        │
│  Reaching Youth Across                                   │
│  Every Corner of Cambodia         [section headline]     │
├───────────────────────────┬─────────────────────────────┤
│                           │  Province Cards (scrollable)│
│    CAMBODIA SVG MAP       │  ┌─────────────────────┐   │
│    with pulsing nodes     │  │ Phnom Penh    2,340 │   │
│                           │  │ Siem Reap       891 │   │
│    [Province glow on      │  │ Battambang      654 │   │
│     hover/click]          │  │ ...                 │   │
│                           │  └─────────────────────┘   │
├───────────────────────────┴─────────────────────────────┤
│  [Total: X Provinces] [X Students] [X Programs Active]  │
└─────────────────────────────────────────────────────────┘

MOBILE LAYOUT:
- Map collapses to 300px tall decorative version
- Province cards become full-width horizontal scroll
- Tooltip becomes bottom sheet on tap
```

---

## 📊 PHASE 2: FINANCIAL TRANSPARENCY VISUALIZATION SUITE

### Specification: The "$1 Lifecycle" System

This is YAD's TRUST ENGINE. Donors who see exactly where money goes give more and give again. The suite has THREE components:

### Agent Task 2.1 — Animated Allocation Donut Chart

```tsx
/**
 * DONATION ALLOCATION DONUT
 *
 * Library: Recharts (PieChart with custom label renderer)
 *
 * Design spec:
 * - Custom center label: Large Playfair Display "100%" with "of your donation" below
 * - Segments animate sequentially on scroll-enter (each segment draws in clockwise)
 * - Segment colors: primary, secondary, tertiary, surfaceVariant
 * - On hover: segment lifts (transform: scale(1.08)) and tooltip appears
 * - Legend: custom horizontal pills below chart, NOT Recharts default legend
 *
 * Data structure (populate with REAL YAD financial data):
 */
const ALLOCATION_DATA = [
  {
    name: "Student Programs",
    percentage: 78,
    description: "Direct scholarship, dormitory, and mentorship costs",
    color: CHART_TOKENS.primary,
  },
  {
    name: "Operations",
    percentage: 12,
    description: "Staff, facilities, administration",
    color: CHART_TOKENS.secondary,
  },
  {
    name: "Training & Events",
    percentage: 7,
    description: "Leadership bootcamps, workshops",
    color: CHART_TOKENS.tertiary,
  },
  {
    name: "Fundraising",
    percentage: 3,
    description: "Communications and donor relations",
    color: CHART_TOKENS.surfaceVariant,
  },
];

// Animation: Use framer-motion to animate each slice with staggerChildren
// The chart should NOT render until 40% of it is in viewport (useInView hook)
// First load: all slices at 0% → animate to final percentage over 1.4s
// Easing: MD3 emphasized [0.05, 0.7, 0.1, 1]
```

### Agent Task 2.2 — Annual Impact Trend Bar Chart

```tsx
/**
 * YEAR-OVER-YEAR GROWTH CHART
 *
 * Library: Recharts BarChart with custom bar shape
 *
 * Design spec:
 * - Custom rounded-top bar shape (borderRadius top corners only)
 * - Bars animate upward from baseline on scroll-enter, staggered left→right
 * - Y-axis: clean numbers (no decimal), right-aligned labels in onSurfaceVariant
 * - X-axis: year labels in fontMono for data credibility
 * - Grid: horizontal dashed lines in outlineVariant, NO vertical grid
 * - Reference line: "Program Launch" annotation on year YAD started
 * - Tooltip: custom card-style tooltip (MD3 Elevation 2 surface)
 * - Dual metric toggle: [Students Served] [Graduates] tabs switch dataset
 *
 * Data (5-year minimum, populate with real YAD data):
 */
const GROWTH_DATA = [
  { year: "2019", studentsServed: 89, graduates: 34 },
  { year: "2020", studentsServed: 134, graduates: 67 },
  { year: "2021", studentsServed: 198, graduates: 112 },
  { year: "2022", studentsServed: 287, graduates: 178 },
  { year: "2023", studentsServed: 412, graduates: 254 },
  { year: "2024", studentsServed: 581, graduates: 367 },
  { year: "2025", studentsServed: 743, graduates: 489 },
];
```

### Agent Task 2.3 — Program Efficiency Horizontal Bar

```tsx
/**
 * COST-PER-OUTCOME VISUALIZATION
 *
 * This is YAD's most trust-building graphic. Shows:
 * "For $X, YAD delivers [specific outcome]"
 *
 * Design: Horizontal progress bars with icon prefix
 *
 * Layout:
 * [🎓 icon] Full Scholarship Year          ████████░░  $847
 * [🏠 icon] Dormitory (monthly)            ████░░░░░░  $42/mo
 * [📚 icon] Mentorship Package             ██░░░░░░░░  $23
 * [💼 icon] Career Placement Support       ███░░░░░░░  $156
 *
 * Animation: bars fill left→right on scroll-enter
 * The baseline (100% = highest value) should be clearly shown
 * Labels: dollar amounts in fontMono, names in fontBody
 * Icons: use thin-line SVG icons matching YAD's existing icon system
 */
```

---

## 🎓 PHASE 3: "JOURNEY OF A STUDENT" SVG INFOGRAPHIC

### Specification: The Scroll-Triggered Pipeline

This replaces generic text descriptions of programs. It is YAD's most differentiated visual asset. No other NGO has this exact concept executed for Cambodia.

### Agent Task 3.1 — Design the Pipeline Architecture

```
VISUAL CONCEPT: A stylized path (representing a rural road turning into a university corridor)
flows horizontally across the screen. As the user scrolls, a student figure (abstract,
represented by a circle with a backpack icon) travels along the path, stopping at each
program stage to reveal impact statistics.

STAGES (left → right):
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│  [RURAL VILLAGE]──────→[DISCOVERY]──────→[SELECTION]──────→[DORMITORY]      │
│      🏘️                    🔍                 ✅                 🏠           │
│  "Province                "YAD Scout        "Rigorous           "Safe         │
│   families"               identifies"       interview"          housing"      │
│                                                                                │
│  [DORMITORY]──────→[SCHOLARSHIP]──────→[MENTORSHIP]──────→[GRADUATION]      │
│      🏠                  📚                 👥                  🎓            │
│  "Monthly                "Full tuition      "1-on-1 with        "94% complete│
│   support"               covered"           professionals"      university"  │
│                                                                                │
│  [GRADUATION]──────→[CAREER]──────→[ALUMNI GIVING BACK]                     │
│      🎓                  💼                 🔄                               │
│  "University             "Job placement     "Becomes a                        │
│   complete"              90% rate"          mentor themselves"               │
│                                                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Agent Task 3.2 — Technical Implementation

```tsx
/**
 * STUDENT JOURNEY INFOGRAPHIC
 *
 * Implementation: Framer Motion scroll-linked animation
 *
 * Technical approach:
 * 1. Use useScroll() + useTransform() from framer-motion
 * 2. Map scrollYProgress [0, 1] to path travel progress
 * 3. SVG path: custom bezier curve representing the journey road
 * 4. Student avatar: circle that moves along SVG path using offsetDistance
 * 5. Stage cards: fade + slide up when student avatar reaches their position
 * 6. Background: subtle Cambodia landscape silhouette (mountains → city skyline)
 *    as SVG background layer that shifts via parallax
 *
 * STICKY SECTION: The entire infographic section should be position:sticky
 * within a tall scroll container (height: 500vh) so it pins and animates
 * while the user scrolls through 5 "screens" worth of content
 *
 * Mobile fallback: Vertical timeline (no scroll-linked animation)
 * with tap-to-expand stage details
 *
 * CRITICAL — Cambodian visual detail:
 * The path/road SVG should have subtle Angkor Wat geometric decorative
 * elements (repeating chevron or lotus patterns) along its border.
 * These should be SVG path elements in outlineVariant color at 20% opacity.
 * This is the "Cambodian DNA" design principle in action.
 */

interface JourneyStage {
  id: string;
  icon: string; // SVG icon component name
  title: string;
  description: string;
  statNumber: string; // e.g., "94%"
  statLabel: string; // e.g., "completion rate"
  pathPosition: number; // 0.0 to 1.0, where on the path this stage sits
  donorImpact?: string; // e.g., "Your $42/month funds this stage"
}
```

---

## 📈 PHASE 4: ENHANCED MEASURABLE IMPACT SECTION

### Specification: Upgrading AnimatedCounter to Full Visual System

Preserve what works (the Playfair Display large number aesthetic) and LAYER graphical context around it.

### Agent Task 4.1 — Impact Stat Card v2.0

```tsx
/**
 * IMPACT STAT CARD — ENHANCED
 *
 * Current state: Large number + label (text only)
 *
 * Enhanced state: Number + contextual mini-chart + story hook
 *
 * Layout per card:
 * ┌────────────────────────────────────┐
 * │  [mini sparkline chart — 7yr trend]│  ← NEW: 60px tall recharts Sparkline
 * │                                    │
 * │          1,847                     │  ← KEEP: AnimatedCounter Playfair 8xl
 * │     Students Supported             │  ← KEEP: Label
 * │                                    │
 * │  ↑ 34% from last year              │  ← NEW: YoY delta indicator
 * │  "Meet Sreymom, student #1,847 →"  │  ← NEW: Human story hook link
 * └────────────────────────────────────┘
 *
 * The sparkline: Recharts <Sparklines> or custom SVG path
 * - No axes, no labels — pure trend shape
 * - Area fill: primaryContainer at 40% opacity
 * - Line: primary color, 2px stroke
 * - Last data point: filled circle in primary
 *
 * The delta indicator:
 * - Green upward arrow + percentage for positive metrics
 * - Animated: slides in from left after counter finishes
 * - Typography: fontMono, small, onSurfaceVariant
 */
```

### Agent Task 4.2 — Program Reach Visualization Grid

A visual grid/heatmap showing **which programs have the most reach**:

```tsx
/**
 * PROGRAM REACH HEATMAP
 *
 * Visual: A grid of cells, each representing 10 students
 * Total cells = totalStudents / 10
 * Cells colored by program type
 *
 * On scroll-enter: cells fill in one-by-one in a wave pattern
 * Animation: staggered opacity 0→1, scale 0.8→1, 30ms delay per cell
 *
 * Legend: below grid, shows program type → color mapping
 *
 * This is the "waffle chart" approach used by NYT graphics desk —
 * dramatically more emotional than a bar chart for human-count data
 * because viewers can literally COUNT individual people.
 *
 * "Each square = 10 students" label must be prominent
 */
```

---

## 🌟 PHASE 5: PREMIUM ENHANCEMENTS (BEYOND #1)

These are the elements that will make international design awards take notice.

### Agent Task 5.1 — Live Data Dashboard Ticker (Header Strip)

```tsx
/**
 * LIVE IMPACT TICKER
 *
 * A thin strip (40px height) just below the main navigation
 * Contains horizontally scrolling impact facts, separated by diamond dividers
 *
 * Visual: Like Bloomberg Terminal or NYT Breaking News ticker, but beautiful
 * Typography: fontMono, small caps, onSurface color
 * Background: surfaceVariant, 1px border-bottom in outlineVariant
 *
 * Content alternates between:
 * - Real-time-feeling stats: "1,847 students supported to date"
 * - Program highlights: "New cohort applications open — Siem Reap Province"
 * - Impact moments: "Class of 2024: 94% placed in career roles"
 *
 * Animation: CSS marquee animation, pauses on hover
 * Speed: 30s per full cycle (not too fast, dignified pace)
 *
 * This is a signature differentiator — NO major NGO uses this.
 */
```

### Agent Task 5.2 — "Weight of Impact" Generative Art Background

```tsx
/**
 * GENERATIVE BACKGROUND — IMPACT SECTION
 *
 * Concept: Behind the statistics section, a canvas-based generative art piece
 * renders slowly. It creates organic flowing lines (like river currents, or
 * silk threads — both Cambodian references) that radiate from the center.
 * Each line represents one student's trajectory.
 *
 * Technical: HTML5 Canvas API (not Three.js — too heavy)
 * Lines: Bezier curves in primary color at 3-8% opacity
 * Density: 1,847 lines total (= number of students)
 * Rendering: Draws in slowly over 4 seconds on load
 * Performance: requestAnimationFrame with cleanup on unmount
 *
 * This makes the typography-first design philosophy MORE powerful —
 * the numbers literally have depth and texture behind them.
 *
 * Mobile: Disable canvas, use static gradient instead
 * Reduced motion: Immediately show final state, no animation
 */
```

### Agent Task 5.3 — Donor Impact Calculator (Interactive)

```tsx
/**
 * INTERACTIVE IMPACT CALCULATOR
 *
 * User types/slides a donation amount → sees real-time what it funds
 *
 * UI: Slider (0 → $500) + Text input (keyboard entry)
 *
 * Output visualization (updates in real-time as slider moves):
 * - "Your $42 covers: [icon] 1 month of safe dormitory housing"
 * - "Your $120 covers: [icon] One semester of academic mentorship"
 * - "Your $847 covers: [icon] A full scholarship year for one student"
 *
 * At threshold amounts: a student avatar illustration "appears" with name
 * and photo (real YAD student photos — check for consent/usage rights)
 *
 * CTA below: "Donate $[selectedAmount] Now" → links to donation page
 *
 * This is the highest-converting infographic type for NGOs.
 * charity: water has a version; YAD's will be more emotionally specific.
 */
```

### Agent Task 5.4 — Annual Report Infographic Download Module

```tsx
/**
 * VISUAL ANNUAL REPORT MODULE
 *
 * A section that presents the Annual Report not as a PDF download link,
 * but as an inline visual summary with key infographics rendered on-page,
 * and THEN offers the full PDF.
 *
 * Layout: 3-column infographic grid showing:
 * - Financial summary (donut chart)
 * - Program reach (Cambodia map miniature)
 * - Year's key achievement (single large stat)
 *
 * Below: "Download Full 2025 Annual Report [PDF]" button
 *
 * This dramatically increases Annual Report engagement because
 * donors see the VALUE before committing to the download.
 */
```

---

## 🔧 PHASE 6: TECHNICAL QUALITY & PERFORMANCE REQUIREMENTS

### Agent Task 6.1 — Performance Budget

Every visualization component MUST meet:

```
- First Contentful Paint: < 1.5s (lazy-load all chart components)
- Cumulative Layout Shift: 0 (pre-allocate space with aspect-ratio)
- JavaScript Bundle: Chart components code-split with React.lazy()
- Animation frame rate: 60fps on mid-tier Android devices
- SVG file size: < 150KB for Cambodia map GeoJSON (simplify if needed)
```

### Agent Task 6.2 — Accessibility Requirements

```tsx
// ALL charts MUST have:
// 1. aria-label on the chart container: "Chart showing [what it shows]"
// 2. A visually-hidden <table> with the underlying data (for screen readers)
// 3. Keyboard navigation for interactive elements (map nodes, chart tooltips)
// 4. Color is NEVER the only differentiator — pattern fills as backup
// 5. prefers-reduced-motion: CSS @media query MUST disable all canvas/scroll animations
//    and show final states immediately

// Example pattern:
const shouldAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

### Agent Task 6.3 — Responsive Design Breakpoints

```
Mobile  (< 640px):  Single column, simplified charts, no canvas, no sticky scroll
Tablet  (640-1024px): Two column, full charts, simple map
Desktop (> 1024px): Full layout, all features, generative canvas enabled
Wide    (> 1440px): Max-width container 1280px, charts scale to 120% of base size
```

### Agent Task 6.4 — Dark Mode Support

```tsx
// All CHART_TOKENS use CSS custom properties
// MD3 dark theme automatically inverts via [data-theme="dark"] or @media (prefers-color-scheme: dark)
// Canvas-based art: must re-render on theme change (listen to prefers-color-scheme changes)
// Recharts tooltips: manually styled with CSS variables, NOT hardcoded colors
// Map SVG: province fills should use tokens, not hardcoded values
```

---

## 📋 PHASE 7: COMPONENT FILE STRUCTURE

```
src/
├── components/
│   └── infographics/
│       ├── index.ts                          # Barrel export
│       ├── CambodiaImpactMap/
│       │   ├── CambodiaImpactMap.tsx
│       │   ├── ImpactNode.tsx                # Pulsing node component
│       │   ├── ProvinceTooltip.tsx           # Hover tooltip
│       │   ├── ProvinceStatsPanel.tsx        # Sidebar list
│       │   └── CambodiaImpactMap.module.css  # Pulse keyframe animation
│       ├── FinancialCharts/
│       │   ├── AllocationDonut.tsx
│       │   ├── GrowthBarChart.tsx
│       │   ├── EfficiencyBars.tsx
│       │   └── CustomTooltip.tsx             # Shared MD3-styled tooltip
│       ├── StudentJourney/
│       │   ├── StudentJourneySection.tsx     # Sticky scroll wrapper
│       │   ├── JourneyPath.tsx               # SVG path + avatar
│       │   ├── StageCard.tsx                 # Individual stage reveal card
│       │   └── JourneyBackground.tsx         # Cambodia landscape SVG
│       ├── ImpactStats/
│       │   ├── EnhancedStatCard.tsx          # AnimatedCounter + sparkline
│       │   ├── WaffleChart.tsx               # People-count grid
│       │   └── GenerativeBackground.tsx      # Canvas art
│       └── Interactive/
│           ├── DonorCalculator.tsx           # Impact calculator
│           ├── ImpactTicker.tsx              # Header strip
│           └── AnnualReportModule.tsx        # Visual annual report
├── design-system/
│   └── infographic-tokens.ts                # Token file (Phase 0)
└── hooks/
    ├── useInViewAnimation.ts                 # Scroll-trigger helper
    ├── useScrollProgress.ts                  # Framer scroll progress
    └── useReducedMotion.ts                   # Accessibility hook
```

---

## 🎯 AGENT EXECUTION SEQUENCE

Execute phases in strict order. Validate each phase before proceeding.

```
PHASE 0: Environment Audit → Dependency Install → Token File Creation
  ↓ VALIDATION: `npm run build` succeeds, tokens file renders correctly

PHASE 1: Cambodia Map → Province Panel → Sync logic
  ↓ VALIDATION: Map renders in browser, provinces highlight on hover,
                tooltips show correct data, mobile view works

PHASE 2: Donut Chart → Bar Chart → Efficiency Bars
  ↓ VALIDATION: All charts animate on scroll, respond to reduced-motion,
                use only token colors, tooltips are accessible

PHASE 3: Journey Path SVG → Scroll Animation → Mobile Fallback
  ↓ VALIDATION: Sticky scroll works at all speeds, avatar tracks correctly,
                stage cards reveal at correct positions

PHASE 4: Enhanced Stat Cards → Waffle Chart → Section Assembly
  ↓ VALIDATION: Sparklines load, delta indicators animate, waffle fills in wave

PHASE 5: Ticker → Canvas Art → Calculator → Annual Report Module
  ↓ VALIDATION: All interactive elements function, canvas draws correctly,
                calculator updates in real-time

PHASE 6: Performance Audit → Accessibility Audit → Dark Mode Test
  ↓ VALIDATION: Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95

PHASE 7: Final Integration → QA Across Breakpoints
  ↓ VALIDATION: Full Cypress/Playwright test suite passes
```

---

## 🚨 CRITICAL AGENT RULES (DO NOT VIOLATE)

1. **NEVER hardcode hex colors** in any chart or visualization component. Always use `CHART_TOKENS.*` or CSS custom property strings.

2. **NEVER use clip art, stock illustration styles, or generic NGO icons** (hands holding globe, diverse group circle, etc.). All icons must be thin-line, geometric, and match YAD's existing icon vocabulary.

3. **NEVER render a chart before its container is in viewport.** Every visualization uses `useInView` or Intersection Observer before mounting the Recharts/D3 component. This prevents layout thrash and creates the signature "reveals as you scroll" effect.

4. **ALWAYS provide a text data table as an accessibility fallback** — visually hidden with `sr-only` class, containing the same data as the visual chart.

5. **ALWAYS test on real data.** If YAD real data is unavailable, use clearly marked placeholder data with `// TODO: Replace with real YAD data` comments — never ship with made-up numbers presented as real.

6. **NEVER break the existing design system.** If a visualization needs a color not in MD3 tokens, add it to `infographic-tokens.ts` and justify it in a code comment. Do not create ad-hoc inline styles for brand colors.

7. **The Cambodia map is sovereign territory** — render province boundaries accurately. Use the official geoBoundaries dataset or GADM data for Cambodia ADM1 level.

8. **ALWAYS implement `prefers-reduced-motion`** — users with vestibular disorders must receive a safe, non-animated experience that still communicates all information.

---

## 📊 SUCCESS METRICS

When this implementation is complete, YAD's infographic system should score:

| Metric                                  | Target                    | Measurement Method                                       |
| --------------------------------------- | ------------------------- | -------------------------------------------------------- |
| Visual Impact Score                     | #1 vs. benchmark NGOs     | Qualitative audit vs. charity:water, UNICEF, Malala Fund |
| User Time on Impact Page                | +120% vs. current         | Analytics                                                |
| Donation Click-Through from Impact Page | +80% vs. current          | Conversion analytics                                     |
| Annual Report Download Rate             | +200% vs. current         | Analytics                                                |
| Lighthouse Performance                  | ≥ 90                      | Lighthouse CI                                            |
| Lighthouse Accessibility                | ≥ 95                      | Lighthouse CI                                            |
| Designer Award Eligibility              | Awwwards / FWA nomination | Submission criteria audit                                |

---

## 🌏 FINAL VISION STATEMENT FOR AGENT

When a major donor, an institutional grant committee, or a partner organization visits YAD's website and reaches the impact sections, they must feel the following — in this exact emotional order:

1. **Orientation** — "I understand immediately where YAD works and how big this is."
2. **Trust** — "The financial transparency is remarkable. I can see exactly where my donation goes."
3. **Empathy** — "I understand the journey these students take. I can feel the distance they've traveled."
4. **Conviction** — "The data is irrefutable. YAD's impact is real, measurable, and growing."
5. **Action** — "I need to be part of this. Where do I donate?"

**If the visualization system achieves all five of these in sequence, it has succeeded.**

Now: begin with Phase 0. Read the codebase. Build what is missing. Elevate what exists.

---

_End of Agent Implementation Guide_
_Classification: Internal Development Document — YAD Web Team_
_Next Review: After Phase 3 completion_
