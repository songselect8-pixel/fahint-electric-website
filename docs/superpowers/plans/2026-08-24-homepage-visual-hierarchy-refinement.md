# Homepage Visual Hierarchy Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the Fahint homepage title grid, typography, vertical rhythm and mobile floating controls without removing approved content.

**Architecture:** Keep `Home.jsx` and the focused homepage components unchanged as the content composition layer. Implement the refinement through a small number of shared CSS rules and regression assertions in the existing homepage test, replacing the current right-text-alignment rules with positional title rails.

**Tech Stack:** React 18, Vite, CSS, Vitest, Testing Library, Playwright browser verification.

---

### Task 1: Lock the visual-layout contract

**Files:**
- Modify: `src/pages/Home.test.jsx`

- [ ] Add a CSS regression assertion that right-positioned title blocks remain `text-align: left` on desktop.
- [ ] Add assertions for shared section-spacing and heading-scale custom properties.
- [ ] Add an assertion that the mobile rail uses a vertical stack and a minimum 46px target.
- [ ] Run `npm test -- src/pages/Home.test.jsx` and confirm failure against the existing CSS.

### Task 2: Introduce the shared homepage rhythm

**Files:**
- Modify: `src/styles.css`

- [ ] Add homepage custom properties for section spacing, title width, heading size, copy width and rail gap.
- [ ] Apply one normal H2 scale and reduced tracking across product, capability, story, flow, proof, partner, certificate, insight, FAQ and inquiry sections.
- [ ] Reduce repeated kicker and description margins to the approved rhythm.
- [ ] Run `npm test -- src/pages/Home.test.jsx` and confirm the new rhythm assertions pass.

### Task 3: Replace alignment with positional title rails

**Files:**
- Modify: `src/styles.css`

- [ ] Keep right-designated blocks on the right side of the shared container while setting their text to left alignment.
- [ ] Keep split-section media reversal, but left-align story, process, CTA and FAQ copy inside their assigned columns.
- [ ] Reset every title to the common left axis below 1081px.
- [ ] Run `npm test -- src/pages/Home.test.jsx` and confirm the desktop/right-rail contract passes.

### Task 4: Refine section transitions and floating controls

**Files:**
- Modify: `src/styles.css`

- [ ] Normalize major section padding and header-to-content gaps.
- [ ] Add subtle borders/tonal transitions where two pale sections meet.
- [ ] Keep the desktop rail unchanged and make the mobile rail a vertical three-button stack with at least 46px targets and safe-area-aware positioning.
- [ ] Extend `prefers-reduced-motion` to `.reveal` and improve `:focus-visible` contrast.
- [ ] Run `npm test -- src/pages/Home.test.jsx`.

### Task 5: Verify the complete homepage

**Files:**
- Verify only.

- [ ] Run `npm test` and confirm zero failures.
- [ ] Run `npm run build` and confirm Vite exits successfully.
- [ ] Inspect 1440px, 768px and 390px widths for title alignment, spacing, overflow and floating-control overlap.
- [ ] Confirm product tabs, FAQ, inquiry fields and all three floating actions remain usable.

## Self-review

- Every approved constraint maps to a test or browser check.
- No backend, product data or image replacement is included.
- No placeholder steps remain.
- The workspace is not a Git repository, so commit steps are intentionally omitted.
