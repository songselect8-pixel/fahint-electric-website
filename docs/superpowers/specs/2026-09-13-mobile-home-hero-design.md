# Mobile homepage: image-first product editorial

The user requests the homepage poster above the copy and delegates the mobile visual refinement. Execute directly under the existing design-decision authorization; do not commit, push, open a browser preview or change desktop composition.

## Direction

Use a full-width, original 3:2 installation photograph starting at the top of the mobile viewport. Overlay the transparent header and three original scene labels on the photograph, with no separate navy bands. Follow it with a flat paper-colored copy panel, navy headline and one full-width primary action. The OEM action remains a secondary text link.

This separates the product scene from its explanation, reduces the long navy text block, and keeps the product unobstructed. A navy copy panel was considered for visual continuity; the existing light paper token provides clearer hierarchy. An overlaid mobile headline was rejected because the user explicitly wants the copy below the poster.

## Scope and constraints

- Only widths up to 760px receive the new composition. Desktop type, image crop, controls, caption wording and layout remain intact.
- Reuse all three existing installation photographs. No raster edits, new assets, dependencies or timers.
- Preserve the exact scene labels: Kitchen essentials, Bedside charging, Lighting control, with their underline/progress indicator and current pause/reduced-motion behavior.
- Keep the full desktop summary. Mobile shows its first sentence, while the project/brand action captions and detailed documentation bullet are visually omitted to reduce repetition. Their accessible action-group names and all link destinations remain intact.
- Maintain a complete 3:2 mobile image, a visible 44px minimum scene-control target, and fluid heading sizes. No inter-section gradient, fixed text height, viewport-height clipping or new animation.
- Preserve unrelated pending mobile catalogue changes and legacy homepage versions.

## User refinement: transparent poster controls and restored contacts

The user rejected the separate navy header gap and scene-control strip. Share one mobile grid cell between the complete image and its bottom-aligned controls; remove the hero's reserved header padding. Keep the closed homepage menu button transparent while over the poster, with a small icon/text shadow for contrast instead of a colored bar. Retain the existing solid header when scrolled or the menu is open.

Remove both obsolete Studio-page rules that hide the shared floating rail. Reuse the existing navy WhatsApp and email controls and scroll-triggered Back to top action, including safe-area placement and reduced-motion support. Do not add a duplicate homepage rail or change other page variants.

## Verification

Update the existing StudioPages tests for mobile image/control grid overlap, paper-panel contrast, compact actions, complete image geometry and unchanged scene labels. Add a regression check for the obsolete rail-hiding rules and retain contact/scroll interaction tests. Verify existing rotation, pause, reduced-motion and navigation tests. Run the full suite, production build and diff checks. The user reviews the actual mobile visual result locally.
