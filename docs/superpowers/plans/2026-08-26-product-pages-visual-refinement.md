# Product Pages Visual Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the product overview, GFCI range, and product detail presentation so products are fully visible in square, subtly rounded media frames, duplicated homepage imagery is removed, and the full product experience feels coherent with Fahint's navy/cyan brand system.

**Architecture:** Keep verified product geometry in the existing catalogue asset pipeline and use separate editorial backgrounds only as scene layers. Add a product-page visual data module, update reusable product cards/gallery components, then apply page-specific composition through `product-experience.css`. Preserve the existing routing and product data model.

**Tech Stack:** React, React Router, Vite, Vitest, Testing Library, CSS, local verified raster assets, OpenAI Image Generation for background-only editorial scenes.

---

## Task 1: Establish product-page visual contracts

**Files:**
- Create: `src/data/productPageVisuals.js`
- Modify: `src/pages/ProductsOverview.test.jsx`
- Modify: `src/pages/GfciSeries.test.jsx`
- Test: `src/pages/ProductsOverview.test.jsx`
- Test: `src/pages/GfciSeries.test.jsx`

- [ ] **Step 1: Add failing tests for product-page-only imagery**

Add assertions that the product overview and GFCI range no longer use `editorial-home` artwork for their hero, family, application, or OEM imagery. Assert that every product family visual contains a scene layer and a verified catalogue product layer.

```jsx
expect(screen.getByTestId('product-overview-hero')).toHaveStyle({
  backgroundImage: expect.stringContaining('editorial-products'),
})
expect(screen.getAllByTestId('family-product-image')[0].getAttribute('src'))
  .toContain('/assets/images/products/catalog/')
expect(container.innerHTML).not.toContain('editorial-home')
```

- [ ] **Step 2: Run the focused tests and confirm failure**

Run: `npm test -- --run src/pages/ProductsOverview.test.jsx src/pages/GfciSeries.test.jsx`

Expected: FAIL because the pages still reference homepage imagery and do not expose separate scene/product layers.

- [ ] **Step 3: Add the product-page visual data module**

Create a dedicated mapping that never changes the shared homepage visual data:

```js
const editorialProduct = (name) => `assets/images/editorial-products/${name}`

export const productOverviewVisuals = {
  hero: editorialProduct('overview-hero-background.webp'),
  brandProgram: editorialProduct('brand-program-background.webp'),
}

export const productFamilyVisuals = [
  {
    id: 'gfci',
    scene: editorialProduct('family-gfci-background.webp'),
    product: 'assets/images/products/catalog/gfci/gf15/gf15-main.webp',
  },
  // USB, receptacles, smart controls, switches/dimmers
]
```

The module must reference only verified product assets for product cutouts and `editorial-products` for atmosphere/background layers.

- [ ] **Step 4: Run focused tests**

Run: `npm test -- --run src/pages/ProductsOverview.test.jsx src/pages/GfciSeries.test.jsx`

Expected: Tests still fail only where page markup has not yet consumed the new contract.

- [ ] **Step 5: Commit the data contract and tests**

```bash
git add src/data/productPageVisuals.js src/pages/ProductsOverview.test.jsx src/pages/GfciSeries.test.jsx
git commit -m "test: define product page visual contracts"
```

## Task 2: Produce distinct editorial backgrounds

**Files:**
- Create: `public/assets/images/editorial-products/overview-hero-background.webp`
- Create: `public/assets/images/editorial-products/family-gfci-background.webp`
- Create: `public/assets/images/editorial-products/family-usb-background.webp`
- Create: `public/assets/images/editorial-products/family-receptacle-background.webp`
- Create: `public/assets/images/editorial-products/family-smart-background.webp`
- Create: `public/assets/images/editorial-products/family-switch-background.webp`
- Create: `public/assets/images/editorial-products/brand-program-background.webp`
- Create: `public/assets/images/editorial-products/application-residential-background.webp`
- Create: `public/assets/images/editorial-products/application-hospitality-background.webp`
- Create: `public/assets/images/editorial-products/application-commercial-background.webp`
- Create: `public/assets/images/editorial-products/gfci-application-background.webp`

- [ ] **Step 1: Generate background-only scene assets**

