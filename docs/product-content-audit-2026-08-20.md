# Fahint website product/content audit

Date: 2026-08-20

Source folder reviewed:

`D:\国际站运营平台\方特插座\网站资料\公司资料&产品`

Website folder reviewed:

`D:\国际站运营平台\方特插座\网站资料\fahint-gfci`

## Source material summary

The source folder contains three main groups:

| Source group | Contents found |
| --- | --- |
| `产品图片` | 4,071 PNG files and 162 JPG files across 7 product lines |
| `产品证书` | 7 certificate PDFs plus converted certificate JPG previews |
| `详情页` | 16 long-form detail-page images |

## Product image inventory

| Product line in source | Source image folders | Source images | Current website status |
| --- | ---: | ---: | --- |
| GFCI Outlet | 14 | 243 | Has detailed GFCI data, but only 7 SKUs have image files. GTN15/GTN20 exist in data but have no dedicated images. |
| USB Outlet | 37 | 2,331 | Only a generic line page and 4 representative images. Many exact SKUs are not represented. |
| Dimmer & sensor switch | 2 | 126 | The 2 dimmer models are listed, but no detailed product pages. |
| Standard Receptacle | 21 | 514 | Generic line page only. Source model grouping differs from current data and needs cleanup. |
| Smart Switch | 20 | 306 | Current data uses partial/generic names. Exact Wi-Fi, Zigbee, and touch switch SKUs are missing. |
| Lighting Switches | 7 | 187 | Current data is simplified. Some exact model groups and handle-switch assets are missing. |
| Wallplates | 65 | 482 | Current data lists main models, but many size, finish, blank, extension, and device-combination images are missing. |

Total source image groups with product images: 166.

Current website image coverage:

| Website image group | Current file count |
| --- | ---: |
| `public/assets/images/products` | 119 |
| `public/assets/images/lines` | 16 |
| `public/assets/images/certs` | 6 |
| `public/assets/images/company` | 16 |
| `public/assets/images/hero` | 8 |

## Current product data coverage

The website currently treats GFCI as the only fully detailed product line.

| Website line | Current listed items | Current gallery images | Detail pages? |
| --- | ---: | ---: | --- |
| GFCI Outlets | 9 | 1 line cover, 119 product images | Yes |
| USB Outlets | 16 | 4 | No |
| Standard Receptacles | 23 | 4 | No |
| Dimmers | 2 | 2 | No |
| Smart Switches | 14 | 2 | No |
| Lighting Switches | 6 | 2 | No |
| Wallplates | 13 | 2 | No |

## Key mismatches found

1. GFCI color count is inconsistent.
   - Website data has 6 colors: white, ivory, almond, black, grey, brown.
   - Source neutral-packaging images include an additional `石墨灰`, likely Graphite Gray.
   - Several website copy sections say "seven finishes", so Graphite Gray should be added or the copy should be changed to six finishes.

2. GFCI industrial image coverage is incomplete.
   - Website data includes `GTN15` and `GTN20`.
   - Source folder does not show matching GTN image folders in the first pass.
   - The site currently falls back to GF15 images for products without images, which is risky for product accuracy.

3. USB products are heavily underrepresented.
   - Source has 37 USB image groups, including 3100mA, 3600mA, 4200mA, 4200mA-F4P, 5000mA, PD20W, PD36W, and PD65W variants.
   - Website data collapses many exact SKUs into broad labels such as "PD 20W / 36W / 65W GaN".

4. Smart switch data needs exact SKU cleanup.
   - Source includes Wi-Fi neutral-required, Wi-Fi single-live-wire, Zigbee single-live-wire, and touch switch groups.
   - Website data currently mixes exact SKU prefixes with generic names like "1 gang", "2 gang", and "Neutral required".

5. Standard receptacle data needs validation against source folder names.
   - Source has R series, D series, C-series-labeled folders, and industrial non-UL folders.
   - Website data lists `C15`, `C20`, `CR15`, `CR20`, `CD20`, but source folder names include patterns such as `R15-C-R15Q-C`.
   - This should be confirmed before publishing detailed receptacle pages.

6. Wallplate coverage is far too thin for the available source material.
   - Source includes standard plates, screwless plates, blank plates, extension plates, medium-size plates, matte variants, and device-combination images.
   - Website only has 2 wallplate representative images and 13 broad model labels.

7. Certificates are present but not fully exposed.
   - Source has PDFs for ISO 9001, GFCI, USB Outlet, Receptacle, Wallplate, and Switch.
   - Website has only 6 WebP certificate thumbnails and no PDF download links.

## Recommended fill-in order

1. Product model data first.
   - Add a structured product catalog data file for all product lines.
   - Keep GFCI detailed as-is, but add Graphite Gray and fix missing/fallback GTN images.
   - Expand USB, Smart Switch, Receptacle, Lighting Switch, Dimmer, and Wallplate with exact source model names.

2. Product images second.
   - Do not import all 4,000+ source images into the site.
   - Select 3-6 web-ready images per SKU or product group: main, plate/installed, angle, back/detail, color/finish, application if available.
   - Convert selected PNG/JPG images to WebP and use consistent lowercase names.

3. Certificates third.
   - Keep certificate thumbnails for visual trust.
   - Add PDF download links for compliance buyers.

4. About/company content fourth.
   - Current source folder mainly contains product and certificate material.
   - Company narrative should be updated from certificates and known facts already in `company.js`, unless additional company profile documents are provided.

## Proposed website data structure

To avoid bloating `lines.js`, add a new file:

`src/data/catalog.js`

Suggested structure:

```js
export const catalogLines = [
  {
    slug: 'usb-outlets',
    name: 'USB Outlets',
    groups: [
      {
        name: '3100mA',
        models: [
          {
            sku: 'FTR15-3100',
            title: '15A USB Type-A Receptacle, 3100mA',
            imageBase: 'ftr15-3100',
            sourceFolder: '02-USB Outlet/3100mA/FTR15-3100'
          }
        ]
      }
    ]
  }
];
```

This keeps the current pages stable while giving us a clean place to add exact model coverage.

## Next practical step

Start with USB Outlet, because it has the largest gap:

- Source: 37 image groups and 2,331 images.
- Current website: 16 simplified labels and 4 line images.
- Result after cleanup: a proper USB product-line page with exact model groups, real product images, and inquiry-ready copy.

