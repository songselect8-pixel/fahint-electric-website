# Editorial Homepage Front Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing homepage front half with the selected image-led homepage while preserving the current lower conversion modules.

**Architecture:** Add one self-contained React component for the seven image-led sections and a prefixed CSS system appended to the incumbent stylesheet. Reuse the exact source imagery from the new handoff project and keep all lower homepage components unchanged.

**Tech Stack:** React 18, React Router 6, Vite 5, Vitest, Testing Library, CSS.

---

### Task 1: Lock the homepage contract with tests

**Files:**
- Modify: `src/pages/Home.test.jsx`
- Test: `src/pages/Home.test.jsx`

- [ ] Replace old front-half assertions with headings from the selected design: `Safer Power. Smarter Control.`, `One platform. Six focused product systems.`, `GFCI protection made easier to specify and install.`, `Built for the places power matters most.`, `Quality is checked on the line, not promised after it.`, and `From market requirement to production-ready program.`
- [ ] Assert the six product-system names and verify lower modules remain present.
- [ ] Run `npm test -- src/pages/Home.test.jsx` and confirm the new assertions fail because the new front component is not wired yet.

### Task 2: Add the selected assets and front-half component

**Files:**
- Create: `src/components/home/EditorialHomepageFront.jsx`
- Create: `public/assets/images/editorial-home/*`

- [ ] Copy the exact hero, product, application, factory, and OEM images from `fahint-electric-next/public/assets` into the isolated destination folder.
- [ ] Implement the seven semantic `<section>` elements with product and application arrays, working React Router links, accessible image alt text, and lazy loading below the fold.

### Task 3: Wire the new front half and visual system

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/styles.css`

- [ ] Replace the old front component chain with `<EditorialHomepageFront />`.
- [ ] Retain `HomeCertifications`, `HomepageCta`, `HomeInsights`, and `HomeFaqInquiry` in their existing order.
- [ ] Add the `editorial-` prefixed desktop, tablet, mobile, hover, focus, and reduced-motion styles required to match the selected screenshot.
- [ ] Run `npm test -- src/pages/Home.test.jsx` and confirm the homepage contract passes.

### Task 4: Verify the integrated site

**Files:**
- Create: `design-qa.md`

- [ ] Run `npm test` and require all tests to pass.
- [ ] Run `npm run build` and require a successful Vite production build.
- [ ] Start the Vite preview and inspect the homepage at desktop and mobile widths against the selected screenshot.
- [ ] Record visual differences and fixes in `design-qa.md`; resolve all P0/P1/P2 items before handoff.

