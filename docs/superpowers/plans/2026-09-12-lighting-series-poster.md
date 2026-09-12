# Lighting Switch Series Poster Implementation Plan

> Execute inline with the existing frontend and ponytail approach. Preserve unrelated work; no agents, commits, browser audit, or preview-server restart.

**Goal:** Use the supplied stair-entry poster on Lighting Switches, omit the summary like the preceding banners, and move all introduction copy to the right so the left-hand switch remains unobstructed.

**Approach:** Extend the existing poster map with one asset and a right-copy modifier. Keep the supplied photograph unchanged. Desktop copy uses one right-side column and a right-only dark gradient. On narrow screens, preserve a 360px-high product photograph above the copy with a bottom fade, so neither the title nor breadcrumb covers the switch. Keep all six products, filters, model data, and other family banners unchanged.

## Steps

- [x] Add poster, absent-summary, right-copy, mobile product-clearance, and unchanged six-model/filter tests; observe expected failures.
- [x] Copy the original 1920 × 450 WebP to `public/assets/images/lines/lighting-series-stair-entry-v1.webp` without overwriting an existing file; verify dimensions and source/copy hashes.
- [x] Add the scoped right-copy presentation to `LineDetail.jsx` and `catalog.css`, reusing existing typography and accessible markup.
- [x] Run focused tests, full tests, production build, and scoped whitespace checks. Record fresh results; do not alter the source image or restart the preview.

## Source

`D:/国际站运营平台/方特插座/网站资料/网站图片制作/三款应用场景重新构思_1920x450_20260912/交付文件/WEBP/翘板开关_楼梯入口_1920x450.webp`

## Verification

- RED: 2 expected failures and 10 passes before implementation.
- GREEN: all 12 focused tests passed; full suite passed 656 tests across 30 files.
- Production build and scoped whitespace checks passed.
- Source and copied asset are byte-identical: 94,924 bytes, 1920 × 450, SHA256 `33E26ADBEC2338E11BE60E4F01B395A21DCBA97408A5E26EDD845F03439AD018`.
- Six lighting products and configuration filtering remain covered; USB/dimmer descriptions and the centered receptacle/smart posters are unchanged.
- No source image edits, browser audit, server restart, staging, or commit.
