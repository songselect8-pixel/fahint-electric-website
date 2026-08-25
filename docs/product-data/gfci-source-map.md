# GFCI Source Map

## Publication status

| Model | Archived page | Local image folder | Public status | Notes |
|---|---|---|---|---|
| GF15 | `?pro1/151.html` | `01-GFCI Outlet/GF15` | Publish | Product and finish assets present |
| GF20 | `?pro1/167.html` | `01-GFCI Outlet/GF20` | Publish | Product and finish assets present |
| GT15 | `?pro1/168.html` | `01-GFCI Outlet/GT15` | Publish | Product and finish assets present |
| GT20 | `?pro1/169.html` | `01-GFCI Outlet/GT20` | Publish | Product and finish assets present |
| GW15 | `?pro1/170.html` | `01-GFCI Outlet/GW15` | Publish | Product and finish assets present |
| GW20 | `?pro1/171.html` | `01-GFCI Outlet/GW20` | Publish | Product and finish assets present |
| GL20 | `?pro1/172.html` | `01-GFCI Outlet/GL20` | Publish | Product and finish assets present; certification requires separate review |
| FLB20 | `?pro1/242.html` | No verified folder | Hold | Do not borrow another model image; specifications and certification are incomplete |

## Source priority and provenance

The audit used, in priority order:

1. The rendered pages in `产品证书/E504391-GFCI (1).pdf`, generated from the GFCI certificate.
2. Each model's folder under `产品图片/01-GFCI Outlet/<MODEL>`.
3. The archived model page listed above, from `fahint.com-archive-2026-08-23.zip`.
4. The existing new-site data only as a final cross-check.

| Public field | Verified source | Result |
|---|---|---|
| Rating and NEMA | Each model's archived page | GF15/GT15/GW15: `15A, 125V`, `5-15R`; GF20/GT20/GW20: `20A, 125V`, `5-20R`; GL20: `20A, 125V`, blank face |
| Variant | Archived page product description and specification; E504391 addendum for TR/WR designations | GF15/GF20 standard; GT15/GT20 TR; GW15/GW20 TR & WR; GL20 blank face |
| Grade/application | Each model's archived `Grade` field | All seven published models use the archived `Residential & Commercial Grade` value. No outdoor or damp-location installation claim is published. |
| WR classification | E504391 addendum and the GW archived model pages | `wr` is an internal product-classification filter for GW15/GW20. It indicates the verified Weather Resistant variant only and is not installation approval. |
| Dimensions | Each model's own `14.png` | All seven published models visibly show `4.53 in (115 mm)` face height, `2.75 in (70 mm)` plate width and `1.56 in (39.7 mm)` depth in their own model artwork. |
| Certification | E504391 rendered certificate pages and model addenda | GF15, GF20, GT15, GT20, GW15 and GW20 are named in the US and Canada addenda under report reference `E504391-20210212`. GL20 is not named in those addenda, so no E504391 claim is included in its public feature data. |

## Asset-role map

Every published asset is sourced from the same model folder; no cross-model fallback is allowed.

| Public role | Model-folder source | Web asset role |
|---|---|---|
| Card / plate | `2.png` | `<model>-plate.webp` |
| Hero / main | `1.png` | `<model>-main.webp` |
| Gallery sides | `4.png` | `<model>-sides.webp` |
| Gallery back | `7.png` | `<model>-back.webp` |
| Gallery lifestyle | `12.png` | `<model>-lifestyle.webp` |
| Feature graphic | `10.png` | `<model>-features.webp` |
| Installation graphic | `13.png` | `<model>-install.webp` |
| Dimension graphic | `14.png` | `<model>-dimensions.webp` |
| Finish: White | `White.png` | `<model>-white.webp` |
| Finish: Ivory | `Lvory.png` (source spelling) | `<model>-ivory.webp` |
| Finish: Light Almond | `Light-Almond.png` | `<model>-almond.webp` |
| Finish: Black | `Black.png` | `<model>-black.webp` |
| Finish: Grey | `Grey.png` | `<model>-grey.webp` |
| Finish: Brown | `Brown.png` | `<model>-brown.webp` |

## Unresolved fields and publication limits

- The archived GW15 and GW20 pages say `Usage: Indoor Only`, while the certificate designates them Weather Resistant. Public records therefore retain the archived Residential & Commercial grade and use only `wr` as a non-installation product-classification filter. Any outdoor or damp-location installation guidance requires written technical confirmation and applicable-code review.
- The GL20 archived page claims UL/cUL certification, but GL20 is absent from both E504391 addenda supplied in the certificate source. Treat certification as unresolved until a current formal document names GL20.
- The archived FLB20 page is not sufficient for publication: it has no matching local model folder and reports `Certification: Non` with internally inconsistent electrical fields.
- Public dimensions are limited to values visibly present in each model's own dimension artwork; values must never be copied from another product.
- Commercial terms such as MOQ, lead time, warranty, warehouse availability, response time and stock status require written confirmation before appearing on a product page.
