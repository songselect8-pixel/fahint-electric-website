# Homepage Application Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible, full-bleed residential application map below the homepage product selector, using a new FAHINT-aligned house scene and four correctly placed real product hotspots.

**Architecture:** A new `StudioApplicationMap` owns the homepage-only hotspot definitions, interaction state, and product lookup against `studioRanges`. `HomeStudio` inserts it between the selector and brand introduction, while the existing studio stylesheet supplies full-bleed presentation, responsive positioning, pulse motion, and reduced-motion behavior. The generated background remains purely environmental; every product card uses existing verified assets and routes.

**Tech Stack:** React 18, React Router, Vitest, Testing Library, existing FAHINT studio CSS, built-in image generation, Pillow for lossless crop/WebP export.

---

## File structure

- Create `public/assets/images/editorial-home/fahint-residential-application-map-v1.webp` — optimized full-bleed house scene without generated product geometry or labels.
- Create `src/components/studio/StudioApplicationMap.jsx` — hotspot definitions, accessible interaction, and real product cards.
- Modify `src/pages/HomeStudio.jsx` — insert the application map in the approved narrative position.
- Modify `src/styles/studio.css` — desktop/mobile layout, card placement, irregular pulse, focus, and reduced-motion rules.
- Modify `src/pages/StudioPages.test.jsx` — behavioral and asset assertions for the new section.

### Task 1: Produce the environmental scene

**Files:**
- Create: `public/assets/images/editorial-home/fahint-residential-application-map-v1.webp`

- [x] **Step 1: Generate a wide background-only scene**

Use the built-in image generator with this production prompt:

```text
Create a premium photorealistic editorial architectural photograph for a North American wiring-device manufacturer's website. Wide 16:9 composition, a contemporary two-storey North American residence shown as an elegant open cutaway at blue hour. Deep navy outdoor atmosphere, warm amber practical lighting inside. Clearly readable but visually connected zones: kitchen countertop and backsplash, bedroom bedside or compact home office, living and dining room, and entry hallway beside a doorway. Keep all four zones concentrated around the central 70% of the frame so they survive responsive cropping. Add only extremely subtle cool-cyan architectural drafting lines in a few structural edges, not a glowing sci-fi wireframe. Premium architectural-magazine realism, restrained materials, realistic scale, no people, no car, no text, no logos, no labels, no callout dots, no electrical outlets or switches featured prominently, no distorted hardware. Leave calm darker negative space in the upper-left for white headline text and clean wall areas near each room for interface hotspots. Edge-to-edge poster composition.
```

- [x] **Step 2: Inspect the generated scene**

Reject any result with text, logos, people, distorted room geometry, prominently fabricated devices, missing application zones, excessive neon lines, or insufficient upper-left contrast.

- [x] **Step 3: Crop and export the selected image**

Use Pillow to make a centered 16:9 crop and save an optimized WebP at a maximum width of 1920 px:

```python
from pathlib import Path
from PIL import Image

source = Path(r"C:\absolute\generated\image.png")
target = Path(r"D:\国际站运营平台\方特插座\网站资料\fahint-gfci\public\assets\images\editorial-home\fahint-residential-application-map-v1.webp")
with Image.open(source) as image:
    image = image.convert("RGB")
    target_ratio = 16 / 9
    current_ratio = image.width / image.height
    if current_ratio > target_ratio:
        width = round(image.height * target_ratio)
        left = (image.width - width) // 2
        image = image.crop((left, 0, left + width, image.height))
    elif current_ratio < target_ratio:
        height = round(image.width / target_ratio)
        top = (image.height - height) // 2
        image = image.crop((0, top, image.width, top + height))
    if image.width > 1920:
        image.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
    image.save(target, "WEBP", quality=88, method=6)
```

- [x] **Step 4: Verify the asset**

Run:

```powershell
python -c "from PIL import Image; p=r'public/assets/images/editorial-home/fahint-residential-application-map-v1.webp'; im=Image.open(p); print(im.size, im.mode)"
```

