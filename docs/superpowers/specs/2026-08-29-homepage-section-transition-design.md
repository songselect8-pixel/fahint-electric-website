# Homepage Section Transition Design

## Objective

Make the homepage feel like one continuous industrial product story instead of a stack of unrelated full-width blocks. The current white proof strip between the dark hero and dark product portfolio is the primary disruption. The second abrupt transition is where the dark product portfolio ends and the light "Why Fahint" section begins.

## Approved Direction

Use a restrained dark, translucent trust rail that visually belongs to the hero and bridges into the product portfolio. Preserve the existing information and product cards; this is a transition and hierarchy refinement, not a homepage content rewrite.

## Hero-to-Portfolio Transition

- Replace the pure-white, full-width proof strip with a deep navy translucent panel.
- Let the panel overlap the bottom of the hero and the beginning of the portfolio by a small amount so it reads as a bridge, not a separate section.
- Use a subtle border, low-contrast glass highlight, and soft shadow. Avoid strong blur, decorative waves, or conspicuous gradients.
- Keep the four proof points in one row on desktop. Emphasize the values in white and use muted blue-grey for explanatory labels.
- Use thin, low-contrast dividers between items rather than four boxed cells.
- On mobile, use a compact two-by-two grid with the same dark treatment and enough vertical padding for touch-safe spacing.

## Portfolio-to-Light-Content Transition

- Keep the product portfolio dark.
- Replace the hard navy-to-light cut with a short tonal bridge: navy transitions through desaturated blue-grey into the existing light background.
- Use spacing and background color rather than decorative shapes. The transition should remain professional and suitable for an electrical manufacturer.
- Pull the next section heading slightly closer to the transition so the reader understands that a new chapter is beginning without encountering a large empty band.

## Component and CSS Scope

- Preserve the current React content and data structure in `EditorialHomepageFront.jsx` unless a small wrapper or class name is required for the overlap.
- Contain the visual work in the existing homepage CSS rules where possible.
- Do not add JavaScript animation, third-party dependencies, generated images, or temporary visual assets.
- Do not change product links, proof values, navigation behavior, or downstream homepage content.

## Responsive and Accessibility Requirements

- No horizontal overflow from the overlapping rail at 320 px and wider.
- Text and dividers must retain readable contrast against the translucent panel.
- The rail must not cover hero buttons, product headings, or sticky navigation.
- Respect reduced-motion preferences; the design does not require motion.

## Verification

- Run the existing test suite and production build.
- Check the homepage at representative mobile, tablet, and desktop widths.
- Confirm the proof rail remains legible, the overlap does not clip, and both transitions read continuously.
- Do not generate or retain test screenshots; visual verification is performed in the existing local preview.

