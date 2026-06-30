# YAD Cambodia Developer Handover Guide

This document provides critical operational context for maintaining and scaling the YAD Cambodia platform.

## 1. Database Management & RLS

The Supabase PostgreSQL database is secured using explicit Row Level Security (RLS) policies.

- **Public Traffic**: The browser client is restricted to `SELECT` operations on public tables (like `programs` and `events`) and `INSERT` on application forms (like `student_applications`).
- **Admin Traffic**: Next.js Server Actions utilize the Service Role Key via `createAdminClient()` to bypass RLS entirely for administrative CRUD operations. **Never expose the Service Role Key to the client.**
- **Indexes**: Essential B-tree indexes are defined in `rls-policies-and-indexes.sql`. Ensure you run this migration script.

## 2. Stripe Integration

The platform uses Stripe for processing donations.

- **Webhooks**: Stripe webhooks (`/api/stripe/webhook`) must be configured to point to your production domain to update the `donations` table from `pending` to `succeeded`.
- **Testing**: Use the Stripe CLI to forward events to your local environment during development:
  `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## 3. Playwright E2E Testing

Automated UI tests run within GitHub Actions.

- If you add new critical user flows (e.g., a new application type), write a corresponding `.spec.ts` file in the `tests/` directory.

## 4. Internationalisation (i18n)

The foundation for `next-intl` is configured via `src/i18n/`.

- Dictionaries are located in `messages/en.json` and `messages/km.json`.
- When ready, wrap the `app/(main)` folder within `app/[locale]/(main)` to fully activate localized URL structures.

## 5. Audit Logging

Sensitive administrative actions automatically log to the `audit_logs` table.

- When creating a new server action that modifies state, always import and execute `auditLog('ACTION', 'table_name', id)`.

## 6. Sentry Monitoring

Errors are captured via `@sentry/nextjs`. Check the Sentry dashboard to view production exceptions. The global error boundary (`app/global-error.tsx`) catches unhandled exceptions and displays a fallback UI.