Expected: a 16:9 RGB image no wider than 1920 px.

### Task 2: Specify the interaction with a failing test

**Files:**
- Modify: `src/pages/StudioPages.test.jsx`

- [x] **Step 1: Write the failing application-map test**

Add this test inside `describe('studio homepage and catalog', ...)`:

```jsx
it('maps four verified products to real residential locations', async () => {
  const user = userEvent.setup();
  show(HomeStudio);
  const section = screen.getByRole('region', { name: 'Power, room by room.' });
  const expected = [
    ['GF15 GFCI Outlet', '/products/gfci/gf15'],
    ['FTR15C-3100 USB Outlet', '/products/usb-outlets/ftr15c-3100'],
    ['DM2010 Digital Dimmer', '/products/dimmers/dm2010'],
    ['DS15 Paddle Switch', '/products/lighting-switches/ds15']
  ];

  expect(within(section).getByRole('img', { name: /cutaway North American home/i }))
    .toHaveAttribute('src', publicAsset('assets/images/editorial-home/fahint-residential-application-map-v1.webp'));
  const hotspots = within(section).getAllByRole('button', { name: /^Show / });
  expect(hotspots).toHaveLength(4);
  for (const [name, href] of expected) {
    const button = within(section).getByRole('button', { name: `Show ${name}` });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(within(section).getByRole('link', { name: `View ${name}` })).toHaveAttribute('href', href);
  }
});
```

- [x] **Step 2: Run the focused test and confirm the intended failure**

Run:

```powershell
npm test -- --run src/pages/StudioPages.test.jsx -t "maps four verified products"
```

Expected: FAIL because the `Power, room by room.` region does not exist.

### Task 3: Implement the accessible map component

**Files:**
- Create: `src/components/studio/StudioApplicationMap.jsx`

- [x] **Step 1: Add the product-backed hotspot component**

Create the component with this structure:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { studioRanges } from '../../data/studioCatalog.js';
import { StudioImage } from './StudioShared.jsx';

const locations = [
  { family: 'gfci', sku: 'GF15', label: 'GF15 GFCI Outlet', room: 'Kitchen protection', description: 'Self-test GFCI protection for the kitchen work surface.', x: '47%', y: '55%', side: 'right', pulse: '4.7s', delay: '-1.4s' },
  { family: 'usb-outlets', sku: 'FTR15C-3100', label: 'FTR15C-3100 USB Outlet', room: 'Bedside charging', description: 'Integrated USB-A and USB-C charging beside the bed or desk.', x: '29%', y: '42%', side: 'right', pulse: '5.9s', delay: '-3.2s' },
  { family: 'dimmers', sku: 'DM2010', label: 'DM2010 Digital Dimmer', room: 'Living room lighting', description: 'A digital slide dimmer for layered residential lighting.', x: '69%', y: '49%', side: 'left', pulse: '4.1s', delay: '-2.3s' },
  { family: 'lighting-switches', sku: 'DS15', label: 'DS15 Paddle Switch', room: 'Entry control', description: 'A single-pole paddle switch placed beside the entry door.', x: '79%', y: '66%', side: 'left', pulse: '6.3s', delay: '-4.7s' }
];

const mappedLocations = locations.map((location) => {
  const range = studioRanges.find((item) => item.slug === location.family);
  return { ...location, product: range.models.find((item) => item.sku === location.sku) };
});

