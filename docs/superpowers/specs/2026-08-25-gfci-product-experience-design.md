# GFCI Product Experience Design

## Status

Approved in conversation on 2026-08-25.

This document defines the next product-page phase for Fahint Electric. It supersedes the GFCI listing and detail-page portions of `2026-08-20-product-page-architecture-design.md`. The earlier document remains relevant only where it does not conflict with this specification.

## Objective

Build a product experience that presents Fahint as both:

- a credible wiring-device brand with a coordinated product system; and
- a capable OEM/ODM manufacturing partner for professional buyers.

The intended balance is approximately 60% brand presentation and 40% OEM/ODM conversion. The pages must feel premium and editorial without hiding the technical information buyers need to qualify a product.

The first implementation phase will use the GFCI family as the complete template. Once approved in the browser, the same system can be extended to the remaining product families.

## Audience and Buyer Needs

Primary audiences:

- private-label brands;
- electrical distributors;
- contractors and project buyers;
- OEM/ODM sourcing teams;
- compliance and technical reviewers.

The experience must help these buyers answer four questions quickly:

1. Is this the right product and model for my application?
2. Are its ratings, variants and certifications suitable for my market?
3. Can Fahint configure and manufacture a coordinated product range for my brand?
4. How do I request a quote or submit a project brief?

## Information Architecture

The product system uses three page levels.

### Level 1: Product Overview

Purpose: communicate the breadth of Fahint's coordinated product platform, not list every SKU.

Page order:

1. Brand-led product hero.
2. Five product-family entries:
   - GFCI Outlets;
   - USB & Type-C Outlets;
   - Receptacles;
   - Smart Home Controls;
   - Switches & Dimmers.
3. Coordinated brand-system and OEM/ODM capability.
4. Application markets.
5. Certification and manufacturing summary.
6. Product inquiry call to action.

Every family card is one complete link. The arrow is a visual affordance, not the only clickable target.

### Level 2: GFCI Series Page

Purpose: let buyers discover, filter and compare the GFCI range.

Page order:

1. GFCI family hero with one concise positioning statement.
2. Search and quick filters.
3. Model grid.
4. Model/variant comparison.
5. GFCI engineering and certification proof.
6. Application environments.
7. OEM/ODM configuration options.
8. Inquiry call to action.

Initial filters:

- model search;
- 15A / 20A;
- Standard / TR / WR;
- residential / commercial or other verified grade.

Cards contain only the model, product type, product image and up to three verified key facts. Long technical descriptions remain on the detail page.

### Level 3: Product Detail Page

Purpose: combine premium product presentation, technical qualification and inquiry conversion.

Page order:

1. Breadcrumb and family context.
2. Product hero:
   - large gallery and thumbnails;
   - model and concise positioning;
   - verified key ratings;
   - certification summary;
   - primary `Request a Quote` action;
   - secondary datasheet and compare actions when available.
3. Three or four verified product advantages.
4. Application scene and use-case explanation.
5. Variant and configuration selector.
6. OEM/ODM configuration capability.
7. Complete technical specification table.
8. Dimensions, wiring and installation.
9. Certification and document downloads.
10. Manufacturing and quality evidence.
11. Related GFCI or complementary products.
12. Full inquiry form with the current model preselected.

## GFCI Model Scope

The archived website identifies the following GFCI range:

- GF15;
- GF20;
- GT15;
- GT20;
- GW15;
- GW20;
- GL20;
- FLB20.

Local image folders currently exist for GF15, GF20, GT15, GT20, GW15, GW20 and GL20. FLB20 remains in the review queue until a verified image set and specifications can be matched. It must not borrow another model's imagery.

The initial public range should restore only models with sufficient verified information. Models may be added later without changing page components.

## Product Data Source of Truth

Source priority, from highest to lowest:

1. Latest catalog, datasheet or installation document.
2. Local model folder and its detail-page assets.
3. Certification documents.
4. Archived Fahint website.
5. Existing new-site data.

Where two sources conflict, the newer formal document wins. If the conflict cannot be resolved, the field is withheld and added to the review queue.

The website must not invent MOQ, lead time, warranty, warehouse availability, certification numbers or performance claims. Unverified commercial terms use `Contact sales` or `Confirm by quotation`.

## Product Data Model

Each product record should support:

- stable slug and model;
- product name and family;
- amperage and voltage;
- NEMA configuration;
- Standard / TR / WR or other verified variants;
- verified application or grade;
- available finishes;
- feature summary;
- complete specifications;
- material information;
- dimensions;
- certifications and file numbers;
- main image;
- gallery images;
- finish images;
- dimensions, wiring and installation images;
- feature and application imagery;
- document downloads;
- related products;
- review status and internal source notes.

Unknown data is omitted from the interface instead of rendering empty labels.

The overview, series page, detail page, search results and related-product modules must read from the same product records. Product content must not be duplicated inside page components.

## Asset Mapping

Every asset is assigned a clear role:

- `hero`: primary product presentation;
- `gallery`: verified multi-angle product views;
- `finish`: verified colour/finish variant;
- `dimension`: dimension drawing;
- `wiring`: wiring or terminal diagram;
- `installation`: installation guidance;
- `feature`: feature explanation;
- `application`: contextual use scene;
- `packaging`: packaging or OEM presentation.

AI-generated scene imagery may supply atmosphere, but it must not be used as technical product evidence. The visible product geometry in technical contexts must come from verified Fahint assets.

