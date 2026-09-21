# Lighting Hero Replacement Implementation Plan

> Execute inline with executing-plans, without subagents. The user has selected the replacement and delegated its fit; preserve unrelated files and do not commit or push.

**Goal:** Replace only the Lighting control hero image, preserving the existing switch position and 1536 × 1024 dimensions.

**Architecture:** Adapt the supplied source using the built-in image editor, save a sibling WebP asset, and update the scene's filename. No CSS or carousel changes.

**Tech Stack:** Existing React, Vitest, built-in image editor, FFmpeg format conversion.

- [x] Change the existing supplied-scene assertion in `src/pages/StudioPages.test.jsx` from `home-hero-lighting-scene-v2.webp` to `home-hero-lighting-scene-v3.webp`. Run `npm test -- src/pages/StudioPages.test.jsx --maxWorkers=2 --minWorkers=2` and observe the expected filename mismatch.
- [x] Use the editing prompt in the design document. Inspect the result against the reference; confirm 1536 × 1024 and the plate's position without distorting the product. Export the selected result to `public/assets/images/editorial-products/home-hero-lighting-scene-v3.webp` with FFmpeg `-vf 'scale=1736:-1:flags=lanczos,crop=1536:1024:156:102' -frames:v 1 -c:v libwebp -quality 88 -compression_level 6`, matching the original plate center and final canvas dimensions.
- [x] In `src/pages/HomeStudio.jsx`, change only `image: 'home-hero-lighting-scene-v2.webp'` to `image: 'home-hero-lighting-scene-v3.webp'`.
- [x] Run homepage, asset-path and media tests, then `npm run build` and `git -c core.safecrlf=false diff --check`. Check final file dimensions and inspect the WebP. Keep all original assets and the local branch; do not open a browser, commit or push.

## Verification

- The revised poster test first failed for the expected v2/v3 filename mismatch; the other 51 homepage tests passed.
- After replacement, all 68 targeted tests passed, then all 703 tests across 32 files passed.
- Production build and whitespace checks passed. The built asset is present at `dist/assets/images/editorial-products/home-hero-lighting-scene-v3.webp`.
- FFprobe confirms 1536 × 1024. The final WebP was visually inspected against the old image, with the plate center and vertical bounds aligned and no product stretching. No browser/device visual check was performed.
- Only the lighting-scene filename and matching test changed in application source. Original assets, other hero scenes, CSS, controls and text remain unchanged. No commit, push or deployment was performed.
