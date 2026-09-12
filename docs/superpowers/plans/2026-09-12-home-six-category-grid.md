# Homepage six-category gallery refinement

**User direction:** Replace the pilot's switchable model selector with one fixed gallery. Keep the existing first row (GFCI, USB, Dimmers), add Standard Receptacles, Smart Switches and Lighting Switches below. Omit Wallplates from this homepage section only. Show category names instead of model codes, remove explanatory copy, facts and duplicate actions, and reduce the blue/dark background overlay.

**Implementation:** Each of six photographs and its category heading forms one native link to the corresponding product-series page. A three-column desktop grid becomes two columns on tablet and one on phones. Use the existing background and first three scenes; generate only the missing three using actual product references. All category data, Wallplates elsewhere, product-detail facts, main hero and completed second transition stay unchanged.

**Visual:** Keep the photographic composition, make the backdrop more visible through a lighter neutral-charcoal mask, retain navy only at the section boundaries. Maintain readable large white category labels and protect the small chapter navigation with the stronger top fade. Scene illustration status remains in meaningful image alternatives and asset provenance, without the visible footnote the user asked to remove.

- [x] Inspect incumbent code, reference images and user screenshot; record prompts for the three additional installation photographs.
- [x] Replace obsolete tab/model regressions with fixed-six-category, native-link, minimal-copy, responsive-grid and lighter-overlay tests; confirm RED (7 expected failures, 30 passing).
- [x] Remove the tab state, model-specific copy/actions and unused selector CSS. Implement the fixed category gallery and lighter neutral background treatment.
- [x] Inspect and import the three new generated scenes as versioned WebP files; preserve original PNGs and exact prompt records.
- [x] Run focused functional tests, full regression suite, production build, provenance scan, contrast calculation and scoped source checks. No browser inspection or preview restart; user reviews appearance.

## Verification

- RED: updated collection regressions failed in the seven expected cases against the old selector (30 existing tests passing).
- GREEN: `npm test -- src/pages/StudioPages.test.jsx` — 37/37 passing; `npm test` — 660/660 passing across 30 files.
- `npm run build` — success. All three additional WebP files are 1536 × 1024, validated and present in the built output; original images were not overwritten.
- Image provenance scan — 7 rasters, 0 missing prompt records. Generated PNGs, source-product references and exact prompts preserved in `docs/product-data/home-category-showcase-assets.json` and image sidecars.
- Source detector — no findings in the scoped homepage component/style files. Scoped `git diff --check` and import-script syntax check passed (only existing Windows line-ending notices).
- Conservative brightest-pixel calculation over the existing backdrop: large white category labels ≥ 3.26:1, white focus ring ≥ 3.45:1 under the lightest 50% charcoal mask; small chapter-navigation text ≥ 7.30:1 and links ≥ 7.13:1 under the protected top fade.
- Browser inspection and preview restart intentionally not performed; final visual preference is left to the user's review.
