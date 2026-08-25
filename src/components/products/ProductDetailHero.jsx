import { ArrowRight, FileCheck2, ShieldCheck } from 'lucide-react';
import ProductGallery from './ProductGallery.jsx';

const VERIFIED_LISTING_REFERENCE = 'E504391';
const VERIFIED_GFCI_MODELS = new Set(['GF15', 'GF20', 'GT15', 'GT20', 'GW15', 'GW20']);

export function hasVerifiedListing(product) {
  return VERIFIED_GFCI_MODELS.has(product?.sku)
    && (product.features?.some((feature) => feature.includes(VERIFIED_LISTING_REFERENCE)) ?? false);
}

export default function ProductDetailHero({ product }) {
  const listed = hasVerifiedListing(product);
  const configuration = product.nema === 'Blank face' ? product.nema : `NEMA ${product.nema}`;
  const facts = [
    ['Rating', product.rating],
    ['Configuration', configuration],
    ['Variant', product.feature],
    ['Application', product.grade]
  ];

  return (
    <section className="product-detail-hero">
      <div className="container product-detail-hero__grid">
        <ProductGallery product={product} />

        <div className="product-detail-hero__content">
          <span className="product-detail-hero__model">Model {product.sku}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-hero__summary">{product.summary}</p>

          <dl className="product-detail-hero__facts">
            {facts.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>

          <p className={`product-detail-hero__certification${listed ? ' is-verified' : ''}`}>
            {listed ? <ShieldCheck size={19} aria-hidden="true" /> : <FileCheck2 size={19} aria-hidden="true" />}
            {listed
              ? 'UL / cUL listed · file E504391'
              : 'Model-specific certification documentation review required'}
          </p>

          <div className="product-detail-hero__actions">
            <a href="#inquiry" className="btn btn--primary">
              Request a quote <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#technical-details" className="btn btn--ghost">
              Technical details
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
