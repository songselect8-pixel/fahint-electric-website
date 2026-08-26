# Product Pages Visual Refinement Design

## Status

Approved in conversation on 2026-08-26.

This document refines the product overview, GFCI series and GFCI detail-page visuals defined in `2026-08-25-gfci-product-experience-design.md`. The earlier information architecture and verified-data rules remain in force.

## Objective

Resolve the visible cropping, spacing, colour and repeated-image problems across the product experience while preserving the brand-led and OEM/ODM positioning.

The final result should feel like one restrained industrial design system:

- exact Fahint products rather than AI-redrawn substitutes;
- square product stages with subtly rounded corners;
- deep navy, white, cool grey and Fahint cyan as the main palette;
- clear transitions between brand, technical and OEM sections;
- distinct marketing imagery for the homepage and product pages.

## Non-Negotiable Product Accuracy

Product bodies, receptacle openings, buttons, markings, terminals and mounting straps must come from verified local product assets. AI image generation may create backgrounds, lighting and surrounding scenes, but it must not redraw or reinterpret product geometry.

Technical views, finish variants, wiring images, dimensions and certification evidence must remain authentic source material.

Factory, laboratory and certificate imagery must remain real evidence. It must not be replaced by invented AI factory or certification scenes merely to avoid repetition.

## Shape and Corner System

`Square` describes the image ratio, not sharp corners.

- Product image stages use a true `1 / 1` aspect ratio.
- Large editorial media uses approximately 18–22px corner radii.
- Product cards and comparison modules use approximately 14–16px corner radii.
- Thumbnails, filter controls and small media tiles use approximately 8–10px corner radii.
- Buttons may remain pill-shaped where already established.
- Section backgrounds remain mostly rectangular; only contained panels receive visible rounding.
- The system must avoid excessively soft, toy-like or fully pill-shaped cards.

## Product Overview Page

### Hero

- Replace the visually empty product hero treatment with a clearer product-family composition.
- Keep a concise two-line brand statement and one short supporting paragraph.
- Use a dedicated product-overview visual rather than a homepage hero asset.
- The visible products must be sourced from real product imagery.

### Product Family Entries

- Preserve the five-family structure: GFCI, USB and Type-C, receptacles, smart controls, and switches/dimmers.
- Every family entry remains one complete clickable link.
- Replace homepage-reused category scenes with product-page-specific scenes.
- Generate a distinct background for each family, then layer the correct verified product imagery over it.
- Maintain consistent image ratios, text placement, contrast and rounded outer corners.
- Do not reuse the homepage family mosaic images.

### Brand and OEM/ODM Section

- Replace the repeated sample-room photograph with a dedicated brand-program scene.
- The scene should communicate product sampling, finish chips, packaging direction and range review.
- Avoid fake readable logos, certifications or technical documents in generated imagery.
- Use a cool neutral or dark studio treatment that connects naturally to the surrounding navy and light-grey sections.

### Market and Factory Sections

- Product-market imagery should be unique to the product overview where practical.
- Real factory proof may be reused because it is evidence, but the crop, layout and accompanying proof content should differ from the homepage.
- Reduce large empty header bands and align every heading and supporting paragraph to the shared page grid.

## GFCI Series Page

### Hero

- Add a dedicated GFCI family visual so the hero is not an empty navy field.
- Use a verified GFCI product lineup or engineering-bench composition.
- Keep the title and introduction concise and aligned with the catalogue container below.

### Search and Filters

- Keep search, amperage, variant and application controls in one compact contained panel.
- Use consistent control heights, labels and spacing.
- At mobile widths the controls collapse into an accessible filter layout.

### Product Grid

- Use a wider shared content container to prevent excessive right-side whitespace.
- Desktop uses four columns when space permits; smaller widths step down predictably.
- Each product image stage is square with a cool white or very light blue-grey background.
- The complete product, including mounting strap and plate where present, must remain visible.
- Use `object-fit: contain` with controlled internal padding; do not crop to fill the frame.
- Place a meaningful badge above the product image at the top-left:
  - `STANDARD`;
  - `TR`;
  - `TR + WR`;
  - `BLANK FACE`.
- Remove the current empty decorative blue corner.
- Product names may wrap, but cards maintain consistent title and action alignment.
- Entire cards are clickable and keyboard reachable.

### Comparison Section

