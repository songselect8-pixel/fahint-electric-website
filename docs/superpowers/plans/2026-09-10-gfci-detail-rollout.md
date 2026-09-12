# GFCI Detail Rollout Implementation Plan

> Execute inline in the existing working tree. Preserve earlier changes; no subagents, commits or remote push are part of this request.

**Goal:** Apply the approved GF15 presentation to GF20, GT15, GT20, GW15, GW20 and GL20.

**Architecture:** Reuse the current GF15 gallery, packaging strip, specification matrix and CSS. Move specifications immediately after the hero for all seven detailed GFCI pages. Pass an explicit matrix layout to the shared specifications component, leaving catalogue product pages unchanged. Keep model-specific technical data, certification status, application scenes and finish selectors intact.

**Tech Stack:** React 18, CSS, Vitest / Testing Library, existing local product-library assets.

---

### Task 1: Capture the rollout requirements

**Files:** `src/pages/ProductDetail.test.jsx`, `src/data/products.test.js`, `src/pages/CatalogProductDetail.test.jsx`

- [x] Replace the three GF15-only regression exclusions with parameterized checks for the remaining six models: specifications before engineering, static matrix without disclosure buttons, and seven model-specific packaging images instead of the duplicate finish strip.
- [x] Assert every GFCI gallery uses its own assets in this exact order:

```js
[
  `assets/images/products/${key}-main.webp`,
  `assets/images/products/${key}-sides.webp`,
  `assets/images/products/${key}-back.webp`,
  `assets/images/products/${key}-standard-plate.png`,
  `assets/images/products/${key}-plate.webp`
]
```

- [x] Check the gallery and packaging assets exist. Retain model-data and GL20 certification regressions; add a non-GFCI accordion regression.
- [x] Run `npm test -- src/data/products.test.js src/pages/ProductDetail.test.jsx`; expect rollout assertions to fail against the current GF15-only implementation.

### Task 2: Import the corresponding product photos

**Source:** `D:/国际站运营平台/方特插座/网站资料/公司资料&产品/产品图片/01-GFCI Outlet`

**Destination:** `public/assets/images/products/`

- [x] For each of the six models, copy its own `3.png` to `<model>-standard-plate.png`.
- [x] Copy its own six additional standard packaging JPEGs from `GFCI中性包装/<MODEL>` using these filename mappings. Reuse the existing white standard and white screwless files.

| Original filename | Destination suffix |
| --- | --- |
| 标准-黑.jpg | package-standard-black-v1.jpg |
| 标准-灰.jpg | package-standard-grey-v1.jpg |
| 标准-石墨灰.jpg | package-standard-graphite-v1.jpg |
| 标准-象牙.jpg | package-standard-ivory-v1.jpg |
| 标准-杏仁.jpg | package-standard-almond-v1.jpg |
| 标准-棕.jpg | package-standard-brown-v1.jpg |

- [x] Do not overwrite pre-existing differing files. Compare SHA256 hashes after copying; expect 42 matching new assets.

### Task 3: Share the confirmed presentation

**Files:** `src/data/products.js`, `src/components/products/ProductStorySections.jsx`, `src/components/products/ProductTechnicalSections.jsx`, `src/pages/ProductDetail.jsx`

- [x] Move GF15's gallery order and full packaging mapping into `buildAssets` / `buildPackagingAssets`; remove the redundant GF15 overrides. Preserve its two bespoke editorial image paths.
- [x] Rename `GF15_PACKAGING_REFERENCES` to `PACKAGING_REFERENCES` and derive the strip from each product's packaging entries, without the SKU check.
- [x] Change the shared specification signature and selector:

```jsx
export function ProductSpecifications({ product, layout = 'accordion' }) {
  const usesSpecificationMatrix = layout === 'matrix';
}
```

- [x] Keep the existing summary, panel, disclosure and state implementations; only change how matrix mode is selected. Replace the two conditional specification placements in `ProductDetail` with a single call directly after `ProductDetailHero`:

```jsx
<ProductSpecifications product={product} layout="matrix" />
```

- [x] Reuse the current matrix colors, mobile stacking, seven-column packaging style, and `.product-story--oem + .product-installation` spacing rule without creating a second style system.
- [x] Update `docs/product-data/gfci-source-map.md` with the gallery and packaging provenance.

### Task 4: Verify and hand off

- [x] Run `npm test -- src/data/products.test.js src/pages/ProductDetail.test.jsx src/components/products/ProductGallery.test.jsx src/pages/CatalogProductDetail.test.jsx src/assetPaths.test.js`; expect all tests to pass, including unchanged catalogue behavior and GL20 review status.
- [x] Run `npm run build`; expect a successful production build.
- [x] Run `git diff --check`; inspect only the scoped changes. Do not restart or stop the user's preview process.
- [x] Report the six updated models. The user will perform visual review; no browser audit or remote push is requested.

**Verification results:** The initial regression run reproduced 20 failures in the six unconverted models. After implementation and adding only the 42 new product assets to Git tracking, all 229 focused tests passed. The production build and whitespace check passed. All 42 imported files matched their original SHA256 hashes (7.95 MB total). No preview process, existing source image, unrelated change or remote branch was modified.
