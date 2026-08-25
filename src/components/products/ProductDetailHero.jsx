import { ArrowRight, FileCheck2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isVerifiedListing } from '../../data/products.js';
import ProductGallery from './ProductGallery.jsx';

export default function ProductDetailHero({ product, anchorPath }) {
  const listed = isVerifiedListing(product);
  const scrollTo = (id) => () => document.getElementById(id)?.scrollIntoView({ block: 'start' });
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

          <dl className="product-detail-hero__facts product-key-facts">
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
              ? `UL / cUL listed · file ${product.listing.file}`
              : 'Model-specific certification documentation review required'}
          </p>

          <div className="product-detail-hero__actions">
            <Link to={`${anchorPath}#inquiry`} className="btn btn--primary" onClick={scrollTo('inquiry')}>
              Request a quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              to={`${anchorPath}#technical-details`}
              className="btn btn--ghost"
              onClick={scrollTo('technical-details')}
            >
              Technical details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
