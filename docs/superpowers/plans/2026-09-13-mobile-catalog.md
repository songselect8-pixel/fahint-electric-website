# Mobile Catalogue Refinements Implementation Plan

> Execute inline with the executing-plans workflow. No subagents, browser-preview restart, commit or push; the user reviews the visual result locally.

**Goal:** Correct the mobile series posters, shorten model lists, standardize gallery thumbnails and restore unobtrusive contact actions.

**Architecture:** Retain the existing photographs, data, routes and shared React components. Adjust the owning responsive CSS rules, not the desktop compositions. Reuse the existing contact rail and same-page inquiry anchors.

**Tech Stack:** React, React Router, Lucide, CSS media queries, Vitest and Testing Library; no new dependencies.

## 1. Series posters and model grids

- [x] Update `src/pages/LineDetail.test.jsx`: mobile poster is an in-flow image, its shade is hidden, and its text container no longer has a 640px minimum height. Retain all five original poster paths and desktop composition assertions.
- [x] Add layout contracts in `src/siteVisuals.test.jsx`: two model columns on small phones; three at 600–760px; readable wrapping names and compact square photographs. Include the GFCI grid and related models.
- [x] Run `npm test -- src/pages/LineDetail.test.jsx src/siteVisuals.test.jsx` and confirm the new requirements fail.
- [x] Replace the mobile poster rules in `src/styles/catalog.css` with `position: relative; height: clamp(220px, 64vw, 320px)`, `display: none` for the shade and `min-height: 0` for the copy container. Keep the existing 74%, 50% and 30% product focal positions.
- [x] Remove the 420px single-column catalogue overrides and the GFCI single-column overrides in `src/styles/product-experience.css`. In `src/styles/site-system.css`, set compact mobile card type and spacing. Leave desktop rules intact.
- [x] Re-run the same tests and require PASS.

## 2. Galleries and inquiry action

- [x] Add a mobile gallery contract in `src/components/products/ProductGallery.test.jsx`: `.product-detail-hero .product-gallery__thumbs` uses `display: flex; flex-wrap: nowrap; overflow-x: auto`, and thumbnails use `flex: 0 0 max(52px, calc((100% - 32px) / 5))`.
- [x] Extend `src/pages/ProductDetail.test.jsx` and `src/pages/CatalogProductDetail.test.jsx`: the mobile quote link has an accessible model-specific name, contains an icon rather than visible button text, and retains the current pathname/query plus `#inquiry`.
- [x] Run these three test files; confirm new assertions fail before editing implementation.
- [x] Remove the mobile USB/lighting three-column thumbnail exception. Add one mobile strip rule in `src/styles/site-system.css` for every `ProductDetailHero` consumer, retaining all gallery images and selection/zoom behavior.
- [x] In both detail-page components, render `MessageSquareText` inside the existing link, with `aria-label` preserving the model-specific request. Style `.product-mobile-quote` as a fixed 52px circle at `left: max(16px, env(safe-area-inset-left, 0px)); right: auto`, with bottom safe-area clearance. Keep it hidden above 760px.
- [x] Re-run the targeted tests and require PASS.

## 3. Mobile contact rail and final verification

- [x] Create `src/components/FloatingRail.test.jsx`: real company WhatsApp/mail links, initialization when already scrolled, return-to-top scrolling and reduced-motion support.
- [x] Add a shared-style contract that mobile `.rail` remains visible, uses 52px circular controls, hides desktop hover panels and has safe-area offsets.
- [x] Run `npm test -- src/components/FloatingRail.test.jsx src/siteVisuals.test.jsx`; confirm the initialization, reduced-motion and mobile visibility requirements fail.
- [x] In `FloatingRail.jsx`, initialize the scroll state with `onScroll()` inside the effect, keep its listener cleanup, and use `window.matchMedia?.('(prefers-reduced-motion: reduce)').matches` to select `auto` or `smooth` scrolling. Add a phone inside the chat glyph for the WhatsApp action.
- [x] Replace the mobile `display: none` rail rule in `site-system.css` with a bottom-right vertical rail: top action above WhatsApp and email; green WhatsApp, brand-blue email and neutral back-to-top. Leave the inquiry icon at bottom-left.
- [x] Run `npm test`, `npm run build`, and `git diff --check`. Inspect final diff and CSS cascade for 320, 390, 492, 600, 760, 768, 1024 and 1440px conditions. Report the browser-visual-verification limitation and do not deploy without a new request.

## Verification result

- Completed on 2026-09-13. The GFCI mobile video also uses a separate, unshaded media stage above its copy.
- `npm test`: 32 test files and 692 tests passed.
- `npm run build`: passed.
- `git -c core.safecrlf=false diff --check`: passed.
- Reviewed the shared CSS cascade and responsive breakpoints in source. No browser or real-device visual check was performed, in keeping with the user's local-preview review workflow.
- Changes remain local on `codex/mobile-catalog-refinements`; no commit, push or deployment was performed.

## Follow-up: desktop-style controls, contact categories and video ratio

- Removed the mobile-only circular/color overrides so WhatsApp, email and back-to-top reuse the desktop navy, 46px, 12px-radius controls and their order. The left inquiry icon uses the same visual treatment.
- The Contact page now passes the same seven `productLines` categories as the published homepage. Valid incoming model links preselect their category; unknown models stay unselected. Existing model-specific detail forms and retained legacy homepage versions are unchanged.
- `ffprobe` confirmed both the GFCI video and its poster are 1440 × 572. Replaced the forced mobile 16:9 ratio with `auto 1440 / 572` and removed the height cap to avoid background bands without cropping the video.
- Observed 15 expected failing assertions before implementation. The targeted 121 tests then passed, followed by all 696 tests in 32 files. Production build and diff whitespace checks also passed.
- Verification remains source/tests/build only; no browser preview was opened or restarted and no commit, push or deployment was performed.
