# Lighting hero replacement

Use the user's supplied living-room photograph for the homepage Lighting control scene. Keep the existing 1536 × 1024 asset geometry, hero layout, copy, carousel, mobile frame and other photographs. Preserve the old asset as a fallback.

The supplied source is 1983 × 793, so direct resizing would distort the switch and cover cropping would change its scale. Use the built-in image editor to reframe/outpaint the supplied photograph to 3:2. Match the old plate's approximate bounds: x 1014–1269, y 176–648 on the 1536 × 1024 canvas. Preserve the supplied switch design and natural room lighting, with no baked-in text or website overlay.

Source: `C:/Users/XuWanPi/.codex/generated_images/01a0862b-5202-7680-8a0f-ffdbf93a0f8b/exec-c73413a3-fff8-41ea-a1aa-fc68d13e2c85.png`.
Placement reference: `public/assets/images/editorial-products/home-hero-lighting-scene-v2.webp`.
New asset: `public/assets/images/editorial-products/home-hero-lighting-scene-v3.webp`.

## Editing prompt

Image 1 is the supplied photograph to edit; image 2 is ONLY the canvas geometry and product placement reference. Reframe image 1 to exactly 1536 × 1024 (3:2), extending the existing room and wall naturally above and below as needed. Preserve image 1's white slide dimmer, its rocker, side slider, screwless plate, colors, materials and perspective. Place its plate at x 1014–1269, y 176–648, with center around (1142, 412), matching image 2. Keep image 1's warm living room, pale sofa, olive cushion, floor lamp, cabinet, plants and beige wall. Do not copy image 2's furnishings, window, night scene or foreground countertop. Do not distort or redesign the switch. No text, logo, watermark, borders or baked-in shading. Deliver only the photorealistic scene asset.

Verify final raster size and visible placement, then existing homepage interaction and build checks. No browser preview, commit or deployment is requested.

## Selected output and export

- Editing used the built-in image tool, not the API/CLI fallback. Selected generated scene: `C:/Users/XuWanPi/.codex/generated_images/01a04405-36a7-7a42-b27e-2ac0183d79b6/exec-256a5355-a5ae-4871-8cad-6a5515256771.png`.
- A second position-only edit overcorrected the vertical placement and was not used. Final positioning uses a uniform export resize of the selected scene, followed by a canvas crop: `scale=1736:-1:flags=lanczos,crop=1536:1024:156:102`. No product-specific stretching or compositing is applied during export.
- Final plate bounds are approximately x 1004–1278, y 176–648, placing its center at (1141, 412), matching the original center and height while preserving the replacement product's proportions.
- Final WebP is 1536 × 1024, 113834 bytes, quality 88. The old v2 image is unchanged. Homepage CSS, dimensions, labels and carousel logic are unchanged.
