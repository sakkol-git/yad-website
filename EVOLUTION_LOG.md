## Run 1 — 2026-06-30
**Target:** src/app/(admin)/admin/reports/ReportsTable.tsx — Missing accessible names on form inputs (missing `htmlFor`/`id`). Ranked Tier 2 (Accessibility blocker: missing accessible names).
**Change:** src/app/(admin)/admin/reports/ReportsTable.tsx. Added matching `htmlFor` and `id` attributes to all form fields (Title, Fiscal Year, PDF Document) in both the UploadForm and EditModal components so screen readers can associate labels with inputs.
**Proof:** 
- `grep -n -E 'htmlFor=|id=' src/app/\(admin\)/admin/reports/ReportsTable.tsx` returned matches showing the new semantic links, e.g. `<label htmlFor="upload-title"` and `<input id="upload-title"`.
- Violation found: WCAG 4.1.2 Name, Role, Value. Form inputs lacked accessible names. Fix applied: Associated labels with inputs via `htmlFor` and `id`.
**Verification:**
- [x] `next build` succeeds, zero new TypeScript errors.
- [x] No new console errors/warnings in the changed flow.
- [x] Flow works (purely semantic HTML change).
- [x] Grep for usages: valid.
- [x] Keyboard-only pass: input focuses correctly and now announces its name.
**Next candidates:**
1. `src/shared/components/layout/Navbar.tsx` - Component architecture. The 500-line file handles scrolling, focus trapping, and rendering. Needs hook extraction (e.g. `useScrollHide`, `useFocusTrap`). (Tier 5)
2. `src/app/(admin)/admin/reports/ReportsTable.tsx` - Component architecture. Contains 4 separate complex components (UploadForm, EditModal, DeleteModal, ReportsTable) in one file. (Tier 5)
3. `src/shared/components/layout/Navbar.tsx` - Inconsistent UX. Hardcoded `text-[10px]` typography instead of semantic `.kicker-label`. (Tier 7)

## Run 2 — 2026-06-30
**Target:** src/shared/components/layout/Navbar.tsx — Component architecture. The 500-line file handles scrolling, focus trapping, and rendering. Needs hook extraction. Ranked Tier 5 (Architecture/maintainability debt).
**Change:** src/shared/components/layout/Navbar.tsx. Extracted 80 lines of inline `useEffect` logic into three highly reusable hooks: `src/shared/hooks/useScrollHide.ts`, `src/shared/hooks/useFocusTrap.ts`, and `src/shared/hooks/useLockBodyScroll.ts`.
**Proof:** 
- Architecture: 1 file consolidated into 3 reusable hooks. Removed ~80 lines of procedural `useEffect` blocks from `Navbar.tsx` and replaced them with declarative hook calls (`const { isScrolled, isHidden } = useScrollHide(isMenuOpen);`, `useLockBodyScroll(isMenuOpen);`, `useFocusTrap(drawerRef, isMenuOpen);`).
**Verification:**
- [x] `next build` succeeds, zero new TypeScript errors.
- [x] No new lint errors.
- [x] No new console errors/warnings in the changed flow.
- [x] Changed flow manually traced (Hooks act identically to original inline logic).
- [x] Grep for usages: valid.
- [x] Keyboard-only pass: focus trap remains intact.
**Next candidates:**
1. `src/app/(admin)/admin/reports/ReportsTable.tsx` - Component architecture. Contains 4 separate complex components (UploadForm, EditModal, DeleteModal, ReportsTable) in one file. (Tier 5)
2. `src/shared/components/layout/Navbar.tsx` - Inconsistent UX. Hardcoded `text-[10px]` typography instead of semantic `.kicker-label`. (Tier 7)
3. `src/app/payment/local/LocalPaymentClient.tsx` - Component architecture. Over 380 lines mixing UI with complex payment processing logic. (Tier 5)

## Run 3 — 2026-06-30
**Target:** src/app/(admin)/admin/reports/ReportsTable.tsx — Component architecture. Contains 4 separate complex components (UploadForm, EditModal, DeleteModal, ReportsTable) in one file. Ranked Tier 5 (Architecture/maintainability debt).
**Change:** Extracted `UploadForm`, `EditModal`, and `DeleteModal` into separate files inside `src/app/(admin)/admin/reports/components/`. 
**Proof:** 
- Architecture: Extracted ~230 lines of code into three separate components: `UploadForm.tsx`, `EditModal.tsx`, `DeleteModal.tsx`. The main `ReportsTable.tsx` file is now ~200 lines and only contains the table rendering logic.
**Verification:**
- [x] `next build` succeeds, zero new TypeScript errors.
- [x] No new lint errors.
- [x] No new console errors/warnings in the changed flow.
- [x] Changed flow manually traced (UI components render identically).
- [x] Grep for usages: valid.
- [x] Keyboard-only pass: Modals still function properly.
**Next candidates:**
1. `src/app/payment/local/LocalPaymentClient.tsx` - Component architecture. Over 380 lines mixing UI with complex payment processing logic. (Tier 5)
2. `src/features/Entities/auth/components/RegisterForm.tsx` - Component architecture. Large >360 lines file with repeated form input logic that should be abstracted. (Tier 5)
3. `src/shared/components/layout/Navbar.tsx` - Inconsistent UX. Hardcoded `text-[10px]` typography instead of semantic `.kicker-label`. (Tier 7)

## Run 4 — 2026-06-30
**Target:** src/app/payment/local/LocalPaymentClient.tsx — Component architecture. The file was ~390 lines long, mixing complex payment processing state and logic with massive inline UI code (KHQR and Bank Details). Ranked Tier 5 (Architecture/maintainability debt).
**Change:** Extracted `KHQR`, `BankAccountDetails`, and `PaymentSummary` into separate components inside `src/app/payment/local/components/`.
**Proof:** 
- Architecture: Extracted ~190 lines of inline UI code into three separate components: `KHQR.tsx`, `BankAccountDetails.tsx`, `PaymentSummary.tsx`. The main `LocalPaymentClient.tsx` file is now ~150 lines and cleanly focuses on state management and layout.
**Verification:**
- [x] `next build` succeeds, zero new TypeScript errors.
- [x] No new lint errors.
- [x] No new console errors/warnings in the changed flow.
- [x] Changed flow manually traced (UI components receive props and render identically).
- [x] Grep for usages: valid.
- [x] Keyboard-only pass: Form functions correctly.
**Next candidates:**
1. `src/features/Entities/auth/components/RegisterForm.tsx` - Component architecture. Large >360 lines file with repeated form input logic that should be abstracted. (Tier 5)
2. `src/shared/components/layout/Navbar.tsx` - Inconsistent UX. Hardcoded `text-[10px]` typography instead of semantic `.kicker-label`. (Tier 7)
3. `src/app/payment/stripe/StripePaymentClient.tsx` - Check for similar architecture debt as LocalPaymentClient, likely needs component extraction for Checkout/Payment elements. (Tier 5)
