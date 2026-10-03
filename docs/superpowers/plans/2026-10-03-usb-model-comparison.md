# USB Model Comparison Implementation Plan

> **For agentic workers:** Use executing-plans inline in this session. The existing approved workflow is main-agent execution, without subagents or a new worktree.

**Goal:** Compare 2–3 published USB models without losing the listing filters or inventing specifications.

**Architecture:** A small data helper validates selected SKUs and derives comparison rows from the existing catalog, filters and drawing references. LineDetail owns URL selection; an optional card action and a USB-only toolbar/native dialog render it. Existing inquiry utilities generate per-model links.

**Tech Stack:** Existing React, React Router, native dialog/checkbox/table, CSS, Vitest/Testing Library and Playwright CLI. No added packages.

---

### Task 1: Comparison facts and selection

Files:
- Create `src/data/usbComparison.js`
- Create `src/data/usbComparison.test.js`

- [ ] Write failing tests for validated, ordered, deduplicated, three-model selection and the normal/PD/F4P/4200 comparison facts.

```js
expect(resolveUsbComparison('GF15,invalid,FTR15-3100,FTR15-3100,F4P').map(p => p.sku))
  .toEqual(['FTR15-3100', 'F4P']);
const rows = usbComparisonRows([find('FTR15-3100'), find('FTR20QC-DC65W')]);
expect(rows.find(row => row.label === 'USB-C PD maximum').values)
  .toEqual(['Not applicable (non-PD)', 'Up to 65W per USB-C port']);
expect(rows.find(row => row.label === 'Device depth').values).toEqual(['44.7 mm', '47 mm']);
```

- [ ] Run `npm test -- src/data/usbComparison.test.js` and observe assertion failures with empty helper stubs.
- [ ] Implement `resolveUsbComparison(value)` using the published USB catalog, a Set and `slice(0, 3)`; return known products only. Implement `usbComparisonRows(products)` as `{ label, values, different }[]`, with `different = new Set(values).size > 1`.

```js
const facts = new Map(product.specificationGroups.flatMap(group => group.rows));
const facets = usbFilterValues(product);
const dimensions = usbDimensionReference(product);
const depth = dimensions?.depth ? `${dimensions.depth} mm` : 'Not published — please confirm';
```

Use normalized existing filter labels for interfaces/combined output; preserve the AC voltage/NEMA from the specification row while normalizing punctuation. PD output comes from the validated charging facet and is never combined. Dimensions use only the checked drawing map.

- [ ] Re-run the helper tests and existing USB filter/dimension tests; all must pass.

### Task 2: Listing interaction and comparison panel

Files:
- Modify `src/pages/LineDetail.jsx`
- Create `src/pages/UsbComparison.test.jsx`
- Modify `src/components/products/CatalogModelCard.jsx`
- Create `src/components/products/UsbComparison.jsx`
- Create `src/components/products/usb-comparison.css`

- [ ] Write failing page behavior tests for two-model minimum, three-model cap, removing/clearing, filter independence, URL restoration/validation, non-USB isolation, opening/closing, difference-only rows, safe inquiry/detail links. Stub only jsdom's missing native dialog methods, following ProductGallery.test.jsx.

```jsx
await user.click(screen.getByRole('checkbox', { name: 'Compare FTR15-3100' }));
expect(screen.getByRole('button', { name: 'Compare models' })).toBeDisabled();
await user.click(screen.getByRole('checkbox', { name: 'Compare FTR15C-3100' }));
await user.click(screen.getByRole('button', { name: 'Compare models' }));
const dialog = screen.getByRole('dialog', { name: 'Compare USB models' });
expect(within(dialog).getByRole('table')).toBeVisible();
expect(within(dialog).getByRole('link', { name: 'Request quote for FTR15-3100' }))
  .toHaveAttribute('href', '/contact?topic=products&model=FTR15-3100');
```

- [ ] Run `npm test -- src/pages/UsbComparison.test.jsx` and confirm missing-control failures.
- [ ] Add optional `children` in CatalogModelCard after its details link; existing callers stay unchanged. Render a USB-only native checkbox there, disabled for unselected models at the cap.

```jsx
<CatalogModelCard product={product}>
  {isUsb && <label className="usb-compare-choice">
    <input type="checkbox" aria-label={`Compare ${product.sku}`}
      checked={compared.some(p => p.sku === product.sku)}
      disabled={compared.length === 3 && !compared.some(p => p.sku === product.sku)}
      onChange={() => toggleCompare(product)} />
    <span>Compare</span>
  </label>}
</CatalogModelCard>
```

- [ ] Use one URL updater to serialize valid filters plus comparison. Clear filters passes an empty filter set with the existing comparison; clear comparison passes the current filters plus an empty selection. Retain `replace`, `preventScrollReset` and `preserveScroll` behavior.
- [ ] Render UsbComparison above the grid. It receives known products and an onRemove callback. Use a native dialog ref, showModal/close, Escape cancellation and close-to-trigger focus restore. A native checkbox filters semantic rows by `different`; images use SafeImage, links use productHref/inquiryContactHref. Do not include a remove action inside the dialog, avoiding a 1-column open comparison state.
- [ ] Style with site tokens, 44px controls, compact rounded toolbar below the header, internal panel/table scrolling, sticky parameter column and responsive column widths. No floating bottom action or global changes.
- [ ] Re-run page/helper/filter tests and fix implementation until green.

### Task 3: Verification and local handoff

- [ ] Run `npm test`, `npm run build`, and `git diff --check`.
- [ ] Confirm the existing local server responds (otherwise start Vite at 127.0.0.1:4175). Use Playwright CLI to select, compare, filter differences, close with Escape, check focus, follow detail/back, reload, and follow a model inquiry without sending.
- [ ] Inspect at 320/390/768/1024/1440 pixels. Verify two-column mobile listing, internal horizontal scroll, visible close control, no page overflow or overlap with contact buttons. Save screenshots under ignored `output/playwright/`.
- [ ] Review changed files and record results below. Commit only scoped source/tests/docs; preserve the existing three unrelated untracked paths. Do not push/merge/deploy.

## Execution record

Implementation has not started. User approved the USB comparison recommendation; this plan follows the previously approved local-only workflow.
