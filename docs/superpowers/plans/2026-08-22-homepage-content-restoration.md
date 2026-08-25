# Homepage Content Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the homepage's missing brand, OEM, manufacturing, certification, blog, FAQ and inquiry content while fixing the ultra-wide editorial layout.

**Architecture:** Keep `Home.jsx` as a composition root and add focused homepage components under `src/components/home`. Reuse the existing `Faq`, `InquiryForm`, `CertCarousel`, `Reveal`, company data and post data so factual content stays centralized.

**Tech Stack:** React 18, React Router, Vitest, Testing Library, Vite, CSS.

---

### Task 1: Lock the restored homepage contract

**Files:**
- Modify: `src/pages/Home.test.jsx`

- [x] Add assertions for the private-label capabilities, manufacturing proof, buyer-fit, certification, latest insights, FAQ and full inquiry form.
- [x] Add a regression assertion that the old unbounded viewport-derived brand-story padding is absent.
- [x] Run `npm test -- src/pages/Home.test.jsx` and confirm the new assertions fail because the sections are missing.

### Task 2: Restore focused homepage content modules

**Files:**
- Create: `src/components/home/PrivateLabelCapabilities.jsx`
- Create: `src/components/home/ManufacturingProof.jsx`
- Create: `src/components/home/PartnerProfiles.jsx`
- Create: `src/components/home/HomeCertifications.jsx`
- Create: `src/components/home/HomeInsights.jsx`
- Create: `src/components/home/HomeFaqInquiry.jsx`
- Modify: `src/pages/Home.jsx`

- [x] Build each module from existing verified data and supplied imagery.
- [x] Compose the modules in the approved order without changing the five product tabs or floating rail.
- [x] Run `npm test -- src/pages/Home.test.jsx` and confirm content-contract tests pass.

### Task 3: Repair wide-screen layout and style restored modules

**Files:**
- Modify: `src/styles.css`

- [x] Replace `.home-brand-story__copy` viewport-derived padding with bounded `clamp()` padding.
- [x] Add desktop, ultra-wide, tablet and mobile styles for the restored modules.
- [x] Preserve image-led spacing and keep copy blocks concise and width-capped.
- [x] Run `npm test -- src/pages/Home.test.jsx` and confirm the CSS regression test passes.

### Task 4: Verify the complete homepage

**Files:**
- Verify only; no production edits expected.

- [x] Run `npm test` and confirm zero failures.
- [x] Run `npm run build` and confirm Vite exits successfully.
- [x] Open the page at 2560px, 1440px, 768px and 390px widths; confirm no horizontal overflow or clipped headings.
- [x] Confirm the five product tabs, FAQ accordions and form fields remain interactive.
- [x] Confirm the floating rail still contains WhatsApp, Email and Back to top actions.

## Self-review

- Spec coverage: every approved restored module, the unchanged rail, five product tabs and ultra-wide fix have a corresponding task.
- Placeholder scan: no deferred implementation steps or unspecified assets remain.
- Consistency: component names in the plan match the imports intended for `Home.jsx`; reused data sources already exist in the project.
- Repository note: this workspace is not a Git repository, so commit steps are intentionally omitted.
