# Homepage Rhythm and Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing Fahint homepage so its sections transition naturally, headings follow one editorial grid, mobile cards are shorter, and motion is purposeful and accessible.

**Architecture:** Preserve the current React section structure and product data. Consolidate duplicated homepage CSS into one final rhythm layer, use the existing `Reveal` component as a progressively enhanced IntersectionObserver primitive, and apply it directly to semantic sections/cards without adding layout-breaking wrappers.

**Tech Stack:** React 18, React Router 6, CSS, IntersectionObserver, Vitest, Testing Library, Vite, Playwright CLI.

**Repository note:** This project directory does not contain a `.git` repository. The commit steps below are replaced by test/build checkpoints; no version-control operation will be attempted.

---

## File map

- Modify `src/components/Reveal.jsx`: make scroll reveals progressively enhanced and reduced-motion safe.
- Modify `src/components/home/EditorialHomepageFront.jsx`: apply semantic reveals and staggered card motion to the homepage front half.
- Modify `src/components/home/HomeCertifications.jsx`: add section-level reveal without changing content.
- Modify `src/components/home/HomepageCta.jsx`: add section-level reveal without changing content.
- Modify `src/components/home/HomeInsights.jsx`: keep card reveals and add heading-level reveal.
- Modify `src/components/home/HomeFaqInquiry.jsx`: add independent FAQ and inquiry section reveals.
- Modify `src/styles.css`: remove the duplicated early rhythm override and add one authoritative layout/motion layer.
- Modify `src/pages/Home.test.jsx`: verify content, links, semantic motion hooks, reduced-motion CSS and card-height constraints.

### Task 1: Protect the intended structure with tests

**Files:**
- Modify: `src/pages/Home.test.jsx`

- [ ] **Step 1: Add failing tests for motion and layout contracts**

Add tests that assert the homepage still contains every major section, that the front-half sections expose the `reveal` class, and that the stylesheet includes reduced-motion handling and the approved mobile card-height ranges.

```jsx
it('progressively reveals the major homepage chapters', () => {
  renderHome();

  [
    'A wiring-device brand built as one system.',
    'One platform. Six focused product systems.',
    'Engineering shared across every device platform.',
    'Built for the places power matters most.',
    'Your brand, specified down to the last detail.',
    'Quality is checked on the line, not promised after it.',
    'From market requirement to production-ready program.'
  ].forEach((name) => {
    expect(screen.getByRole('heading', { name }).closest('section')).toHaveClass('reveal');
  });
});

it('includes reduced-motion and compact mobile editorial cards', () => {
  const styles = readFileSync('src/styles.css', 'utf8');
  expect(styles).toMatch(/prefers-reduced-motion:\s*reduce/);
  expect(styles).toMatch(/\.editorial-product-mosaic[\s\S]*?grid-auto-rows:\s*(?:410|420|430)px/);
  expect(styles).toMatch(/\.editorial-application-grid[\s\S]*?grid-auto-rows:\s*(?:350|360|370|380)px/);
});
```

- [ ] **Step 2: Run the focused tests and verify the new expectations fail**

Run:

```powershell
npm test -- --run src/pages/Home.test.jsx
```

Expected: the existing nine tests pass and the new motion/layout tests fail.

- [ ] **Step 3: Record the checkpoint**

Keep the failing output as the implementation baseline; do not modify unrelated tests.

### Task 2: Make Reveal progressively enhanced

**Files:**
- Modify: `src/components/Reveal.jsx`
- Test: `src/pages/Home.test.jsx`

- [ ] **Step 1: Add an enhancement state and preserve visible no-JavaScript content**

Implement `Reveal` so its base markup is visible. The component should set `data-motion="ready"` only after mounting and set `data-visible="true"` when intersecting.

```jsx
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, ...rest }) {
  const ref = useRef(null);
  const [enhanced, setEnhanced] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setEnhanced(true);
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        io.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-motion={enhanced ? 'ready' : undefined}
      data-visible={visible ? 'true' : undefined}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Replace the legacy reveal CSS contract**

Use CSS selectors that hide content only after enhancement is active:

```css
.reveal { opacity: 1; transform: none; }
@media (prefers-reduced-motion: no-preference) {
  .reveal[data-motion='ready']:not([data-visible='true']) {
    opacity: 0;
    transform: translateY(24px);
  }
  .reveal[data-motion='ready'][data-visible='true'] {
    transition: opacity 720ms cubic-bezier(.22,.65,.24,1),
      transform 720ms cubic-bezier(.22,.65,.24,1);
    transition-delay: var(--reveal-delay, 0ms);
  }
}
```

- [ ] **Step 3: Run the focused tests**

Run `npm test -- --run src/pages/Home.test.jsx`.

Expected: legacy tests pass; the section-level reveal test still fails until Task 3.

### Task 3: Apply semantic motion to homepage chapters

**Files:**
- Modify: `src/components/home/EditorialHomepageFront.jsx`
- Modify: `src/components/home/HomeCertifications.jsx`
- Modify: `src/components/home/HomepageCta.jsx`
- Modify: `src/components/home/HomeInsights.jsx`
- Modify: `src/components/home/HomeFaqInquiry.jsx`

- [ ] **Step 1: Import `Reveal` where needed**

Use `import Reveal from '../Reveal.jsx';` within files in `src/components/home/`.

- [ ] **Step 2: Replace major front-half section tags with semantic Reveal sections**

Keep the hero and proof strip immediately visible. Replace each later root section with the same semantic element and attributes:

```jsx
<Reveal as="section" className="editorial-products" aria-labelledby="editorial-products-title">
  {/* unchanged section content */}
