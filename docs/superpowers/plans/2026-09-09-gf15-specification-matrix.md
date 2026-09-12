# GF15 Specification Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace GF15's click-to-expand specification accordions with an always-visible, grouped specification matrix while leaving every other product page unchanged.

**Architecture:** Reuse the existing summary and specification-group selectors. Add one presentational component for an always-visible group and select it only for `product.sku === 'GF15'`; the current disclosure component and state remain the fallback for all other SKUs.

**Tech Stack:** React 18, React Router, CSS, Vitest, Testing Library

---

### Task 1: Specify GF15 matrix behavior

**Files:**
- Modify: `src/pages/ProductDetail.test.jsx`
- Test: `src/pages/ProductDetail.test.jsx`

- [x] **Step 1: Replace the GF15 accordion expectations with matrix expectations and retain a non-GF15 regression**

```jsx
it('renders the complete GF15 specification as an always-visible grouped matrix', () => {
  const { container } = renderDetail('gf15');
  const technical = container.querySelector('#technical-details');
  const summary = within(technical).getByRole('list', { name: 'Key specifications' });

  expect(within(summary).getByText('15A, 125V')).toBeInTheDocument();
  expect(within(technical).queryByRole('button', { name: /all specifications/i })).not.toBeInTheDocument();
  expect(technical.querySelector('.product-specification-matrix')).not.toBeNull();
  expect(technical.querySelectorAll('.product-specification-panel')).toHaveLength(5);
  expect(within(technical).getByText('102–132V AC')).toBeVisible();
  expect(within(technical).getByText('Side wire & back wire')).toBeVisible();
});

it('keeps accordion controls on non-GF15 product specifications', () => {
  const { container } = renderDetail('gt20');
  const technical = container.querySelector('#technical-details');

  expect(within(technical).getByRole('button', { name: 'Expand all specifications' })).toBeInTheDocument();
  expect(technical.querySelector('.product-specification-matrix')).toBeNull();
});
```

- [x] **Step 2: Run the focused tests and verify the new GF15 test fails**

Run: `npm test -- --run src/pages/ProductDetail.test.jsx -t "specification"`

Expected: FAIL because GF15 still renders the expand button and `<details>` groups.

### Task 2: Render the always-visible GF15 groups

**Files:**
- Modify: `src/components/products/ProductTechnicalSections.jsx`
- Test: `src/pages/ProductDetail.test.jsx`

- [x] **Step 1: Add the static group panel**

```jsx
function SpecificationPanel({ group, index }) {
  if (!Array.isArray(group.rows) || group.rows.length === 0) return null;
  const headingId = `specification-panel-${index}`;

  return (
    <section className="product-specification-panel" aria-labelledby={headingId}>
      <header className="product-specification-panel__head">
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h3 id={headingId}>{group.title}</h3>
        <span>{group.rows.length} details</span>
      </header>
      <dl className="product-specification-panel__rows">
        {group.rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
```

- [x] **Step 2: Select the matrix only for GF15**

Inside `ProductSpecifications`, define `const usesSpecificationMatrix = product.sku === 'GF15';`, omit the global toggle button in that mode, and render:

```jsx
{usesSpecificationMatrix ? (
  <div className="product-specification-matrix">
    {groups.map((group, index) => (
      <SpecificationPanel key={group.title} group={group} index={index} />
    ))}
  </div>
) : (
  <div className="product-specification-groups">
    {groups.map((group, index) => (
      <SpecificationGroup
        key={group.title}
        group={group}
        index={index}
        isOpen={expandedGroups.has(group.title)}
        onToggle={handleGroupToggle}
      />
    ))}
  </div>
)}
```

- [x] **Step 3: Run the focused behavior tests**

Run: `npm test -- --run src/pages/ProductDetail.test.jsx -t "specification"`

Expected: PASS for the GF15 matrix and the GT20 accordion regression.

### Task 3: Style the grouped matrix

**Files:**
- Modify: `src/styles/product-experience.css`
- Test: `src/pages/ProductDetail.test.jsx`

- [x] **Step 1: Add a failing responsive-style regression**

```jsx
it('styles the always-visible specification matrix as two columns with a mobile stack', () => {
  const styles = readFileSync('src/styles/product-experience.css', 'utf8');

  expect(styles).toMatch(/\.product-specification-matrix\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s);
  expect(styles).toMatch(/@media\s*\(max-width:\s*760px\)[\s\S]*?\.product-specification-matrix\s*\{[^}]*grid-template-columns:\s*1fr/s);
});
```

- [x] **Step 2: Run the style test and verify it fails**

Run: `npm test -- --run src/pages/ProductDetail.test.jsx -t "always-visible specification matrix"`

Expected: FAIL because the matrix selectors do not exist yet.

- [x] **Step 3: Add the desktop matrix and row styles**

```css
.product-specification-matrix {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--product-line);
  border-radius: 20px;
  background: var(--product-line);
}

.product-specification-panel {
  min-width: 0;
  background: #fff;
}

.product-specification-panel:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}

.product-specification-panel__head {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 14px;
  align-items: baseline;
  min-height: 72px;
  padding: 22px 24px;
  color: var(--product-navy);
}

.product-specification-panel__rows > div {
  display: grid;
  grid-template-columns: minmax(130px, 0.82fr) minmax(0, 1.18fr);
  gap: 20px;
  padding: 15px 24px;
  border-top: 1px solid var(--product-line);
}

.product-specification-panel__rows > div:nth-child(odd) {
  background: #f7fafc;
}
```

- [x] **Step 4: Add the existing mobile-breakpoint override**

```css
@media (max-width: 760px) {
  .product-specification-matrix {
    grid-template-columns: 1fr;
  }

  .product-specification-panel:last-child:nth-child(odd) {
    grid-column: auto;
  }

  .product-specification-panel__head,
  .product-specification-panel__rows > div {
    padding-right: 18px;
    padding-left: 18px;
  }
}
```

- [x] **Step 5: Run the complete product-detail test file**

Run: `npm test -- --run src/pages/ProductDetail.test.jsx`

Expected: all tests PASS.

- [x] **Step 6: Build the site**

Run: `npm run build`

Expected: Vite build completes without errors.

- [x] **Step 7: Review the scoped diff**

Run: `git diff --check && git diff -- src/components/products/ProductTechnicalSections.jsx src/pages/ProductDetail.test.jsx src/styles/product-experience.css`

Expected: no whitespace errors; only GF15 matrix behavior, tests, and styles are present.
