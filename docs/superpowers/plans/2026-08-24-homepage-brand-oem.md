# Homepage Brand + OEM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a brand-story section and an OEM/ODM customization section, replace the GFCI-only engineering feature with a balanced multi-platform engineering story, and make application cards fully clickable.

**Architecture:** Keep `Home.jsx` composition unchanged. Extend the configuration-driven `EditorialHomepageFront.jsx` front-half story, reuse existing Fahint assets and routes, and add scoped responsive styles to `styles.css`. Protect behavior with page-level React Testing Library regression tests.

**Tech Stack:** React 18, React Router, Lucide React, CSS, Vitest, React Testing Library, Vite.

---

### Task 1: Add failing homepage structure tests

**Files:**
- Modify: `src/pages/Home.test.jsx`

- [ ] **Step 1: Add the expected headings and route behavior**

```jsx
it('balances brand, engineering and OEM customization in the editorial front half', () => {
  renderHome();
  expect(screen.getByRole('heading', { name: 'A wiring-device brand built as one system.' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Engineering shared across every device platform.' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Your brand, specified down to the last detail.' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'GFCI protection made easier to specify and install.' })).not.toBeInTheDocument();
});

it('makes each application panel a full-card link', () => {
  renderHome();
  expect(screen.getByRole('heading', { name: 'Kitchens & Wet Areas' }).closest('a')).toHaveAttribute('href', '/products/gfci');
  expect(screen.getByRole('heading', { name: 'Hospitality & Multifamily' }).closest('a')).toHaveAttribute('href', '/products/usb-outlets');
  expect(screen.getByRole('heading', { name: 'Commercial Fit-Out' }).closest('a')).toHaveAttribute('href', '/capabilities');
  expect(screen.getByRole('heading', { name: 'Bathrooms & Renovation' }).closest('a')).toHaveAttribute('href', '/products/receptacles');
});
```

- [ ] **Step 2: Run the focused test and confirm the new assertions fail**

Run: `npm test -- --run src/pages/Home.test.jsx`

Expected: FAIL because the three new headings and application-card anchors do not exist.

### Task 2: Implement brand story and broad engineering narrative

**Files:**
- Modify: `src/components/home/EditorialHomepageFront.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Insert the brand-story section after the proof strip**

Use the existing `buyer-review.jpg` or closest available real Fahint asset. Add the heading `A wiring-device brand built as one system.`, concise copy, an About link, and three principles: `Coordinated product systems`, `Verified engineering`, `Market-ready support`.

- [ ] **Step 2: Replace GFCI-only engineering copy**

Change the heading to `Engineering shared across every device platform.` and show four shared capability items: `Safety & compliance`, `Charging performance`, `Control intelligence`, `Coordinated form & finish`. Keep the installed-device background and link to `/capabilities`.

- [ ] **Step 3: Add scoped responsive styles**

Create `.editorial-brand`, `.editorial-brand__media`, `.editorial-brand__copy`, `.editorial-brand__principles`, and update engineering feature layout. Desktop is an asymmetric split; mobile is one column with complete headings and minimum 48px interaction targets.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- --run src/pages/Home.test.jsx`

Expected: the new structure test passes; the application-card test still fails.

### Task 3: Add OEM customization and full-card application links

**Files:**
- Modify: `src/components/home/EditorialHomepageFront.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add application routes to configuration**

Use `/products/gfci`, `/products/usb-outlets`, `/capabilities`, and `/products/receptacles` in the existing application order. Render each `.editorial-application` as a React Router `Link` and add a visible arrow affordance.

- [ ] **Step 2: Insert customization section before factory evidence**

Add the heading `Your brand, specified down to the last detail.` and six items: `Product mix`, `Colours & finishes`, `Logo & markings`, `Packaging`, `Compliance files`, `Samples & testing`. Use an existing product-line image and link the CTA to `/contact`.

- [ ] **Step 3: Add hover, focus and responsive styles**

Application links retain current image treatment and gain visible keyboard focus. Customization uses a split media/content layout on desktop and a single-column layout on mobile.

- [ ] **Step 4: Run all homepage tests**

Run: `npm test -- --run src/pages/Home.test.jsx`

Expected: all homepage tests pass.

### Task 4: Visual and production verification

**Files:**
- Update: `design-qa.md`
- Create: `_qa/home-brand-oem-desktop.png`
- Create: `_qa/home-brand-oem-mobile.png`

- [ ] **Step 1: Capture and inspect desktop homepage**

Use Chrome at 1920px width and capture the complete page. Confirm no clipped headings, broken image crops, horizontal overflow or abrupt section transitions.

- [ ] **Step 2: Capture and inspect mobile homepage**

Use Chrome at 390px width. Confirm brand story, engineering capabilities, customization items and application links reflow to one column.

- [ ] **Step 3: Run complete verification**

Run: `npm test -- --run`

Expected: all tests pass with zero failures.

Run: `npm run build`

Expected: Vite production build exits with code 0.

- [ ] **Step 4: Record visual QA**

Add desktop/mobile paths, reviewed requirements and `final result: passed` to `design-qa.md` only after screenshots and commands succeed.

## Self-review

- Spec coverage: brand story, balanced engineering, application links, OEM customization, responsive behavior and verification are covered.
- Placeholder scan: no TBD/TODO or undefined implementation requirement remains.
- Consistency: all headings, routes, class names and test expectations match across tasks.
- Repository note: this folder has no `.git` directory, so commit steps are intentionally omitted.
