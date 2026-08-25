# GFCI Product Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a verified, brand-led GFCI product overview, series page and reusable product-detail template that balances premium presentation with OEM/ODM buyer conversion.

**Architecture:** Keep React Router and the existing Vite application, but move GFCI into a dedicated series route backed by one structured product dataset. Reuse the existing site shell while adding focused product components and a separate product-experience stylesheet so the 6,000+ line global stylesheet does not grow further. Preserve the static mailto inquiry mechanism for this phase while making its validation and status states production-ready.

**Tech Stack:** React 18, React Router 6, Vite 5, Vitest, Testing Library, Lucide React, CSS.

---

## File Map

### Create

- `docs/product-data/gfci-source-map.md` — source and publication status for every GFCI model.
- `src/data/products.test.js` — verified model, asset and filtering contract.
- `src/data/productFamilies.js` — five public product-family entries used by `/products`.
- `src/components/SafeImage.jsx` — controlled fallback for missing web assets.
- `src/components/SafeImage.test.jsx` — fallback behaviour.
- `src/utils/publicAsset.js` — resolve public assets locally and under the GitHub Pages base path.
- `src/utils/publicAsset.test.js` — base-path resolution contract.
- `src/components/ProductCard.test.jsx` — full-card navigation contract.
- `src/pages/ProductsOverview.test.jsx` — five-family overview contract.
- `src/pages/GfciSeries.jsx` — dedicated GFCI discovery, filtering and comparison page.
- `src/pages/GfciSeries.test.jsx` — search and filter behaviour.
- `src/components/RouteFocusManager.jsx` — route-scroll and keyboard-focus restoration.
- `src/components/RouteFocusManager.test.jsx` — route-change focus contract.
- `src/components/products/ProductGallery.jsx` — gallery, finish selection and enlarged image.
- `src/components/products/ProductGallery.test.jsx` — gallery and finish interaction.
- `src/components/products/ProductDetailHero.jsx` — 55/45 product hero and primary actions.
- `src/components/products/ProductStorySections.jsx` — features, applications and OEM configuration.
- `src/components/products/ProductTechnicalSections.jsx` — specifications, installation, certification and quality proof.
- `src/pages/ProductDetail.test.jsx` — detail hierarchy and claim-safety contract.
- `src/components/InquiryForm.test.jsx` — form validation, autofocus and default-model contract.
- `src/styles/product-experience.css` — all new product-page styles, responsive rules and reduced motion.
- `public/assets/images/products/product-placeholder.svg` — controlled missing-image fallback.

### Modify

- `src/data/products.js` — publish seven verified GFCI models, add role-based assets and review queue.
- `src/components/ProductCard.jsx` — make the complete product card a link and use `SafeImage`.
- `src/pages/ProductsOverview.jsx` — replace catalogue-heavy layout with the approved brand-led five-family architecture.
- `src/pages/LineDetail.jsx` — remove embedded GFCI rendering; keep only generic non-GFCI families.
- `src/pages/ProductDetail.jsx` — compose the approved product-detail sections.
- `src/components/InquiryForm.jsx` — accessible validation and duplicate-submit protection.
- `src/main.jsx` — add the dedicated `/products/gfci` route and product stylesheet.
- `src/assetPaths.test.js` — verify every published product asset exists.

### Existing verified assets to reuse

- `public/assets/images/products/{gf15,gf20,gt15,gt20,gw15,gw20,gl20}-*.webp`
- `public/assets/images/editorial-home/product-{gfci,usb,receptacle,smart}.jpg`
- `public/assets/images/editorial-home/category-switches.jpg`
- `public/assets/images/company/facility-{workshop,lab,sampleroom,warehouse}.webp`
- `public/assets/images/certs/ul-gfci.webp`

---

### Task 1: Lock the verified GFCI data and source map

> **Source-verification amendment (2026-08-25):** The archived GW15/GW20 records identify the products as WR but also state `Indoor Only`. Until written installation approval is supplied, WR is treated only as a product classification. Public application data and filters must not claim `Outdoor / damp locations`. The accepted combined filter contract therefore uses `classification: 'wr'` rather than `application: 'outdoor'`.

**Files:**
- Create: `docs/product-data/gfci-source-map.md`
- Create: `src/data/products.test.js`
- Modify: `src/data/products.js`

- [ ] **Step 1: Audit the source material before changing public data**

Use these exact source locations:

- product images: `D:\国际站运营平台\方特插座\网站资料\公司资料&产品\产品图片\01-GFCI Outlet\<MODEL>`;
- certification file: `D:\国际站运营平台\方特插座\网站资料\公司资料&产品\产品证书\E504391-GFCI (1).pdf`;
- archived product URLs listed in the source-map table below;
- existing site data only as the lowest-priority cross-check.

For GF15, GF20, GT15, GT20, GW15, GW20 and GL20, record the source for rating, NEMA, variant, grade, dimensions, certification and every asset role. If a field cannot be verified from a formal document, local model folder or archived model page, omit it from the public record and add it to the source-map notes. Do not infer a specification from the model name or a different product.

- [ ] **Step 2: Write the failing data contract test**

```js
// src/data/products.test.js
import { describe, expect, it } from 'vitest';
import {
  products,
  productReviewQueue,
  productGallery,
  productFinishImage,
  filterGfciProducts
} from './products.js';

describe('verified GFCI product data', () => {
  it('publishes only the seven models backed by local source folders', () => {
    expect(products.map((product) => product.sku)).toEqual([
      'GF15',
      'GF20',
      'GT15',
      'GT20',
      'GW15',
      'GW20',
      'GL20'
    ]);
  });

  it('keeps FLB20 out of public pages until its assets are verified', () => {
    expect(productReviewQueue).toContainEqual(
      expect.objectContaining({ sku: 'FLB20', publish: false })
    );
  });

  it('maps every product to its own gallery and finish images', () => {
    for (const product of products) {
      const key = product.sku.toLowerCase();
      expect(productGallery(product.sku)).toHaveLength(5);
      expect(productGallery(product.sku).every((path) => path.includes(`/products/${key}-`))).toBe(true);
      expect(productFinishImage(product.sku, 'black')).toContain(`/products/${key}-black.webp`);
    }
  });

  it('supports combined query, amperage, variant and WR classification filters', () => {
    expect(filterGfciProducts(products, { query: 'weather', amperage: '20A', variant: 'wr', classification: 'wr' }).map((p) => p.sku)).toEqual([
      'GW20'
    ]);
  });
});
```

- [ ] **Step 3: Run the test and verify the new exports are missing**

Run: `npm test -- src/data/products.test.js`

Expected: FAIL because `productReviewQueue`, `productFinishImage` and `filterGfciProducts` are not exported yet.

- [ ] **Step 4: Add role-based asset helpers and publication rules**

Add these helpers to `src/data/products.js` and update the seven existing verified records to use them:

```js
const GALLERY_ROLES = ['plate', 'main', 'sides', 'back', 'lifestyle'];

function assetPath(sku, role) {
  return `assets/images/products/${String(sku).toLowerCase()}-${role}.webp`;
}

function buildAssets(sku) {
  return {
    hero: assetPath(sku, 'main'),
    card: assetPath(sku, 'plate'),
    gallery: GALLERY_ROLES.map((role) => assetPath(sku, role)),
    feature: assetPath(sku, 'features'),
    installation: assetPath(sku, 'install'),
    dimensions: assetPath(sku, 'dimensions'),
    finishes: Object.fromEntries(colors.map((finish) => [finish.slug, assetPath(sku, finish.slug)]))
  };
}

export const productReviewQueue = [
  {
    sku: 'FLB20',
    publish: false,
    reason: 'Archived website model has no verified matching local image folder or complete specification set.'
  }
];

export function productGallery(sku) {
  return findProduct(sku)?.assets.gallery || [];
}

export function productImage(sku, role = 'card') {
  const product = findProduct(sku);
  if (!product) return 'assets/images/products/product-placeholder.svg';
  const legacyRole = {
    card: 'plate',
    hero: 'main',
    feature: 'features',
    installation: 'install'
  }[role] || role;
  return assetPath(product.sku, legacyRole);
}

export function productFinishImage(sku, finishSlug) {
  return findProduct(sku)?.assets.finishes?.[finishSlug] || 'assets/images/products/product-placeholder.svg';
}

// Keep the old export during the incremental page migration.
export function colorImage(sku, finishSlug) {
  return productFinishImage(sku, finishSlug);
}

export function filterGfciProducts(list, filters) {
  const query = filters.query.trim().toLowerCase();

  return list.filter((product) => {
    const matchesQuery = !query || [product.sku, product.name, product.feature, product.grade]
      .join(' ')
      .toLowerCase()
      .includes(query);
    const matchesAmperage = !filters.amperage || product.rating.startsWith(filters.amperage);
    const matchesVariant = !filters.variant || product.category === filters.variant;
    const matchesApplication = !filters.application || product.grade.toLowerCase().includes(filters.application);
    return matchesQuery && matchesAmperage && matchesVariant && matchesApplication;
  });
}
```

