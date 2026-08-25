# Fahint Homepage Brand + OEM Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage as a seven-section, industry-specific brand website with a full-screen poster hero, five product-family entry points and concise OEM/ODM manufacturing proof.

**Architecture:** Keep existing routing and product data intact. Split homepage-only presentation into focused components under `src/components/home`, compose them in `src/pages/Home.jsx`, and add a self-contained homepage style layer in `src/styles.css`. Add Vitest and Testing Library to protect the required content structure before implementation, then verify layout in desktop and mobile browsers.

**Tech Stack:** React 18, React Router 6, Vite 5, Lucide React, CSS, Vitest, Testing Library, Playwright CLI.

---

### Task 1: Add homepage structure tests

**Files:**
- Modify: `package.json`
- Create: `src/test/setup.js`
- Create: `src/pages/Home.test.jsx`

- [ ] **Step 1: Add Vitest and Testing Library packages and scripts**

Add these scripts to `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Add these development dependencies:

```json
"@testing-library/jest-dom": "^6.6.3",
"@testing-library/react": "^16.1.0",
"@testing-library/user-event": "^14.5.2",
"jsdom": "^25.0.1",
"vitest": "^2.1.8"
```

Add this Vite test configuration to `vite.config.js`:

```js
test: {
  environment: 'jsdom',
  setupFiles: './src/test/setup.js',
  css: true
}
```

- [ ] **Step 2: Add the DOM test setup**

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Write the failing homepage requirements test**

Create `src/pages/Home.test.jsx` with a router wrapper and assertions for:

```jsx
expect(screen.getByRole('heading', { name: /Wiring Devices, Built for Your Brand/i })).toBeInTheDocument();
expect(screen.getByText(/Five coordinated product platforms/i)).toBeInTheDocument();
expect(screen.getByRole('heading', { name: /One Platform\. Five Product Families/i })).toBeInTheDocument();
expect(screen.getByRole('heading', { name: /From Certified Platforms to Your Private-label Line/i })).toBeInTheDocument();
expect(screen.getByText(/Select/i)).toBeInTheDocument();
expect(screen.getByText(/Customize/i)).toBeInTheDocument();
expect(screen.getByText(/Approve/i)).toBeInTheDocument();
expect(screen.getByText(/Produce/i)).toBeInTheDocument();
expect(screen.getByRole('link', { name: /Request a Product Line Proposal/i })).toBeInTheDocument();
expect(screen.queryByText(/Wallplates/i)).not.toBeInTheDocument();
expect(screen.queryByRole('heading', { name: /Buyer questions, answered/i })).not.toBeInTheDocument();
expect(screen.queryByRole('heading', { name: /Standards, specification and sourcing/i })).not.toBeInTheDocument();
```

Use a separate interaction test to click the GFCI and USB tabs and verify that both product-family panels remain available.

- [ ] **Step 4: Install packages and run the test to verify it fails**

Run:

```powershell
npm install
npm test
```

Expected: the new homepage requirements test fails because the approved headings and reduced structure have not yet been implemented.

### Task 2: Create focused homepage components

**Files:**
- Create: `src/components/home/BrandHero.jsx`
- Create: `src/components/home/BrandApplicationStory.jsx`
- Create: `src/components/home/OemPoster.jsx`
- Create: `src/components/home/ManufacturingFlow.jsx`
- Create: `src/components/home/TrustStrip.jsx`
- Create: `src/components/home/HomepageCta.jsx`

- [ ] **Step 1: Implement `BrandHero`**

The component must render a full-screen `home-poster` section using `/assets/images/hero/hero-interior.webp`, the approved two-line message and two React Router links. Do not render badges, metrics or floating product cards.

- [ ] **Step 2: Implement `BrandApplicationStory`**

Render one large lifestyle image and one product-detail image using `/assets/images/hero/hero-lifestyle.webp` and `/assets/images/lines/smart-switch.webp`. Limit the copy to one heading, one sentence and one link.

- [ ] **Step 3: Implement `OemPoster`**

Render `/assets/images/company/line-2.webp` as a full-width media background with the approved heading, one sentence, three concise capability labels and a link to `/contact`.

- [ ] **Step 4: Implement `ManufacturingFlow`**

Render `/assets/images/company/facility-workshop.webp` beside the exact four stages `Select`, `Customize`, `Approve`, `Produce`. Each stage receives a two-digit number and a one-sentence explanation.

- [ ] **Step 5: Implement `TrustStrip` and `HomepageCta`**

`TrustStrip` renders four short proof points: `UL/cUL`, `ISO 9001`, `Patented`, `Export Support`. `HomepageCta` renders the approved inquiry sentence and a `/contact` link labelled `Request a Product Line Proposal`.

- [ ] **Step 6: Run the test**

Run `npm test`.

Expected: component imports compile; homepage requirements still fail until the new components are composed in `Home.jsx`.

### Task 3: Recompose the homepage and remove duplicated content

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/components/ProductTabs.jsx`

