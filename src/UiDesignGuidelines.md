# YAD Website UI Design Guidelines & Template

Based on the recent UI updates and aesthetic shifts across the application, this document serves as a standard template and guideline for implementing new UI components. It ensures that any new feature perfectly matches the current premium, structured, and modern look.

## 1. Core Principles

- **Structured Shapes:** We are moving away from overly rounded corners (e.g., `rounded-2xl`, `rounded-[2.5rem]`) on base structural elements. Use `rounded-md` and `rounded-sm` for standard cards, inputs, buttons, and images to maintain a mature, professional appearance.
- **Micro-Interactions:** Elements should feel alive. Rely on subtle scaling (`hover:scale-105`), opacity changes, and sliding elements (like arrows) on hover.
- **Glassmorphism (Targeted):** Use glass-like panels exclusively for floating elements, pop-ups, or highly accentuated callout cards to make them pop off the background.
- **Subtle Glows:** Use large, blurred background elements (`bg-primary/5 blur-[120px]`) to add depth to solid surface backgrounds without overwhelming the content.

## 2. Design Tokens & Classes

### 2.1 Border Radii (Corners)

- **Standard Cards, Images, Form Elements:** `rounded-md` or `rounded-sm`. _(Example: Program Images, Global Footprint charts)_
- **Floating/Glass Cards:** `rounded-2xl`. _(Example: Floating feature cards over images)_
- **Icons/Avatars:** `rounded-full` or `rounded-xl`.

### 2.2 Glassmorphism Pattern

When you need a floating or overlay card, use this exact combination of classes:

```css
className="bg-white/20 backdrop-blur-md backdrop-saturate-150 p-5 rounded-2xl shadow-lg border border-white/30"
```

### 2.3 Layout & Spacing

Always adhere to the global spacing variables for section alignment:

- **Container Wrapper:** `max-w-container-max mx-auto`
- **Horizontal Padding:** `px-margin-mobile md:px-margin-desktop`
- **Section Bottom Margin:** `mb-section-gap`
- **Top Margin (if spacing down from hero/header):** `mt-20 lg:mt-32`

### 2.4 Hover Animations & Micro-Interactions

Standardize hover effects to be smooth and subtle.

- **General Elements:** `hover:scale-105 transition-all duration-300`
- **Fading/Revealing Elements:** `opacity-80 hover:opacity-100 transition-opacity duration-300`
- **Links with Arrows:**
  ```tsx
  <Link
    href="..."
    className="group flex items-center text-on-surface-variant hover:text-primary transition-colors"
  >
    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
    <span>Click Here</span>
  </Link>
  ```
- **Icon Buttons (Socials/Contacts):** `bg-primary/5 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 text-primary`

### 2.5 Colors & Typography

- **Backgrounds:** `bg-surface` for light sections, `bg-surface-container` for distinct blocks.
- **Text:** `text-on-surface` (Primary content), `text-on-surface-variant` (Secondary content, paragraphs), `text-primary` (Headings, active states).
- **Typography Classes:** `font-display-md`, `font-headline-md`, `font-body-md`, `font-label-md`. (Always pair the font family class with its size class, e.g., `font-body-md text-body-md`).

## 3. Standard UI Component Template

Use the following boilerplate when creating a new section component:

```tsx
"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/shared/components/animations/RevealOnScroll";

export function NewStandardSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-12 md:py-16 mb-section-gap">
      {/* Background Decorative Glow (Optional) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <RevealOnScroll className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Section Title</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            A brief description of what this section is about, using the variant text color for
            visual hierarchy.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card Item */}
          <div className="group relative bg-surface-container rounded-md p-6 border border-outline-variant/30 hover:border-primary/40 transition-colors duration-300">
            {/* Image/Icon */}
            <div className="relative w-full h-48 mb-6 rounded-sm overflow-hidden">
              <Image
                src="/assets/images/placeholder.png"
                alt="Image Description"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Text Content */}
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Card Headline
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Detailed content goes here. Notice the transition of the border color on the parent
              group.
            </p>

            {/* Interactive Link */}
            <a
              href="#"
              className="group/link flex items-center text-sm font-medium text-on-surface-variant hover:text-primary transition-colors w-fit"
            >
              <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-300 text-primary" />
              <span>Learn More</span>
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
```

## 4. Key Takeaways for Developers

- **Check your borders:** Are you using `rounded-2xl` on a non-floating element? Change it to `rounded-md` or `rounded-sm`.
- **Check your colors:** Are you using raw hex codes? Use semantic variables like `text-on-surface-variant` instead.
- **Check your spacing:** Use `px-margin-mobile md:px-margin-desktop` instead of raw tailwind classes like `px-4 md:px-8`.
- **Add life:** Ensure all clickable or important elements have a `hover:` state that includes a color change, an opacity transition, or a `scale-105` effect with a `duration-300`.
