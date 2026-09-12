# Homepage hero alignment and transition refinement

User-requested refinement of the approved homepage, limited to two CSS issues shown in the supplied screenshots.

## Direction

- Center the full desktop hero copy group in the available space above the scene controls, bringing its visual center alongside the product. Keep its horizontal position, content, type, CTA links and carousel unchanged. Use flexible auto margins rather than a fixed positional offset; short viewports can grow naturally. Preserve the stacked mobile layout and explicitly reset its block margins.
- Replace the broad blue junction with a short neutral-charcoal fade shared by the hero bottom and the collection entrance. Cap the hero fade at 176px with a protected 104px base for readable scene controls, finish the collection's entrance fade at 160px rather than 260px, and reduce the chapter navigation/heading gap. Preserve the six-category photographs and layout, the collection's lighter middle mask and the lower transition into the house scene.
- Native reading/focus order, complete photographs, header clearance, small navigation text contrast and reduced-motion behavior remain protected. No browser inspection or preview restart; the user reviews the visual result.

## Work

- [x] Read source and screenshots; identify top-anchored copy and stacked long blue fades. Layout detector found no mechanical issues; this is a composition refinement.
- [x] Update CSS regression expectations and confirm they fail against the old styling (2 intended failures; 36 existing cases passing).
- [x] Implement scoped CSS alignment and neutral transition changes.
- [x] Run focused regressions, build, contrast and final source checks; record outcomes.

## Verification

- Focused homepage regressions: 38/38 passed. Final full suite: 661/661 passed across 30 files; production build passed.
- Desktop copy now uses equal automatic block margins within the existing min-viewport-height flex column. Scene controls retain their bottom position; mobile block margins reset to zero and the existing stacked reading order remains unchanged.
- The entrance now meets at `#181c1e`, not saturated navy. Hero fade ends at 176px and collection entrance at 160px. Chapter navigation reduced from 82px to 72px, with desktop collection top spacing reduced from 64–104px to 48–72px.
- One bounded contrast correction retained an 80%-opaque neutral floor around scene controls after the initial short linear fade was insufficient over light source photography. Conservative contrast even over pure-white imagery: carousel text 6.87:1, chapter navigation 5.71:1, chapter links 5.57:1. Existing gallery middle mask and its verified large text contrast are unchanged.
- Final layout detector returned no findings; scoped diff whitespace checks passed, with Windows line-ending notices only.
- No product imagery, six-category links, hero copy, carousel behavior, lower application scene or second transition changed. No browser audit or preview restart performed; appearance is ready for user review.
