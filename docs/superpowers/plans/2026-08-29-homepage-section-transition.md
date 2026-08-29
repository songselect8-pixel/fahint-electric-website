# Homepage Section Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's abrupt white proof strip and hard dark-to-light cut with a responsive dark trust rail and restrained tonal transition.

**Architecture:** Add homepage-specific class names to the existing proof and product sections so the shared product-overview proof strip remains unchanged. Implement the visual treatment as scoped CSS overrides, with a two-column mobile proof grid and no new runtime behavior or assets.

**Tech Stack:** React 18, CSS, Vitest, Testing Library, Vite

---

### Task 1: Lock the homepage-specific transition hooks

**Files:**
- Modify: `src/pages/Home.test.jsx`
- Modify: `src/components/home/EditorialHomepageFront.jsx`

- [ ] **Step 1: Write the failing test**

Add a test that asserts the manufacturing proof section has `homepage-proof-bridge` and the product portfolio has `homepage-product-portfolio`.

```jsx
it('uses homepage-specific hooks for the proof bridge and portfolio transition', () => {
  renderHome();

  expect(screen.getByLabelText('Fahint manufacturing highlights')).toHaveClass('homepage-proof-bridge');
  expect(screen.getByRole('heading', { name: 'One platform. Six focused product systems.' }).closest('section'))
    .toHaveClass('homepage-product-portfolio');
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `pnpm test -- src/pages/Home.test.jsx`

Expected: FAIL because the two homepage-specific class names are absent.

- [ ] **Step 3: Add the minimal class hooks**

Update the two section class names in `EditorialHomepageFront.jsx`:

```jsx
<section className="editorial-proof homepage-proof-bridge" aria-label="Fahint manufacturing highlights">
```

```jsx
<section className="editorial-products homepage-product-portfolio" aria-labelledby="editorial-products-title">
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `pnpm test -- src/pages/Home.test.jsx`

Expected: all homepage tests pass.

### Task 2: Implement and verify the responsive visual bridge

**Files:**
- Modify: `src/pages/Home.test.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write the failing CSS contract test**

Add assertions for a negative hero overlap, translucent dark panel, backdrop blur, muted mobile two-by-two layout, and a product background that ends in the existing light section color.

```jsx
it('bridges the hero, proof rail and light content without abrupt white bands', () => {
  const styles = readFileSync('src/styles.css', 'utf8');

  expect(styles).toMatch(/\.homepage-proof-bridge\s*\{[^}]*margin-top:\s*-42px[^}]*background:\s*linear-gradient/);
  expect(styles).toMatch(/\.homepage-proof-bridge \.editorial-proof__grid\s*\{[^}]*backdrop-filter:\s*blur\(14px\)/);
  expect(styles).toMatch(/\.homepage-product-portfolio\s*\{[^}]*background:\s*linear-gradient\([\s\S]*?#eef3f6/);
  expect(styles).toMatch(/@media \(max-width:\s*760px\)[\s\S]*?\.homepage-proof-bridge \.editorial-proof__grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `pnpm test -- src/pages/Home.test.jsx`

Expected: FAIL because the homepage bridge styles do not exist.

- [ ] **Step 3: Add scoped desktop and mobile CSS**

Append homepage-specific rules to `src/styles.css` that:

```css
.homepage-proof-bridge {
  position: relative;
  z-index: 4;
  margin-top: -42px;
  margin-bottom: -42px;
  border: 0;
  background: linear-gradient(180deg, transparent 0 50%, #07152c 50% 100%);
  color: #fff;
}

.homepage-proof-bridge .editorial-proof__grid {
  overflow: hidden;
  border: 1px solid rgba(121, 210, 255, .2);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(18, 43, 73, .9), rgba(7, 21, 44, .96));
  box-shadow: 0 24px 60px rgba(0, 8, 24, .28), inset 0 1px 0 rgba(255, 255, 255, .08);
  backdrop-filter: blur(14px);
}

.homepage-product-portfolio {
  border-top: 0;
  background: linear-gradient(180deg, #07152c 0, #07152c calc(100% - 112px), #17314a calc(100% - 72px), #8ea1b0 calc(100% - 22px), #eef3f6 100%);
}
```

Use white values, muted blue-grey labels, low-contrast dividers, and a compact mobile two-by-two grid. Do not change the shared `.editorial-proof` behavior used by the product overview.

- [ ] **Step 4: Run focused tests**

Run: `pnpm test -- src/pages/Home.test.jsx`

Expected: all homepage tests pass.

- [ ] **Step 5: Run the full verification suite**

Run: `pnpm test`

Expected: all tests pass.

Run: `pnpm build`

Expected: Vite production build completes successfully.

- [ ] **Step 6: Commit the implementation**

```bash
git add src/pages/Home.test.jsx src/components/home/EditorialHomepageFront.jsx src/styles.css docs/superpowers/plans/2026-08-29-homepage-section-transition.md
git commit -m "style: smooth homepage section transitions"
```

