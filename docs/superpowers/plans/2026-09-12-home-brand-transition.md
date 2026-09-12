# Home Brand Transition Implementation Plan

> Execute inline using the existing frontend, ponytail, test-first and verification workflow. User approved only the second homepage issue. No agents, commits, preview restart, or browser audit.

**Goal:** Replace the white gap between the residential scene and company photograph with a navy chapter transition, retaining separation and leaving the first product section unchanged.

**Architecture:** One static sibling between `StudioApplicationMap` and `BrandIntroduction` in `src/pages/HomeStudio.jsx`. Replace the old adjacent-section margin rule in `src/styles/studio.css` with the transition's own height and background. Fade only the bottom edge of the existing scene through a non-interactive CSS pseudo-element. No assets, data or interaction changes.

**Tech Stack:** React, existing CSS tokens, Vitest / Testing Library.

## Steps

- [x] Update `src/pages/StudioPages.test.jsx`: retain original hero asset assertions; add a regression for map → navy transition → brand DOM order, `Inside FAHINT` label, no transition controls, responsive height, a non-interactive image fade, removal of the old white-margin rule, and preservation of the white product-transition surface.
- [x] Run `npm test -- src/pages/StudioPages.test.jsx`; observe the missing-transition failure.
- [x] Insert this immediately after `<StudioApplicationMap />`:

```jsx
<div className="studio-brand-transition">
  <div className="studio-wrap"><span>Inside FAHINT</span></div>
</div>
```

- [x] Replace `.studio-application-map + .studio-brand { margin-top: ... }` with:

```css
.studio-brand-transition { display: flex; align-items: center; min-height: clamp(104px, 8vw, 120px); padding-block: 24px; background: var(--studio-navy); color: #a4c5d6; }
.studio-brand-transition > .studio-wrap { display: flex; align-items: center; gap: 24px; }
.studio-brand-transition span { flex-shrink: 0; font-size: 13px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.studio-brand-transition > .studio-wrap::after { content: ''; flex: 1; height: 1px; background: #344b5e; }
.studio-application-map__stage::after { content: ''; position: absolute; z-index: 1; inset: auto 0 0; height: clamp(48px, 6vw, 96px); background: linear-gradient(180deg, rgba(7,27,48,0), var(--studio-navy)); pointer-events: none; }
```

In the existing `@media (max-width: 760px)` block, add `.studio-brand-transition { min-height: 72px; padding-block: 20px; }`.

- [x] Run focused tests, full tests, `npm run build`, and scoped `git diff --check`. Run the design detector once after changes and separate existing out-of-scope findings from this transition. Record results.

## Scope and evidence

- Only the second issue is authorized: retain `.studio-product-transition` and `StudioProductSelection` unchanged.
- The new label is the user-approved chapter cue, not a new marketing claim. Keep source photographs, product facts, links, tab behavior, scene rotation, map hotspots and reduced-motion behavior unchanged.
- Responsive pseudo-element sits inside the image stage, below hotspots; open mobile product cards remain outside that stage. It cannot receive pointer or keyboard input.
- Source and existing screenshot inspected. No browser session or image editing needed for this localized change.

## Verification

- RED: one expected missing-transition failure, 33 tests passed.
- GREEN: all 34 focused tests passed; full suite passed 657 tests across 30 files.
- Production build and scoped whitespace checks passed. Only Git's existing LF/CRLF normalization notices appeared.
- Pre-edit layout detector and post-edit full detector both returned no findings for `HomeStudio.jsx`.
- Transition text `#a4c5d6` on navy `#071b30` has a calculated contrast ratio of 9.55:1.
- Source-level responsive review: 104–120px desktop band, 72px mobile band; label and rule fit narrow containers; fade remains inside the photo stage with `pointer-events: none`, below hotspot stacking.
- Hero, first product section, source photographs, model data, interaction code, navigation, and remaining sections unchanged. No browser audit, server restart, image edits, staging, or commit.
