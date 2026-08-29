# Homepage Brand Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shorten the Fahint homepage into an eight-beat B2B buying path with a clearer manufacturer identity, earlier product and trust evidence, and direct product/OEM actions.

**Architecture:** Keep the existing React data arrays, imagery, reveal behavior, certificate carousel, FAQ, and inquiry form. Refactor the homepage composition so `EditorialHomepageFront` owns the ordered editorial chapters, merges repeated brand/engineering and customization/process stories, and inserts `HomeCertifications` immediately after factory evidence; `Home` retains only the editorial front and FAQ/inquiry close. Add a final, narrowly scoped CSS layer for the condensed rhythm instead of rewriting unrelated legacy styles.

**Tech Stack:** React 18, React Router 6, Vitest, Testing Library, Vite, plain CSS.

---

## File map

- Modify `src/pages/Home.test.jsx`: specify the approved content, ordering, removals, retained interactions, and responsive constraints before production changes.
- Modify `src/pages/Home.jsx`: remove the standalone CTA, insights, and duplicate certificate composition.
- Modify `src/components/home/EditorialHomepageFront.jsx`: update the Hero and proof language, merge repeated chapters, reorder the narrative, and place certification beside manufacturing evidence.
- Modify `src/components/home/HomeCertifications.jsx`: align the certification heading and copy with the manufacturing/compliance chapter.
- Modify `src/components/home/HomeFaqInquiry.jsx`: standardize American English in buyer-facing copy.
- Modify `src/styles.css`: add the reduced vertical rhythm, merged-section layouts, touch sizing, and mobile typography rules.

### Task 1: Lock the approved homepage behavior in tests

**Files:**
- Modify: `src/pages/Home.test.jsx`
- Test: `src/pages/Home.test.jsx`

- [ ] **Step 1: Replace obsolete story assertions with the approved Hero and two-route behavior**

```jsx
it('identifies the manufacturer and exposes both buyer routes in the first chapter', () => {
  renderHome();

  expect(screen.getByText('North American wiring devices · OEM/ODM manufacturing')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Wiring-device programs built for your market.' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Browse certified models/i })).toHaveAttribute('href', '/products');
  expect(screen.getByRole('link', { name: /Start an OEM brief/i })).toHaveAttribute('href', '/contact');
  expect(screen.getByText('Selected listed models')).toBeInTheDocument();
});
```

- [ ] **Step 2: Add a DOM-order test for the eight narrative beats**

```jsx
it('orders the homepage as a concise B2B purchasing path', () => {
  renderHome();

  const headings = [
    'Wiring-device programs built for your market.',
    'One platform. Six focused product systems.',
    'One coordinated system—from product platform to program support.',
    'Quality is checked on the line, not promised after it.',
    'Manufacturing and compliance, documented for review.',
    'Configure a production-ready program around your market.',
    'Built for the places power matters most.',
    'Buyer Questions, Answered.',
    'Tell Us What You Want to Build.'
  ].map((name) => screen.getByRole('heading', { name }));

  headings.slice(1).forEach((heading, index) => {
    expect(headings[index].compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
```

- [ ] **Step 3: Assert that repeated standalone chapters are gone while essential content remains**

```jsx
it('removes repeated homepage sales chapters without removing their destination routes', () => {
  renderHome();

  expect(screen.queryByRole('heading', { name: 'Engineering shared across every device platform.' })).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Build the Line Your Market Needs.' })).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Latest From Fahint.' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Discover Fahint/i })).toHaveAttribute('href', '/about');
  expect(screen.getByRole('link', { name: /View certification details/i })).toHaveAttribute('href', '/about#certifications');
});
```

- [ ] **Step 4: Run the focused test and confirm RED**

Run: `corepack pnpm test -- src/pages/Home.test.jsx`

Expected: FAIL because the approved Hero copy, new merged headings, ordering, and chapter removals are not implemented yet.

- [ ] **Step 5: Commit the failing specification**

```bash
git add src/pages/Home.test.jsx
git commit -m "test: specify concise homepage buying path"
```

