# YAD Cambodia - Next.js Application

This is the official codebase for the Youth Action for Development (YAD) Cambodia web application and NGO management portal.

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe Checkout & Elements
- **Monitoring**: Sentry
- **Testing**: Playwright
- **i18n**: Next-Intl

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and populate the required Supabase and Stripe keys.

   ```bash
   cp .env.example .env.local
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Development Commands

- `npm run dev`: Start Turbopack dev server.
- `npm run build`: Create optimized production build.
- `npm run lint`: Run ESLint.
- `ANALYZE=true npm run build`: Run Next.js Bundle Analyzer.
- `npx playwright test`: Run End-to-End Tests.

## Architecture Guidelines

- **Server Actions First**: Use React Server Actions (`src/server/actions/`) for data mutations to eliminate intermediate REST API layers.
- **Client/Server Separation**: Keep interactive UI logic in `.client.tsx` components while maintaining data fetching securely in Server Components.
- **Security**: The database is locked down with explicit Row Level Security (RLS). Use `createAdminClient()` strictly for backend administrative mutations.
