# Homepage Certificates and CTA Centering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the visual centering of the homepage certificate carousel and OEM/ODM CTA at full-screen desktop widths while preserving their current content and alternating title rhythm.

**Architecture:** Keep the existing React markup and solve the imbalance through scoped homepage CSS. The certificate track becomes a six-column full-width grid only when all certificates fit; narrower viewports retain horizontal scrolling. The CTA becomes a symmetric two-column grid with equal padding and a centered divider, then collapses to the existing single-column mobile flow.

**Tech Stack:** React 18, Vite 5, CSS Grid/Flexbox, Vitest, Testing Library, Playwright CLI.

---

### Task 1: Lock the alignment contract with a regression test

**Files:**
- Modify: `src/pages/Home.test.jsx`
- Test: `src/pages/Home.test.jsx`

- [ ] **Step 1: Write the failing test**

Add a test that reads `src/styles.css` and requires the homepage certificate track to use six equal columns at wide desktop widths and the CTA to use equal columns:

```jsx
it('centers the certificate strip and balances the OEM CTA at wide desktop widths', () => {
  const styles = readFileSync('src/styles.css', 'utf8');

  expect(styles).toMatch(
    /@media \(min-width:\s*1500px\)[\s\S]*?\.home-certificates \.certcar__track\s*\{[\s\S]*?display:\s*grid;[\s\S]*?grid-template-columns:\s*repeat\(6,\s*minmax\(0,\s*1fr\)\)/
  );
  expect(styles).toMatch(
    /\.container\.home-cta__inner\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/
  );
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/pages/Home.test.jsx`

Expected: FAIL because the certificate track is still flex-based and the CTA still uses `1.16fr / 0.84fr`.

### Task 2: Center the certificate rail and balance the CTA

**Files:**
- Modify: `src/styles.css`
- Test: `src/pages/Home.test.jsx`

- [ ] **Step 1: Implement the desktop alignment rules**

Update the CTA base grid and symmetric padding:

```css
.container.home-cta__inner {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(72px, 7vw, 112px);
  padding: 76px clamp(28px, 3vw, 48px);
}

.home-cta[data-title-align='right'] .home-cta__action {
  padding-right: clamp(44px, 4vw, 64px);
}

.home-cta[data-title-align='right'] .home-cta__copy {
  padding-left: clamp(44px, 4vw, 64px);
}
```

Add a wide-desktop certificate grid while retaining horizontal scrolling below the breakpoint:

```css
@media (min-width: 1500px) {
  .home-certificates .certcar__track {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: clamp(18px, 1.5vw, 26px);
    overflow: visible;
  }

  .home-certificates .certcard {
    min-width: 0;
  }

  .home-certificates .certcar__nav {
    display: none;
  }
}
```

- [ ] **Step 2: Run the regression test**

Run: `npm test -- src/pages/Home.test.jsx`

Expected: PASS with all homepage tests green.

### Task 3: Verify full-screen geometry and production output

**Files:**
- Inspect: `src/styles.css`
- Inspect: `src/components/home/HomeCertifications.jsx`
- Inspect: `src/components/home/HomepageCta.jsx`

- [ ] **Step 1: Build the production bundle**

Run: `npm run build`

Expected: Vite exits with code 0.

- [ ] **Step 2: Inspect the homepage at 2560×1440**

Open `http://127.0.0.1:4173/` in the existing Playwright session with a 2560×1440 viewport. Verify:

- the six certificate card centers span the content container evenly;
- certificate heading and detail link align to the same outer container;
- the CTA divider sits on the container centerline;
- CTA left and right content blocks are vertically centered with comparable visual weight;
- the sticky header does not overlap the certificate heading;
- document width equals viewport width.

- [ ] **Step 3: Run the Impeccable detector once**

Run:

```powershell
node C:\Users\XuWanPi\.codex\skills\impeccable\scripts\detect.mjs --json src/styles.css src/components/home/HomeCertifications.jsx src/components/home/HomepageCta.jsx
```

Expected: no unexplained layout findings introduced by this change.

No commit step is included because this workspace is not a Git repository.