## Visual Direction

The design direction is `Premium Industrial Editorial`.

### Colour

- Deep navy anchors heroes, engineering and OEM/ODM sections.
- Fahint cyan highlights actions, labels, links and selected states.
- White and cool light grey alternate for technical content.
- Restrained warm grey supports lifestyle and product-display imagery.
- Product families do not receive unrelated full-page colour themes.

### Typography

- Desktop hero headings use no more than two lines.
- Section headings use one or two lines; stacked four- or five-line headlines are prohibited.
- All page sections share one container width and alignment grid.
- Alternating left/right editorial compositions are allowed, but their edges remain on that grid.
- Body copy uses controlled line lengths and short paragraphs.
- Heading, supporting copy and content spacing use consistent tokens rather than page-specific offsets.

### Section Rhythm

Use an intentional alternation of:

1. white/light-grey information sections;
2. deep-navy brand or engineering sections;
3. full-width product/application imagery.

After two or three dense information sections, a large image or dark section should reset the visual rhythm. Dense card grids must not be followed by large unexplained blank areas.

### Product Hero

Desktop uses an approximately 55/45 gallery-to-information split. The image may use a warm-grey or dark display environment so the product reads as a designed object rather than a commodity marketplace listing.

The information panel prioritizes:

1. model and product purpose;
2. essential verified ratings;
3. certification summary;
4. request-quote action;
5. optional download and comparison actions.

The full specification table does not appear in the hero.

### Product Cards

- Approximately 60% image and 40% product information.
- Model is more prominent than marketing copy.
- No more than three concise metadata tags.
- Entire card is clickable and keyboard reachable.
- Hover uses restrained elevation, 2-3% image scale and small arrow movement.
- Avoid strong drop shadows, bright borders and decorative gradients.

## Interaction and Motion

Motion must communicate hierarchy rather than decorate every element.

- Sections may fade and rise slightly once on entry.
- Product hero imagery may use a very subtle initial scale.
- Card image and arrow motion are short and restrained.
- Numeric proof points may count up once when visible.
- Continuous bouncing, large fly-ins and simultaneous animation of many elements are prohibited.
- `prefers-reduced-motion` disables or substantially reduces non-essential effects.

Product interactions:

- complete clickable cards;
- thumbnail gallery and enlarged image view;
- verified finish selection that changes to the matching image;
- related variant switching within the same family;
- grouped specification table on desktop;
- accessible accordions on small screens;
- current model automatically included in the inquiry form.

Downloads must not be gated behind a lead form.

## Inquiry Experience

Desktop keeps a strong quote action in the product hero and may show one restrained persistent quote entry after the hero. Mobile uses one bottom quote action that does not cover content or system controls.

The full inquiry form contains:

- name;
- business email;
- company;
- country/region;
- model of interest;
- estimated quantity;
- project requirements.

Requirements:

- required fields clearly marked;
- autocomplete attributes where applicable;
- email validation;
- cause-and-recovery error messages;
- focus moved to the first invalid field;
- accessible status announcement;
- duplicate-submit protection;
- success confirmation.

The first implementation may retain the current submission mechanism, but the component must be ready for later Supabase storage and transactional email notification.

## Responsive Behaviour

Required review sizes:

- 1920x1080;
- 1440x900;
- 1366x768;
- 1024px tablet;
- 768px;
- 390px mobile;
- 375px mobile.

Desktop review must use a real full-screen viewport. Narrow desktop windows are not an acceptable substitute for spacing review.

Mobile rules:

- two-column compositions become one column;
- heading sizes and line lengths reduce without awkward stacking;
- metadata wraps without compressing controls;
- product imagery preserves the complete product subject;
- primary controls meet a minimum 44px target size;
- filters use a mobile drawer;
- specifications and documents use accessible disclosure sections.

## Performance and Failure States

- The hero image is prioritized; below-fold images lazy load.
- Assets use web-appropriate dimensions and formats.
- Missing assets render a controlled placeholder rather than a broken-image icon.
- Asset URLs must work both locally and under the GitHub Pages base path.
- Search with no results offers `Clear filters` and `Contact sales` actions.
- Failed form submission explains the failure and offers a retry path.
- Product content remains usable before non-essential animation and enhanced interactions initialize.

## Accessibility

- All actions are keyboard reachable.
- Focus states remain visible.
- Product images have useful alt text based on verified model data.
- Colour is not the only indicator of selection or status.
- Text and controls meet WCAG contrast requirements.
- Accordions expose expanded state programmatically.
- Route changes move focus to the main content region.
- Persistent controls do not obscure page content at supported sizes.

## Validation and Acceptance Criteria

The GFCI template is ready for extension only when:

- all published models and routes are correct;
- every card is fully clickable and keyboard operable;
- filters and search produce correct results;
- every displayed product image is verified against its model;
- no page has unintended horizontal scrolling;
- headings do not stack excessively or escape their grid;
- vertical spacing is consistent at required full-screen sizes;
- local and GitHub Pages builds load the same assets;
- missing-image, empty-search and form failure states are present;
- inquiry success and validation states work;
- reduced-motion behaviour works;
- production build succeeds.

## Deferred Work

- Final FLB20 publication until source data is verified.
- Full non-GFCI SKU detail pages.
- Supabase-backed product administration.
- Supabase inquiry storage and external email notification.
- Unverified commercial claims such as fixed MOQ, lead time or warranty.

