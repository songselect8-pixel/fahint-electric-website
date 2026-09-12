# USB Series Poster Implementation Plan

> **For agentic workers:** Use executing-plans inline. Preserve the existing checkout and unrelated changes; do not create agents, commit, or restart the preview.

**Goal:** Place the supplied USB charging poster behind the USB series introduction, with legible overlaid copy and a bright product area.

**Architecture:** Keep the existing series component and content. Add one USB-only modifier and a decorative image/shade layer. Scope all layout and color rules to that modifier so other families and product filters stay unchanged.

**Tech Stack:** React, existing SafeImage/publicAsset handling, CSS, Vitest.

## Design

- User-selected composition: full-width supplied poster with live overlaid text.
- Left-align the existing title, description, and model metadata. Fade the navy scrim toward the right-hand receptacle instead of darkening the whole photograph.
- Preserve the 1920 × 450 image and source bytes. At desktop widths retain at least the natural banner height; use `object-fit: cover` and a 60% horizontal focal point on narrower tablets.
- At 760px and below, use a 640px minimum stage, a 74% horizontal focal point, and a top/bottom scrim with the main copy low in the frame.
- Keep breadcrumbs keyboard accessible, model counts data-derived, and all existing search/filter behavior.

## Steps

- [x] Add regression checks in `src/pages/LineDetail.test.jsx`: USB poster path/dimensions/eager priority, live heading and model count, desktop/mobile overlay styles, and absence of poster treatment on the other five non-GFCI series.
- [x] Run `npm test -- src/pages/LineDetail.test.jsx` and confirm the new poster assertions fail against the current plain introduction.
- [x] Copy `D:/国际站运营平台/方特插座/网站资料/网站图片制作/FTR15QC_AC20W_桌面充电横幅_1920x450_20260911/USB插座桌面连接海报_1920x450.webp` to `public/assets/images/lines/usb-series-desktop-charging-v1.webp`; verify SHA256 equality without modifying the original.
- [x] In `src/pages/LineDetail.jsx`, set `const hasPoster = line.slug === 'usb-outlets'`; append `catalog-series__intro--poster` only for USB and render SafeImage with width 1920, height 450, `loading="eager"`, `fetchpriority="high"`, and empty decorative alt text. Add an aria-hidden shade. Keep existing text as HTML.
- [x] In `src/styles/catalog.css`, add modifier-scoped absolute image/shade layers, a relative content grid, white heading, light body/breadcrumb/meta text, and a readable focus ring. Desktop copy maximum: `min(520px, 44%)`; stage minimum: `max(440px, 23.4375vw)`. At 760px switch to bottom-aligned copy up to 480px wide and the mobile composition above.
- [x] Run `npm test -- src/pages/LineDetail.test.jsx src/pages/StudioPages.test.jsx src/siteVisuals.test.jsx src/mediaOptimization.test.js src/assetPaths.test.js` and `npm run build`.
- [x] Run `git diff --check` for touched files. Record verification and hand off without a browser audit or preview-server change.

## Verification results

- Red: the new USB poster test failed on the missing introduction modifier; the existing checks passed.
- Green: 67 targeted checks passed, followed by all 646 tests across 30 files after the final mobile scrim adjustment.
- `npm run build` passed. `git diff --check` passed with only existing LF/CRLF conversion notices.
- `ffprobe` confirmed 1920 × 450. Original and deployed copy share SHA256 `97395913D596C5697D71F5E030EB71250ED95768F82FB474600C20B40ED35527` (200,064 bytes).
- The source poster, other family introductions, search/filter behavior, and preview server were not modified. No browser audit, staging, or commit was performed.
