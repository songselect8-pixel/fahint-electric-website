# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users and purpose

FAHINT serves buyers specifying wiring devices for the North American market, including distributors, project buyers and private-label brands. The website introduces the FAHINT brand, supports model selection and collects product and OEM/ODM inquiries.

## Confirmed commitments

- Retain the FAHINT logo, navy/blue identity and consistency with the existing product pages.
- Support both FAHINT-branded products and OEM/ODM programs.
- Product geometry, photographs, specifications and certification scope must be model-specific and accurate.
- Keep previous homepage and product-overview versions available locally. New previews are not authorization to commit or push.
- The user delegates visual decisions and requests implementation without design-document approval rounds.

## Evidence and constraints

Product records and original asset references live in `src/data/products.js`, `src/data/catalogProducts.js` and `src/data/catalog/`. Existing company photographs, product photographs, scene imagery and certification documents live under `public/assets/`. Product sourcing scripts retain reference paths. Use these assets without inventing new product forms.

Do not invent clients, partnerships, certifications, performance figures, production capacity, delivery times or minimum order quantities. Certificates cover listed models, not the entire range. Confirm commercial terms per inquiry.

## Working context

React/Vite website deployed to GitHub Pages. Seven product categories have working category and model routes. Preserve those routes and their data. Keep mobile images complete, controls keyboard-accessible and visible text readable over photographs.