### Task 2: Refactor the homepage composition and content

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/components/home/EditorialHomepageFront.jsx`
- Modify: `src/components/home/HomeCertifications.jsx`
- Modify: `src/components/home/HomeFaqInquiry.jsx`
- Test: `src/pages/Home.test.jsx`

- [ ] **Step 1: Reduce the top-level homepage composition**

```jsx
import EditorialHomepageFront from '../components/home/EditorialHomepageFront.jsx';
import HomeFaqInquiry from '../components/home/HomeFaqInquiry.jsx';

export default function Home() {
  return (
    <>
      <EditorialHomepageFront />
      <HomeFaqInquiry />
    </>
  );
}
```

- [ ] **Step 2: Update the Hero, proof, and manufacturer positioning**

Use the following exact buyer-facing content in `EditorialHomepageFront.jsx`:

```jsx
<p className="editorial-eyebrow">North American wiring devices · OEM/ODM manufacturing</p>
<h1 id="editorial-hero-title">Wiring-device programs built for your market.</h1>
<p className="editorial-hero__copy">
  GFCI outlets, USB and Type-C receptacles, wiring devices, controls and wall plates for distributors,
  contractors and private-label programs.
</p>
<div className="editorial-hero__actions">
  <Link className="editorial-button" to="/products">Browse certified models <ArrowRight size={17} /></Link>
  <Link className="editorial-text-link" to="/contact">Start an OEM brief <ArrowRight size={16} /></Link>
</div>
```

Change the first proof pair to `['UL / cUL', 'Selected listed models']`, retaining the existing testing, factory-area, and OEM/ODM proof items.

- [ ] **Step 3: Merge brand and engineering into one Why Fahint chapter**

Keep the existing coordinated-family image and replace the brand heading/copy with:

```jsx
<p className="editorial-eyebrow">Why Fahint</p>
<h2 id="editorial-brand-title">One coordinated system—from product platform to program support.</h2>
<p className="editorial-brand__lede">
  Product families, visible finishes, model documentation and program support are developed as one system,
  helping buyers build a coherent range without coordinating disconnected suppliers.
</p>
```

Render the four existing `engineeringCapabilities` entries inside the brand chapter, keep the `Discover Fahint` link, and remove the standalone `.editorial-engineering` section.

- [ ] **Step 4: Put manufacturing and compliance evidence together**

Import `HomeCertifications` in `EditorialHomepageFront.jsx`, render it immediately after `.editorial-factory`, and update its heading to:

```jsx
<p className="home-section-label">Manufacturing & compliance</p>
<h2 id="home-certificates-title">Manufacturing and compliance, documented for review.</h2>
<p>Review production evidence, selected product-family files and quality-system documentation before specifying a model.</p>
```

- [ ] **Step 5: Merge OEM configuration and process into one production-ready chapter**

Move the existing four `process` cards beneath the customization option list, change the heading to `Configure a production-ready program around your market.`, retain the `/contact` CTA, and remove the standalone `.editorial-oem` section and its background image.

- [ ] **Step 6: Reorder the remaining chapters**

The rendered sequence inside `EditorialHomepageFront` must be:

```jsx
<Hero />
<Proof />
<ProductSystems />
<WhyFahint />
<FactoryEvidence />
<HomeCertifications />
<OemConfigurationAndProcess />
<Applications />
```

These labels describe the existing JSX section blocks; no unnecessary wrapper components need to be created.

- [ ] **Step 7: Standardize buyer-facing American English**

In `HomeFaqInquiry.jsx`, change `customisation` to `customization`; preserve all existing form labels and direct email, phone, WhatsApp, and location fallbacks.

- [ ] **Step 8: Run the focused test and confirm GREEN**

Run: `corepack pnpm test -- src/pages/Home.test.jsx`

Expected: PASS with all homepage behavior tests green.

- [ ] **Step 9: Commit the content and composition refactor**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx src/components/home/EditorialHomepageFront.jsx src/components/home/HomeCertifications.jsx src/components/home/HomeFaqInquiry.jsx
git commit -m "feat: streamline homepage buying path"
```

### Task 3: Condense the visual rhythm and preserve responsive quality

**Files:**
- Modify: `src/styles.css`
- Test: `src/pages/Home.test.jsx`

- [ ] **Step 1: Add CSS contract assertions before styling**

