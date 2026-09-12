# Receptacle Series Poster Implementation Plan

> **For agentic workers:** Use executing-plans inline. Preserve the current checkout and unrelated changes; no agents, commits, or preview-server restart.

**Goal:** Replace the Standard Receptacles introduction with the supplied desk-power poster and remove its right-hand descriptive paragraph.

**Architecture:** Reuse the existing USB/dimmer poster markup in `LineDetail.jsx`. Add the receptacle asset to the poster selection and conditionally omit only this family's summary. Add a receptacle-specific modifier for the centered product and a faster-fading desktop shade; keep existing shared responsive typography, breadcrumbs, counts and filters.

**Tech Stack:** React, SafeImage, CSS, Vitest, native file copy.

## Design

User-selected full-width photo with live title and existing model metadata. Remove the summary from the DOM rather than visually hiding it; retain the data for other consumers. The source receptacle is centered, unlike the earlier two posters: use `object-position: 50% center` on desktop and mobile. At widths over 760px, darken only the left copy area and fade to nearly clear before the receptacle. On mobile, retain the existing vertical shade and lower copy placement, with the centered product crop. Do not edit source image pixels or change product cards.

## Steps

- [x] Extend `src/pages/LineDetail.test.jsx` with `['receptacles', 'Standard Receptacles', 'receptacle-series-desk-power-v1.webp', 30]`. Remove receptacles from plain-introduction cases. Verify no summary paragraph, retained heading/breadcrumb/three metadata entries, and centered crop/faster desktop shade. Verify other family descriptions remain present.
- [x] Run `npm test -- src/pages/LineDetail.test.jsx` and confirm new assertions fail against the current plain introduction and summary.
- [x] Copy `D:/国际站运营平台/方特插座/网站资料/网站图片制作/三款应用场景重新构思_1920x450_20260912/交付文件/WEBP/标准插座_桌边供电_1920x450.webp` unchanged to `public/assets/images/lines/receptacle-series-desk-power-v1.webp`. Refuse an existing destination; verify SHA256 and 1920 × 450 dimensions.
- [x] Add the poster selection and receptacle-only class/summary condition in `src/pages/LineDetail.jsx`.
- [x] In `src/styles/catalog.css`, set the receptacle poster focal point to 50%. Within `@media (min-width: 761px)`, use a horizontal navy shade with opacity .94 at 0%, .82 at 24%, .58 at 36%, .08 at 46%, and zero at 56%. Keep existing mobile shade unchanged.
- [x] Run the focused tests, `npm test`, `npm run build`, and scoped `git diff --check`. Record results and hand off without a browser audit or server changes.

## Verification

- Red: 2 expected failures on the missing receptacle poster/modifier; 8 existing checks passed.
- Green: 10 focused tests passed, followed by all 654 tests across 30 files.
- `npm run build` passed (1644 modules). Scoped `git diff --check` passed with only LF/CRLF conversion notices.
- Copied asset: 205,336 bytes, 1920 × 450; SHA256 `04B583D9B8FE7B52DFBB0B76001E0D61FCEAAEDC9F72E4A28E5B9705ADAAF623` matches the original exactly.
- Receptacle summary is absent from the introduction DOM; heading, breadcrumbs, all three metadata entries, 30 products and search/filter controls remain. Other family descriptions remain present.
- Original image and summary data are preserved. No browser audit, server changes, staging or commit was performed.
