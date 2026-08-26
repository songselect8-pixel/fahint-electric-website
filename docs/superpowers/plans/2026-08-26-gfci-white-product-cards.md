# GFCI White Product Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `/products/gfci` catalogue cards present products on a clean pure-white square stage with larger, fully visible product imagery and restrained rounded corners.

**Architecture:** Keep the shared `ProductCard` component unchanged and add page-scoped styling beneath `.gfci-series` so this first-page sample cannot alter other product families. Lock the visual contract with a focused source-style regression test, then verify the live page at desktop, tablet, and mobile widths.

**Tech Stack:** React, Vite, Vitest, Testing Library, CSS, Playwright CLI

---

### Task 1: Lock and implement the GFCI white-card sample

**Files:**
- Modify: `src/pages/GfciSeries.test.jsx`
- Modify: `src/styles/product-experience.css`
- Test: `src/pages/GfciSeries.test.jsx`

- [x] **Step 1: Write the failing visual-contract test**

Add this test inside `describe('GfciSeries', ...)`:

```jsx
it('uses a pure-white square product stage with restrained card chrome', () => {
  const styles = readFileSync('src/styles/product-experience.css', 'utf8');

  expect(styles).toMatch(/\.gfci-series \.pcard\s*\{[^}]*border-radius:\s*12px[^}]*background:\s*#fff/s);
  expect(styles).toMatch(/\.gfci-series \.pcard__media\s*\{[^}]*aspect-ratio:\s*1[^}]*background:\s*#fff/s);
  expect(styles).toMatch(/\.gfci-series \.pcard__media img\s*\{[^}]*padding:\s*0/s);
  expect(styles).toMatch(/\.gfci-series \.pcard__tag\s*\{[^}]*top:\s*14px[^}]*left:\s*14px/s);
});
```

- [x] **Step 2: Run the focused test and verify the new assertion fails**

Run: `npm test -- src/pages/GfciSeries.test.jsx`

Expected: FAIL only at `uses a pure-white square product stage with restrained card chrome` because the page-scoped white-stage rules do not exist yet.

- [x] **Step 3: Add minimal page-scoped card styling**

Add these rules after the shared `.pcard` rules in `src/styles/product-experience.css`:

```css
.gfci-series .pcard {
  border-color: #e1e8ed;
  border-radius: 12px;
  background: #fff;
}

.gfci-series .pcard__media {
  aspect-ratio: 1;
  background: #fff;
}

.gfci-series .pcard__media img {
  padding: 0;
}

.gfci-series .pcard__tag {
  top: 14px;
  left: 14px;
}

.gfci-series .pcard:hover {
  border-color: #cfdbe2;
  box-shadow: 0 12px 28px rgba(7, 19, 38, 0.06);
}
```

- [x] **Step 4: Run focused and full automated checks**

Run: `npm test -- src/pages/GfciSeries.test.jsx`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: production build completes successfully.

- [x] **Step 5: Verify the live sample at full viewport sizes**

Open `http://127.0.0.1:4173/products/gfci` and capture screenshots at `1920x1080`, `768x1024`, and `390x844`.

Expected:
- product media is pure white without a gray frame;
- mounting straps remain fully visible;
- the product occupies more of the square image stage;
- badges remain legible in the upper-left corner;
- grid remains four, two, and one columns respectively;
- no horizontal overflow or clipped product names.

- [x] **Step 6: Commit the sample implementation**

```bash
git add src/pages/GfciSeries.test.jsx src/styles/product-experience.css docs/superpowers/plans/2026-08-26-gfci-white-product-cards.md
git commit -m "style: refine GFCI product card presentation"
```
