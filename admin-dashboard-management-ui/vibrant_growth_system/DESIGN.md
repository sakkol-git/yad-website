---
name: Vibrant Growth System
colors:
  surface: '#f8faf8'
  surface-dim: '#d8dad9'
  surface-bright: '#f8faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f2'
  surface-container: '#eceeec'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e1e3e1'
  on-surface: '#191c1b'
  on-surface-variant: '#414941'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#eff1ef'
  outline: '#717971'
  outline-variant: '#c1c9bf'
  surface-tint: '#396847'
  primary: '#013619'
  on-primary: '#ffffff'
  primary-container: '#1d4d2e'
  on-primary-container: '#8abd95'
  inverse-primary: '#9fd3aa'
  secondary: '#416837'
  on-secondary: '#ffffff'
  secondary-container: '#bfecae'
  on-secondary-container: '#456c3a'
  tertiary: '#1b303d'
  on-tertiary: '#ffffff'
  tertiary-container: '#324754'
  on-tertiary-container: '#9eb5c4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#baefc4'
  primary-fixed-dim: '#9fd3aa'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#205031'
  secondary-fixed: '#c2efb1'
  secondary-fixed-dim: '#a6d296'
  on-secondary-fixed: '#012200'
  on-secondary-fixed-variant: '#2a4f21'
  tertiary-fixed: '#cfe6f6'
  tertiary-fixed-dim: '#b3cad9'
  on-tertiary-fixed: '#061e29'
  on-tertiary-fixed-variant: '#344956'
  background: '#f8faf8'
  on-background: '#191c1b'
  surface-variant: '#e1e3e1'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 60px
  section-gap: 120px
---

## Brand & Style

This design system is built for the **Youth Advancement for Development (YAD)**, pivoting away from traditional institutional aesthetics toward a vibrant, optimistic, and forward-thinking visual language. The brand personality is **energetic, nurturing, and accessible**, designed to resonate with young changemakers.

The visual style blends **Modern Corporate** with **Organic Minimalism**. It utilizes heavy whitespace to create an "airy" feel, paired with soft-edge geometry that feels approachable rather than rigid. The emotional response should be one of "actionable hope"—the feeling that sustainable development is both modern and achievable. Key characteristics include high-quality environmental imagery, subtle background blurs, and a rhythmic use of rounded containers.

## Colors

The palette is derived from the natural world, emphasizing growth and clarity. 
- **Primary:** A deep Forest Green used for headings and brand identifiers to maintain authority and grounding.
- **Secondary:** A soft Leaf Green used for primary actions and highlights, evoking freshness.
- **Tertiary:** A crisp Sky Blue used for secondary buttons and background accents, providing a cooling contrast.
- **Accent:** A muted Olive/Moss used for specific call-to-action buttons (e.g., "Our Approach") to differentiate from standard navigational buttons.
- **Neutral:** The background leans into a very soft off-white/mint tint rather than pure white, reducing eye strain and enhancing the organic feel.

## Typography

The system utilizes **Plus Jakarta Sans** across all levels to maintain a cohesive, modern, and friendly voice. 

- **Display & Headlines:** Use tight letter spacing and heavy weights (Bold/ExtraBold). These should be rendered in the Primary Forest Green to anchor the page.
- **Body Text:** Uses a generous line height (1.6) to ensure readability, especially when describing complex development goals. 
- **Labels:** Reserved for navigation and small buttons, emphasizing clarity without the need for all-caps styling.

## Layout & Spacing

This design system follows a **Fluid Grid** model with an emphasis on "Organic Breathing Room." 

- **Grid:** A 12-column system is used for desktop, but elements frequently break the grid with floating offsets to create a more dynamic, less "boxed-in" feel.
- **Margins:** Desktop margins are intentionally wide (60px+) to funnel the user's eye toward the central content.
- **Rhythm:** Vertical spacing between sections is aggressive (120px) to prevent the visual fatigue often found in data-heavy development sites. 
- **Mobile:** Content reflows into a single column with reduced margins, while maintaining large touch targets for buttons.

## Elevation & Depth

Hierarchy is achieved through **Soft Tonal Layers** and **Ambient Shadows**.

- **Surface Tiers:** Use extremely subtle gradients (e.g., from Tertiary Blue to Neutral) to define card areas rather than hard borders.
- **Shadows:** Shadows are highly diffused and low-opacity, using a slight primary color tint (Forest Green mixed with Alpha) instead of pure gray. This makes the cards feel like they are floating gently above the surface.
- **Glassmorphism:** Navigation bars and certain overlay cards use a 20px backdrop blur with a 60% white opacity to maintain context of the background imagery while ensuring text legibility.

## Shapes

The shape language is **Pill-shaped and Ultra-Rounded**. 

- **Buttons:** All buttons use a full "pill" radius.
- **Cards:** Use `rounded-xl` (1.5rem / 24px) to mirror the organic curves found in nature.
- **Media:** Images should either use the same 24px corner radius or, for featured elements, organic mask shapes (blobs or soft-edge "pebble" shapes).

## Components

- **Buttons:** 
    - *Primary:* Pill-shaped, Secondary Green background, dark text.
    - *Secondary:* Pill-shaped, Tertiary Blue background, dark text.
    - *Ghost:* No background, Primary Green text, used for less critical navigation.
- **Cards:** Features a white or high-transparency background, `rounded-xl` corners, and the "Ambient Shadow" defined in the Elevation section. Content inside cards should be center-aligned for feature sections.
- **Input Fields:** Soft-tinted backgrounds (Neutral) with `rounded-lg` corners and 2px focus rings in Secondary Green. No heavy borders.
- **Chips/Badges:** Used for category labels, featuring a light tint of the primary/secondary colors and bolded label typography.
- **Interactive Elements:** Hover states should involve a subtle scale-up (1.02x) and a slight increase in shadow spread to enhance the "floating" metaphor.