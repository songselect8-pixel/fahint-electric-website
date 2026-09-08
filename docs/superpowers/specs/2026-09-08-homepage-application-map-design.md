# FAHINT Homepage Application Map Design

## Goal

Add a full-bleed residential application map directly below the homepage product selector. The section should help a buyer understand where selected FAHINT products belong in a real North American home while preserving the homepage's restrained editorial character.

## Chosen direction

Use a photorealistic two-storey cutaway home at blue hour, with a deep navy exterior environment and warm, visible interiors. The composition should expose a kitchen, bedroom or home office, living/dining area, and entry or hallway in one wide frame. Very subtle architectural line accents may support the technical tone, but the image must not resemble a bright e-commerce infographic.

The image fills the viewport width and uses approximately 80–90% of the visible screen height on desktop. There is no centered poster with white side gutters. A restrained dark gradient at the upper left supports the section introduction without placing the copy inside a separate card.

## Alternatives considered

1. A pure exterior glass-house photograph would feel premium but would not make room-specific placement sufficiently clear.
2. An architectural axonometric illustration would make placement clear but would weaken continuity with the homepage's photographic product and factory imagery.
3. The selected photorealistic cutaway combines spatial clarity with the existing editorial visual language.

## Content

- Eyebrow: `MADE FOR REAL SPACES`
- Heading: `Power, room by room.`
- Supporting copy: `Explore where selected FAHINT devices belong in an everyday residential project.`
- A short interaction hint may appear near the heading on desktop, but must not compete with the image.

## Product locations

Only products with a clear and defensible residential application are included. Product cards reuse existing verified catalogue photography and product data; the generated environment must not attempt to render branded device geometry.

1. **GF15 GFCI Outlet** — kitchen countertop or backsplash location, near a visible wet-area work surface.
2. **FTR15C-3100 USB Outlet** — bedroom bedside or home-office charging location.
3. **DM2010 Digital Dimmer** — living or dining room lighting-control location.
4. **DS15 Paddle Switch** — entry or hallway wall beside a doorway.

Wall plates, 0–10 V commercial dimmers, EV chargers, sensors, and other products without a clear fit in this scene are omitted.

## Interaction

- Each location is represented by a compact white hotspot with an irregular, staggered pulse. The center remains stable while two low-opacity rings change scale and opacity at uneven keyframe intervals.
- Hovering or keyboard-focusing a hotspot opens one product card. On touch devices, tapping opens it and tapping another hotspot changes the active card.
- The card contains the existing real product image, product family, model number, short application description, and a link to the corresponding product page.
- Cards choose a left- or right-facing placement class so they remain within the image on desktop.
- Mobile and small tablets place the selected product card directly below the image rather than positioning it beside a hotspot, so the product link remains easy to tap without obscuring the rooms.
- Hotspots use native buttons with accessible names, `aria-expanded`, `aria-controls`, visible focus treatment, and at least a 44 px interactive target.
- The active card remains usable while the pointer moves from its hotspot to its link.

## Visual system

- Continue the homepage variables, Source Sans 3 typography, ink navy, cool white, muted blue, and functional cyan accent.
- Do not use permanent blue labels, bright diagram connectors, glass cards, excessive rounded containers, or price language.
- Card radius, borders, link treatment, and type hierarchy should match the existing product selector.
- The image is the visual chapter; interface chrome stays secondary.

## Responsive behavior

- Desktop: full-width image, minimum height controlled with `clamp()`, four absolute hotspots, compact adaptive product cards.
- Medium desktop and large tablet (901–1100 px): preserve the complete 16:9 frame so edge locations such as the entry switch are not cropped away.
- Mobile and small tablet (900 px and below): place the introduction in normal flow above a full-width 16:9 stage; product details open below the image. The section must not create horizontal overflow.
- Desktop may use `object-fit: cover`; narrower layouts preserve the complete image so hotspot percentages continue to match their rooms.

## Motion and performance

- Use CSS-only pulse animation with different duration and negative delay values per hotspot; no timer loop or animation dependency.
- Disable pulse and card transitions under `prefers-reduced-motion: reduce`.
- Pause purely decorative pulse effects when the section is outside the viewport only if this can be done with existing browser APIs without adding a dependency; omission is acceptable because CSS animation is lightweight.
- Export the final scene as an optimized WebP in the existing `public/assets/images/editorial-home/` directory and provide explicit intrinsic dimensions.

## Component boundary

- Add a focused `StudioApplicationMap` component under `src/components/studio/`.
- Keep product definitions and hotspot coordinates local to that component because the module is homepage-specific.
- Insert the component in `HomeStudio.jsx` immediately after `StudioProductSelection` and before `BrandIntroduction`.
- Add styles to the existing `src/styles/studio.css` design system rather than introducing a dependency or a second stylesheet.

## Testing

- Add a focused homepage test that asserts the section heading, four hotspot buttons, matching product names, and product-detail links.
- Exercise opening and switching product cards through user interaction.
- Verify keyboard focus, reduced-motion CSS, responsive layout, image loading, absence of page-level overflow, and absence of browser console errors.
- Run the focused studio-page tests, the full test suite, and the production build.

## Success criteria

- The section reads as a full-screen editorial chapter, not an embedded infographic.
- Every hotspot maps to a plausible installed location and displays a real FAHINT product asset.
- Product information is discoverable by mouse, keyboard, and touch.
- The map remains legible and contained at desktop, tablet, and mobile widths.
- No existing homepage section, data, or navigation behavior regresses.