Generate backgrounds with no electrical device, no product silhouette, no lettering, no logo, and no fake certification mark. Use the approved visual direction: premium North American interior/editorial photography, controlled navy shadows, cool neutral surfaces, restrained cyan accents, and enough negative space for a verified product overlay.

- [ ] **Step 2: Inspect every generated asset**

Verify there are no invented products, unreadable pseudo-text, logos, people with visible anomalies, or lighting conflicts with the intended product overlay. Regenerate any failed scene.

- [ ] **Step 3: Convert and place final assets**

Store production-ready WebP files in `public/assets/images/editorial-products/`. Keep source dimensions large enough for full-width desktop rendering and ensure the output file names exactly match `productPageVisuals.js`.

- [ ] **Step 4: Verify asset resolution and paths**

Run a small asset inventory command and confirm every referenced file exists and is larger than the target rendering area.

- [ ] **Step 5: Commit the editorial asset set**

```bash
git add public/assets/images/editorial-products src/data/productPageVisuals.js
git commit -m "assets: add distinct product page editorial scenes"
```

## Task 3: Recompose the product overview page

**Files:**
- Modify: `src/pages/ProductsOverview.jsx`
- Modify: `src/pages/ProductsOverview.test.jsx`
- Modify: `src/styles/product-experience.css`

- [ ] **Step 1: Add failing structure tests**

Assert that each family tile is a full-card link with two visual layers, a concise label, and an accessible name. Assert that no homepage editorial image is used.

```jsx
const cards = screen.getAllByTestId('product-family-card')
expect(cards).toHaveLength(5)
cards.forEach((card) => expect(card.tagName).toBe('A'))
expect(screen.getAllByTestId('family-scene-image')).toHaveLength(5)
expect(screen.getAllByTestId('family-product-image')).toHaveLength(5)
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm test -- --run src/pages/ProductsOverview.test.jsx`

- [ ] **Step 3: Replace the overview hero and family mosaic markup**

Use `productOverviewVisuals` and `productFamilyVisuals`. The scene image fills the tile, while the verified product cutout sits in a contained, deliberately positioned overlay. Make the whole tile interactive.

```jsx
<Link className="product-family-card" data-testid="product-family-card" to={family.href}>
  <SafeImage className="product-family-card__scene" src={family.scene} alt="" />
  <div className="product-family-card__product-stage">
    <SafeImage data-testid="family-product-image" src={family.product} alt="" />
  </div>
  <div className="product-family-card__content">...</div>
</Link>
```

- [ ] **Step 4: Replace repeated market and OEM imagery**

Use the new product-page editorial assets for the brand/OEM panel and three market cards. Keep factory verification sections on real factory photography.

- [ ] **Step 5: Apply the approved radius hierarchy and spacing**

Add tokens and apply them consistently:

```css
:root {
  --product-radius-lg: 20px;
  --product-radius-card: 15px;
  --product-radius-sm: 9px;
  --product-surface: #eef4f7;
  --product-surface-strong: #e4edf2;
}

.product-family-card,
.product-market-grid .editorial-application {
  border-radius: var(--product-radius-lg);
  overflow: hidden;
}
```

Use moderate gaps and clear section breathing room; retain square/rectangular compositions rather than pill-like panels.

- [ ] **Step 6: Run focused tests and build**

Run: `npm test -- --run src/pages/ProductsOverview.test.jsx`

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit the overview page**

```bash
git add src/pages/ProductsOverview.jsx src/pages/ProductsOverview.test.jsx src/styles/product-experience.css
git commit -m "feat: recompose product overview visuals"
```

## Task 4: Fix reusable product cards and GFCI range presentation

**Files:**
- Modify: `src/components/ProductCard.jsx`
- Modify: `src/components/ProductCard.test.jsx`
- Modify: `src/pages/GfciSeries.jsx`
- Modify: `src/pages/GfciSeries.test.jsx`
- Modify: `src/styles/product-experience.css`

- [ ] **Step 1: Add failing card behavior tests**

Test full-card navigation and category-to-badge mapping:

