# Receptacle detail rollout

**Goal:** Apply the approved GFCI/USB parameter layout to all 30 standard receptacles, remove their section navigation, retain the 27 existing drawings and supply outlines for R15, R15Q and R20.

**Architecture:** Reuse `ProductSpecifications` in matrix mode immediately after `ProductDetailHero`. Limit the change to `receptacles` and the already-updated USB family. Add a small native SVG component for the three missing front/rear outlines; do not modify photographs, specifications or existing drawings.

**Source boundary:** R15/R15Q/R20 product-library photographs provide visible front and rear geometry. Catalogue page 15 has ratings and wiring types but no measurements. New outlines must say they are not to scale, must not carry inferred numeric dimensions, and must distinguish the R15Q rear terminals and R20 front slots. A supplied original drawing takes precedence over an outline.

**Execution:** Inline in the current user workspace, no agents, commits or browser review.

- [x] Add regression coverage in `src/pages/CatalogProductDetail.test.jsx`: all 30 receptacle specifications immediately follow the hero, use matrix mode, have no section navigation, and retain each existing drawing; unrelated families remain unchanged. Run the new tests and confirm the missing behavior fails.
- [x] Update `src/pages/CatalogProductDetail.jsx` and `src/styles/catalog.css` to share the existing matrix placement and four-cell responsive summary with receptacles, without changing their gallery.
- [x] Add three-model outline coverage: two accessible front/rear SVGs, a non-scale notice, R15Q-specific rear terminals and R20-specific slots. Implement `src/components/products/ReceptacleOutline.jsx`, reuse the existing drawing-sheet styling, and route only these missing drawings through it in `CatalogProductSections.jsx`.
- [x] Run catalogue page/data tests and the production build. Check the scoped diff and record the source limitations in the handoff. Keep all existing dimensions, image files and unrelated changes intact.

## Sources and verification

Reference photos were individually inspected under `D:/国际站运营平台/方特插座/网站资料/公司资料&产品/产品图片/04-Standard Receptacle/R系列/`:

- `R15-R15Q/R15.png`: standard duplex front and back-wire rear.
- `R15-R15Q/R15Q.png`: same standard face, different push-in rear construction.
- `R20/R20.png`: 20A T-slot face and back-wire rear.

`public/assets/documents/fahint-product-catalog.pdf`, page 15, confirms the model-specific ratings and wiring; neither this page nor the supplied model images publishes dimensions for these three models. No measurements or certifications were copied from sibling models.

Verified on 2026-09-11: the new checks first failed on all 30 old section layouts and all three absent outlines; after implementation, the full suite passed (579 tests across 30 files), `npm.cmd run build` passed, and the scoped `git diff --check` was clean. Existing 27 drawing references and all product galleries are unchanged. No browser review or preview-server restart was performed.