For each published record, add `assets: buildAssets('<MODEL>')`. Remove `GTN15` and `GTN20` from the public `products` array because they have no verified local model folders. Remove the old `hasImages` flag and all GF15 fallback behaviour.

Use this exact public mapping:

| Model | Category | Rating | NEMA | Feature |
|---|---|---|---|---|
| GF15 | `standard` | `15A, 125V` | `5-15R` | `Standard` |
| GF20 | `standard` | `20A, 125V` | `5-20R` | `Standard` |
| GT15 | `tr` | `15A, 125V` | `5-15R` | `TR` |
| GT20 | `tr` | `20A, 125V` | `5-20R` | `TR` |
| GW15 | `wr` | `15A, 125V` | `5-15R` | `TR & WR` |
| GW20 | `wr` | `20A, 125V` | `5-20R` | `TR & WR` |
| GL20 | `blank` | `20A, 125V` | `Blank face` | `Blank face` |

- [ ] **Step 5: Record source provenance**

Create `docs/product-data/gfci-source-map.md` with this content:

```markdown
# GFCI Source Map

| Model | Archived page | Local image folder | Public status | Notes |
|---|---|---|---|---|
| GF15 | `?pro1/151.html` | `01-GFCI Outlet/GF15` | Publish | Product and finish assets present |
| GF20 | `?pro1/167.html` | `01-GFCI Outlet/GF20` | Publish | Product and finish assets present |
| GT15 | `?pro1/168.html` | `01-GFCI Outlet/GT15` | Publish | Product and finish assets present |
| GT20 | `?pro1/169.html` | `01-GFCI Outlet/GT20` | Publish | Product and finish assets present |
| GW15 | `?pro1/170.html` | `01-GFCI Outlet/GW15` | Publish | Product and finish assets present |
| GW20 | `?pro1/171.html` | `01-GFCI Outlet/GW20` | Publish | Product and finish assets present |
| GL20 | `?pro1/172.html` | `01-GFCI Outlet/GL20` | Publish | Product and finish assets present |
| FLB20 | `?pro1/242.html` | No verified folder | Hold | Do not borrow another model image |

Commercial terms such as MOQ, lead time, warranty and warehouse availability require written confirmation before appearing on a product page.
```

- [ ] **Step 6: Run the data test**

Run: `npm test -- src/data/products.test.js`

Expected: 4 tests PASS.

- [ ] **Step 7: Commit the verified data foundation**

```bash
git add docs/product-data/gfci-source-map.md src/data/products.js src/data/products.test.js
git commit -m "feat: verify GFCI product data"
```

---

### Task 2: Add safe product images and fully clickable cards

**Files:**
- Create: `public/assets/images/products/product-placeholder.svg`
- Create: `src/components/SafeImage.jsx`
- Create: `src/components/SafeImage.test.jsx`
- Create: `src/utils/publicAsset.js`
- Create: `src/utils/publicAsset.test.js`
- Create: `src/components/ProductCard.test.jsx`
- Modify: `src/components/ProductCard.jsx`

- [ ] **Step 1: Write failing component tests**

```jsx
// src/components/SafeImage.test.jsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SafeImage from './SafeImage.jsx';

it('replaces a failed image with the controlled placeholder', () => {
  render(<SafeImage src="assets/images/products/missing.webp" alt="GF15 product" />);
  fireEvent.error(screen.getByRole('img', { name: 'GF15 product' }));
  expect(screen.getByRole('img', { name: 'GF15 product' })).toHaveAttribute(
    'src',
    '/assets/images/products/product-placeholder.svg'
  );
});
```

```js
// src/utils/publicAsset.test.js
import { expect, it } from 'vitest';
import { publicAsset } from './publicAsset.js';

it('resolves a logical public asset against the current Vite base path', () => {
  expect(publicAsset('assets/images/products/gf15-main.webp')).toBe('/assets/images/products/gf15-main.webp');
});

it('leaves remote and data URLs unchanged', () => {
  expect(publicAsset('https://example.com/image.webp')).toBe('https://example.com/image.webp');
  expect(publicAsset('data:image/svg+xml;base64,AA==')).toBe('data:image/svg+xml;base64,AA==');
});
```

```jsx
// src/components/ProductCard.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductCard from './ProductCard.jsx';
import { products } from '../data/products.js';

it('uses one full-card link for a product', () => {
  render(<MemoryRouter><ProductCard product={products[0]} /></MemoryRouter>);
  const card = screen.getByRole('link', { name: /GF15/i });
  expect(card).toHaveAttribute('href', '/products/gfci/gf15');
  expect(card).toHaveClass('pcard');
});
```

- [ ] **Step 2: Run the tests and verify failure**

Run: `npm test -- src/utils/publicAsset.test.js src/components/SafeImage.test.jsx src/components/ProductCard.test.jsx`

Expected: FAIL because `SafeImage.jsx` does not exist and `.pcard` is not the complete link.

- [ ] **Step 3: Implement base-safe public asset resolution**

```js
// src/utils/publicAsset.js
export function publicAsset(path = '') {
  if (/^(?:https?:|data:|blob:)/i.test(path)) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  return `${base}${String(path).replace(/^\/+/, '')}`;
}
```

- [ ] **Step 4: Implement the fallback image component**

```jsx
// src/components/SafeImage.jsx
import { useEffect, useState } from 'react';
import { publicAsset } from '../utils/publicAsset.js';

const FALLBACK = 'assets/images/products/product-placeholder.svg';

export default function SafeImage({ src, alt, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK);

  useEffect(() => setCurrentSrc(src || FALLBACK), [src]);

  return (
    <img
      {...props}
      src={publicAsset(currentSrc)}
      alt={alt}
      onError={() => setCurrentSrc(FALLBACK)}
    />
  );
}
```

Create a simple navy/cyan product silhouette SVG at `public/assets/images/products/product-placeholder.svg` with `viewBox="0 0 640 640"`, a light-grey background rectangle and centered outline icon. It must contain no external fonts or linked assets.

- [ ] **Step 5: Make the complete card a link**

```jsx
// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productImage } from '../data/products.js';
import SafeImage from './SafeImage.jsx';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/gfci/${product.sku.toLowerCase()}`}
      className="pcard"
      aria-label={`${product.sku} — ${product.name}`}
    >
      <div className="pcard__media">
        <span className="pcard__tag">{product.feature}</span>
        <SafeImage src={productImage(product.sku, 'card')} alt={`${product.sku} ${product.name}`} loading="lazy" />
      </div>
      <div className="pcard__body">
        <div className="pcard__sku">{product.sku}</div>
        <h3 className="pcard__name">{product.name}</h3>
        <div className="pcard__meta"><span>{product.rating}</span><span>{product.nema === 'Blank face' ? product.nema : `NEMA ${product.nema}`}</span></div>
        <span className="pcard__link">View details <ArrowRight size={15} /></span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 6: Run the component tests**

Run: `npm test -- src/utils/publicAsset.test.js src/components/SafeImage.test.jsx src/components/ProductCard.test.jsx`

Expected: 4 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add public/assets/images/products/product-placeholder.svg src/utils/publicAsset.js src/utils/publicAsset.test.js src/components/SafeImage.jsx src/components/SafeImage.test.jsx src/components/ProductCard.jsx src/components/ProductCard.test.jsx
git commit -m "feat: add resilient clickable product cards"
```

---

### Task 3: Rebuild the product overview around five product families

**Files:**
- Create: `src/data/productFamilies.js`
- Create: `src/pages/ProductsOverview.test.jsx`
- Modify: `src/pages/ProductsOverview.jsx`

- [ ] **Step 1: Write the failing overview contract**

```jsx
// src/pages/ProductsOverview.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductsOverview from './ProductsOverview.jsx';

function renderPage() {
  return render(<MemoryRouter><ProductsOverview /></MemoryRouter>);
}

