# Fahint Homepage Brand + OEM Design

## Objective

Rebalance the existing homepage so it communicates a complete Fahint wiring-device brand first and a credible OEM/ODM manufacturing partner second. Preserve the approved editorial navy visual language, existing content sections and current routes.

## Approved Direction

Use an editorial industrial style with full-width photography, restrained copy, high-contrast typography and clear evidence. The upper homepage builds brand and product-system recognition. The lower homepage proves customization, manufacturing, compliance and conversion capability.

## Scope

### 1. Brand story section

- Insert after the manufacturing proof strip and before the product portfolio.
- Use an existing real Fahint product or buyer-review image, not a placeholder video.
- Include one short brand statement, one supporting paragraph and one About/Company link.
- Include a compact three-part brand principle rail: coordinated systems, verified engineering and market-ready support.

### 2. Product-system portfolio

- Preserve the six existing product cards and routes.
- Keep every card fully clickable.
- Preserve current images and short descriptions.

### 3. Multi-platform engineering section

- Replace the GFCI-only engineering message with a broader product-platform message.
- Keep GFCI visible as one proof point without making it the brand's only specialty.
- Present four shared capabilities: safety/compliance, charging, control, and coordinated form/finish.
- Link to the capabilities page rather than a GFCI-specific page.

### 4. Application solutions

- Preserve the four image-led application cards.
- Turn each application card into a full-card link to a relevant product or capability route.

### 5. OEM/ODM customization range

- Insert after applications and before factory evidence.
- Use six compact customization items: product mix, finishes, branding/markings, packaging, documentation, sampling/testing.
- Use existing product imagery and a split editorial layout so it reads as a visual section, not a generic icon grid.
- Primary CTA links to contact/inquiry.

### 6. Existing lower homepage

- Preserve factory proof, production workflow, certifications, proposal CTA, insights, FAQ, inquiry form and footer.
- Do not invent customer logos, testimonials, capacity claims, certifications, locations or service promises.

## Component Boundaries

- `EditorialHomepageFront.jsx` owns the approved front-half story and new sections.
- Product, application, engineering and customization content stays in local configuration arrays so wording and routes are easy to maintain.
- Existing lower-page components remain unchanged unless spacing continuity requires a scoped style adjustment.

## Interaction

- All product and application cards are keyboard-accessible links.
- Hover and focus states use image scale, arrow movement and visible focus outlines.
- Calls to action reuse existing site routes and button components/styles.

## Responsive Behaviour

- Desktop uses asymmetric two-column editorial layouts and full-width image grids.
- Tablet stacks text and image groups while preserving section hierarchy.
- Mobile uses a single column, complete uncut headings, readable text widths and large tap targets.

## Testing

- Add page tests for the brand-story, multi-platform engineering and customization headings.
- Add regression tests ensuring the old GFCI-only engineering heading is absent.
- Add tests confirming application cards are full-card links.
- Run the complete test suite and production build.
- Capture and inspect desktop and mobile screenshots before handoff.

## Non-goals

- No new backend, CMS, form delivery, download gating or customer-login work.
- No fabricated video, client logos or case studies.
- No redesign of navigation, footer, product detail pages or floating contact rail.
