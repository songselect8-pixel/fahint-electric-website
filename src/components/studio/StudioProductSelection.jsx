import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { studioRanges } from '../../data/studioCatalog.js';
import { StudioImage } from './StudioShared.jsx';

// A small, model-specific introduction. The complete catalogue remains on its own route.
export default function StudioProductSelection() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const range = studioRanges[active];

  function onTabKeyDown(event, index) {
    const last = studioRanges.length - 1;
    const next = {
      ArrowRight: (index + 1) % studioRanges.length,
      ArrowLeft: (index + last) % studioRanges.length,
      Home: 0,
      End: last
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <section className="studio-collection studio-space" id="studio-collection" aria-labelledby="studio-collection-title">
    <div className="studio-wrap">
      <header className="studio-section-head">
        <h2 id="studio-collection-title">Find the right device.<br /><span>See the details.</span></h2>
        <div><p>Start with a product family. Compare selected models, then open the full range for specifications, finishes and documentation.</p><Link className="studio-text-link" to="/products">Browse the complete catalog <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </header>
      <nav aria-label="Explore product families">
        <div className="studio-family-tabs" role="tablist" aria-label="Select a product family">
          {studioRanges.map((item, index) => <button key={item.slug} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`studio-family-tab-${item.slug}`} aria-selected={index === active} aria-controls={`studio-family-panel-${item.slug}`} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => onTabKeyDown(event, index)}>{item.name}</button>)}
        </div>
      </nav>
      {studioRanges.map((item, index) => <div key={item.slug} id={`studio-family-panel-${item.slug}`} role="tabpanel" aria-labelledby={`studio-family-tab-${item.slug}`} hidden={index !== active}>
        {index === active && <>
          <div className="studio-selection-heading">
            <p>Selected models <span>from {range.name}</span></p>
            <Link className="studio-text-link" to={`/products/${range.slug}`} aria-label={`Explore all ${range.name}`}>View all {range.models.length} models <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="studio-selection-grid">
            {range.featured.map(product => <article className="studio-selection-card" key={product.sku} aria-label={product.sku}>
              <div className="studio-selection-card__image"><StudioImage src={product.assets.card} alt={`${product.sku} ${product.name}`} /></div>
              <div className="studio-selection-card__copy">
                <span className="studio-selection-sku">{product.sku}</span>
                <h3>{product.name}</h3>
                <dl>{product.keyFacts.slice(0, 2).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                {product.reviewNotice && <p className="studio-selection-note">Check the model notes before specifying.</p>}
                <div className="studio-selection-actions">
                  <Link className="studio-text-link" to={product.href} aria-label={`View ${product.sku} details`}>View details <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  <Link to={`/contact?model=${encodeURIComponent(product.sku)}`} aria-label={`Request a quote for ${product.sku}`}>Request a quote</Link>
                </div>
              </div>
            </article>)}
          </div>
          <p className="studio-selection-scope">Specifications, available finishes and certification coverage vary by model. Review the product details before ordering.</p>
        </>}
      </div>)}
    </div>
  </section>;
}
