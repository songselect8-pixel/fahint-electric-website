# Fahint Homepage Brand Structure Design

## Goal

Turn the existing long editorial homepage into a shorter B2B purchasing path that explains who Fahint is, lets buyers reach products or OEM discussions quickly, and brings verifiable manufacturing and compliance evidence forward.

## Scope

This is the first homepage phase only. It restructures existing content, copy, calls to action, and section rhythm. It does not generate new imagery, replace the inquiry transport, or invent certification claims. Existing product and factory assets remain in use until the later media phase.

## Primary audience and action

The homepage serves North American distributors, electrical-product buyers, contractors, and private-label program owners. It supports two equally visible paths:

1. Browse standard and certified product models.
2. Start an OEM/ODM project brief.

The first viewport must communicate manufacturer identity, product scope, and these two paths without requiring the visitor to interpret abstract brand language.

## Content architecture

The current homepage is reduced to eight narrative beats. A beat may contain more than one semantic region when accessibility requires distinct headings, but it should read as one visual chapter.

1. **Hero and proof** — Identify Fahint as a North American wiring-device and OEM/ODM manufacturer. Use `Browse certified models` and `Start an OEM brief` as the two primary actions. Replace broad certification language with `Selected models UL/cUL listed`.
2. **Product systems** — Keep the six linked product-family cards and their practical summaries.
3. **Why Fahint** — Merge the current brand-system and shared-engineering stories into one concise chapter about coordinated product platforms, model documentation, and program support.
4. **Manufacturing and compliance** — Place real factory/testing evidence and the existing certificate carousel next to each other in the reading order so visual proof follows the claim immediately.
5. **OEM configuration and process** — Merge customization choices and the four-step production process. Show product mix, finish, marking, packaging, files, and sample review without repeating the same program promise twice.
6. **Applications** — Keep the four application routes, after the product and manufacturing proof rather than before OEM evidence.
7. **Buyer questions** — Keep the FAQ as the final objection-handling chapter.
8. **Inquiry** — End with the project brief form and direct email, phone, and WhatsApp alternatives.

The standalone homepage CTA and the three-card insights chapter are removed from the homepage. Blog content remains available through the navigation and blog route.

## Hero content

- Eyebrow: `North American wiring devices · OEM/ODM manufacturing`
- Heading: `Wiring-device programs built for your market.`
- Supporting copy: name the five core product families and the distributor, contractor, and private-label audiences.
- Primary CTA: `Browse certified models` → `/products`
- Secondary CTA: `Start an OEM brief` → `/contact`
- Proof language must distinguish selected listed models from unqualified brand-wide certification.

## Visual direction

Preserve the incumbent navy, white, and cyan system, large editorial typography, numbered cards, glass navigation, and restrained image zoom. The redesign is a distillation, not a rebrand.

- Reduce oversized empty vertical gaps and repeated full-height scenes.
- Alternate light and dark chapters only where the change marks a real shift in topic.
- Give each chapter one heading, one short explanation, and one primary next action.
- Preserve complete mobile product imagery and the existing reduced-motion behavior.
- Do not add decorative cards, badges, gradients, or motion merely to fill space.

## Content and trust constraints

- Do not imply that UL file E504391 covers non-GFCI product families.
- Do not add numerical quality, delivery, capacity, or certification claims unless they already exist in reviewed project data.
- Keep existing certificate documents and model data intact.
- Use American English consistently on the homepage: `program`, `customization`, and `colors`.
- Keep direct contact fallbacks because the current static inquiry form still opens a mail client.

## Responsive behavior

- Desktop keeps the editorial two-column product grid.
- Mobile keeps full product subjects visible and uses a linear reading order.
- Mobile headings and specification copy must remain legible without 10px body text.
- Header and carousel controls should use at least 44×44px touch targets.
- The first mobile viewport must expose either both hero actions or the beginning of the proof strip.

## Accessibility and behavior

- Preserve one H1 and a logical H2 hierarchy.
- Keep full-card links, visible focus states, skip link, landmarks, form labels, and reduced-motion fallbacks.
- Removed homepage chapters must remain reachable through their existing routes where applicable.

## Testing

- Update `Home.test.jsx` first so it fails until the new Hero copy, dual CTA paths, merged narrative headings, and removed standalone homepage chapters are present.
- Retain tests for six product systems, image dimensions, full-card links, mobile media behavior, focus-safe motion, FAQ, and inquiry fields.
- Run the focused homepage test, then the full test suite and production build.
- Browser verification is read-only and must not generate screenshots; any Playwright cache is deleted before handoff.

## Success criteria

- A buyer can identify Fahint, reach products, or start an OEM brief from the first viewport.
- The homepage has eight clear narrative beats with no repeated engineering/OEM sales story.
- Manufacturing and certification evidence appears before the final objection-handling and inquiry chapters.
- The standalone CTA and homepage insights grid no longer interrupt the purchase path.
- Desktop and mobile remain free of page-level horizontal overflow, broken images, and console errors.
