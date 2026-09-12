# Dimmer Presentation Implementation Plan

> **For agentic workers:** Use executing-plans to implement this plan task-by-task in the current workspace. The user prefers inline execution, no subagents or browser audit.

**Goal:** Apply the approved product-page presentation to both DM2010 and DM2010S, add the corresponding screwless-plate photograph, and show two matching packaged configurations.

**Architecture:** Reuse the existing hero gallery, matrix specifications and two-image presentation section. Add narrowly scoped dimmer image bindings in `src/data/catalogProducts.js`; leave the imported records, original drawings, model ratings and seven finish choices unchanged. No new dependencies, image generation or generic gallery abstraction.

**Tech Stack:** React, existing CSS, local PNG assets, Vitest and Testing Library.

## Approved scope

- Main gallery: existing bare device, standard plate, **new screwless plate**, existing standard packaging, **screwless packaging**, existing detail image. The screwless package was added to the main gallery by user follow-up.
- Specifications immediately follow the hero, using the approved always-visible matrix and four-item summary; omit the page-section navigation, retaining the site header and breadcrumbs.
- Presentation: replace the standalone standard-plate picture with the screwless packaged version in the first position; retain the standard packaged version in the second position. Label both accurately.
- Retain all existing dimension/wiring drawings and distinct DM2010 / DM2010S electrical specifications.

## Task 1: Source photographs

- [x] Locate and inspect the two original PNGs in each model's own directory.

Source root: `D:/国际站运营平台/方特插座/网站资料/公司资料&产品/产品图片/03-Dimmer & sensor switch-目前只卖Dimmer/`

| Model | Directory | Source filename | Website filename |
| --- | --- | --- | --- |
| DM2010 | DM2010-Digital Dimmer Light Switch | 3-白配亮面无螺丝面板.png | dm2010-screwless-plate-v1.png |
| DM2010 | DM2010-Digital Dimmer Light Switch | 6-中性包装-白色配亮面无螺丝面板.png | dm2010-screwless-package-v1.png |
| DM2010S | DM2010S-Digital Dimmer Light switch | 3-白配亮面无螺丝面板.png | dm2010s-screwless-plate-v1.png |
| DM2010S | DM2010S-Digital Dimmer Light switch | 6-中性包装-白色配亮面无螺丝面板.png | dm2010s-screwless-package-v1.png |

All four images are 800 × 800. Destination: `public/assets/images/catalog/dimmers/`. Copy the original bytes, without replacing or deleting any old images. Verify each copy with SHA-256.

## Task 2: Regression tests before implementation

- [x] Extend `src/data/catalogProducts.test.js` for both dimmers: exactly six gallery images, screwless plate third, screwless package fifth, only packaged variants in presentation, and correct 800 × 800 metadata.

Core expectations for each product `p`:

```js
const screwless = `assets/images/catalog/dimmers/${p.slug}-screwless-plate-v1.png`;
expect(p.assets.gallery[2]).toBe(screwless);
expect(p.assets.presentation.map((image) => image.src)).toEqual([
  `assets/images/catalog/dimmers/${p.slug}-screwless-package-v1.png`,
  'assets/images/catalog/models/cb4dfb328d0db950.webp'
]);
```

- [x] Extend `src/pages/CatalogProductDetail.test.jsx` to verify hero → matrix order, no page-section navigation, working screwless thumbnail/color switching, descriptive package captions and preserved drawings. Use the unchanged DS15 page for the other-families accordion test.
- [x] Run the focused tests and observe expected failures before adding the bindings:

```powershell
npm.cmd test -- src/data/catalogProducts.test.js src/pages/CatalogProductDetail.test.jsx -t dimmer
```

## Task 3: Minimal implementation

- [x] Copy the four original PNGs and verify the hashes; retain all existing assets.
- [x] In `src/data/catalogProducts.js`, create the two model-scoped screwless image objects; insert the plate after `gallery[1]`, bind the packaged image as the first presentation image, and include both in image-size metadata.

```js
const dimmerScrewless = record.family === 'dimmers' ? {
  src: `assets/images/catalog/dimmers/${description.slug}-screwless-plate-v1.png`, width: 800, height: 800
} : null;
const dimmerPackage = dimmerScrewless ? {
  ...dimmerScrewless, src: `assets/images/catalog/dimmers/${description.slug}-screwless-package-v1.png`,
  caption: 'Screwless plate · packaged'
} : null;
// Non-USB productViews branch:
dimmerScrewless ? [...gallery.slice(0, 2), dimmerScrewless, gallery[2], dimmerPackage, ...gallery.slice(3)] : gallery;
// Dimmer presentation branch:
[dimmerPackage, { ...gallery[2], caption: 'Standard screw plate · packaged' }];
```

- [x] In `CatalogProductDetail.jsx`, include `product.line === 'dimmers'` in `upfrontSpecifications`; reuse the existing matrix styles without CSS changes.
- [x] In `CatalogProductSections.jsx`, use optional `image.caption` for the presentation caption and alt text, retaining the existing reference-number fallback for all other products.
- [x] Rerun the focused tests until green.

## Task 4: Verification and handoff

- [x] Run `npm.cmd test`, `npm.cmd run build`, and scoped `git diff --check`.
- [x] Record verification results below. Leave the preview server and browser untouched, as requested. Do not commit or alter unrelated staged work.

## Verification results

- Before implementation: all six new dimmer tests failed for the missing images and old section order.
- After implementation: all six new dimmer tests passed.
- Four copied PNGs verified byte-for-byte with SHA-256. The two models' source copies are identical for each of these two front-facing views; each website asset retains its own model-specific filename.
- Plate PNGs: 170,786 bytes each; SHA-256 `D98089C752D8C905A93626A6A4C21B930140622BBF94506EFFA6D7DE475A7319`.
- Packaged PNGs: 257,741 bytes each; SHA-256 `BB94BC74550D913F81685CA732B4798F6C651E2E0A399B1BFBA14C02B2785BEC`.
- Full test suite: **585 tests passed across 30 files** (2026-09-11).
- Production build: passed, 1,642 modules transformed.
- Scoped `git diff --check`: passed; only the existing Windows LF/CRLF conversion notices.
- No browser audit or preview-server restart. Existing workspace, old assets, imported records and unrelated edits preserved; no commit, merge or push.

### Follow-up: include screwless packaging in the main gallery

- User requested the screwless packaged photograph immediately beside the standard packaged photograph in the main thumbnail strip, for both dimmers.
- Updated four model/data interaction cases failed on the missing sixth thumbnail before implementation.
- Reused the already imported model-specific packaged asset as the fifth gallery item; retained the existing detail photograph as the sixth item.
- Both affected test files passed: **254 tests**. Production build and scoped `git diff --check` also passed. No browser or server changes.
