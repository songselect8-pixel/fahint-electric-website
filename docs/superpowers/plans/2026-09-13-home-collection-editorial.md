# Homepage Collection Editorial Implementation Plan

> Execute inline with executing-plans; no subagents, preview/browser work, commits or pushes. Preserve the current branch and all unrelated pending mobile refinements.

**Goal:** Integrate the chapter index into a more expressive six-category photographic collection.

**Architecture:** Move existing JSX without changing navigation targets. Change only collection/index rules in the shared Studio stylesheet; keep all image assets and carousel state intact.

**Tech Stack:** Existing React, CSS Grid, Reveal, Lucide, Vitest and Testing Library.

## Tasks

- [x] Update `src/pages/StudioPages.test.jsx` to require the chapter nav inside `.studio-product-transition`, immediately before `.studio-collection`, with the six original anchors. Require a transparent content-width index, 18px links, a visible inquiry outline, and a left-aligned collection heading.
- [x] Update gallery regressions for `grid-template-columns: repeat(12, minmax(0, 1fr))`, default `grid-column: span 4`, children 1/5 at span 5 and 3/4 at span 3, and reset all spans at 1150px. Retain 3:2 `object-fit: contain`, two-column tablet and single-column phone checks. Add checks for the decorative 44px arrow, hover-only feedback and the wrapping three-column phone index.
- [x] Run `npm test -- src/pages/StudioPages.test.jsx src/components/FloatingRail.test.jsx src/components/Header.test.jsx` and confirm the new requirements fail for the current strip/equal-grid implementation.
- [x] In `src/pages/HomeStudio.jsx`, move the existing `<nav className="studio-chapter-nav">` after the background StudioImage inside `.studio-product-transition`. Do not change the six link labels or destinations.
- [x] In `src/components/studio/StudioProductSelection.jsx`, wrap the existing caption arrow in `<span className="studio-selection-card__action" aria-hidden="true">`; retain one full-card Link and no new copy.
- [x] In `src/styles/studio.css`, implement the 5/4/3 and 3/5/4 layout with `grid-column` rules and lower/upper row alignment. Set image `border-radius: 12px` and one shadow, captions to `padding-block: 16px 0`, names to `clamp(20px, 1.65vw, 28px)`, and the action to a 44px outlined circle. Restrict image brightness and arrow movement to fine-pointer hover; use the same action contrast for keyboard focus.
- [x] Integrate the index: backdrop `background: #20272b; padding-top: clamp(40px, 5vw, 72px)` and room-image `opacity: .55`; nav `width: min(calc(100% - var(--studio-gutter) * 2), 1600px); margin-inline: auto; background: transparent; border-bottom: 1px solid var(--studio-line)`. Links remain at least 48px high; use 18px type, 24px for the first entry and an outlined last entry. At 1100px allow wrap; at 760px use three equal columns, 14px type, normal white-space and no horizontal scrolling.
- [x] Re-run targeted tests. Run `node C:/Users/XuWanPi/.codex/skills/impeccable/scripts/detect.mjs --json --scope layout src/pages/HomeStudio.jsx src/components/studio/StudioProductSelection.jsx src/styles/studio.css` once after implementation. Review findings against changed scope; do not rework incumbent sections.
- [x] Run `npm test -- --maxWorkers=2 --minWorkers=2`, then `npm run build`, then `git -c core.safecrlf=false diff --check`. Inspect the final source cascade and record verification without claiming a browser/real-device visual check.

## Verification evidence

- Four expected failures reproduced the old strip, equal-size grid, nonwrapping phone index and missing decorative action. All 84 targeted checks passed after implementation.
- The single Impeccable layout detector pass returned `[]` with exit code 0.
- The full suite passed: 703 tests across 32 files. Production build passed with 1645 modules; whitespace checks passed.
- Source review confirms a 12-track 5/4/3 and 3/5/4 desktop layout, equal two-column reset at 1150px, and single-column phone gallery at 760px. The phone index wraps to three columns, and all six category names/order/routes and complete image frames remain intact.
- Main hero content/behavior, mobile transparent poster controls and shared contact rail were preserved. No browser/device visual inspection was performed; no assets were generated, and nothing was committed or pushed.
