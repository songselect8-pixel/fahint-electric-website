# Smart Switch Series Poster Implementation Plan

> **For agentic workers:** Use executing-plans inline. Preserve existing work; no agents, commits, or preview-server restart.

**Goal:** Put the supplied bedside touch-panel poster behind the Smart Switches introduction and remove its summary paragraph, matching the preceding receptacle-page request.

**Architecture:** Extend the existing poster map in `LineDetail.jsx`. Generalize the receptacle-only centered modifier to a shared centered-poster treatment for receptacles and smart switches, retaining all CSS values. Both supplied scenes have centered products and use a title without the introductory paragraph. Keep USB/dimmer descriptions and all model data, filters and ordering unchanged.

**Tech Stack:** React, SafeImage, existing CSS, Vitest, native asset copy.

## Steps

- [x] Extend poster tests with `['smart-switches', 'Smart Switches', 'smart-series-bedside-touch-v1.webp', 51]`. Parameterize centered-poster/absent-summary checks for receptacles and smart switches. Keep the two existing plain introductions and USB/dimmer descriptions covered.
- [x] Run `npm test -- src/pages/LineDetail.test.jsx` and observe expected failures.
- [x] Copy `D:/国际站运营平台/方特插座/网站资料/网站图片制作/三款应用场景重新构思_1920x450_20260912/交付文件/WEBP/触控面板_床头木饰面_1920x450.webp` to `public/assets/images/lines/smart-series-bedside-touch-v1.webp`, refusing existing targets. Verify source/copy SHA256 equality and 1920 × 450 dimensions.
- [x] Use `const isCenteredPoster = ['receptacles', 'smart-switches'].includes(line.slug)` for the shared centered modifier and omitted description; add the smart asset to the poster map. Rename the existing CSS modifier from `--receptacles` to `--centered`, retaining 50% focal point, left-only desktop shade and shared mobile shade.
- [x] Run focused tests, `npm test`, `npm run build`, and scoped `git diff --check`. Record results; do not modify originals, restart the server, or perform a browser audit.

## Verification

- RED: focused tests reported 3 expected failures and 8 passes before implementation.
- GREEN: all 11 focused tests passed; full suite passed 655 tests across 30 files.
- Production build and scoped diff whitespace check passed.
- Copied asset is 301,898 bytes, 1920 × 450; source and copy SHA256 both `91548A4741AC493786B60AE95867CCA9497C6BD1A9480379012B018C84863F6B`.
- Original image and product data were preserved. No browser audit, server restart, staging, or commit.
