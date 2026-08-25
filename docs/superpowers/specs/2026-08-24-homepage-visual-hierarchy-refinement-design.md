# Homepage Visual Hierarchy Refinement Design

## Objective

Refine the existing Fahint homepage without removing its approved content structure. The page should feel like one authored brand system rather than a sequence of independently styled campaign blocks.

## Approved direction

- Keep the full-screen lifestyle hero and all current content modules.
- Keep the five approved product families.
- Keep WhatsApp, email and back-to-top as three separate floating controls.
- Keep Blog, FAQ and the full inquiry form at the bottom.
- Do not add the inquiry backend or replace factory photography in this visual refinement round.

## Layout system

- Use the existing 1200px container as the common desktop frame.
- Use two repeatable title rails on a twelve-column mental grid: left-aligned sections occupy the left seven columns; right-positioned sections occupy the right seven columns.
- Text remains left-aligned inside both rails. Alternation comes from the position of the title/media composition, not from right-aligned paragraphs.
- Section descriptions are capped to readable line lengths and share one spacing rhythm.

## Type hierarchy

- Hero remains the only largest display heading.
- The OEM image poster is the only secondary display moment.
- Normal section titles use a smaller 44–52px desktop scale and a 32–38px mobile scale.
- Headings use less aggressive negative tracking and a two-line target.
- Kicker labels become quieter and are separated from headings with a consistent 14–16px gap.

## Section rhythm

- Standard editorial sections use a shared desktop vertical rhythm around 104–112px and mobile rhythm around 68–76px.
- Dark capability, proof, buyer, certification, insight and FAQ sections align their headers to the same rails.
- Existing content remains, but excessive empty gaps and oversized header margins are reduced.
- Adjacent sections transition through controlled background changes and borders instead of unrelated spacing values.

## Floating controls

- Keep all three controls separate.
- Desktop retains the vertical rail and slide-out labels.
- Mobile uses a compact vertical stack at the lower-right so controls do not consume a horizontal strip or cover primary form fields.
- Contact controls stay visible; back-to-top continues to appear only after scroll depth.
- Each target is at least 46px with safe-area-aware bottom spacing.

## Accessibility and interaction

- Improve cyan/white contrast in primary actions and text links.
- Add a stronger focus-visible outline.
- Extend reduced-motion handling to the shared reveal class.
- Preserve all current tabs, FAQ and inquiry behavior.

## Acceptance criteria

- Desktop section titles alternate left/right positions while remaining internally left-aligned.
- Title widths, kicker gaps, description widths and section spacing are consistent.
- Mobile titles return to one stable left axis.
- Three separate floating controls remain and do not form a horizontal mobile bar.
- No horizontal overflow at 1440px, 768px or 390px.
- Homepage tests and production build pass.

## Self-review

- No content module is removed.
- The five-family product contract and bottom Blog/FAQ/form order remain unchanged.
- The design does not depend on new imagery or backend work.
- The workspace has no Git metadata, so no design-doc commit is possible.