</Reveal>
```

Apply this to brand, products, engineering, applications, customization, factory and OEM sections.

- [ ] **Step 3: Stagger product, application and process cards**

Use `Reveal` directly as the interactive or semantic element so the grid receives no extra wrapper:

```jsx
<Reveal
  as={Link}
  className="editorial-product-panel"
  delay={(index % 2) * 80}
  to={product.href}
  aria-label={`View ${product.name}`}
>
  {/* unchanged card content */}
</Reveal>
```

Use delays no greater than 160ms. Preserve every route and accessible label.

- [ ] **Step 4: Apply section-level reveals below the editorial front half**

Change the root `section` of certificates, CTA, insights, FAQ and inquiry to `Reveal as="section"`. Preserve each `data-title-align`, `aria-labelledby` and form field.

- [ ] **Step 5: Run the focused tests**

Run `npm test -- --run src/pages/Home.test.jsx`.

Expected: all homepage structure and reveal tests pass except any stylesheet contract still pending Task 4.

### Task 4: Consolidate homepage rhythm and section transitions

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Remove the duplicated early homepage rhythm override**

Delete the duplicate block beginning with `/* ---------- Homepage spacious rhythm pass (2026-08-24) ---------- */` near the top of the file. Retain and revise one authoritative final homepage block after the legacy rules.

- [ ] **Step 2: Establish one heading grid and title scale**

In the final homepage block, define:

```css
.editorial-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 440px);
  align-items: end;
  gap: clamp(56px, 7vw, 120px);
  margin-bottom: clamp(58px, 5vw, 80px);
}

.editorial-heading h2,
.editorial-engineering h2,
.editorial-factory h2,
.editorial-oem h2 {
  max-width: 760px;
  font-size: clamp(46px, 4.6vw, 74px);
  line-height: .98;
  letter-spacing: -.055em;
}
```

Reverse only the applications heading on desktop with CSS grid placement; reset to normal source order below 760px.

- [ ] **Step 3: Create the approved light/dark chapter rhythm**

Use a light application chapter and distinct warm customization chapter:

```css
.editorial-applications {
  border-top: 1px solid #d9e1e6;
  background: #edf2f5;
  color: #07152c;
}
.editorial-applications .editorial-heading h2 { color: #07152c; }
.editorial-applications .editorial-heading > p { color: #5b6a7a; }
.editorial-customization { background: #f8f6f1; }
```

Replace invisible thick same-colour borders on engineering, factory and OEM with 1px chapter separators and generous internal spacing.

- [ ] **Step 4: Harmonize section spacing and card gaps**

Use one spacing scale: 128–160px desktop, 104–120px tablet and 76–88px mobile. Keep title-to-content gaps at 58–80px desktop and 38–46px mobile.

- [ ] **Step 5: Shorten mobile cards**

In the final `@media (max-width: 760px)` block set:

```css
.editorial-product-mosaic { grid-auto-rows: 420px; }
.editorial-application-grid { grid-auto-rows: 360px; }
.editorial-panel__content > p:not(.editorial-panel__label) { display: none; }
.editorial-heading { grid-template-columns: 1fr; gap: 24px; }
```

Keep product name, label, specifications and full-card link visible.

- [ ] **Step 6: Add section and image motion**

Add a restrained hero load sequence, reveal transitions, card image scaling and arrow movement only inside `prefers-reduced-motion: no-preference`. Add a `prefers-reduced-motion: reduce` block that removes animations and transitions from homepage elements.

- [ ] **Step 7: Run the focused tests**

Run `npm test -- --run src/pages/Home.test.jsx`.

Expected: all homepage tests pass.

### Task 5: Build and visually verify desktop and mobile

**Files:**
- Verify: `src/components/home/EditorialHomepageFront.jsx`
- Verify: `src/styles.css`
- Output: `output/playwright/home-after-desktop.png`
- Output: `output/playwright/home-after-mobile.png`

- [ ] **Step 1: Run the production build**

Run:

```powershell
npm run build
```

Expected: Vite completes without errors.

- [ ] **Step 2: Run the Impeccable mechanical detector once**

Run:

```powershell
node "C:\Users\XuWanPi\.codex\skills\impeccable\scripts\detect.mjs" --json src/components/Reveal.jsx src/components/home/EditorialHomepageFront.jsx src/styles.css
```

Expected: no new high-priority design violations. Fix reported actionable issues in one batch.

- [ ] **Step 3: Capture desktop and mobile screenshots**

Use the running local page at `http://127.0.0.1:4173/`, preload lazy images by scrolling once, and capture 1440×1000 and 390×844 full-page screenshots.

- [ ] **Step 4: Perform one bounded visual defect pass**

Check title alignment, chapter separation, image crop, mobile overflow, card height, floating-button overlap and animation visibility. Fix all discovered issues in one batch.

- [ ] **Step 5: Confirm with one final test and build pass**

Run:

```powershell
npm test -- --run src/pages/Home.test.jsx
npm run build
```

Expected: all tests pass and the production build succeeds.
