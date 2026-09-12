# Homepage Collection Continuity

**Approved direction:** Continue the hero into a navy product section, give the real product photographs larger light stages, and replace the category pills with underlined text tabs. Preserve the completed second chapter transition.

**Scope:** Local CSS in `src/styles/studio.css`, regression tests in `src/pages/StudioPages.test.jsx`. Keep the original images, copy, catalogue data, two featured models per family, navigation, inquiry links, keyboard controls and carousel unchanged. No agents, browser audit, preview restart, image editing or commit.

## Implementation

- [x] Update the previous test's first-section white-background guard for the newly approved navy direction. Add regressions for the flat navy surface, the hero's non-interactive navy fade, light image stages, transparent underlined tabs, focus visibility, and responsive product sizing. Run the focused suite and confirm the new expectations fail before CSS changes.
- [x] Replace the rounded overlapping white transition with navy and locally scoped light foreground/link/muted/divider tokens. Blend the existing hero overlay into that same navy at its bottom edge.
- [x] Keep both model introductions side by side on desktop, with larger white photograph stages and unboxed navy copy. Stack each photograph and copy on tablet, then use one model column on mobile. Retain contained original images without blend-mode tinting.
- [x] Change category pills to horizontally scrollable, underlined text tabs with at least 44px targets and visible keyboard focus. Leave all JSX and interaction logic intact.
- [x] Run focused tests, the full suite, production build, design detector and scoped whitespace checks. Record results without a browser or preview restart.

## Verification

- RED: two expected style failures, 34 existing focused tests passed.
- GREEN: 36 focused tests passed; full suite passed all 659 tests across 30 files. Production build and scoped whitespace checks passed (only existing LF/CRLF notices).
- Post-edit design detector returned no findings for the homepage, selection component and stylesheet.
- Foreground, muted text and links on navy have calculated contrast ratios of 16.44:1, 10.99:1 and 10.72:1. Focus and selected-tab underline use the same high-contrast light blue.
- Source-level responsive review: original contained photographs are 340px high on desktop, 300px on tablet and 280px on mobile. Tabs scroll inside their own container with 52px controls and an inset focus outline; desktop keeps two models, mobile one column.
- No JSX, source photos, model data, behavior or second-transition changes. No browser verification performed, in accordance with the user's preference to review appearance themselves.