```jsx
it('uses the condensed homepage rhythm and accessible mobile controls', () => {
  const styles = readFileSync('src/styles.css', 'utf8');

  expect(styles).toMatch(/\.homepage-why-fahint[\s\S]*?padding:\s*clamp\(88px,\s*7vw,\s*128px\)/);
  expect(styles).toMatch(/\.homepage-oem-program[\s\S]*?padding:\s*clamp\(88px,\s*7vw,\s*128px\)/);
  expect(styles).toMatch(/@media \(max-width:\s*760px\)[\s\S]*?\.editorial-button[\s\S]*?min-height:\s*44px/);
  expect(styles).toMatch(/@media \(max-width:\s*760px\)[\s\S]*?\.editorial-hero h1[\s\S]*?font-size:\s*clamp\(38px,\s*11vw,\s*52px\)/);
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `corepack pnpm test -- src/pages/Home.test.jsx`

Expected: FAIL because the condensed section hooks and mobile rules do not yet exist.

- [ ] **Step 3: Add a final scoped homepage structure layer**

Append a `Homepage structure distillation (2026-08-29)` block to `src/styles.css` using these exact hooks and constraints:

```css
.homepage-why-fahint,
.homepage-oem-program {
  padding: clamp(88px, 7vw, 128px) 0;
}

.homepage-why-fahint .editorial-brand__grid,
.homepage-oem-program .editorial-customization__grid {
  gap: clamp(56px, 6vw, 96px);
}

.homepage-why-fahint .editorial-feature-list--platform {
  margin: 40px 0 36px;
  background: #d3dce3;
}

.homepage-why-fahint .editorial-feature-list--platform li {
  background: #f7f9fa;
}

.homepage-oem-program .editorial-process {
  margin-top: clamp(56px, 6vw, 88px);
  border-color: #ccd5dc;
  background: #edf2f5;
}

.homepage-oem-program .editorial-process article,
.homepage-oem-program .editorial-process article:first-child {
  border-color: #ccd5dc;
}

.homepage-oem-program .editorial-process h3 { color: #0d274b; }
.homepage-oem-program .editorial-process p { color: #657487; }

@media (max-width: 760px) {
  .editorial-hero { min-height: 660px; }
  .editorial-hero__content { padding-top: 128px; padding-bottom: 64px; }
  .editorial-hero h1 { max-width: 12ch; font-size: clamp(38px, 11vw, 52px); line-height: .98; }
  .editorial-button { min-height: 44px; }
  .homepage-why-fahint,
  .homepage-oem-program { padding: 72px 0; }
}
```

Keep the existing navy/white/cyan tokens, full mobile product images, focus styles, and reduced-motion rules unchanged.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `corepack pnpm test -- src/pages/Home.test.jsx`

Expected: PASS.

- [ ] **Step 5: Commit the condensed styling**

```bash
git add src/styles.css src/pages/Home.test.jsx
git commit -m "style: condense homepage editorial rhythm"
```

### Task 4: Verify production behavior and leave no temporary artifacts

**Files:**
- Verify: `src/pages/Home.jsx`
- Verify: `src/components/home/EditorialHomepageFront.jsx`
- Verify: `src/styles.css`

- [ ] **Step 1: Run the complete automated test suite**

Run: `corepack pnpm test`

Expected: all Vitest suites and tests pass without warnings introduced by this change.

- [ ] **Step 2: Run the production build**

Run: `corepack pnpm build`

Expected: Vite finishes successfully and writes only the ignored `dist/` build output.

- [ ] **Step 3: Perform read-only browser verification without screenshots**

At `http://127.0.0.1:4173/`, verify the heading sequence, both Hero routes, all six product links, certificate carousel controls, FAQ toggles, inquiry labels, and absence of horizontal overflow at 320px, 768px, 1024px, and 1440px. Do not call a screenshot command.

- [ ] **Step 4: Inspect repository hygiene**

Run: `git status --short --ignored`

Expected: no screenshot, Playwright cache, generated image, or unexpected temporary file is present; dependencies remain untouched.

- [ ] **Step 5: Report the result without pushing**

Report the changed homepage behavior, verification commands and results, current commit hashes, and the local preview URL. Do not push until the user requests it.