- Replace the visually flat, sparse table treatment with a compact comparison panel.
- Use a strong header row, restrained row dividers and variant/application tags.
- Keep the content width aligned with the catalogue grid.
- Improve scanning without turning the comparison into a dense spreadsheet.

### Engineering, Application and OEM Sections

- Connect these sections through alternating cool light-grey and navy backgrounds.
- Replace the homepage kitchen scene with a GFCI-specific, product-accurate application scene.
- Strengthen the OEM section into a complete contained band rather than a detached text fragment.

## GFCI Product Detail Page

### Product Hero and Gallery

- Remove the beige image-stage background.
- Use white and cool light grey so product finishes remain colour-accurate.
- Main image stage remains square with approximately 18px rounded corners.
- Preserve the full product silhouette at every gallery position.
- Thumbnails are square, consistently sized and use approximately 8px corners.
- The selected thumbnail uses a clear Fahint cyan outline without changing the image background.
- The information panel remains vertically balanced with the gallery at a full-screen desktop viewport.

### Product Configuration

- Replace the beige section with a cool light-grey or pale blue-grey section.
- Keep six finish cards in a consistent square grid.
- Use real finish photographs and preserve their colour values.
- Add a controlled navy/cyan transition or divider so the section no longer clashes with adjacent dark sections.
- Keep the configuration action aligned with the finish grid rather than floating independently.

### Specifications and Supporting Content

- Use the full shared content width to eliminate large unused areas.
- Present technical specifications as a balanced two-column specification grid or wider grouped table.
- Maintain clear distinctions between ratings, physical dimensions, certifications and wiring information.
- Avoid adding invented commercial or certification claims.

### Related Products

- Use square image stages with complete, uncropped products.
- Apply the same model badges, card radius, metadata spacing and clickable-card behaviour as the GFCI series grid.
- Keep four related products aligned on desktop and step down responsively.

## Colour System

- Deep navy: brand, engineering and OEM anchors.
- White: product accuracy and clean technical presentation.
- Cool light grey / pale blue-grey: section separation and product stages.
- Fahint cyan: selected states, labels, actions and links.
- Warm beige is removed from product galleries and configuration modules.
- Warm tones may appear only inside lifestyle photography, not as large interface backgrounds.

## New Image Set

Create six product-page-specific editorial backgrounds:

1. GFCI family scene.
2. USB and Type-C charging scene.
3. Receptacle platform scene.
4. Smart-control scene.
5. Switches and dimmers scene.
6. Brand/OEM program-development scene.

The five product-family scenes should form one visual family while remaining compositionally distinct. They must not duplicate the homepage crops or scenes.

Implementation method:

1. Generate the environment/background at the required landscape ratio.
2. Inspect it for visual artifacts and unsuitable fake text.
3. Layer verified Fahint product imagery over the generated background.
4. Confirm that no product opening, switch, terminal, label or mounting feature has been altered.
5. Export optimized web assets and keep the verified source mapping documented.

## Responsive and Full-Screen Review

Primary design review is performed at a real 1920x1080 viewport, not a narrowed browser window or only a stitched long screenshot.

Also verify:

- 1440x900;
- 1366x768;
- 1024px tablet;
- 768px;
- 390px mobile;
- 375px mobile.

Acceptance checks include:

- no cropped products;
- no horizontal overflow;
- no excessive right-side whitespace;
- no awkward heading wrapping;
- no large unexplained vertical gaps;
- consistent rounded corners and content gutters;
- correct image loading locally and under the GitHub Pages base path.

## Motion

- Retain restrained section reveals and card hover motion.
- New product cards may use a 2–3% product-image scale and small arrow translation on hover.
- Rounded clipping must prevent animated images from escaping their media stage.
- Reduced-motion preferences disable non-essential movement.

## Acceptance Criteria

The refinement is complete when:

- all GFCI listing and related-product images are square, complete and uncropped;
- correct Standard/TR/TR+WR/Blank Face badges replace decorative corner marks;
- product detail galleries and configuration sections no longer use beige UI backgrounds;
- product overview family and OEM imagery is distinct from homepage marketing imagery;
- exact product geometry comes from verified local assets;
- comparison, specification and OEM modules use the shared alignment grid;
- cards have restrained rounded corners and consistent interaction states;
- desktop and mobile visual checks pass;
- automated tests and production build pass;
- final UI detector reports no unresolved high-confidence issues in changed targets.
