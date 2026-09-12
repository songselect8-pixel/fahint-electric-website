# USB presentation sources — 2026-09-10

## Gallery

Scope: all 37 USB products. Specifications, certification statements, source caveats and finish selection are preserved.

The thumbnail strip contains the exact model's white finish, its structural views, then the standard and screwless plate photographs. Packaging remains in the program-presentation section, not in the hero gallery.

On 2026-09-11, the user approved reusing the rear and side photographs shown on FTR15QC-DC20W for USB receptacles missing those views. The existing assets `assets/images/catalog/models/430f555427db1805.webp` (rear) and `assets/images/catalog/models/ddf36c5c6fcae0e3.webp` (side pair), both 800 × 800, now fill the gaps on FTR15-4200, FTR15C-4200, FTR15DC-4200, FTR20-4200, FTR20C-4200, FTR20DC-4200 and FTR20QC-DC65W. Existing views are not duplicated or reordered; plate photographs remain last. F4P retains its own rear/angled photographs. This image reuse does not change or transfer model specifications or dimension drawings.

74 original 800 × 800 PNGs were copied without modification from:

`D:/国际站运营平台/方特插座/网站资料/公司资料&产品/产品图片/02-USB Outlet/`

Each model directory is the directory of its existing `finishSources[0].source` in `src/data/catalog/catalogue-products.json`, with the historical `/主图/` path segment removed. This also preserves the explicitly mapped PD folder names.

| Source filename | Website asset |
| --- | --- |
| `1-白单品+亮面常规面板.png` | `assets/images/catalog/usb-plates/{model-slug}-standard-v1.png` |
| `3-白单品-亮面无螺丝面板.png` | `assets/images/catalog/usb-plates/{model-slug}-screwless-v1.png` |

Copies were SHA-256 compared with their sources. Existing gallery images were not deleted from disk.

## Dimension drawings

`src/data/usbDimensions.js` binds every reviewed SKU to its original drawing asset. The live SVG component replaces the poster presentation, not the original source file. Updated or unmatched source assets do not silently inherit these measurements.

| Reviewed sources | Measurements retained (mm) |
| --- | --- |
| 18 conventional 3100/3600/5000 models | Plate 70 × 115; device width 43.5; height including tabs 103.3; total depth 44.7 |
| F4P | Plate 70 × 115; device width 43.5; height including tabs 103.3; total depth 41.1 |
| 8 PD20W/PD36W models | Body width 43.5, height 69, depth 44.7; face 33.1 × 66.5; mounting centers 83.5; tab-hole centers 23.8 |
| 4 PD65W models | Width 43.5; height including tabs 103.8; body height 69; total depth 47; recessed body 39.8; mounting centers 83.5; tab-hole centers 23.8 |
| 6 conventional 4200 models | No original dimension drawings supplied; no measurements inferred from a sibling model |

All 31 source drawings were individually read. The F4P source has an inconsistent inch/mm depth pair (1.60 in / 41.1 mm); the redesign uses the explicitly printed mm values only. The FTR20QC-DC65W poster shows a 15A-like front slot pattern despite its 20A designation; the simplified diagram uses the model-specific 20A receptacle configuration rather than reproducing that inconsistent outline.

Outlines are simplified reference illustrations, not manufacturing CAD or to-scale drilling templates. Numeric labels are separate SVG text. The source drawing link and instruction to confirm approved installation documents remain visible.
