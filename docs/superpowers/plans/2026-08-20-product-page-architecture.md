# Product Page Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use inline execution in this session. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the product overview into a richer catalog landing page and remove misleading GFCI color sections.

**Architecture:** Keep the existing React/Vite routes and data files. Change `ProductsOverview.jsx` to render new sections from `productLines` and `products`; change `LineDetail.jsx` to stop rendering the generic color palette; add scoped CSS in `styles.css`.

**Tech Stack:** React 18, React Router, Vite, CSS.

---

### Task 1: Add Architecture Guard

**Files:**
- Create: `tests/product-page-architecture.test.mjs`

- [ ] Add a Node-based source test that checks for the new product overview sections and confirms the GFCI color section is removed from the relevant pages.

- [ ] Run: `node tests/product-page-architecture.test.mjs`

Expected before implementation: fail because the new product page sections do not exist yet and old color sections still exist.

### Task 2: Refactor Products Overview

**Files:**
- Modify: `src/pages/ProductsOverview.jsx`

- [ ] Replace the simple line-card grid with a compact hero search panel, visual product-series mosaic, series catalog rows, OEM/ODM banner, and final CTA.

- [ ] Remove the `colors` import and the Shared Palette section.

### Task 3: Remove Generic Color Section From Series Pages

**Files:**
- Modify: `src/pages/LineDetail.jsx`

- [ ] Remove the generic `colors` import and the color-grid section rendered below every product series page.

### Task 4: Add Scoped Product Page Styles

**Files:**
- Modify: `src/styles.css`

- [ ] Add scoped styles for product hero, series mosaic, catalog showcase, model cards, sourcing banner, and responsive behavior.

### Task 5: Verify

**Files:**
- Test: `tests/product-page-architecture.test.mjs`

- [ ] Run: `node tests/product-page-architecture.test.mjs`.
- [ ] Run: `npm run build`.
- [ ] Keep the dev preview available for browser inspection.