```jsx
expect(screen.getByRole('link', { name: /GF15/i })).toHaveAttribute('href', '/products/gfci/GF15')
expect(screen.getByText('STANDARD')).toBeInTheDocument()
expect(screen.getByText('TR + WR')).toBeInTheDocument()
expect(screen.getByText('BLANK FACE')).toBeInTheDocument()
```

- [ ] **Step 2: Run the focused tests and confirm failure**

Run: `npm test -- --run src/components/ProductCard.test.jsx src/pages/GfciSeries.test.jsx`

- [ ] **Step 3: Implement explicit variant badge labels**

Map published product categories to consistent labels instead of relying on arbitrary feature copy.

```js
export const productVariantLabel = (product) => ({
  standard: 'STANDARD',
  tr: 'TR',
  wr: 'TR + WR',
  blank: 'BLANK FACE',
}[product.category] || 'STANDARD')
```

- [ ] **Step 4: Make product imagery square, contained, and complete**

```css
.pcard {
  border-radius: var(--product-radius-card);
  overflow: hidden;
}

.pcard__media {
  aspect-ratio: 1;
  min-height: 0;
  background: #f8fafb;
  overflow: hidden;
}

.pcard__media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: clamp(18px, 2vw, 32px);
}
```

Keep the mounting strap visible; the badge sits above the image at top left. Prevent title clipping with stable content height and wrapping.

- [ ] **Step 5: Redesign the GFCI range hero and comparison block**

Build the hero from a cool navy technical background plus verified product cutouts. Place the comparison table in a constrained, subtly rounded panel with zebra/hover rows, aligned columns, and a mobile horizontal scroll container.

- [ ] **Step 6: Replace the reused application image**

Use `gfci-application-background.webp` as the contextual scene and layer the relevant verified GFCI model only when the scene needs an explicit product.

- [ ] **Step 7: Run focused tests and build**

Run: `npm test -- --run src/components/ProductCard.test.jsx src/pages/GfciSeries.test.jsx`

Run: `npm run build`

Expected: PASS.

- [ ] **Step 8: Commit GFCI range refinements**

```bash
git add src/components/ProductCard.jsx src/components/ProductCard.test.jsx src/pages/GfciSeries.jsx src/pages/GfciSeries.test.jsx src/styles/product-experience.css
git commit -m "feat: refine GFCI range cards and comparison"
```

## Task 5: Rebuild product-detail media and configuration surfaces

**Files:**
- Modify: `src/components/products/ProductGallery.jsx`
- Modify: `src/components/products/ProductGallery.test.jsx`
- Modify: `src/components/products/ProductDetailHero.jsx`
- Modify: `src/components/products/ProductStorySections.jsx`
- Modify: `src/pages/ProductDetail.test.jsx`
- Modify: `src/styles/product-experience.css`

- [ ] **Step 1: Add failing gallery and detail-layout tests**

Assert that the main gallery and every thumbnail expose square media wrappers, all related cards are links, and the OEM section uses the cool surface class.

```jsx
expect(screen.getByTestId('product-gallery-main')).toHaveClass('product-media-square')
screen.getAllByTestId('product-gallery-thumb').forEach((thumb) => {
  expect(thumb).toHaveClass('product-media-square')
})
expect(screen.getByTestId('product-oem-story')).toHaveClass('product-story--cool')
```

- [ ] **Step 2: Run focused tests and confirm failure**

Run: `npm test -- --run src/components/products/ProductGallery.test.jsx src/pages/ProductDetail.test.jsx`

- [ ] **Step 3: Normalize gallery media presentation**

Keep every product photo on a cool white/light-grey square stage. Use `object-fit: contain`, centered positioning, and padding that preserves the mounting strap and side profile. Add subtle radii to main media and thumbnails.

- [ ] **Step 4: Remove beige from product detail**

Replace `--product-warm` usage in product UI with `--product-surface` or `--product-surface-strong`. Do not change neutral photography itself. Add a slim gradient or divider transition between navy and cool-neutral sections.

- [ ] **Step 5: Refine the configuration/finish strip**

Keep six finish cells square/rectangular with 14–16px outer rounding, 8–10px internal image rounding, equal-height labels, and a cool neutral container. Preserve accurate verified finish images.

- [ ] **Step 6: Fix related-product cards**

