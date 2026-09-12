# Dimmer Series Poster Implementation Plan

> **For agentic workers:** Use executing-plans inline. Preserve the current checkout and unrelated changes; do not create agents, commit, or restart the preview.

**Goal:** Put the supplied living-room poster behind the Dimmers series introduction using the same live text overlay and brightness treatment as the approved USB page.

**Architecture:** Reuse the existing poster markup and responsive CSS in `LineDetail.jsx` and `catalog.css`. Select the poster by series slug instead of enabling only USB. Do not alter product data, filters, cards, other introductions, or source image bytes.

**Tech Stack:** React, SafeImage, CSS, Vitest.

## Approved design

The user explicitly requested the existing USB poster treatment. Retain the full-width stage, left-aligned white title/light description, directional navy scrim, and right-hand product focus. The supplied dimmer image has the same 1920 × 450 dimensions and a similar product position, so existing desktop/mobile layout rules apply without new CSS rules. Keep breadcrumbs and model counts live and accessible.

## Steps

- [x] Parameterize the existing poster regression test in `src/pages/LineDetail.test.jsx` with the USB and dimmer cases below. Preserve image dimensions, eager priority, source-file existence, decorative accessibility, and desktop/mobile CSS assertions. Remove only `dimmers` from the plain-introduction cases.

```js
[
  ['usb-outlets', 'USB Outlets', 'usb-series-desktop-charging-v1.webp', 37],
  ['dimmers', 'Dimmers', 'dimmer-series-living-room-v1.webp', 2],
]
```

- [x] Run `npm test -- src/pages/LineDetail.test.jsx`. Expect the dimmer case to fail on the missing poster modifier; other tests must pass.
- [x] Copy `D:/国际站运营平台/方特插座/网站资料/网站图片制作/DM2010_客厅横幅_1920x450_20260912/调光开关客厅安装海报_1920x450.webp` unchanged to `public/assets/images/lines/dimmer-series-living-room-v1.webp` after confirming the destination does not exist.
- [x] In `src/pages/LineDetail.jsx`, replace the USB-only boolean with the following selection. Use `poster` for the modifier/render conditions and the existing SafeImage `src`. Update the CSS comment to describe all series posters without changing rules.

```js
const poster = {
  'usb-outlets': 'assets/images/lines/usb-series-desktop-charging-v1.webp',
  dimmers: 'assets/images/lines/dimmer-series-living-room-v1.webp',
}[line.slug];
```

- [x] Run `npm test` and `npm run build`; expect zero failures. Verify source/deployed SHA256 equality and 1920 × 450 metadata with `Get-FileHash` and `ffprobe`. Run `git diff --check` for touched files.
- [x] Record results and hand off. No browser audit, preview-server change, staging, or commit.

## Verification results

- Red: the dimmer poster test failed on the missing modifier; the other 8 tests passed.
- Green: all 646 tests across 30 files passed, including both poster cases and unchanged plain introductions.
- `npm run build` passed (1644 modules); scoped `git diff --check` passed with only LF/CRLF conversion notices.
- Source and copied poster are 84,152 bytes with SHA256 `AF777F3CFA16CBAA4587D80B132B137D3D04711811B6C3110E112AA35B7CBCE5`; `ffprobe` confirmed 1920 × 450.
- Production changes are limited to selecting the dimmer poster and a generalized CSS comment. Existing responsive rules, USB appearance, product list/data, and source image are unchanged.
- No browser audit, preview-server restart, staging, or commit was performed.