- [ ] **Step 1: Replace the current homepage composition**

Render only these seven content groups between the shared header and footer:

1. `BrandHero`
2. Product platform heading plus `ProductTabs`
3. `BrandApplicationStory`
4. `OemPoster`
5. `ManufacturingFlow`
6. `TrustStrip`
7. `HomepageCta`

Remove the current brand-proof cards, private-label capability grid, six-step OEM flow, proof gallery, buyer-type cards, duplicated About section, full certificate carousel, blog cards, FAQ and full homepage inquiry form.

- [ ] **Step 2: Preserve the five approved product families**

Keep this exact list in `ProductTabs.jsx`:

```js
const HOME_PRODUCT_LINE_SLUGS = ['gfci', 'usb-outlets', 'receptacles', 'smart-switches', 'lighting-switches'];
```

Simplify the panel copy and keep four model cards per family. Do not include `wallplates` or `dimmers` in the homepage tabs.

- [ ] **Step 3: Run the test**

Run `npm test`.

Expected: all homepage structure and product-family interaction tests pass.

### Task 4: Build the industry-specific visual system

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Replace the old homepage redesign rules**

Replace the current `.brand-hero`, `.brand-proof-*`, `.private-label-studio-*`, `.oem-flow-*`, `.proof-gallery-*`, `.partner-*` homepage rules with the new `.home-poster`, `.platform-showcase`, `.brand-story`, `.oem-poster`, `.manufacturing-story`, `.trust-strip` and `.homepage-cta` rules.

- [ ] **Step 2: Implement the full-screen hero treatment**

The desktop hero must use:

```css
.home-poster {
  position: relative;
  min-height: max(760px, calc(100svh - var(--header-h)));
  display: grid;
  align-items: end;
  overflow: hidden;
  color: #fff;
  background: #06152d;
}
```

The media fills the section with `object-fit: cover`; the overlay uses a left-to-right navy gradient; the heading uses `font-size: clamp(54px, 7vw, 108px)` and a maximum width that prevents a long line.

- [ ] **Step 3: Implement poster-style content bands**

Use full-width media, strong navy/white alternation, square-to-moderate radii and large whitespace. Avoid glassmorphism, generic blue gradient cards and repeated three-column feature grids.

- [ ] **Step 4: Add the electrical connection motif**

Use subtle pseudo-elements for thin lines and small circular nodes on section labels and separators. The motif must use CSS only and stay below text and product images.

- [ ] **Step 5: Add restrained interaction and reduced-motion support**

Images may scale up to `1.035` on hover, arrows may translate by `4px`, and Reveal transitions may remain. Add a `prefers-reduced-motion: reduce` rule that disables transforms, transitions and smooth scrolling for the new homepage sections.

- [ ] **Step 6: Add responsive rules**

At 1024px, reduce hero heading size and stack the brand story if needed. At 768px, make all two-column sections single-column, use `min-height: 720px` for the hero, stack CTA buttons and make the ProductTabs bar horizontally scrollable without page overflow.

- [ ] **Step 7: Run tests and build**

Run:

```powershell
npm test
npm run build
```

Expected: tests pass and Vite completes the production build with no errors.

### Task 5: Verify the result in a real browser

**Files:**
- Create: `output/playwright/fahint-home-desktop.png`
- Create: `output/playwright/fahint-home-mobile.png`

- [ ] **Step 1: Start the preview server**

Run `npm run dev -- --host 127.0.0.1` and keep the returned port.

- [ ] **Step 2: Capture and inspect desktop layout**

Use Playwright CLI at 1440×1000. Verify the hero is poster-like, no text overlaps media, all five product tabs are visible or reachable, and the homepage contains no duplicated product or GFCI-only promotional section.

- [ ] **Step 3: Capture and inspect mobile layout**

Use Playwright CLI at 390×844. Verify no horizontal page overflow, hero buttons are usable, media crops keep the product/application visible, product tabs can scroll, and the OEM/ODM CTA remains visible.

- [ ] **Step 4: Run final verification**

Run `npm test` and `npm run build` again after any visual fixes. Expected: both commands exit with code 0.

## Execution note

This folder is not a Git repository, so commit steps are intentionally omitted. The plan will be executed inline in the current session because the user explicitly requested immediate implementation.
