# Mobile Homepage Hero Implementation Plan

> Execute inline with executing-plans, no subagents. Preserve the current working branch and unrelated changes; no browser preview, commit, push or deployment.

**Goal:** Show the mobile installation poster before a compact, paper-colored brand introduction.

**Architecture:** Retain RoomHero, its three images and carousel state. Use mobile CSS grid overlap and existing CSS tokens. Keep only the two content span/class hooks for mobile-only copy simplification; do not alter desktop copy or actions.

**Tech Stack:** Existing React, CSS, Vitest and Testing Library. No dependencies.

## Task 1: Regression requirements

- [x] In `src/pages/StudioPages.test.jsx`, change the existing mobile-copy order expectation from `0` to `2`. Add a mobile hero test asserting `padding-top: var(--header-h)`, photo `order: 0; aspect-ratio: 3 / 2`, controls `order: 1`, copy `order: 2; width: 100%; background: var(--studio-paper)`, and no header padding on the copy.
- [x] Add a compact-controls test requiring three equal control columns, 44px touch targets, a full-width navy primary button, hidden repetitive captions, and unchanged full summary text plus the two content hooks.
- [x] Run `npm test -- src/pages/StudioPages.test.jsx`. Confirm the new mobile requirements fail while the existing scene labels and interactions still pass.

## Task 2: Minimal implementation

- [x] In `src/pages/HomeStudio.jsx`, wrap the second sentence in `<span className="studio-hero__program-summary">` while retaining its leading space; add `className="studio-hero__evidence-detail"` to the documentation list item.
- [x] Replace only the main `@media (max-width: 760px)` hero rules in `src/styles/studio.css`: hero padding reserves the fixed header; image uses order 0 and complete 3:2 geometry; controls use order 1 with `padding: 4px var(--studio-gutter) 12px`; copy uses order 2, full width and `padding: 24px var(--studio-gutter) 28px` with paper/ink colors.
- [x] Set the mobile h1 to `clamp(34px, 8vw, 44px)`, its continuation to `.84em`, identity to 11px, and summary to 15px with 1.6 line-height. Hide only `.studio-hero__program-summary`, `.studio-hero__paths > div > span`, and `.studio-hero__evidence-detail` at this breakpoint.
- [x] Use one-column actions with no top border, 4px row gap, a full-width 49px navy primary button with 8px radius, and a 44px secondary text link. Make scene controls `grid-template-columns: repeat(3, minmax(0, 1fr))`, 10px gap and fluid 11–12px labels. Remove the later mobile `.studio-home .studio-hero__bottom { padding-bottom: 46px; }` override.
- [x] Run `npm test -- src/pages/StudioPages.test.jsx` and require PASS. Review source cascade at 320, 390, 492, 760 and desktop widths, preserving the desktop base and short-height rules.

## Task 3: Verification and handoff

- [x] Run `npm test`, `npm run build` and `git -c core.safecrlf=false diff --check`; require all to pass.
- [x] Inspect the final diff, record verification counts and summarize the image-first layout. State that the result is local, with visual preview review left to the user.

## Completion evidence

- The initial mobile tests failed in three expected places, then passed after the implementation. A separate regression check also caught and fixed the documentation bullet's CSS specificity.
- `ffprobe` confirmed that all three original hero images are 1536 × 1024, matching the complete 3:2 mobile stage.
- All 698 tests across 32 files passed. Production build and diff whitespace checks passed.
- Final diff preserves desktop styling, original scene labels, image paths, carousel behavior and action destinations. Only two nonvisual markup hooks and the existing mobile hero CSS changed.
- No browser/real-device visual check was performed. The existing local branch and other pending changes are preserved; nothing was committed, pushed or deployed.

## Follow-up: transparent overlays and visible homepage contact rail

Execute inline with executing-plans. Keep the previous completion evidence as history; verify this follow-up separately.

- [x] Update `src/pages/StudioPages.test.jsx`: the mobile hero must use `display: grid; grid-template-columns: minmax(0, 1fr); padding-top: 0`, the photo and controls must both use `grid-area: 1 / 1`, controls must have `align-self: end; z-index: 1; background: transparent`, and copy must use `grid-row: 2`. Require a transparent mobile `.header--home.header--transparent .burger` and retain complete 3:2 imagery and 44px scene buttons.
- [x] Add a regression in `src/components/FloatingRail.test.jsx` rejecting the `body:has(.studio-page) .rail` and `body:has(.studio-home) .rail` hiding rules. Existing link, initial scroll, Back to top and reduced-motion tests remain the behavior checks. Add a Header test covering transparent top, solid open menu, and transparent again after closing.
- [x] Run `npm test -- src/pages/StudioPages.test.jsx src/components/FloatingRail.test.jsx src/components/Header.test.jsx`. Confirm expected mobile-overlay and hidden-rail failures before implementation.
- [x] Modify only `src/styles/studio.css`: replace mobile flex ordering with the grid declarations above, keep the image in flow, keep the existing copy panel, give scene labels a small `text-shadow` for readability, and make only the transparent homepage menu button's background transparent. Remove the two obsolete rail-hiding declarations and their stale comment, retaining shared rail appearance and behavior.
- [x] Re-run the targeted tests, then `npm test`, `npm run build`, and `git -c core.safecrlf=false diff --check`. Review the mobile/desktop cascade and hand back the local change without browser previews, commits or pushes.

### Follow-up verification evidence

- Four expected failures reproduced the previous flex ordering, solid mobile menu, and Studio rail suppression; all 82 targeted tests passed after the CSS fix.
- The first full-suite run overlapped with the build and hit two existing asynchronous waits in Footer and InquiryForm. Both suites passed separately (41 tests), without modifying either implementation or relaxing their assertions.
- A full rerun with `npm test -- --maxWorkers=2 --minWorkers=2` passed all 701 tests across 32 files. The production build passed with 1645 modules, and the diff whitespace check passed.
- Removed both Studio rail-hiding rules. The existing shared rail retains its contact destinations, navy icons, safe-area positioning and Back to top threshold of 500px. Mobile poster/header controls have no solid bands; desktop hero styles and all three scene labels/images remain unchanged.
- No browser/real-device visual verification, preview restart, commit, push or deployment was performed.
