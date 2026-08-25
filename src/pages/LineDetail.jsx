import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { findLine, productLines } from '../data/lines.js';
import { products, categories } from '../data/products.js';
import { findCatalogRow } from '../data/overviewCatalog.js';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';

// GFCI has full per-model data; the other families render from their group lists.
function GfciBody() {
  const [active, setActive] = useState('all');
  const list = active === 'all' ? products : products.filter((p) => p.category === active);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="filter-row">
            {categories.map((c) => (
              <button key={c.slug} className={`chip ${active === c.slug ? 'is-active' : ''}`} onClick={() => setActive(c.slug)}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="prod-grid">
            {list.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Specification Table /</div>
            <h2>Compare the Full GFCI Range</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="spec-table" style={{ minWidth: 720 }}>
              <thead>
                <tr>
                  {['Model', 'Rating', 'NEMA', 'Feature', 'Grade'].map((h) => (
                    <td key={h} style={{ width: 'auto', color: 'var(--charcoal)', fontWeight: 800 }}>
                      {h}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.sku}>
                    <td style={{ width: 'auto' }}>
                      <Link to={`/products/gfci/${p.sku.toLowerCase()}`} style={{ color: 'var(--blue)', fontWeight: 700 }}>
                        {p.sku}
                      </Link>
                    </td>
                    <td>{p.rating}</td>
                    <td>{p.nema}</td>
                    <td>{p.feature}</td>
                    <td>{p.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function GenericBody({ line }) {
  const catalogModels = findCatalogRow(line.slug)?.models || [];
  const heroImage = catalogModels[0]?.image || line.gallery?.[0] || line.cover;

  return (
    <>
      <section className="section">
        <div className="container split">
          <div className="split__media">
            <img src={heroImage} alt={line.name} loading="lazy" />
          </div>
          <div>
            <div className="eyebrow">/ Overview /</div>
            <h2 style={{ textTransform: 'none', letterSpacing: '-0.6px' }}>{line.tagline}</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: 17 }}>{line.summary}</p>
            <ul className="checklist">
              {line.highlights.map((h) => (
                <li key={h}>
                  <Check size={17} /> {h}
                </li>
              ))}
              <li>
                <ShieldCheck size={17} /> {line.ulFile ? `UL file ${line.ulFile}` : line.standard}
              </li>
            </ul>
            <Link to="/contact" className="btn btn--primary" style={{ marginTop: 16 }}>
              Request pricing <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Range /</div>
            <h2>Models in This Series</h2>
            <p>Full specifications and datasheets for any model below are available on request.</p>
          </div>
          <div className="info-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {(line.groups || []).map((g, i) => (
              <Reveal className="info-card" key={g.name} delay={i * 60}>
                <h4>{g.name}</h4>
                <ul style={{ marginTop: 10 }}>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {catalogModels.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">/ Gallery /</div>
              <h2>Verified Model Photos</h2>
            </div>
            <div className="prod-grid">
              {catalogModels.map((model) => (
                <div key={model.key} className="pcard">
                  <div className="pcard__media">
                    <img src={model.image} alt={model.title} loading="lazy" />
                  </div>
                  <div className="pcard__body">
                    <h3>{model.title}</h3>
                    <p>{model.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default function LineDetail() {
  const { line: slug } = useParams();
  const line = findLine(slug);
  if (!line) return <Navigate to="/products" replace />;

  const others = productLines.filter((l) => l.slug !== line.slug);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <Link to="/products">Products</Link> <span>/</span>
            <span>{line.name}</span>
          </div>
          <h1>{line.name}</h1>
          <p>{line.summary}</p>
        </div>
      </section>

      {line.detailed ? <GfciBody /> : <GenericBody line={line} />}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Other Series /</div>
            <h2>Explore the Rest of the Catalogue</h2>
          </div>
          <div className="line-grid line-grid--compact">
            {others.map((l) => (
              <Link key={l.slug} to={`/products/${l.slug}`} className="line-card">
                <div className="line-card__media">
                  <img src={findCatalogRow(l.slug)?.models?.[0]?.image || l.cover} alt={l.name} loading="lazy" />
                </div>
                <div className="line-card__body">
                  <h3>{l.name}</h3>
                  <p className="line-card__tag">{l.tagline}</p>
                  <span className="textlink">
                    View series <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
