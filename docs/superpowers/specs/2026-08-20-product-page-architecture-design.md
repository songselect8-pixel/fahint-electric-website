# Product Page Architecture Design

## Goal

Rework the `/products` overview page from a simple product-family card grid into a more complete catalog landing page, closer to the reference site's product architecture, while keeping Fahint's own GFCI and American-standard positioning.

## Approved Scope

- Keep image replacement for a later step.
- Rebuild the product overview page structure.
- Add a stronger product-series entry area.
- Add catalog rows grouped by product series.
- Remove the generic GFCI color/finish section from product overview and product series pages.
- Keep existing routes and existing product-line data stable.

## Page Structure

The product overview should use this order:

1. Compact dark search panel.
2. Large visual series entry grid.
3. Series-by-series catalog showcase.
4. OEM/ODM and factory sourcing banner.
5. Final inquiry CTA.

## Notes

- Do not create per-SKU pages for non-GFCI products yet.
- Non-GFCI model cards should link to their existing series pages until detailed catalog data is added.
- Search should include GFCI SKUs and product-line/model names, not only GFCI SKUs.
- Avoid presenting GFCI color images as shared colors for all product families.