export default function StudioApplicationMap() {
  const [activeSku, setActiveSku] = useState(null);
  const active = mappedLocations.find((location) => location.product.sku === activeSku);

  return <section className="studio-application-map" aria-labelledby="studio-application-map-title" onMouseLeave={() => setActiveSku(null)}>
    <StudioImage className="studio-application-map__image" src="assets/images/editorial-home/fahint-residential-application-map-v1.webp" alt="Cutaway North American home showing a kitchen, bedroom, living area and entry" width={1920} height={1080} />
    <div className="studio-application-map__shade" aria-hidden="true" />
    <header className="studio-application-map__intro">
      <p>MADE FOR REAL SPACES</p>
      <h2 id="studio-application-map-title">Power, room by room.</h2>
      <span>Explore where selected FAHINT devices belong in an everyday residential project.</span>
    </header>
    <div className="studio-application-map__locations">
      {mappedLocations.map(({ product, ...location }, index) => {
        const open = activeSku === product.sku;
        const cardId = `studio-application-card-${product.sku.toLowerCase()}`;
        return <div className={`studio-map-location studio-map-location--${index + 1}`} key={product.sku} style={{ '--spot-x': location.x, '--spot-y': location.y, '--pulse-duration': location.pulse, '--pulse-delay': location.delay }}>
          <button type="button" className="studio-map-hotspot" aria-label={`Show ${location.label}`} aria-expanded={open} aria-controls={cardId} onMouseEnter={() => setActiveSku(product.sku)} onFocus={() => setActiveSku(product.sku)} onClick={() => setActiveSku(open ? null : product.sku)}><span aria-hidden="true" /></button>
        </div>;
      })}
    </div>
    {active && <article className={`studio-map-card studio-map-card--${active.side}`} id={`studio-application-card-${active.product.sku.toLowerCase()}`} style={{ '--spot-x': active.x, '--spot-y': active.y }}>
      <div className="studio-map-card__image"><StudioImage src={active.product.assets.card} alt="" width={320} height={320} /></div>
      <div><span>{active.room}</span><strong>{active.product.sku}</strong><h3>{active.product.name}</h3><p>{active.description}</p><Link to={active.product.href} aria-label={`View ${active.label}`}>View product <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    </article>}
  </section>;
}
```

- [x] **Step 2: Run the focused test**

Run the same focused test command. Expected: it still fails because the component is not mounted yet.

### Task 4: Mount and style the full-bleed chapter

**Files:**
- Modify: `src/pages/HomeStudio.jsx`
- Modify: `src/styles/studio.css`

- [x] **Step 1: Mount the component after product selection**

Add:

```jsx
import StudioApplicationMap from '../components/studio/StudioApplicationMap.jsx';
```

Then change the homepage sequence to:

```jsx
      <StudioProductSelection />
    </div>
    <StudioApplicationMap />
    <BrandIntroduction /><PrivateLabel /><Manufacturing /><StudioBuyerSections />
