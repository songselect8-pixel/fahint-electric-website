# Lighting Switch Gallery and Specifications Plan

> **For agentic workers:** Use executing-plans inline. Preserve unrelated changes and the existing checkout; no subagents, commits, or preview-server restart.

**Goal:** Replace the cluttered Lighting Switches galleries with 4–5 verified views per model and use the same upfront specification matrix as the preceding product families.

**Architecture:** Add a small, explicit six-model image allowlist in `src/data/catalogProducts.js`, reusing existing imported assets wherever available. Select the first curated image as the hero, the second as the detail reference, and retain the previously approved catalogue covers. Reuse the existing matrix and compact thumbnail CSS, scoped to Lighting Switches.

**Tech Stack:** React, current gallery/specification components, CSS, Vitest, native file copies.

## Design and scope

- The user prioritizes fewer coherent photos over more mixed photos. Keep white bare device, model-specific back, model-specific side profiles, then white standard/screwless plates when supplied.
- DS15, DS15.3, DS1502, DS1503: five photos each. T15, T15.3: four photos each; the source folders have only the standard toggle plate.
- Preserve seven finish selectors, existing model ratings, certification differences, drawings and source links. No inferred cross-model rear/side substitutions.
- Start with one bare device instead of the old paired/mixed-color promotional composites. Keep the pure two-profile structural image as the single side-view reference.
- Reuse the USB-style thumbnail grid, wrapping at small widths without a horizontal scrollbar. Move complete parameters directly after the image/hero section and remove the secondary section navigation.
- No photo generation or retouching. Source assets remain unchanged. Seven not-yet-imported PNG files are copied byte-for-byte.

## Verified source selection

Source root: `D:/国际站运营平台/方特插座/网站资料/公司资料&产品/产品图片/06-Lighting Switches`.
Existing `models/<id>.webp` filenames match the first 16 SHA256 characters of their original source PNG files. All selected images are 800 × 800.

| Model | Bare white device | Back | Side profiles | Standard plate | Screwless plate |
| --- | --- | --- | --- | --- | --- |
| DS15 | `1开/DS15单控/正面白-哑光.png` → `50e6f2d3f5cf9b64` | `背面.png` → `f27fdfb77ebc422d` | `两个侧面.png` → `d0d49278307b26d7` | `哑光白+标准面板.png` → `bbd1ee3b3a7ef0ea` | `哑光白+无螺丝面板.png` → new `paddle-screwless-white-v1.png` |
| DS15.3 | `1开/DS15.3双控/正面白-哑光.png` → `50e6f2d3f5cf9b64` | `背面.png` → `dc383c22eded4661` | `两个侧面.png` → `1cca0ee7ddcc8f0a` | `哑光白+标准面板.png` → `bbd1ee3b3a7ef0ea` | Same-byte source as DS15 |
| DS1502 | `2开/白亮面.png` → `9c21053579be1cac` | `背面.png` → `f5bff2d649a9a069` | `两个侧面.png` → new `ds1502-side-v1.png` | `白亮面标准面板.png` → new `ds1502-standard-plate-v1.png` | `白亮面无螺丝面板.png` → new `ds1502-screwless-plate-v1.png` |
| DS1503 | `3开/白亮面.png` → `9ef60ea16e0567a5` | `背面.png` → `a9bd7366f5c2aaa4` | `两个侧面.png` → new `ds1503-side-v1.png` | `白亮面标准面板.png` → new `ds1503-standard-plate-v1.png` | `白亮面无螺丝面板.png` → new `ds1503-screwless-plate-v1.png` |
| T15 | `手柄开关/T15单控/侧面白.png` → `f859bb10d2d105c0` | `背面.png` → `f8141a47c5ffc32b` | `两个侧面.png` → `40197c504db5ed01` | `带面板白.png` → `345569ec6e60fd6f` | Not supplied |
| T15.3 | `手柄开关/T15.3双控/正面.png` → `e865d6e03bd24428` | `背面.png` → `d0fdd5bd30be0743` | `两个侧面.png` → `797c494ac3c405f7` | `带面板白.png` → `4212209407e00bbc` | Not supplied |

New files belong under `public/assets/images/catalog/lighting-switches/`. Preserve the existing T15.3 catalogue front view; its swatch uses the separate white angled view.

## Steps

- [x] Add exact gallery, count, source-file existence, unchanged drawing, hero/detail, swatch and existing cover checks in `src/data/catalogProducts.test.js`. Update the old expectation that selected lighting heroes differ from their approved white covers.
- [x] Add six-model matrix/gallery interaction checks in `src/pages/CatalogProductDetail.test.jsx`. Check that specifications follow the hero, are non-accordion and occur once, navigation is absent, thumbnails remain 4–5 after selecting Black, and selecting a structural thumbnail restores the original gallery image. Use wallplates for the remaining accordion/navigation regression.
- [x] Run `npm test -- src/data/catalogProducts.test.js src/pages/CatalogProductDetail.test.jsx`; confirm expected failures against the old galleries/layout.
- [x] Copy the seven new source PNGs without overwriting existing assets. Verify SHA256 equality and image metadata.
- [x] Add the six explicit gallery arrays using the source map above. Map paths to `{src, width:800, height:800}`, use curated views only for Lighting Switches, set hero to view 0 and detail to view 1. Do not change finishes, drawings, specifications, or unrelated families.
- [x] In `CatalogProductDetail.jsx`, include Lighting Switches in `upfrontSpecifications` and add a lighting-specific class. In `catalog.css`, include that class in the existing compact thumbnail grid and three-column mobile rule.
- [x] Run focused tests, all tests, `npm run build`, and scoped `git diff --check`. Record results and hand off without a browser audit or server changes.

## Verification

- Red: 8 expected failures (old hero/gallery data and six missing lighting/matrix layouts), with 308 existing tests passing.
- Green: 329 focused checks passed; all 653 tests across 30 files then passed. Full gallery clicks and finish switching passed for all six models.
- `npm run build` passed (1644 modules). Scoped `git diff --check` passed with only existing LF/CRLF conversion notices.
- Every new copy matches its original SHA256; all are 800 × 800. Seven files total 1,138,034 bytes, with no raster changes.
- Gallery totals reduced from 66 to 28 images across the six pages. Each model retains seven finishes and its two original reference drawings. Catalogue cover choices and electrical/certification facts are unchanged.
- Model detail references now consistently use the model's rear view instead of a randomly adjacent old gallery photo. No additional presentation/packaging images were introduced.
- No source files or older assets were deleted, and no browser audit, server restart, staging, or commit was performed.
