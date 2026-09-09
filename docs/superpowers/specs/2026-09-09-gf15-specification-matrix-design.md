# GF15 Specification Matrix Design

## Goal

Make the complete GF15 specification immediately scannable without asking buyers to open individual accordions. Preserve the existing FAHINT product-page visual language and the current product data.

## Scope

- Apply the new presentation to GF15 only as a trial.
- Keep the five-item key-specification summary at the top.
- Do not change specification values, section order, other product pages, or shared site navigation.

## Layout

Below the key-specification summary, render every specification group as an always-visible panel:

- Desktop: a two-column grid of group panels; a final unmatched panel may span the full row.
- Mobile: one stacked column.
- Each panel contains its sequence number, group title, detail count, and all label/value rows.
- Use restrained borders and alternating row surfaces for scanability rather than heavy card shadows.
- Remove the per-group plus/minus controls and the global expand/collapse control on GF15.

## Content and Semantics

- Retain the existing five groups and their current order.
- Use section headings for group names and description lists for label/value pairs.
- All specification values must be present in the initial DOM so buyers and assistive technology can read them without interaction.

## Implementation Boundary

Add an explicit always-visible display mode to the existing `ProductSpecifications` component and enable it only when `product.sku === 'GF15'`. Reuse the current specification selectors and data model; do not duplicate or reshape product data.

## Verification

- Confirm GF15 has no expand/collapse buttons and every group row is visible.
- Confirm the five-item key summary remains unchanged.
- Confirm another product, such as GT20, keeps the existing accordion behavior.
- Confirm the grid collapses to one column at the existing mobile breakpoint.
