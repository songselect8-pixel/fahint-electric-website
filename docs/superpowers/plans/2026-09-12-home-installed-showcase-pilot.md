# Homepage installed-product showcase pilot

**Approved direction:** Follow the reference's upper three-column composition: large installation photographs above real model names, facts and links, on a subdued full-width residential scene with a navy reading overlay.

**Pilot scope:** One background and three installation images (GF15 kitchen, FTR15QC-DC65W desk, DM2010 living room). Introduce a default Featured installations tab; preserve the seven existing family tabs and their two-model selections. Other photographs remain original until this direction is approved for the rest. Preserve the hero and the completed second chapter transition.

**Asset/semantic boundary:** Generate photography only with the built-in image tool using the supplied product references. Keep navigation, headings, specifications, inquiry links and the illustrative-image disclaimer in HTML. Keep contrast overlays, image proportions and responsive layout in CSS. Exact prompts and provenance live in `docs/product-data/home-installation-showcase-assets.json`.

## Implementation

- [x] Generate one background and three product scenes; inspect product geometry and composition. Request a targeted USB cable correction without changing the product.
- [x] Add regressions for the three-model pilot, decorative background, portrait-to-landscape image handling and all existing family/keyboard/model-link behavior. Confirm RED before implementation.
- [x] Add the homepage-only image mapping and featured tab; use three columns with image-above-copy, two columns for existing family selections, and a single column on phones.
- [x] Compress the selected generated originals to versioned WebP assets, preserve original PNG files and record exact prompts, dimensions and visual QA.
- [x] Integrate the subdued background behind the collection with a non-interactive navy overlay and legible light text. Do not change issue 2.
- [x] Run focused tests, the full suite, build, prompt provenance scan and scoped source checks. Leave browser appearance review to the user; no preview restart, agents, staging or commit.

## Verification

- RED: six expected new-behavior/style failures; 31 existing focused tests passed before implementation.
- GREEN: all 660 tests across 30 files passed. After the final contrast adjustment, all 37 focused tests and the production build passed again.
- Four final WebP files total 582,886 bytes. Background is 1672 × 941; each model scene is 1536 × 1024. All photographs are lazy-loaded; the three installation images keep their full 3:2 composition. Other products retain contained source images.
- Prompt provenance scan: four rasters, zero missing records. Exact initial and USB-revision prompts, source reference paths, selected generated originals and final output paths are archived in the asset manifest.
- Conservative contrast across every background pixel at the minimum 74% navy overlay: primary text 7.15:1, muted text 4.78:1 and links/focus 4.67:1. Earlier 68% overlay was rejected after this calculation; foreground product photographs are unaffected by the overlay.
- Source design detector returned no findings. Scoped whitespace check passed, apart from existing LF/CRLF conversion notices.
- Existing hero, category/model data and second transition were preserved. No browser audit, preview restart, agent work, staging or commit was performed. User visual review is the next step before extending scene production.
