import { Link } from 'react-router-dom';
import { ArrowRight, Search, Check } from 'lucide-react';
import { useState } from 'react';
import { productLines } from '../data/lines.js';
import { products } from '../data/products.js';
import { catalogRows, findCatalogRow } from '../data/overviewCatalog.js';
import Reveal from '../components/Reveal.jsx';

const OVERVIEW_PRODUCT_LINE_SLUGS = [
  'gfci',
  'usb-outlets',
  'receptacles',
  'dimmers',
  'smart-switches',
  'lighting-switches'
];

function buildSearchEntries(overviewProductLines, visibleCatalogRows) {
  const detailedProducts = products.map((product) => ({
    key: `gfci-${product.sku}`,
    label: product.sku,
    title: product.name,
    detail: `${product.rating} · ${product.feature}`,
    to: `/products/gfci/${product.sku.toLowerCase()}`,
    haystack: `${product.sku} ${product.name} ${product.feature} ${product.rating} ${product.grade}`
  }));

  const lineEntries = overviewProductLines.flatMap((line) => {
    const models = (line.groups || []).flatMap((group) => group.items.map((item) => `${group.name} ${item}`));
    return [
      {
        key: `line-${line.slug}`,
        label: line.short || line.name,
        title: line.name,
        detail: line.tagline,
        to: `/products/${line.slug}`,
        haystack: `${line.name} ${line.tagline} ${line.summary} ${models.join(' ')}`
      }
    ];
  });

  const catalogModelEntries = visibleCatalogRows.flatMap(({ line, catalog }) =>
    catalog.models.map((model) => ({
      key: `model-${model.key}`,
      label: model.key,
      title: model.title,
      detail: line.name,
      to: model.to,
      haystack: `${model.key} ${model.title} ${model.meta} ${line.name} ${line.tagline}`
    }))
  );

  return [...detailedProducts, ...lineEntries, ...catalogModelEntries];
}

export default function ProductsOverview() {
  const [q, setQ] = useState('');
  const overviewProductLines = productLines.filter((line) => OVERVIEW_PRODUCT_LINE_SLUGS.includes(line.slug));
  const catalogSections = overviewProductLines
    .map((line) => ({
      line,
      catalog: catalogRows.find((row) => row.slug === line.slug)
    }))
    .filter((section) => section.catalog);
  const searchEntries = buildSearchEntries(overviewProductLines, catalogSections);
  const query = q.trim().toLowerCase();

  const hits = query ? searchEntries.filter((entry) => entry.haystack.toLowerCase().includes(query)) : [];

  return (
    <>
      <section className="products-hero">
        <div className="container products-hero__wrap">
          <div className="products-hero__panel">
            <div className="crumbs crumbs--center">
            <Link to="/">Home</Link> <span>/</span> <span>Products</span>
          </div>
            <h1>Direct From the Manufacturer: American Standard Wiring Devices</h1>
          <p>
              Search Fahint GFCI outlets, USB receptacles, switches and dimmers for North American residential,
              commercial and OEM projects.
          </p>

          <div className="banner-search">
            <Search size={19} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
                placeholder="Search GF15, USB outlet, switch, dimmer..."
              aria-label="Search products"
            />
              <button type="button" className="banner-search__button">
                Search Products
              </button>
          </div>

          {q.trim() && (
            <div className="banner-search__results">
                {hits.length === 0 && (
                  <span className="banner-search__empty">No product matches that. Try GFCI, USB, switch, dimmer or GF15.</span>
                )}
                {hits.slice(0, 7).map((h) => (
                  <Link key={h.key} to={h.to}>
                    <strong>{h.label}</strong>
                    <span>{h.title}</span>
                    <small>{h.detail}</small>
                </Link>
              ))}
            </div>
          )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">/ Explore Our Product Series /</div>
            <h2>Explore Product Series</h2>
            <p>Start with the product family, then drill into the models, ratings and custom options your project needs.</p>
          </div>

          <div className="series-mosaic">
            {overviewProductLines.map((l, i) => {
              const catalog = findCatalogRow(l.slug);
              const image = catalog?.models?.[0]?.image || l.gallery?.[0] || l.cover;

              return (
                <Reveal key={l.slug} delay={i * 55}>
                  <Link to={`/products/${l.slug}`} className="series-tile">
                    <img src={image} alt={l.name} loading="lazy" />
                    <span>
                      <strong>{l.name}</strong>
                      <small>{l.tagline}</small>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--gray catalog-showcase">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Product Catalogue /</div>
            <h2>Browse by Series and Model</h2>
            <p>
              Key models are matched to product photos from the source material folder, so buyers can browse by family without
              seeing repeated placeholder images.
            </p>
          </div>

          <div className="catalog-rows">
            {catalogSections.map(({ line, catalog }, i) => {
              return (
                <Reveal key={line.slug} delay={i * 45}>
                  <div className="catalog-row">
                    <Link to={`/products/${line.slug}`} className={`catalog-intro ${i % 2 ? 'catalog-intro--blue' : ''}`}>
                      <span className="catalog-intro__kicker">{line.standard || line.ulFile || 'Fahint series'}</span>
                      <h3>{line.name}</h3>
                      <p>{line.summary}</p>
                      <span className="catalog-intro__link">
                        View all {line.short || line.name} products <ArrowRight size={15} />
                      </span>
                    </Link>

                    <div className="catalog-models">
                      {catalog.models.map((model) => (
                        <Link key={model.key} to={model.to} className="model-mini-card">
                          <div className="model-mini-card__media">
                            <img src={model.image} alt={model.title} loading="lazy" />
                          </div>
                          <div className="model-mini-card__body">
                            <strong>{model.title}</strong>
                            <span>{model.meta}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sourcing-panel">
            <img src="/assets/images/company/facility-workshop.webp" alt="Fahint workshop" loading="lazy" />
            <div className="sourcing-panel__overlay" />
            <div className="sourcing-panel__content">
              <span>OEM / ODM Custom Solutions</span>
              <h2>One Factory for GFCI, USB Outlets, Receptacles and Switches</h2>
              <p>
                Fahint supports distributors, contractors and private-label buyers with model selection, packaging, color
                matching, compliance documents and export-ready production.
              </p>
              <div className="sourcing-panel__actions">
                <Link to="/contact" className="btn btn--primary">
                  Request OEM/ODM quote <ArrowRight size={16} />
                </Link>
                <Link to="/capabilities" className="btn btn--outline-light">
                  View manufacturing
                </Link>
              </div>
              <ul>
                <li>GFCI and wiring devices</li>
                <li>Private-label packaging</li>
                <li>UL/cUL compliance files</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container split">
          <div>
            <div className="eyebrow">/ Why Source From Fahint /</div>
            <h2>One Supplier for North American Wiring Device Projects</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: 17 }}>
              Product families are made under one quality system, so buyers can consolidate GFCI outlets, USB receptacles,
              switches and dimmers with one technical and compliance contact.
            </p>
          </div>
          <div className="reason-grid">
            {[
              'UL/cUL listed GFCI and wiring-device coverage',
              'OEM packaging, logo and color customization',
              'US warehouse support for stocked items',
              'Engineering response within 6 business hours'
            ].map((item) => (
              <div className="reason-card" key={item}>
                <Check size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Ready to Source Electrical Wiring Devices?</h2>
              <p>
                Send your model mix, target finishes and annual volume. Our engineering team responds with a costed proposal
                within 6 hours on business days.
              </p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/contact" className="btn btn--light">
                Send inquiry <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
