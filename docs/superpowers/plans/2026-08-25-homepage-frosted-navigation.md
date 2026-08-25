# Homepage Frosted Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the synthetic Fahint header branding with the official archived logo and turn the global header into a compact, centered frosted-glass navigation that remains stable across homepage, scrolled, inner-page and mobile states.

**Architecture:** Keep the existing `Header` component, route structure, product dropdown and mobile menu. Add one local brand asset, simplify the logo markup to an image, and move all visual state treatment onto the rounded `.header__inner` surface so the outer fixed header never becomes a full-width white strip.

**Tech Stack:** React 18, React Router 6, CSS, Vitest, Testing Library, Playwright CLI, Vite.

---

### Task 1: Lock the official-logo contract with a failing component test

**Files:**
- Create: `src/components/Header.test.jsx`
- Modify: `src/components/Header.jsx`
- Create: `public/assets/images/brand/fahint-logo-navy.png`

- [ ] **Step 1: Write the failing test**

Create `src/components/Header.test.jsx` with a `MemoryRouter` render and these assertions:

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from './Header.jsx';

function renderHeader(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
    </MemoryRouter>
  );
}

describe('Header', () => {
  it('uses the official archived Fahint logo without the synthetic mark', () => {
    renderHeader();

    const logo = screen.getByRole('img', { name: 'Fahint' });
    expect(logo).toHaveAttribute('src', '/assets/images/brand/fahint-logo-navy.png');
    expect(document.querySelector('.logo__mark')).not.toBeInTheDocument();
    expect(document.querySelector('.logo__text')).not.toBeInTheDocument();
  });

  it('keeps the existing navigation and inquiry action', () => {
    renderHeader();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Send Inquiry/i })).toHaveAttribute('href', '/contact');
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npm test -- src/components/Header.test.jsx
```

Expected: FAIL because the current header has no `img` named `Fahint` and still renders `.logo__mark` and `.logo__text`.

- [ ] **Step 3: Add the official asset**

Copy the archived navy transparent logo from:

```text
D:\国际站运营平台\方特插座\网站资料\fahint-old-github-pages\site\template\default\public\common\images\logo2.png
```

to:

```text
public/assets/images/brand/fahint-logo-navy.png
```

- [ ] **Step 4: Replace the synthetic logo markup**

Replace the contents of the existing `.logo` link in `src/components/Header.jsx` with:

```jsx
<img
  className="logo__image"
  src="/assets/images/brand/fahint-logo-navy.png"
  alt="Fahint"
  width="204"
  height="34"
/>
```

- [ ] **Step 5: Run the test and verify GREEN**

Run:

```powershell
npm test -- src/components/Header.test.jsx
```

Expected: 2 tests pass.

### Task 2: Lock the frosted surface and compact spacing with failing CSS tests

**Files:**
- Modify: `src/components/Header.test.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add failing CSS contract tests**

Append tests that read `src/styles.css` and assert:

```jsx
import { readFileSync } from 'node:fs';

it('uses a rounded frosted inner surface instead of a full-width solid header', () => {
  const styles = readFileSync('src/styles.css', 'utf8');

  expect(styles).toMatch(/\.header__inner\s*\{[\s\S]*?border-radius:\s*24px;[\s\S]*?backdrop-filter:\s*blur\(22px\)\s+saturate\(145%\)/);
  expect(styles).toMatch(/\.header--solid\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none/);
});

it('uses explicit compact desktop gaps instead of auto-pushing the menu', () => {
  const styles = readFileSync('src/styles.css', 'utf8');

  expect(styles).toMatch(/\.header__inner\s*\{[\s\S]*?grid-template-columns:\s*200px\s+max-content\s+190px;[\s\S]*?column-gap:\s*48px/);
  expect(styles).not.toMatch(/\.nav\s*\{[\s\S]*?margin-left:\s*auto/);
  expect(styles).toMatch(/\.logo__image\s*\{[\s\S]*?width:\s*170px/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npm test -- src/components/Header.test.jsx
```

Expected: FAIL because the current header is full-width, has no frosted inner surface contract, uses flex and auto-pushes the nav.

- [ ] **Step 3: Implement the desktop frosted navigation**

In `src/styles.css`:

- Keep `.header` fixed but make it a transparent positioning wrapper.
- Set `.header__inner` to a centered grid with `grid-template-columns: 200px max-content 190px`, `column-gap: 48px`, maximum width `1480px`, 24px radius, a translucent light background, `blur(22px) saturate(145%)`, a subtle bright border and soft navy shadow.
- Give `.logo__image` a width of 170px and automatic height.
- Remove the obsolete `.logo__mark`, `.logo__text`, `.logo__name`, `.logo__sub` and transparent text-color rules.
- Remove `margin-left: auto` from `.nav` and retain a 28–30px internal link gap.
- Make both `.header--transparent` and `.header--solid` leave the outer wrapper transparent; raise only the inner surface opacity and shadow after scroll.
- Keep the existing blue active underline and CTA.

- [ ] **Step 4: Add intermediate and mobile layout rules**

Add responsive rules so:

```css
@media (max-width: 1180px) {
  .header__inner {
    grid-template-columns: auto max-content auto;
    column-gap: 24px;
  }

  .nav {
    gap: 20px;
  }
}

@media (max-width: 900px) {
  .header__inner {
    display: flex;
    width: calc(100% - 28px);
    min-height: 64px;
    padding: 0 16px;
    border-radius: 20px;
  }

  .logo__image {
    width: 142px;
  }

  .mobile-menu {
    top: calc(var(--header-h) + 8px);
    left: 14px;
    right: 14px;
    border-radius: 18px;
  }
}
```

- [ ] **Step 5: Run the test and verify GREEN**

Run:

```powershell
npm test -- src/components/Header.test.jsx
```

Expected: all header tests pass.

### Task 3: Verify behavior and full-screen visual geometry

**Files:**
- Verify: `src/components/Header.jsx`
- Verify: `src/styles.css`

- [ ] **Step 1: Run the complete automated test suite**

Run:

```powershell
npm test
```

Expected: all existing homepage tests and new header tests pass with zero failures.

- [ ] **Step 2: Run the production build**

Run:

```powershell
npm run build
```

Expected: Vite exits with code 0 and generates `dist/`.

- [ ] **Step 3: Verify desktop geometry at 2560 × 1440**

Use the existing local preview at `http://127.0.0.1:4173/`, resize Playwright to 2560 × 1440 and measure `.header__inner`, `.logo`, `.nav`, and `.header__cta`.

Acceptance:

- Header surface is centered and does not touch the viewport edges.
- Logo-to-nav gap is approximately 64–90px and never the previous 331px.
- Nav-to-CTA gap is approximately 36–48px.
- Official logo is crisp and keeps its aspect ratio.
- Hero title is not covered.

- [ ] **Step 4: Verify scroll and inner-page states**

At 2560 × 1440:

- Scroll past 40px and confirm the same rounded surface remains in place with only opacity/shadow changes.
- Open `/products` and confirm the near-opaque glass surface remains readable.
- Hover Products and confirm the dropdown opens below the rounded surface without clipping.

- [ ] **Step 5: Verify mobile behavior**

Resize to 390 × 844:

- Confirm the full official logo is visible.
- Confirm the burger opens the mobile menu.
- Confirm the menu remains within the viewport and the inquiry action is reachable.
- Confirm no horizontal overflow.

