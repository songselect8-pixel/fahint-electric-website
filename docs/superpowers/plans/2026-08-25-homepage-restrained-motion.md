# Homepage Restrained Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's repeated section-level fade-and-rise animation with one short hero sequence, two subtle media reveals, grouped card feedback and faster interaction transitions.

**Architecture:** Preserve the existing React content and routing. Keep `Reveal` as the progressive-enhancement primitive, but use it only on homepage media and grouped collections; render all homepage chapter roots as normal semantic sections so the page never waits for whole blocks to move into place. Express the restrained motion system in one final CSS layer and keep the existing reduced-motion path.

**Tech Stack:** React 18, React Router 6, CSS, IntersectionObserver, Vitest, Testing Library, Vite, Playwright CLI.

**Repository note:** This directory has no `.git` repository, so commit steps are replaced with focused test/build checkpoints.

---

## File map

- Modify `src/pages/Home.test.jsx`: replace the legacy section-reveal contract with restrained-motion contracts.
- Modify `src/components/home/EditorialHomepageFront.jsx`: remove chapter-level reveals, retain two media reveals and use grouped collection reveals.
- Modify `src/components/home/HomeCertifications.jsx`: render the compliance chapter immediately.
- Modify `src/components/home/HomepageCta.jsx`: render the CTA chapter immediately.
- Modify `src/components/home/HomeInsights.jsx`: render the chapter immediately and reveal its three cards as one group.
- Modify `src/components/home/HomeFaqInquiry.jsx`: render FAQ and inquiry chapters immediately.
- Modify `src/styles.css`: add media/group reveal modes, shorten the hero and interaction timings, and preserve reduced motion.

### Task 1: Protect the new motion contract with failing tests

**Files:**
- Modify: `src/pages/Home.test.jsx`

- [ ] **Step 1: Replace the old chapter reveal test**

Assert that the seven front-half chapter sections and five lower chapter sections do not use directional reveal classes, and that the brand and customization media use `reveal--media`.

```jsx
it('keeps homepage chapters stable and limits reveal motion to media and groups', () => {
  renderHome();

  [
    'A wiring-device brand built as one system.',
    'One platform. Six focused product systems.',
    'Engineering shared across every device platform.',
    'Built for the places power matters most.',
    'Your brand, specified down to the last detail.',
    'Quality is checked on the line, not promised after it.',
    'From market requirement to production-ready program.',
    'Certificates Your Compliance Team Can Verify.',
    'Build the Line Your Market Needs.',
    'Latest From Fahint.',
    'Buyer Questions, Answered.',
    'Tell Us What You Want to Build.'
  ].forEach((name) => {
    const section = screen.getByRole('heading', { name }).closest('section');
    expect(section).not.toHaveClass('reveal--from-left');
    expect(section).not.toHaveClass('reveal--from-right');
  });

  expect(screen.getByAltText('Fahint coordinated wiring-device product family').parentElement).toHaveClass('reveal--media');
  expect(screen.getByAltText('Coordinated Fahint receptacle and switch range').parentElement).toHaveClass('reveal--media');
});
```

- [ ] **Step 2: Add stylesheet timing contracts**

```jsx
it('uses one short hero sequence and restrained interaction timings', () => {
  const styles = readFileSync('src/styles.css', 'utf8');
  expect(styles).toMatch(/\.editorial-hero__image\s*\{[\s\S]*?animation:\s*editorial-hero-image-in\s+800ms/);
  expect(styles).toMatch(/\.editorial-hero__content\s*>\s*\*\s*\{[\s\S]*?animation:\s*editorial-hero-copy-in\s+520ms/);
  expect(styles).toMatch(/transform:\s*scale\(1\.016\)/);
  expect(styles).toMatch(/\.reveal--media\[data-motion='ready'\]/);
  expect(styles).toMatch(/\.reveal--group\[data-motion='ready'\]/);
});
```

- [ ] **Step 3: Run the focused tests and confirm RED**

Run `npm test -- --run src/pages/Home.test.jsx`.

Expected: failures mention the retained directional chapter classes, missing media/group modes, old 1400ms/760ms hero timings and missing `scale(1.016)`.

### Task 2: Remove whole-chapter and nested card reveals

**Files:**
- Modify: `src/components/home/EditorialHomepageFront.jsx`
- Modify: `src/components/home/HomeCertifications.jsx`
- Modify: `src/components/home/HomepageCta.jsx`
- Modify: `src/components/home/HomeInsights.jsx`
- Modify: `src/components/home/HomeFaqInquiry.jsx`