```

- [x] **Step 2: Add the desktop visual system and irregular pulse**

Add these scoped rules to `studio.css`:

```css
.studio-application-map { position: relative; isolation: isolate; min-height: clamp(720px, 88svh, 980px); overflow: hidden; background: var(--studio-navy); color: #fff; }
.studio-application-map__image { position: absolute; inset: 0; z-index: -3; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.studio-application-map__shade { position: absolute; inset: 0; z-index: -2; pointer-events: none; background: linear-gradient(120deg, #04182de8 0%, #071b308f 24%, transparent 54%), linear-gradient(0deg, #0314259e 0%, transparent 38%); }
.studio-application-map__intro { position: absolute; z-index: 2; top: clamp(54px, 8vh, 92px); left: var(--studio-gutter); width: min(560px, 40vw); }
.studio-application-map__intro > p { margin-bottom: 16px; color: #a7d2e2; font-size: 13px; font-weight: 700; letter-spacing: .16em; }
.studio-application-map__intro h2 { color: #fff; font-size: clamp(44px, 4.4vw, 70px); }
.studio-application-map__intro > span { display: block; max-width: 45ch; margin-top: 22px; color: #d5e3eb; font-size: 18px; line-height: 1.65; }
.studio-application-map__locations { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
.studio-map-location { position: absolute; left: var(--spot-x); top: var(--spot-y); width: 48px; height: 48px; transform: translate(-50%, -50%); pointer-events: auto; }
.studio-map-hotspot { position: relative; display: grid; place-items: center; width: 48px; height: 48px; padding: 0; border: 0; border-radius: 50%; background: transparent; }
.studio-map-hotspot > span { position: relative; z-index: 2; display: block; width: 13px; height: 13px; border: 3px solid #fff; border-radius: 50%; background: var(--studio-blue); box-shadow: 0 0 0 5px #ffffff2b, 0 4px 16px #0314257d; }
.studio-map-hotspot::before, .studio-map-hotspot::after { content: ''; position: absolute; inset: 5px; border: 1px solid #fff; border-radius: 50%; opacity: 0; animation: studio-map-pulse var(--pulse-duration) var(--pulse-delay) cubic-bezier(.22,.61,.36,1) infinite; }
.studio-map-hotspot::after { animation-delay: calc(var(--pulse-delay) - 1.15s); }
.studio-map-hotspot:hover > span, .studio-map-hotspot[aria-expanded=true] > span { background: #fff; box-shadow: 0 0 0 6px #177792b8, 0 4px 18px #031425a8; }
@keyframes studio-map-pulse {
  0%, 9% { transform: scale(.72); opacity: 0; }
  17% { opacity: .5; }
  35% { transform: scale(1.45); opacity: .08; }
  42%, 58% { transform: scale(.82); opacity: 0; }
  67% { opacity: .38; }
  91%, 100% { transform: scale(1.72); opacity: 0; }
}
.studio-map-card { position: absolute; z-index: 4; top: var(--spot-y); display: grid; grid-template-columns: 108px minmax(0, 1fr); width: min(360px, calc(100% - var(--studio-gutter) * 2)); min-height: 168px; overflow: hidden; border: 1px solid #d3dfe5; border-radius: var(--studio-radius); background: #fff; color: var(--studio-ink); box-shadow: 0 22px 60px #03142552; transform: translateY(-50%); }
.studio-map-card--right { left: calc(var(--spot-x) + 36px); }
.studio-map-card--left { right: calc(100% - var(--spot-x) + 36px); }
.studio-map-card__image { display: grid; place-items: center; padding: 14px 8px; background: var(--studio-paper); }
.studio-map-card__image img { width: 100%; height: 132px; object-fit: contain; mix-blend-mode: multiply; }
.studio-map-card > div:last-child { min-width: 0; padding: 17px 18px 13px; }
.studio-map-card span { display: block; color: var(--studio-muted); font-size: 12px; line-height: 1.35; }
.studio-map-card strong { display: block; margin-top: 7px; color: var(--studio-blue); font-size: 12px; font-weight: 650; }
.studio-map-card h3 { margin-top: 3px; font-size: 19px; line-height: 1.22; text-wrap: pretty; }
.studio-map-card p { margin-top: 7px; color: var(--studio-muted); font-size: 13px; line-height: 1.45; }
.studio-map-card a { display: inline-flex; align-items: center; gap: 9px; min-height: 44px; margin-top: 5px; color: var(--studio-blue); font-size: 14px; font-weight: 600; }
.studio-map-card a:hover { text-decoration: underline; }
```

Each hotspot ring uses `animation-duration: var(--pulse-duration)` and `animation-delay: var(--pulse-delay)` so the four locations never flash as a synchronized set.

- [x] **Step 3: Add tablet and mobile containment**

Real-browser inspection refined the breakpoint behavior: 901–1100 px preserves the full scene at 16:9, while 900 px and below moves the introduction above a full-width 16:9 stage and places the active card beneath it. This keeps all four hotspot coordinates aligned with visible rooms.

Add these initial responsive rules, then adjust only the four percentage coordinates if visual inspection of the selected image shows a room mismatch:

```css
@media (max-width: 900px) {
  .studio-application-map { min-height: 820px; }
  .studio-application-map__intro { width: min(520px, calc(100% - var(--studio-gutter) * 2)); }
  .studio-map-card { width: 330px; }
}
@media (max-width: 760px) {
  .studio-application-map { min-height: max(780px, 105svh); }
  .studio-application-map__image { object-position: 52% center; }
  .studio-application-map__shade { background: linear-gradient(180deg, #04182deb 0%, #061b306b 38%, transparent 56%), linear-gradient(0deg, #031425d6 0%, transparent 47%); }
  .studio-application-map__intro { top: 42px; right: var(--studio-gutter); width: auto; }
  .studio-application-map__intro > p { margin-bottom: 11px; font-size: 11px; }
  .studio-application-map__intro h2 { font-size: clamp(38px, 11vw, 52px); }
  .studio-application-map__intro > span { max-width: 34ch; margin-top: 15px; font-size: 16px; }
  .studio-map-location--1 { left: 52%; top: 49%; }
  .studio-map-location--2 { left: 25%; top: 40%; }
  .studio-map-location--3 { left: 69%; top: 46%; }
  .studio-map-location--4 { left: 80%; top: 61%; }
  .studio-map-card, .studio-map-card--left, .studio-map-card--right { top: auto; right: var(--studio-gutter); bottom: 24px; left: var(--studio-gutter); grid-template-columns: 96px minmax(0, 1fr); width: auto; min-height: 154px; transform: none; }
  .studio-map-card__image img { height: 116px; }
  .studio-map-card > div:last-child { padding: 14px 15px 10px; }
  .studio-map-card h3 { font-size: 17px; }
  .studio-map-card p { font-size: 12px; }
}
@media (max-width: 390px) {
  .studio-application-map { min-height: 760px; }
  .studio-map-card { grid-template-columns: 84px minmax(0, 1fr); }
  .studio-map-card__image img { height: 102px; }
}
```

- [x] **Step 4: Add reduced-motion behavior**

The existing global reduced-motion rule disables animation. Add this explicit static fallback:

```css
@media (prefers-reduced-motion: reduce) {
  .studio-map-hotspot::before { transform: scale(1.12); opacity: .24; }
  .studio-map-hotspot::after { display: none; }
}
```

- [x] **Step 5: Run the focused test**

Run:

```powershell
npm test -- --run src/pages/StudioPages.test.jsx -t "maps four verified products"
```

Expected: PASS.

- [x] **Step 6: Commit the feature implementation**

```powershell
git add -- public/assets/images/editorial-home/fahint-residential-application-map-v1.webp src/components/studio/StudioApplicationMap.jsx src/pages/HomeStudio.jsx src/styles/studio.css src/pages/StudioPages.test.jsx
git commit -m "feat: add homepage residential application map"
```

### Task 5: Verify the integrated homepage

**Files:**
- Verify: `src/components/studio/StudioApplicationMap.jsx`
- Verify: `src/pages/HomeStudio.jsx`
- Verify: `src/styles/studio.css`
- Verify: `src/pages/StudioPages.test.jsx`

- [x] **Step 1: Run studio-page tests**

```powershell
npm test -- --run src/pages/StudioPages.test.jsx
```

Expected: all studio tests pass.

- [x] **Step 2: Run the full suite**

```powershell
npm test
```

Expected: all tests pass.

- [x] **Step 3: Build the production bundle**

```powershell
npm run build
```

Expected: Vite completes without errors.

- [x] **Step 4: Check the page in a real browser**

Verify `/` at approximately 1440×900, 1024×768, and 390×844. Confirm the four locations align with their intended rooms, cards remain inside the scene, mouse-to-card movement does not close the active card, mobile tap toggles the bottom overlay, no image is stretched, there is no horizontal overflow, and the console is clear.

- [x] **Step 5: Check repository scope**

```powershell
git status --short
git diff --check HEAD~1..HEAD
```

Expected: only the planned files are committed; pre-existing `%SystemDrive%/` and `.planning/` remain untouched.
