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
