import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productLines } from '../data/lines';
import { findCatalogRow } from '../data/overviewCatalog';

const HOME_PRODUCT_LINE_SLUGS = ['gfci', 'usb-outlets', 'receptacles', 'smart-switches', 'lighting-switches'];

// Category chips on top, matching models underneath — mirrors the reference
// site's "pick a family, then see the models" flow.
export default function ProductTabs() {
  const homeLines = productLines.filter((l) => HOME_PRODUCT_LINE_SLUGS.includes(l.slug));
  const [active, setActive] = useState(HOME_PRODUCT_LINE_SLUGS[0]);
  const line = homeLines.find((l) => l.slug === active) || homeLines[0];
  const catalog = findCatalogRow(line.slug);
  const cards = (catalog?.models || []).slice(0, 4).map((model) => ({
    label: model.key,
    group: model.meta,
    image: model.image,
    href: model.to
  }));

  return (
    <div className="ptabs">
      <div className="ptabs__bar" role="tablist" aria-label="Product families">
        {homeLines.map((l) => {
          const tabCatalog = findCatalogRow(l.slug);
          const thumb = tabCatalog?.models?.[0]?.image || l.cover;

          return (
            <button
              key={l.slug}
              type="button"
              role="tab"
              aria-selected={l.slug === active}
              className={`ptab${l.slug === active ? ' is-active' : ''}`}
              onClick={() => setActive(l.slug)}
            >
              <span className="ptab__thumb">
                <img src={thumb} alt="" loading="lazy" />
              </span>
              {l.name}
            </button>
          );
        })}
      </div>

      <div className="ptabs__panel">
        <div className="ptabs__lead">
          <div>
            <h3>{line.name}</h3>
            <p>{line.summary || line.tagline}</p>
          </div>
          <Link to={`/products/${line.slug}`} className="btn btn--ghost">
            View series <ArrowRight size={16} />
          </Link>
        </div>

        <div className="ptabs__grid">
          {cards.map((c, i) => (
            <Link className="ptab-card" key={c.label + i} to={c.href}>
              <div className="ptab-card__media">
                <img src={c.image} alt={c.label} loading="lazy" />
              </div>
              <div className="ptab-card__body">
                <strong>{c.label}</strong>
                <span>{c.group}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