- [ ] **Step 1: Render chapter roots as ordinary sections**

Replace every homepage root `Reveal as="section"` with a semantic `<section>` preserving its class, id relationship and `data-title-align`. Remove `reveal--from-left` and `reveal--from-right` from those chapter classes.

- [ ] **Step 2: Restrict media reveals to two image containers**

Use the existing `Reveal` primitive directly as the brand and customization media containers:

```jsx
<Reveal className="editorial-brand__media reveal--media">
  <img ... />
  <span className="editorial-brand__index">One system · Five product platforms</span>
</Reveal>

<Reveal className="editorial-customization__media reveal--media">
  <img ... />
  <div className="editorial-customization__caption">...</div>
</Reveal>
```

- [ ] **Step 3: Reveal collections as groups instead of individual cards**

Use one `Reveal` as the existing product grid, application grid, process grid and insight grid. Render product links, application links, process articles and insight links directly as children without nested `Reveal` wrappers.

```jsx
<Reveal className="editorial-product-mosaic reveal--group">
  {products.map((product, index) => (
    <Link className="editorial-product-panel" key={product.name} to={product.href}>...</Link>
  ))}
</Reveal>
```

- [ ] **Step 4: Run the focused tests**

Run `npm test -- --run src/pages/Home.test.jsx`.

Expected: structure tests pass; stylesheet timing test remains red until Task 3.

### Task 3: Implement the restrained motion language

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add media and group reveal modes after the base Reveal rules**

Add rules that keep the Reveal container itself stable and animate only media or direct grouped children:

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal--media[data-motion='ready'],
  .reveal--group[data-motion='ready'] {
    opacity: 1;
    transform: none;
  }

  .reveal--media[data-motion='ready'] img {
    clip-path: inset(0 0 7% 0);
    opacity: .9;
    transform: scale(1.014);
  }

  .reveal--media[data-visible='true'] img {
    clip-path: inset(0);
    opacity: 1;
    transform: none;
    transition: clip-path 580ms cubic-bezier(.16,1,.3,1), opacity 440ms ease, transform 580ms cubic-bezier(.16,1,.3,1);
  }

  .reveal--group[data-motion='ready']:not([data-visible='true']) > * {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
  }

  .reveal--group[data-visible='true'] > * {
    opacity: 1;
    transform: none;
    transition: opacity 380ms ease, transform 420ms cubic-bezier(.16,1,.3,1);
  }

  .reveal--group[data-visible='true'] > :nth-child(2n) { transition-delay: 60ms; }
}
```

- [ ] **Step 2: Shorten the hero sequence**

Change the background entrance to `800ms` from `scale(1.02)`, change copy entrances to `520ms` from 16px, and use delays of 40ms, 85ms, 130ms and 175ms.

- [ ] **Step 3: Make hover feedback fast and restrained**

Change product/application image transitions to 300ms, hover scale to `1.016`, arrows to 180ms and 4px, and remove persistent `will-change` from card containers.

- [ ] **Step 4: Preserve reduced motion**

Include `.reveal--media img` and `.reveal--group > *` in the existing reduced-motion block so clip paths, transforms, opacity and transition delays are removed intentionally.

- [ ] **Step 5: Run the focused tests and confirm GREEN**

Run `npm test -- --run src/pages/Home.test.jsx`.

Expected: all homepage tests pass.

### Task 4: Verify behavior and visual quality

**Files:**
- Verify: all changed files
- Output: `output/playwright/home-motion-after-desktop.png`
- Output: `output/playwright/home-motion-after-mobile.png`

- [ ] **Step 1: Run the full test suite**

Run `npm test` and require zero failed tests.

- [ ] **Step 2: Run the production build**

Run `npm run build` and require exit code 0.

- [ ] **Step 3: Run the Impeccable detector once**

Run:

```powershell
node "C:\Users\XuWanPi\.codex\skills\impeccable\scripts\detect.mjs" --json --scope motion src/components/home/EditorialHomepageFront.jsx src/components/home/HomeInsights.jsx src/styles.css
```

Expected: no new actionable motion violations.

- [ ] **Step 4: Inspect desktop and mobile in a real browser**

At `2560×1440`, confirm the hero completes within 800ms, chapters do not rise as whole blocks, media reveals do not change layout, group delays stay below 140ms, the rail stays separate and no horizontal overflow occurs. Repeat at `390×844` with reduced motion emulated and confirm content remains visible and usable.

- [ ] **Step 5: Capture evidence and check the console**

Save the two screenshots under `output/playwright/`, then require zero browser console errors introduced by this change.