Use a stable four-column desktop grid, square contained imagery, full-card links, and wrapping product titles. At tablet/mobile widths move to two/one columns without cropping.

- [ ] **Step 7: Run focused tests and build**

Run: `npm test -- --run src/components/products/ProductGallery.test.jsx src/pages/ProductDetail.test.jsx`

Run: `npm run build`

Expected: PASS.

- [ ] **Step 8: Commit product detail refinements**

```bash
git add src/components/products/ProductGallery.jsx src/components/products/ProductGallery.test.jsx src/components/products/ProductDetailHero.jsx src/components/products/ProductStorySections.jsx src/pages/ProductDetail.test.jsx src/styles/product-experience.css
git commit -m "feat: refine product detail media and surfaces"
```

## Task 6: Responsive polish, accessibility, and visual verification

**Files:**
- Modify: `src/styles/product-experience.css`
- Modify: `src/pages/ProductsOverview.test.jsx`
- Modify: `src/pages/GfciSeries.test.jsx`
- Modify: `src/pages/ProductDetail.test.jsx`

- [ ] **Step 1: Add static regression checks**

Add checks for `aspect-ratio: 1`, `object-fit: contain`, radius tokens, reduced-motion handling, and mobile grid rules. Add an asset-duplication guard ensuring product pages do not reintroduce `editorial-home` references.

- [ ] **Step 2: Run the full test suite and confirm any failures**

Run: `npm test -- --run`

- [ ] **Step 3: Add responsive rules**

At 1920px keep content centered in the established max-width grid. At 1280px preserve four catalogue columns where legible. At 768px switch complex grids to two columns and horizontally scroll the comparison table. At 390px use one column, retain square media, and keep touch targets at least 44px.

- [ ] **Step 4: Add restrained motion**

Use only opacity/transform transitions: a short image lift on hover, badge/focus feedback, and section reveal if already supported by the existing reveal system. Disable non-essential motion under `prefers-reduced-motion: reduce`.

- [ ] **Step 5: Run the full automated verification**

Run: `npm test -- --run`

Run: `npm run build`

Run: `git diff --check`

Expected: all commands pass with no whitespace errors.

- [ ] **Step 6: Scan for placeholders and broken asset references**

Run a repository search for `TBD`, `TODO`, `placeholder`, `editorial-home` in the modified product-page files, and verify every new image path exists.

- [ ] **Step 7: Run the visual quality detector once**

Run:

```bash
node C:/Users/XuWanPi/.codex/skills/impeccable/scripts/detect.mjs --json src/pages/ProductsOverview.jsx src/pages/GfciSeries.jsx src/pages/ProductDetail.jsx src/components/ProductCard.jsx src/components/products/ProductGallery.jsx src/components/products/ProductDetailHero.jsx src/components/products/ProductStorySections.jsx src/styles/product-experience.css
```

Address real findings only; do not weaken intended hierarchy to satisfy a heuristic.

- [ ] **Step 8: Perform full-screen visual QA**

Capture and inspect these routes at true 1920×1080 desktop size:

- `/products`
- `/products/gfci`
- `/products/gfci/GF15`

Also inspect at 768×1024 and 390×844. Verify complete product visibility, balanced spacing, radii consistency, no horizontal overflow, clear badges, readable table, and natural navy-to-cool-surface transitions. Make one focused correction pass if required, then one confirmation pass.

- [ ] **Step 9: Final commit**

```bash
git add src public/assets/images/editorial-products
git commit -m "fix: complete product page visual refinement"
```

## Completion Criteria

- [ ] Every catalogue and related-product media frame is square with subtle rounded corners.
- [ ] Every product is fully visible with mounting hardware preserved and centered.
- [ ] Standard/TR/TR+WR/Blank Face badges are accurate and visible above the image.
- [ ] Product detail pages contain no beige UI surfaces.
- [ ] Product overview and GFCI range no longer reuse homepage editorial imagery.
- [ ] AI-generated assets contain backgrounds only; product geometry uses verified local assets.
- [ ] All product cards and family tiles are fully clickable and keyboard accessible.
- [ ] Comparison and configuration sections are aligned, responsive, and visually connected.
- [ ] Tests, build, diff check, asset scan, detector, and visual QA all pass.
