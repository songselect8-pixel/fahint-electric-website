# Smart-switch presentation sources

Scope: all 51 published smart-switch models (20 US, 31 EU). Product facts remain in the existing catalogue; this update changes presentation assets and layout only.

## Originals and derived files

- Library root: `../公司资料&产品/产品图片/05-Smart Switch` relative to this project.
- Exact per-model folders are reused from `scripts/catalogue-model-sources.mjs`. Models are not matched by approximate filenames or shared face shape.
- Generated manifest: `src/data/catalog/smart-switch-media.json`. Each image records its exact source path, SHA-256 and dimensions.
- Website assets: `public/assets/images/catalog/smart-switches`. Identical source bytes share a file, but each model keeps its own provenance entry.
- Original library files and previously published grey assets are retained unchanged.

## Gallery mapping

| Range | Main gallery | Finish selector | Detail panels | Technical references |
| --- | --- | --- | --- | --- |
| US | `1.png`, `3.png`, `4.png`, `5.png`, `6.png` | `1.png`, `1-2.png`, `1-3.png`, `1-4.png` | `1.png`, `4.png`, `3.png` | `11.png` dimensions; `10.png` wiring |
| EU | `白底图/黑.jpg`, `正面黑.jpg`, `侧面.jpg`, `背面.jpg` | `黑.jpg`, `白.jpg`, `金.jpg`, `灰.jpg` from the same white-photo folder | `正面黑.jpg`, `侧面.jpg`, `背面.jpg` | model-root `3.jpg` dimensions; `5.jpg` wiring |

US photographs receive white backgrounds using local silhouette masks, explicitly approved by the user. Product-interior pixels are not regenerated or recolored. The original 800 × 800 composition is retained; lossless WebP is used for derivatives. EU white photos and all reference sheets are byte-for-byte copies. Technical artwork backgrounds and all original labels are preserved.

## Reference limits

- US drawings are from each exact model folder, including neutral-required, single-live and touch-only variants. UST8832's neutral-wire source conflict remains visible beside the reference sheets.
- EU dimension artwork is shared within the source library and depicts different rear housings. It is labelled as a series reference, not a verified single housing depth for every model.
- EU wiring artwork contains multiple gang counts / circuit variants. The page displays the model's existing wiring requirement next to the original sheet, notes that not all illustrated circuits apply, and directs the buyer to the approved instructions for the supplied device.
- These are existing dimension and wiring reference images, not newly authored / certified installation manuals. No new electrical connection instructions or certification claims were invented.

## Reproduce / verify

Requires local Python with Pillow, numpy and opencv-python. UTF-8 mode is explicit because the library uses Chinese paths.

```powershell
node scripts/import-smart-switch-media.mjs
python -X utf8 scripts/verify-smart-switch-media.py
npm test -- src/data/catalogProducts.test.js src/pages/CatalogProductDetail.test.jsx
npm run build
```

Use `--refresh` on the importer only when deliberately regenerating the derived US photos after a mask update. It writes only inside the scoped smart-switch output directory and never modifies the source library.
