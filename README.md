<div align="center">
  <img src="public/favicon.ico" alt="YAD Logo" width="100" />
  <h1>Youth Action for Development (YAD) Cambodia</h1>
  <p><em>Next-Generation NGO Management Portal & Public Web Application</em></p>
  
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" /></a>
    <a href="https://stripe.com/"><img src="https://img.shields.io/badge/Stripe-Payments-6772E5?style=for-the-badge&logo=stripe" alt="Stripe" /></a>
  </p>
</div>

---

## 🌟 Vision & Mission

**YAD Cambodia** is an open-source, full-stack application designed to revolutionize how Non-Governmental Organizations operate. We bridge the gap between grassroots community action and enterprise-grade software architecture. By contributing to this project, you're not just writing code; you're building systems that directly empower communities, manage transparent donations, and scale humanitarian efforts.

## 🚀 Key Features

- **High-Performance Public Website**: SEO-optimized, highly interactive landing pages powered by App Router, GSAP animations, and Lenis smooth scrolling.
- **Secure NGO Management Portal**: Role-based access control, real-time analytics with Recharts, and interactive maps via React Simple Maps.
- **Global Reach (i18n)**: Full internationalization support using `next-intl`.
- **Integrated Payments**: Frictionless donation flows securely handled by Stripe Checkout & Elements.
- **Resilient Architecture**: End-to-end type safety (TypeScript + Zod) and comprehensive monitoring (Sentry).

## 🏗️ Architecture & Engineering Principles

We cater to world-class software engineers by maintaining strict, modern design patterns:

### 1. Server Actions First
We eliminate intermediate REST APIs. All data mutations occur via strictly typed React Server Actions located in `src/server/actions/`. This ensures type safety from the database query directly to the client UI.

### 2. Client/Server Segregation
We leverage React Server Components to their fullest. Interactive UI logic resides in `.client.tsx` components at the edges of the tree, while heavy data fetching is securely maintained in server components.

### 3. Bulletproof Security
Our Supabase PostgreSQL database is locked down with explicit Row Level Security (RLS) policies. `createAdminClient()` is strictly reserved for backend administrative mutations, ensuring zero data leakage.

## 🚦 Getting Started

### Prerequisites
- Node.js (v22+)
- npm
- Supabase CLI (optional, for local DB development)

### Local Development Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/yad-cambodia/yad-website.git
   cd yad-website
   npm install
   ```

2. **Environment Configuration**
   Copy the example environment file and populate it with your local/staging Supabase and Stripe keys.
   ```bash
   cp .env.example .env.local
   ```

3. **Ignite the Turbopack Engine**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## 📂 Project Structure

A meticulously organized monolithic architecture:

```text
src/
├── app/          # Next.js App Router (Routes, Layouts, API endpoints)
├── features/     # Domain-driven feature modules (e.g., Auth, Donate, Portal)
├── i18n/         # Internationalization configurations and dictionaries
├── infra/        # Infrastructure & External services (Stripe, Sentry, Resend)
├── lib/          # Core utilities (Supabase clients, generic helpers)
├── providers/    # Global React Context providers (Theme, Auth)
├── server/       # Secure Server Actions and database operations
└── shared/       # Shared UI components (Shadcn UI), hooks, and generic animations
```

## 🧪 Testing & Code Quality

We demand high code quality to maintain stability for our NGO partners:

- **Linting & Formatting**: Enforced via ESLint 9 and Prettier.
  ```bash
  npm run lint && npm run format
  ```
- **End-to-End Testing**: Comprehensive critical-path coverage using Playwright.
  ```bash
  npx playwright test
  ```

## 🤝 Contributing

We welcome contributions from world-class developers. Whether you're optimizing our Web Vitals, extending our map visualizations, or refining our database schema, your expertise is valued.

1. Check the [Issues](https://github.com/yad-cambodia/yad-website/issues) tab for "Good First Issue" or "Help Wanted".
2. Read the documentation in the `docs/` directory.
3. Fork the repository, create your feature branch, and submit a PR with detailed context.

---
<p align="center">
  Built with ❤️ for a better future.
</p>