describe('ProductsOverview', () => {
  it('shows the approved five family entries as complete links', () => {
    renderPage();
    [
      ['GFCI Outlets', '/products/gfci'],
      ['USB & Type-C Outlets', '/products/usb-outlets'],
      ['Receptacles', '/products/receptacles'],
      ['Smart Home Controls', '/products/smart-switches'],
      ['Switches & Dimmers', '/products/dimmers']
    ].forEach(([name, href]) => expect(screen.getByRole('link', { name: new RegExp(name, 'i') })).toHaveAttribute('href', href));
  });

  it('does not repeat the old catalogue-row interface', () => {
    renderPage();
    expect(screen.queryByRole('heading', { name: /Browse by Series and Model/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /One coordinated product platform/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Built for brands and OEM programs/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Specified for real projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Verified manufacturing and compliance/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- src/pages/ProductsOverview.test.jsx`

Expected: FAIL because the current page shows six separate families and catalogue rows.

- [ ] **Step 3: Create the public family dataset**

```js
// src/data/productFamilies.js
export const productFamilies = [
  {
    slug: 'gfci',
    name: 'GFCI Outlets',
    route: '/products/gfci',
    image: 'assets/images/editorial-home/product-gfci.jpg',
    label: 'Ground-fault protection',
    summary: 'Self-test protection for residential, commercial and demanding installation environments.'
  },
  {
    slug: 'usb-outlets',
    name: 'USB & Type-C Outlets',
    route: '/products/usb-outlets',
    image: 'assets/images/editorial-home/product-usb.jpg',
    label: 'In-wall charging',
    summary: 'Integrated charging devices for homes, hospitality and workplace projects.'
  },
  {
    slug: 'receptacles',
    name: 'Receptacles',
    route: '/products/receptacles',
    image: 'assets/images/editorial-home/product-receptacle.jpg',
    label: 'Wiring devices',
    summary: 'Duplex and decorator receptacles with coordinated plates and finish options.'
  },
  {
    slug: 'smart-switches',
    name: 'Smart Home Controls',
    route: '/products/smart-switches',
    image: 'assets/images/editorial-home/product-smart.jpg',
    label: 'Connected control',
    summary: 'Wi-Fi and Zigbee controls designed for coordinated connected-home programs.'
  },
  {
    slug: 'switches-dimmers',
    name: 'Switches & Dimmers',
    route: '/products/dimmers',
    image: 'assets/images/editorial-home/category-switches.jpg',
    label: 'Lighting control',
    summary: 'Switching and dimming platforms for residential and commercial specifications.'
  }
];
```

- [ ] **Step 4: Replace the overview layout**

In `src/pages/ProductsOverview.jsx`, remove the catalogue-row search/index implementation and render these semantic sections in order:

```jsx
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { productFamilies } from '../data/productFamilies.js';
import SafeImage from '../components/SafeImage.jsx';

export default function ProductsOverview() {
  return (
    <>
      <section className="product-overview-hero">
        <div className="container product-overview-hero__inner">
          <div>
            <span className="eyebrow">Coordinated wiring-device platform</span>
            <h1>Build a complete product line from one system.</h1>
            <p>Explore verified protection, charging, receptacle and control platforms for North American programs.</p>
            <Link className="btn btn--primary" to="/products/gfci">Explore GFCI products <ArrowRight size={16} /></Link>
          </div>
          <SafeImage src="assets/images/editorial-home/brand-system-family-final.png" alt="Fahint coordinated wiring-device family" loading="eager" fetchPriority="high" />
        </div>
      </section>

      <section className="product-family-section">
        <div className="container">
          <header className="product-section-heading">
            <span className="eyebrow">Product families</span>
            <h2>One coordinated product platform.</h2>
            <p>Start with a family, then qualify the models, ratings and program options.</p>
          </header>
          <div className="product-family-grid">
            {productFamilies.map((family) => (
              <Link className="product-family-card" to={family.route} key={family.slug} aria-label={family.name}>
                <SafeImage src={family.image} alt={family.name} loading="lazy" />
                <div className="product-family-card__scrim" />
                <div className="product-family-card__body">
                  <span>{family.label}</span><h3>{family.name}</h3><p>{family.summary}</p><ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="product-brand-system">
        <div className="container product-brand-system__inner">
          <SafeImage src="assets/images/company/facility-sampleroom.webp" alt="Fahint coordinated product sample room" loading="lazy" />
          <div><span className="eyebrow">Built as one system</span><h2>Built for brands and OEM programs.</h2><p>Coordinate product selection, finishes, markings, documentation and packaging through one manufacturing partner.</p><Link to="/capabilities" className="textlink">Explore OEM/ODM capability <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="product-market-section">
        <div className="container">
          <header className="product-section-heading"><span className="eyebrow">Application markets</span><h2>Specified for real projects.</h2><p>Product platforms for residential construction, hospitality and commercial installation.</p></header>
          <div className="product-market-grid">
            {[
              ['Residential & renovation', 'assets/images/editorial-home/application-kitchen-v2.png', '/products/gfci'],
              ['Hospitality & multifamily', 'assets/images/editorial-home/application-hotel-v2.png', '/products/usb-outlets'],
              ['Commercial fit-out', 'assets/images/editorial-home/application-commercial-v2.png', '/capabilities']
            ].map(([label, image, route]) => <Link key={label} className="product-market-card" to={route} aria-label={label}><SafeImage src={image} alt={label} loading="lazy" /><span>{label}<ArrowRight size={16} /></span></Link>)}
          </div>
        </div>
      </section>

      <section className="product-evidence-section">
        <div className="container product-evidence-section__grid">
          <SafeImage src="assets/images/company/facility-workshop.webp" alt="Fahint production workshop" loading="lazy" />
          <div><span className="eyebrow">Manufacturing and compliance</span><h2>Verified manufacturing and compliance.</h2><p>Review the production, testing and certification evidence behind the product platform.</p><div className="product-evidence-links"><Link className="textlink" to="/capabilities">Manufacturing capability <ArrowRight size={16} /></Link><Link className="textlink" to="/capabilities">Certification details <ArrowRight size={16} /></Link></div></div>
        </div>
      </section>

      <section className="product-proof-strip">
        <div className="container product-proof-strip__grid">
          {['Verified product platforms', 'Coordinated finishes', 'Compliance documentation', 'Private-label support'].map((item) => <div key={item}><Check size={17} /><span>{item}</span></div>)}
        </div>
      </section>

      <section className="product-overview-cta">
        <div className="container product-overview-cta__inner"><div><span className="eyebrow">Start a program</span><h2>Tell us what your market needs.</h2></div><Link to="/contact" className="btn btn--primary">Request a product proposal <ArrowRight size={16} /></Link></div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Run the overview test**

Run: `npm test -- src/pages/ProductsOverview.test.jsx`

Expected: 2 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/productFamilies.js src/pages/ProductsOverview.jsx src/pages/ProductsOverview.test.jsx
git commit -m "feat: rebuild product family overview"
```

---

### Task 4: Create the dedicated searchable GFCI series page

**Files:**
- Create: `src/pages/GfciSeries.jsx`
- Create: `src/pages/GfciSeries.test.jsx`
- Modify: `src/pages/LineDetail.jsx`
- Modify: `src/main.jsx`

- [ ] **Step 1: Write failing series-page tests**

```jsx
// src/pages/GfciSeries.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import GfciSeries from './GfciSeries.jsx';

function renderPage() {
  return render(<MemoryRouter><GfciSeries /></MemoryRouter>);
}

describe('GfciSeries', () => {
  it('shows all seven verified models', () => {
    renderPage();
    ['GF15', 'GF20', 'GT15', 'GT20', 'GW15', 'GW20', 'GL20'].forEach((sku) => {
      expect(screen.getByRole('link', { name: new RegExp(sku) })).toBeInTheDocument();
    });
    expect(screen.queryByText('FLB20')).not.toBeInTheDocument();
  });

  it('combines search and filters and offers recovery for no results', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.selectOptions(screen.getByLabelText('Amperage'), '20A');
    await user.selectOptions(screen.getByLabelText('Variant'), 'wr');
    expect(screen.getByRole('link', { name: /GW20/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /GW15/ })).not.toBeInTheDocument();
    await user.type(screen.getByRole('searchbox', { name: 'Search GFCI models' }), 'not-a-model');
    expect(screen.getByText('No verified models match these filters.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
  });

  it('exposes filters through a labelled mobile drawer control', async () => {
    const user = userEvent.setup();
    renderPage();
    const toggle = screen.getByRole('button', { name: 'Filter GFCI models' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('search')).toHaveClass('gfci-filter-bar--open');
  });
});
```

- [ ] **Step 2: Run the series test and verify failure**

Run: `npm test -- src/pages/GfciSeries.test.jsx`

Expected: FAIL because `GfciSeries.jsx` does not exist.

- [ ] **Step 3: Implement the series page**

Create `src/pages/GfciSeries.jsx` with:

- a compact deep-navy GFCI hero;
- controlled `query`, `amperage`, `variant` and verified `application` state;
- controlled `filtersOpen` state for the mobile filter drawer;
- `filterGfciProducts(products, filters)` for results;
- four labelled controls: search, amperage, variant and application;
- an `aria-live="polite"` result count;
- a `ProductCard` grid;
- a horizontally scrollable comparison table with `Model`, `Rating`, `NEMA`, `Variant` and `Application` columns;
- a three-column engineering proof section using `Self-test protection`, `Reverse-wiring lockout` and `Verified GFCI platform`;
- an application image section using `assets/images/editorial-home/application-kitchen-v2.png`;
- an OEM configuration section listing verified options only as `Finish coordination`, `Brand marking`, `Packaging coordination` and `Documentation support`;
- a final link to `/contact`.

Use this exact control markup so labels and recovery remain accessible. CSS hides the toggle above 768px; the filter bar remains visible on desktop regardless of `filtersOpen`:

```jsx
<button
  type="button"
  className="gfci-filter-toggle"
  aria-expanded={filtersOpen}
  aria-controls="gfci-filters"
  onClick={() => setFiltersOpen((open) => !open)}
>
  Filter GFCI models
</button>
<div id="gfci-filters" className={`gfci-filter-bar${filtersOpen ? ' gfci-filter-bar--open' : ''}`} role="search">
  <label>Search models<input type="search" aria-label="Search GFCI models" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
  <label>Amperage<select aria-label="Amperage" value={amperage} onChange={(event) => setAmperage(event.target.value)}><option value="">All</option><option value="15A">15A</option><option value="20A">20A</option></select></label>
  <label>Variant<select aria-label="Variant" value={variant} onChange={(event) => setVariant(event.target.value)}><option value="">All</option><option value="standard">Standard</option><option value="tr">TR</option><option value="wr">WR</option><option value="blank">Blank face</option></select></label>
  <label>Application<select aria-label="Application" value={application} onChange={(event) => setApplication(event.target.value)}><option value="">All</option><option value="residential">Residential</option><option value="commercial">Commercial</option></select></label>
</div>
```

For the empty state, render:

```jsx
<div className="gfci-empty" role="status">
  <h2>No verified models match these filters.</h2>
  <p>Clear the filters or contact sales for help matching a specification.</p>
  <button type="button" className="btn btn--ghost" onClick={clearFilters}>Clear filters</button>
  <Link className="textlink" to="/contact">Contact sales <ArrowRight size={15} /></Link>
</div>
```

Assemble the page with this complete component; keep the filter markup above unchanged inside it:

```jsx
// src/pages/GfciSeries.jsx
import { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import SafeImage from '../components/SafeImage.jsx';
import { filterGfciProducts, products } from '../data/products.js';

const engineeringProof = [
  ['Self-test protection', 'Automatic protection monitoring on the verified GFCI platform.'],
  ['Reverse-wiring lockout', 'Line/load reversal prevents power at the receptacle face.'],
  ['Verified GFCI platform', 'UL / cUL listed GFCI range under file E504391.']
];

export default function GfciSeries() {
  const [query, setQuery] = useState('');
  const [amperage, setAmperage] = useState('');
  const [variant, setVariant] = useState('');
  const [application, setApplication] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filters = { query, amperage, variant, application };
  const results = useMemo(() => filterGfciProducts(products, filters), [query, amperage, variant, application]);
  const clearFilters = () => { setQuery(''); setAmperage(''); setVariant(''); setApplication(''); };

  return (
    <>
      <section className="gfci-series-hero"><div className="container"><span className="eyebrow">GFCI product family</span><h1>Verified protection for residential and commercial programs.</h1><p>Compare seven published models, then confirm the finish and program requirements for your market.</p></div></section>

      <section className="gfci-catalogue"><div className="container">
        <header className="product-section-heading"><span className="eyebrow">Model finder</span><h2>Find the right GFCI model.</h2></header>
        <button type="button" className="gfci-filter-toggle" aria-expanded={filtersOpen} aria-controls="gfci-filters" onClick={() => setFiltersOpen((open) => !open)}>Filter GFCI models</button>
        <div id="gfci-filters" className={`gfci-filter-bar${filtersOpen ? ' gfci-filter-bar--open' : ''}`} role="search">
          <label>Search models<input type="search" aria-label="Search GFCI models" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <label>Amperage<select aria-label="Amperage" value={amperage} onChange={(event) => setAmperage(event.target.value)}><option value="">All</option><option value="15A">15A</option><option value="20A">20A</option></select></label>
          <label>Variant<select aria-label="Variant" value={variant} onChange={(event) => setVariant(event.target.value)}><option value="">All</option><option value="standard">Standard</option><option value="tr">TR</option><option value="wr">WR</option><option value="blank">Blank face</option></select></label>
          <label>Application<select aria-label="Application" value={application} onChange={(event) => setApplication(event.target.value)}><option value="">All</option><option value="residential">Residential</option><option value="commercial">Commercial</option></select></label>
        </div>
        <p className="gfci-result-count" aria-live="polite">{results.length} verified {results.length === 1 ? 'model' : 'models'}</p>
        {results.length > 0 ? <div className="gfci-product-grid">{results.map((product) => <ProductCard key={product.sku} product={product} />)}</div> : <div className="gfci-empty" role="status"><h2>No verified models match these filters.</h2><p>Clear the filters or contact sales for help matching a specification.</p><button type="button" className="btn btn--ghost" onClick={clearFilters}>Clear filters</button><Link className="textlink" to="/contact">Contact sales <ArrowRight size={15} /></Link></div>}
      </div></section>

      <section className="product-story product-story--surface"><div className="container"><header className="product-section-heading"><span className="eyebrow">Compare models</span><h2>Essential selection details.</h2></header><div className="gfci-comparison"><table><thead><tr><th>Model</th><th>Rating</th><th>NEMA</th><th>Variant</th><th>Application</th></tr></thead><tbody>{products.map((product) => <tr key={product.sku}><th scope="row"><Link to={`/products/gfci/${product.sku.toLowerCase()}`}>{product.sku}</Link></th><td>{product.rating}</td><td>{product.nema}</td><td>{product.feature}</td><td>{product.grade}</td></tr>)}</tbody></table></div></div></section>

      <section className="product-story product-story--dark"><div className="container"><header className="product-section-heading"><span className="eyebrow">Engineering proof</span><h2>Protection built on one verified platform.</h2></header><div className="gfci-proof-grid">{engineeringProof.map(([title, body]) => <article key={title}><Check size={18} /><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

      <section className="product-story product-story--light"><div className="container product-story__split product-story__split--reverse"><SafeImage src="assets/images/editorial-home/application-kitchen-v2.png" alt="GFCI outlet in a kitchen application" loading="lazy" /><div><span className="eyebrow">Applications</span><h2>Protection specified where power meets daily life.</h2><p>Match each verified model, rating and variant to the documented requirements for the intended project.</p><Link className="textlink" to="/contact">Match a model to your project <ArrowRight size={16} /></Link></div></div></section>

      <section className="product-story product-story--warm"><div className="container"><header className="product-section-heading"><span className="eyebrow">OEM / ODM configuration</span><h2>Configure a coordinated GFCI program.</h2></header><ul className="gfci-oem-list">{['Finish coordination', 'Brand marking', 'Packaging coordination', 'Documentation support'].map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><Link className="btn btn--primary" to="/contact">Discuss your GFCI program <ArrowRight size={16} /></Link></div></section>
    </>
  );
}
```

- [ ] **Step 4: Route GFCI to the dedicated page**

In `src/main.jsx`, import `GfciSeries` and add:

```jsx
<Route path="/products/gfci" element={<GfciSeries />} />
<Route path="/products/gfci/:sku" element={<ProductDetail />} />
<Route path="/products/:line" element={<LineDetail />} />
```

In `src/pages/LineDetail.jsx`, delete `GfciBody`, its product imports and the `line.detailed` branch. `LineDetail` should always render `GenericBody` for remaining family routes.

- [ ] **Step 5: Extract route focus management and test it**

Create `src/components/RouteFocusManager.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import RouteFocusManager from './RouteFocusManager.jsx';

function Harness() {
  const navigate = useNavigate();
  return <><RouteFocusManager /><button onClick={() => navigate('/next')}>Next page</button><main id="main-content" tabIndex="-1" /></>;
}

beforeEach(() => {
  vi.stubGlobal('requestAnimationFrame', (callback) => callback());
  vi.stubGlobal('scrollTo', vi.fn());
});
afterEach(() => vi.unstubAllGlobals());

it('moves keyboard focus to main content after a route change', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><Harness /></MemoryRouter>);
  await user.click(screen.getByRole('button', { name: 'Next page' }));
  expect(document.getElementById('main-content')).toHaveFocus();
});
```

Create `src/components/RouteFocusManager.jsx`:

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteFocusManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }));
  }, [pathname, hash]);

  return null;
}
```

In `src/main.jsx`, delete the local `ScrollManager`, import and render `RouteFocusManager`, and change `<main>` to `<main id="main-content" tabIndex="-1">`.

- [ ] **Step 6: Run series and routing-adjacent tests**

Run: `npm test -- src/pages/GfciSeries.test.jsx src/pages/ProductsOverview.test.jsx src/components/ProductCard.test.jsx src/components/RouteFocusManager.test.jsx`

Expected: all selected tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/pages/GfciSeries.jsx src/pages/GfciSeries.test.jsx src/pages/LineDetail.jsx src/components/RouteFocusManager.jsx src/components/RouteFocusManager.test.jsx src/main.jsx
git commit -m "feat: add dedicated GFCI series page"
```

---

### Task 5: Build the brand-led product hero and gallery

**Files:**
- Create: `src/components/products/ProductGallery.jsx`
- Create: `src/components/products/ProductGallery.test.jsx`
- Create: `src/components/products/ProductDetailHero.jsx`
- Create: `src/pages/ProductDetail.test.jsx`
- Modify: `src/pages/ProductDetail.jsx`

- [ ] **Step 1: Write failing gallery and detail tests**

```jsx
// src/components/products/ProductGallery.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ProductGallery from './ProductGallery.jsx';
import { products } from '../../data/products.js';

it('changes the main image when a verified finish is selected', async () => {
  const user = userEvent.setup();
  render(<ProductGallery product={products[0]} />);
  await user.click(screen.getByRole('button', { name: 'Show GF15 in Black' }));
  expect(screen.getByRole('img', { name: 'GF15 selected product view' })).toHaveAttribute(
    'src',
    '/assets/images/products/gf15-black.webp'
  );
});
```

```jsx
// src/pages/ProductDetail.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductDetail from './ProductDetail.jsx';

function renderDetail(path = '/products/gfci/gf15') {
  return render(<MemoryRouter initialEntries={[path]}><Routes><Route path="/products/gfci/:sku" element={<ProductDetail />} /></Routes></MemoryRouter>);
}

it('prioritizes model, verified facts and inquiry in the hero', () => {
  renderDetail();
  expect(screen.getByRole('heading', { name: '15A Self-Test GFCI Receptacle' })).toBeInTheDocument();
  expect(screen.getByText('GF15', { selector: '.product-detail-hero__model' })).toBeInTheDocument();
  expect(screen.getByText('15A, 125V')).toBeInTheDocument();
  expect(screen.getByText('NEMA 5-15R')).toBeInTheDocument();
  expect(screen.getByText(/UL \/ cUL listed · file E504391/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Request a quote/i })).toHaveAttribute('href', '#inquiry');
});
```

- [ ] **Step 2: Run the tests and verify failure**

Run: `npm test -- src/components/products/ProductGallery.test.jsx src/pages/ProductDetail.test.jsx`

Expected: FAIL because the new gallery and hero hierarchy do not exist.

- [ ] **Step 3: Implement `ProductGallery`**

`ProductGallery.jsx` must:

- initialize from `product.assets.hero`;
- reset when `product.sku` changes;
- display five thumbnail buttons from `product.assets.gallery`;
- display one button per finish from `colors`;
- change the selected image to `productFinishImage(product.sku, finish.slug)`;
- open the selected image in a native `<dialog>` or accessible modal when the main image button is activated;
- close by button and Escape;
- use `SafeImage` for every image.

Use these exact accessible names:

```jsx
<SafeImage src={selectedImage} alt={`${product.sku} selected product view`} />
<button aria-label={`View ${product.sku} image ${index + 1}`} ... />
<button aria-label={`Show ${product.sku} in ${finish.name}`} aria-pressed={selectedFinish === finish.slug} ... />
<button aria-label="Close enlarged product image" ... />
```

Use this complete component:

```jsx
// src/components/products/ProductGallery.jsx
import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { colors, productFinishImage } from '../../data/products.js';
import SafeImage from '../SafeImage.jsx';

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.assets.hero);
  const [selectedFinish, setSelectedFinish] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    setSelectedImage(product.assets.hero);
    setSelectedFinish('');
  }, [product]);

  const chooseGalleryImage = (image) => {
    setSelectedImage(image);
    setSelectedFinish('');
  };

  const chooseFinish = (finish) => {
    setSelectedFinish(finish.slug);
    setSelectedImage(productFinishImage(product.sku, finish.slug));
  };

  return (
    <div className="product-gallery">
      <button className="product-gallery__main" type="button" onClick={() => dialogRef.current?.showModal()}>
        <SafeImage src={selectedImage} alt={`${product.sku} selected product view`} loading="eager" fetchPriority="high" />
        <span><Maximize2 size={16} /> Enlarge</span>
      </button>
      <div className="product-gallery__thumbs" aria-label={`${product.sku} image gallery`}>
        {product.assets.gallery.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label={`View ${product.sku} image ${index + 1}`}
            aria-pressed={selectedImage === image}
            onClick={() => chooseGalleryImage(image)}
          >
            <SafeImage src={image} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      <div className="product-gallery__finishes" aria-label={`${product.sku} finishes`}>
        {colors.map((finish) => (
          <button
            key={finish.slug}
            type="button"
            aria-label={`Show ${product.sku} in ${finish.name}`}
            aria-pressed={selectedFinish === finish.slug}
            onClick={() => chooseFinish(finish)}
          >
            <span style={{ background: finish.hex }} />{finish.name}
          </button>
        ))}
      </div>
      <dialog className="product-gallery__dialog" ref={dialogRef} onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}>
        <button type="button" aria-label="Close enlarged product image" onClick={() => dialogRef.current?.close()}><X /></button>
        <SafeImage src={selectedImage} alt={`${product.sku} enlarged product view`} />
      </dialog>
    </div>
  );
}
```

- [ ] **Step 4: Implement `ProductDetailHero`**

`ProductDetailHero.jsx` receives `product` and uses the verified company UL file rather than a generic certification promise:

```jsx
// src/components/products/ProductDetailHero.jsx
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { company } from '../../data/company.js';
import ProductGallery from './ProductGallery.jsx';

export default function ProductDetailHero({ product }) {
  return (
<section className="product-detail-hero">
  <div className="container product-detail-hero__grid">
    <ProductGallery product={product} />
    <div className="product-detail-hero__copy">
      <span className="product-detail-hero__model">{product.sku}</span>
      <h1>{product.name}</h1>
      <p>{product.summary}</p>
      <dl className="product-key-facts">
        <div><dt>Rating</dt><dd>{product.rating}</dd></div>
        <div><dt>Configuration</dt><dd>{product.nema === 'Blank face' ? product.nema : `NEMA ${product.nema}`}</dd></div>
        <div><dt>Variant</dt><dd>{product.feature}</dd></div>
        <div><dt>Application</dt><dd>{product.grade}</dd></div>
      </dl>
      <div className="product-detail-hero__actions">
        <a className="btn btn--primary" href="#inquiry">Request a quote <ArrowRight size={16} /></a>
        <a className="btn btn--ghost" href="#technical-details">Technical details</a>
      </div>
      <p className="product-detail-hero__cert"><ShieldCheck size={17} /> UL / cUL listed · file {company.ulFile}</p>
    </div>
  </div>
</section>
  );
}
```

- [ ] **Step 5: Compose the new top of `ProductDetail`**

Keep the existing unknown-SKU redirect. Replace the old `page-banner` and `pd-layout` with breadcrumb navigation followed by `<ProductDetailHero product={product} />`. Leave the current lower sections temporarily below it so every commit stays deployable.

- [ ] **Step 6: Run tests**

Run: `npm test -- src/components/products/ProductGallery.test.jsx src/pages/ProductDetail.test.jsx`

Expected: 2 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/products/ProductGallery.jsx src/components/products/ProductGallery.test.jsx src/components/products/ProductDetailHero.jsx src/pages/ProductDetail.jsx src/pages/ProductDetail.test.jsx
git commit -m "feat: add premium GFCI product hero"
```

---

### Task 6: Add product story, technical proof and claim safety

**Files:**
- Create: `src/components/products/ProductStorySections.jsx`
- Create: `src/components/products/ProductTechnicalSections.jsx`
- Modify: `src/pages/ProductDetail.jsx`
- Modify: `src/pages/ProductDetail.test.jsx`

- [ ] **Step 1: Extend the failing detail-page contract**

Add these tests to `src/pages/ProductDetail.test.jsx`:

```jsx
it('renders brand story, technical proof, manufacturing evidence and related products', () => {
  renderDetail();
  expect(screen.getByRole('heading', { name: /Protection engineered for everyday installation/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Configure the product around your program/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Technical specifications/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Wiring and dimensions/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Manufacturing evidence/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Other verified GFCI models/i })).toBeInTheDocument();
});

it('does not publish unverified commercial promises on the product page', () => {
  renderDetail();
  expect(screen.queryByText(/3 years/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/400 cartons/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/within 6 hours/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/warehouse stock/i)).not.toBeInTheDocument();
});

it('provides compact disclosure rows for mobile technical details', () => {
  renderDetail();
  expect(screen.getByText('Rating', { selector: '.product-spec-mobile summary' })).toBeInTheDocument();
  expect(screen.getByText('Certification', { selector: '.product-spec-mobile summary' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the detail test and verify failure**

Run: `npm test -- src/pages/ProductDetail.test.jsx`

Expected: FAIL because the approved section hierarchy is not present and the old page still contains unverified commercial promises.

- [ ] **Step 3: Implement the story sections**

Create `ProductStorySections.jsx` with three exported sections:

1. `ProductFeatureStory` — uses `product.assets.feature`, `product.highlights` and at most four items from `product.features`.
2. `ProductApplicationStory` — uses `product.assets.gallery` lifestyle image and the product's verified `grade` and summary.
3. `ProductOemStory` — uses finish thumbnails plus these four non-quantified capabilities: finish coordination, approved brand marking, packaging coordination and documentation support. Its action links to `/contact` with the product model in the query string.

Headings must be exactly:

```jsx
<h2>Protection engineered for everyday installation.</h2>
<h2>Designed for the environments in the specification.</h2>
<h2>Configure the product around your program.</h2>
```

Use this complete module:

```jsx
// src/components/products/ProductStorySections.jsx
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { colors, productFinishImage } from '../../data/products.js';
import SafeImage from '../SafeImage.jsx';

export function ProductFeatureStory({ product }) {
  return (
    <section className="product-story product-story--dark">
      <div className="container product-story__split">
        <SafeImage src={product.assets.feature} alt={`${product.sku} protection features`} loading="lazy" />
        <div><span className="eyebrow">Product engineering</span><h2>Protection engineered for everyday installation.</h2><p>{product.summary}</p><ul>{product.features.slice(0, 4).map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></div>
      </div>
    </section>
  );
}

export function ProductApplicationStory({ product }) {
  return (
    <section className="product-story product-story--light">
      <div className="container product-story__split product-story__split--reverse">
        <SafeImage src={product.assets.gallery[4]} alt={`${product.sku} application environment`} loading="lazy" />
        <div><span className="eyebrow">Application</span><h2>Designed for the environments in the specification.</h2><p><strong>{product.grade}</strong></p><p>{product.summary}</p><Link className="textlink" to="/contact">Match a model to your project <ArrowRight size={16} /></Link></div>
      </div>
    </section>
  );
}

export function ProductOemStory({ product }) {
  const options = ['Finish coordination', 'Approved brand marking', 'Packaging coordination', 'Documentation support'];
  return (
    <section className="product-story product-story--warm">
      <div className="container">
        <header className="product-section-heading"><span className="eyebrow">OEM / ODM configuration</span><h2>Configure the product around your program.</h2><p>Select verified product options, then confirm commercial terms through a quotation.</p></header>
        <div className="product-oem-grid">
          <div className="product-oem-finishes">{colors.map((finish) => <SafeImage key={finish.slug} src={productFinishImage(product.sku, finish.slug)} alt={`${product.sku} in ${finish.name}`} loading="lazy" />)}</div>
          <ul>{options.map((option) => <li key={option}><Check size={16} />{option}</li>)}</ul>
        </div>
        <Link className="btn btn--primary" to={`/contact?model=${product.sku}`}>Discuss a configured program <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement technical and trust sections**

Create `ProductTechnicalSections.jsx` and export:

- `ProductSpecifications` — one semantic desktop `<table>` plus mobile `<details>` disclosure rows from the same data array, with Item code, Rating, NEMA configuration, Variant, Application grade, Standard, Certification, Face dimensions and Body depth. Do not include warranty.
- `ProductInstallation` — two `SafeImage` blocks using `product.assets.installation` and `product.assets.dimensions`.
- `ProductCertification` — uses `assets/images/certs/ul-gfci.webp`, identifies `UL / cUL — GFCI Receptacles`, and links to `/capabilities`; render a direct download only when a verified `product.documents` item exists.
- `ProductManufacturingProof` — three images from `facility-workshop.webp`, `facility-lab.webp` and `facility-sampleroom.webp`, labelled Production, Testing and Sample review.

Use `id="technical-details"` on the specification section and the exact headings `Technical specifications.`, `Wiring and dimensions.`, and `Manufacturing evidence.`.

Use this complete module:

```jsx
// src/components/products/ProductTechnicalSections.jsx
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { company } from '../../data/company.js';
import SafeImage from '../SafeImage.jsx';

export function ProductSpecifications({ product }) {
  const faceDimensions = [product.dimensions?.face, product.dimensions?.width].filter(Boolean).join(' × ');
  const rows = [
    ['Item code', product.sku], ['Rating', product.rating], ['NEMA configuration', product.nema],
    ['Variant', product.feature], ['Application grade', product.grade], ['Standard', 'UL 943 5th Edition 2018, Class A'],
    ['Certification', `UL / cUL listed, file ${company.ulFile}`],
    ['Face dimensions', faceDimensions], ['Body depth', product.dimensions?.depth]
  ].filter(([, value]) => value);
  return (
    <section className="product-story product-story--light" id="technical-details">
      <div className="container">
        <header className="product-section-heading"><span className="eyebrow">Technical details</span><h2>Technical specifications.</h2></header>
        <div className="product-technical-table"><table><tbody>{rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table></div>
        <div className="product-spec-mobile">
          {rows.map(([label, value]) => <details key={label}><summary>{label}</summary><p>{value}</p></details>)}
        </div>
      </div>
    </section>
  );
}

export function ProductInstallation({ product }) {
  return <section className="product-story"><div className="container"><header className="product-section-heading"><span className="eyebrow">Installation</span><h2>Wiring and dimensions.</h2></header><div className="product-install-grid"><figure><SafeImage src={product.assets.installation} alt={`${product.sku} wiring and installation`} loading="lazy" /><figcaption>Wiring and installation</figcaption></figure><figure><SafeImage src={product.assets.dimensions} alt={`${product.sku} dimensions`} loading="lazy" /><figcaption>Product dimensions</figcaption></figure></div></div></section>;
}

export function ProductCertification({ product }) {
  return <section className="product-story product-story--surface"><div className="container product-certification"><SafeImage src="assets/images/certs/ul-gfci.webp" alt="UL GFCI certificate" loading="lazy" /><div><span className="eyebrow">Compliance</span><h2>Certification your team can verify.</h2><p>UL / cUL — GFCI Receptacles · file {company.ulFile}</p>{product.documents?.length > 0 && <details className="product-documents"><summary>Verified downloads</summary>{product.documents.map((document) => <a key={document.href} className="textlink" href={document.href} download><Download size={16} />{document.label}</a>)}</details>}<Link className="textlink" to="/capabilities">View certification details <ArrowRight size={16} /></Link></div></div></section>;
}

export function ProductManufacturingProof() {
  const proof = [
    ['Production', 'assets/images/company/facility-workshop.webp'],
    ['Testing', 'assets/images/company/facility-lab.webp'],
    ['Sample review', 'assets/images/company/facility-sampleroom.webp']
  ];
  return <section className="product-story product-story--dark"><div className="container"><header className="product-section-heading"><span className="eyebrow">Factory evidence</span><h2>Manufacturing evidence.</h2></header><div className="product-proof-gallery">{proof.map(([label, image]) => <figure key={label}><SafeImage src={image} alt={`Fahint ${label.toLowerCase()}`} loading="lazy" /><figcaption>{label}</figcaption></figure>)}</div></div></section>;
}
```

- [ ] **Step 5: Replace the old detail body**

In `ProductDetail.jsx`, compose in this order:

```jsx
<ProductDetailHero product={product} />
<ProductFeatureStory product={product} />
<ProductApplicationStory product={product} />
<ProductOemStory product={product} />
<ProductSpecifications product={product} />
<ProductInstallation product={product} />
<ProductCertification product={product} />
<ProductManufacturingProof />
<RelatedProducts products={related} heading="Other verified GFCI models." />
<ProductInquiry product={product} />
<a className="product-mobile-quote" href="#inquiry">Request quote for {product.sku}</a>
```

`RelatedProducts` and `ProductInquiry` may remain local functions in `ProductDetail.jsx`; they must use `ProductCard` and `InquiryForm defaultModel={product.sku}` respectively. Delete old warranty, MOQ, response-time and warehouse claims.

Define them exactly as follows:

```jsx
function RelatedProducts({ products: related, heading }) {
  return <section className="product-story product-story--surface"><div className="container"><header className="product-section-heading"><span className="eyebrow">Related products</span><h2>{heading}</h2></header><div className="gfci-product-grid">{related.map((item) => <ProductCard key={item.sku} product={item} />)}</div></div></section>;
}

function ProductInquiry({ product }) {
  return <section className="product-inquiry" id="inquiry"><div className="container product-inquiry__grid"><div><span className="eyebrow">Start a project</span><h2>Request a quotation for {product.sku}.</h2><p>Share the market, quantity and configuration you need. Commercial terms are confirmed by quotation.</p></div><InquiryForm defaultModel={product.sku} title="Send a product brief" /></div></section>;
}
```

The mobile quote link is hidden above 700px and remains clear of the existing separate floating-action rail on small screens.

- [ ] **Step 6: Run detail tests**

Run: `npm test -- src/pages/ProductDetail.test.jsx`

Expected: all detail tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/products/ProductStorySections.jsx src/components/products/ProductTechnicalSections.jsx src/pages/ProductDetail.jsx src/pages/ProductDetail.test.jsx
git commit -m "feat: add GFCI product story and technical proof"
```

---

### Task 7: Make the inquiry form accessible and recoverable

**Files:**
- Create: `src/components/InquiryForm.test.jsx`
- Modify: `src/components/InquiryForm.jsx`

- [ ] **Step 1: Write failing inquiry tests**

```jsx
// src/components/InquiryForm.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import InquiryForm, { validateInquiry } from './InquiryForm.jsx';

describe('InquiryForm', () => {
  it('preselects the product model', () => {
    render(<InquiryForm defaultModel="GF15" />);
    expect(screen.getByLabelText('Model of interest')).toHaveValue('GF15');
  });

  it('returns clear validation messages', () => {
    expect(validateInquiry({ name: '', email: 'bad', message: '' })).toEqual({
      name: 'Enter your name.',
      email: 'Enter a valid business email.',
      message: 'Describe the product or project you need.'
    });
  });

  it('focuses the first invalid field after submit', async () => {
    const user = userEvent.setup();
    render(<InquiryForm defaultModel="GF15" />);
    await user.click(screen.getByRole('button', { name: /Send inquiry/i }));
    expect(screen.getByLabelText('Your name *')).toHaveFocus();
    expect(screen.getByRole('alert')).toHaveTextContent('Please correct the highlighted fields.');
  });

  it('announces successful handoff and blocks duplicate delivery', async () => {
    const user = userEvent.setup();
    const delivery = vi.fn();
    render(<InquiryForm defaultModel="GF15" delivery={delivery} />);
    await user.type(screen.getByLabelText('Your name *'), 'Jane Buyer');
    await user.type(screen.getByLabelText('Business email *'), 'jane@example.com');
    await user.type(screen.getByLabelText('Requirements *'), 'Quote this model');
    await user.click(screen.getByRole('button', { name: /Send inquiry/i }));
    expect(delivery).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent('Your email app should now be open');
  });

  it('provides a recovery path when email handoff fails', async () => {
    const user = userEvent.setup();
    const delivery = vi.fn(() => { throw new Error('blocked'); });
    render(<InquiryForm defaultModel="GF15" delivery={delivery} />);
    await user.type(screen.getByLabelText('Your name *'), 'Jane Buyer');
    await user.type(screen.getByLabelText('Business email *'), 'jane@example.com');
    await user.type(screen.getByLabelText('Requirements *'), 'Quote this model');
    await user.click(screen.getByRole('button', { name: /Send inquiry/i }));
    expect(screen.getByRole('alert')).toHaveTextContent('We could not open your email app');
    expect(screen.getByRole('link', { name: /email us directly/i })).toHaveAttribute('href', 'mailto:louis@fahint.com');
  });
});
```

- [ ] **Step 2: Run the tests and verify failure**

Run: `npm test -- src/components/InquiryForm.test.jsx`

Expected: FAIL because `validateInquiry` is missing and the form relies only on native validation.

- [ ] **Step 3: Add explicit validation**

Export this function from `InquiryForm.jsx`:

```js
export function validateInquiry(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Enter a valid business email.';
  if (!form.message.trim()) errors.message = 'Describe the product or project you need.';
  return errors;
}
```

Add a pure mailto builder so transport content remains testable:

```js
export function buildMailtoUrl(form) {
  const subject = encodeURIComponent(`Product inquiry from ${form.company || form.name || 'website visitor'}`);
  const body = encodeURIComponent([
    `Name: ${form.name}`, `Email: ${form.email}`, `Company: ${form.company}`,
    `Country: ${form.country}`, `Model of interest: ${form.model || 'Not specified'}`,
    `Estimated quantity: ${form.quantity || 'Not specified'}`, '', 'Requirements:', form.message
  ].join('\n'));
  return `mailto:${company.email}?subject=${subject}&body=${body}`;
}
```

Update the signature to `InquiryForm({ defaultModel = '', title = 'Send a message', delivery = (url) => window.location.assign(url) })`. Use `noValidate`, `errors`, `status`, `isSubmitting` and a `formRef`, and make `submit` an `async` function. On submit:

```js
const nextErrors = validateInquiry(form);
if (Object.keys(nextErrors).length > 0) {
  setErrors(nextErrors);
  requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
  return;
}
setIsSubmitting(true);
setStatus('');
try {
  await delivery(buildMailtoUrl(form));
  setStatus('success');
} catch {
  setStatus('error');
} finally {
  setIsSubmitting(false);
}
```

Each invalid field gets `aria-invalid`, `aria-describedby` and an adjacent `<span className="field-error" id="f-name-error">…</span>`. The summary uses `<div className="alert alert--error" role="alert">Please correct the highlighted fields.</div>`.

Add autocomplete values:

- name: `name`;
- email: `email`;
- company: `organization`;
- country: `country-name`.

Disable the submit button while `isSubmitting` is true. Render success with `<div role="status" className="alert alert--ok">Your email app should now be open with the inquiry pre-filled.</div>`. Render failure with `<div role="alert" className="alert alert--error">We could not open your email app. <a href={`mailto:${company.email}`}>Email us directly</a> or try again.</div>`. Keep the model preselection.

- [ ] **Step 4: Run inquiry tests**

Run: `npm test -- src/components/InquiryForm.test.jsx`

Expected: 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/InquiryForm.jsx src/components/InquiryForm.test.jsx
git commit -m "feat: improve product inquiry validation"
```

---

### Task 8: Apply the premium industrial product visual system

**Files:**
- Create: `src/styles/product-experience.css`
- Modify: `src/main.jsx`
- Modify: `src/pages/ProductsOverview.test.jsx`

- [ ] **Step 1: Add a failing stylesheet contract**

Add this test to `ProductsOverview.test.jsx`:

```jsx
import { readFileSync } from 'node:fs';

it('defines restrained motion and the required product breakpoints', () => {
  const css = readFileSync('src/styles/product-experience.css', 'utf8');
  expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
  expect(css).toMatch(/@media \(max-width:\s*1024px\)/);
  expect(css).toMatch(/@media \(max-width:\s*768px\)/);
  expect(css).toMatch(/@media \(max-width:\s*700px\)/);
  expect(css).toMatch(/min-height:\s*44px/);
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/pages/ProductsOverview.test.jsx`

Expected: FAIL because `src/styles/product-experience.css` does not exist.

- [ ] **Step 3: Create product design tokens and shared section rules**

Start `src/styles/product-experience.css` with:

```css
:root {
  --product-navy: #061a36;
  --product-navy-soft: #0d294d;
  --product-cyan: #47b4de;
  --product-ink: #071326;
  --product-muted: #617086;
  --product-surface: #f1f5f7;
  --product-warm: #ece8e1;
  --product-line: rgba(7, 28, 55, 0.12);
  --product-section-y: clamp(76px, 7vw, 128px);
  --product-gap: clamp(24px, 3vw, 48px);
}

.product-section-heading { max-width: 760px; margin-bottom: clamp(36px, 4vw, 64px); }
.product-section-heading h2 { max-width: 720px; font-size: clamp(38px, 5vw, 72px); line-height: .98; letter-spacing: -.045em; }
.product-section-heading p { max-width: 620px; color: var(--product-muted); font-size: clamp(16px, 1.3vw, 19px); line-height: 1.7; }
```

Implement these named layouts in the same file:

- `.product-overview-hero` and `__inner`: deep navy, two columns, large image, minimum 720px desktop height.
- `.product-family-grid`: two-column editorial mosaic; first card spans two columns at wide desktop, all cards are full links.
- `.product-family-card`: 420–520px visual height, dark scrim, restrained hover image scale `1.025`.
- `.product-brand-system__inner`: 50/50 image-copy split on light warm surface.
- `.product-market-grid` and `.product-evidence-section__grid`: three editorial application cards followed by a balanced manufacturing-evidence split, both aligned to the shared container.
- `.gfci-series-hero`: compact deep-navy hero with no more than two heading lines.
- `.gfci-filter-toggle`: hidden on desktop and rendered as a 44px outlined control at 768px and below.
- `.gfci-filter-bar`: sticky below the header on desktop, four labelled controls, 48px input height; at mobile width it is a collapsed drawer until `.gfci-filter-bar--open` is present.
- `.gfci-product-grid`: four columns at 1440px+, three at 1025–1439px, two at 701–1024px, one at 700px and below.
- `.gfci-comparison`: semantic table with horizontal overflow and a visible focus state on linked model codes.
- `.gfci-proof-grid` and `.gfci-oem-list`: three-column proof cards and four concise configuration items; collapse cleanly at tablet width.
- `.pcard`: grid rows `minmax(0, 1fr) auto`, no strong shadow, complete focus outline, `min-height: 44px` on interactive affordances.
- `.product-detail-hero__grid`: `minmax(0, 1.08fr) minmax(420px, .92fr)` with 55/45 visual balance.
- `.product-gallery`: warm-grey media surface, five thumbnails, finish controls.
- `.product-key-facts`: two-column definition list.
- `.product-story`: alternating light, dark and image-led sections with `var(--product-section-y)` padding.
- `.product-technical-table`: readable grouped rows on desktop; hidden at 700px and below.
- `.product-spec-mobile`: hidden on desktop; visible at 700px and below as bordered `<details>` disclosure rows with 44px minimum summaries.
- `.product-documents`: a bordered disclosure with a 44px minimum summary and direct, ungated download links.
- `.product-inquiry`: deep navy section that transitions directly into the existing footer.
- `.product-mobile-quote`: hidden on desktop; fixed inside the mobile safe area with `left: 16px`, `right: 78px`, `bottom: calc(16px + env(safe-area-inset-bottom, 0px))` and `min-height: 44px`.
- `.field-error` and `.alert--error`: accessible error colours with visible contrast.

- [ ] **Step 4: Add responsive and motion rules**

Use these exact breakpoints and behaviours:

```css
@media (max-width: 1024px) {
  .product-overview-hero__inner,
  .product-brand-system__inner,
  .product-detail-hero__grid { grid-template-columns: 1fr; }
  .gfci-product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  .product-family-grid { grid-template-columns: 1fr; }
  .product-family-card:first-child { grid-column: auto; }
  .gfci-filter-toggle { display: inline-flex; min-height: 44px; }
  .gfci-filter-bar { display: none; position: static; grid-template-columns: 1fr; }
  .gfci-filter-bar--open { display: grid; }
  .product-key-facts { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 700px) {
  .gfci-product-grid { grid-template-columns: 1fr; }
  .product-section-heading h2 { font-size: clamp(34px, 11vw, 52px); }
  .product-detail-hero__actions { display: grid; }
  .product-detail-hero__actions .btn { min-height: 44px; width: 100%; }
  .product-gallery__thumbs { grid-template-columns: repeat(5, minmax(52px, 1fr)); overflow-x: auto; }
  .product-technical-table { display: none; }
  .product-spec-mobile { display: block; }
  .product-spec-mobile summary { min-height: 44px; }
}

@media (prefers-reduced-motion: reduce) {
  .product-family-card img,
  .pcard img,
  .pcard__link svg { transition: none !important; transform: none !important; }
}
```

Use only opacity/transform transitions of 180–500ms. Do not animate width, height, top or left.

- [ ] **Step 5: Import the stylesheet after the global stylesheet**

In `src/main.jsx`:

```js
import './styles.css';
import './styles/product-experience.css';
```

- [ ] **Step 6: Run stylesheet and page tests**

Run: `npm test -- src/pages/ProductsOverview.test.jsx src/pages/GfciSeries.test.jsx src/pages/ProductDetail.test.jsx`

Expected: all selected tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/styles/product-experience.css src/main.jsx src/pages/ProductsOverview.test.jsx
git commit -m "style: add premium product experience system"
```

---

### Task 9: Verify asset integrity, accessibility and production build

**Files:**
- Modify: `src/assetPaths.test.js`

- [ ] **Step 1: Extend the failing asset test**

Add this test to `src/assetPaths.test.js`:

```js
import { products } from './data/products.js';

function flattenProductAssets(product) {
  return [
    product.assets.hero,
    product.assets.card,
    ...product.assets.gallery,
    product.assets.feature,
    product.assets.installation,
    product.assets.dimensions,
    ...Object.values(product.assets.finishes)
  ];
}

it('keeps every published GFCI asset inside public', () => {
  const missing = products.flatMap(flattenProductAssets).filter((asset) => {
    const relative = asset.replace(/^assets\//, 'assets/');
    return !fs.existsSync(path.join('public', relative));
  });
  expect(missing).toEqual([]);
});
```

- [ ] **Step 2: Run the asset test**

Run: `npm test -- src/assetPaths.test.js`

Expected: PASS. If it fails, correct the data mapping to an existing verified asset; do not copy another model's image.

- [ ] **Step 3: Run the full automated suite**

Run: `npm test`

Expected: all tests PASS with no unhandled React errors.

- [ ] **Step 4: Run the local production build**

Run: `npm run build`

Expected: Vite exits with code 0 and creates `dist/index.html` plus compiled assets.

- [ ] **Step 5: Run the GitHub Pages base-path build**

Run in PowerShell:

```powershell
$env:SITE_BASE='/fahint-electric-website/'
npm run build
Remove-Item Env:SITE_BASE
Select-String -LiteralPath 'dist/index.html' -Pattern '/fahint-electric-website/'
```

Expected: build exits with code 0 and `dist/index.html` contains `/fahint-electric-website/` asset references.

- [ ] **Step 6: Commit**

```bash
git add src/assetPaths.test.js
git commit -m "test: verify published product assets"
```

---

### Task 10: Full-screen browser review and GitHub Pages deployment

**Files:**
- Modify only files implicated by a reproduced browser issue.

- [ ] **Step 1: Start the production preview**

Run: `npm run preview -- --host 127.0.0.1 --port 4173`

Expected: Vite reports `http://127.0.0.1:4173/`.

- [ ] **Step 2: Review the required desktop viewports**

Open `/products`, `/products/gfci` and `/products/gfci/gf15` at:

- 1920×1080;
- 1440×900;
- 1366×768.

For each page verify:

- one shared content grid;
- hero headings use no more than two lines;
- no large unexplained blank gaps;
- cards are fully clickable;
- no horizontal scrollbar;
- persistent actions do not cover content;
- section transitions alternate naturally between light, dark and image-led chapters.

- [ ] **Step 3: Review tablet and mobile viewports**

Review the same pages at 1024×768, 768×1024, 390×844 and 375×812. Verify one-column stacking, full product visibility, 44px controls, usable filters, horizontally safe specification tables and non-overlapping inquiry actions.

- [ ] **Step 4: Exercise interactions**

On `/products/gfci`:

- search `GW`;
- select `20A` and `WR`;
- clear filters;
- keyboard-tab through all visible product cards.

On `/products/gfci/gf15`:

- select each gallery thumbnail;
- select Black and White finishes;
- open and close the enlarged image with keyboard controls;
- follow the technical anchor;
- submit an empty inquiry and confirm focus moves to Name;
- fill valid values and confirm the mailto handoff message appears.

- [ ] **Step 5: Fix only reproduced issues with a test first**

For every browser issue, add the smallest relevant regression test, run it to confirm failure, apply the focused fix, then rerun that test and `npm test`.

- [ ] **Step 6: Commit browser-review fixes**

```bash
git add src public docs/product-data
git commit -m "fix: polish responsive product experience"
```

If `git status --short` shows no changes after review, skip this commit.

- [ ] **Step 7: Push and verify deployment**

```bash
git push origin main
```

Expected: the GitHub Pages workflow succeeds. Verify these public routes:

- `https://songselect8-pixel.github.io/fahint-electric-website/products`
- `https://songselect8-pixel.github.io/fahint-electric-website/products/gfci`
- `https://songselect8-pixel.github.io/fahint-electric-website/products/gfci/gf15`

At each route, confirm all product images load, navigation survives refresh, and the browser console contains no asset 404 errors.

---

## Completion Gate

Do not extend this template to USB, receptacles, smart controls or switches until:

- the seven verified GFCI models render from one dataset;
- FLB20 remains unpublished;
- product overview contains the approved five family entries;
- filters, gallery, finishes, technical sections and inquiry validation pass automated tests;
- unverified commercial promises are absent from GFCI product pages;
- all required desktop and mobile viewports pass visual review;
- GitHub Pages loads every product asset and deep route correctly.
