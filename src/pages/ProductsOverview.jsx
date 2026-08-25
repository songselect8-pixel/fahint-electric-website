import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SafeImage from '../components/SafeImage.jsx';
import { productFamilies } from '../data/productFamilies.js';

const editorialAsset = (name) => `assets/images/editorial-home/${name}`;

const markets = [
  {
    title: 'Residential & renovation',
    label: 'Everyday protection',
    summary: 'Coordinated protection and wiring devices for kitchens, bathrooms and renovation programs.',
    image: editorialAsset('application-kitchen-v2.png'),
    href: '/products/gfci'
  },
  {
    title: 'Hospitality & multifamily',
    label: 'In-room convenience',
    summary: 'Integrated charging platforms for guest rooms, shared spaces and multifamily developments.',
    image: editorialAsset('application-hotel-v2.png'),
    href: '/products/usb-outlets'
  },
  {
    title: 'Commercial fit-out',
    label: 'Project coordination',
    summary: 'Specification and manufacturing support for coordinated commercial wiring-device programs.',
    image: editorialAsset('application-commercial-v2.png'),
    href: '/capabilities'
  }
];

const proofItems = [
  'Verified product platforms',
  'Coordinated finishes',
  'Compliance documentation',
  'Private-label support'
];

export default function ProductsOverview() {
  return (
    <div className="editorial-home-front">
      <section className="product-overview-hero editorial-hero" aria-labelledby="product-overview-title">
        <SafeImage
          className="editorial-hero__image"
          src={editorialAsset('brand-system-family-final.png')}
          alt="Fahint coordinated wiring-device family"
          loading="eager"
          fetchpriority="high"
        />
        <div className="editorial-hero__shade" />
        <div className="editorial-hero__grid" />
        <div className="container editorial-hero__content product-overview-hero__inner">
          <p className="editorial-eyebrow">Coordinated wiring-device platform</p>
          <h1 id="product-overview-title">
            <span className="product-overview-hero__title-line">One platform.</span>
            <span className="product-overview-hero__title-line">Complete product lines.</span>
          </h1>
          <p className="editorial-hero__copy">
            Bring protection, charging, receptacles and control together in a range designed for consistent
            specification, branding and project delivery.
          </p>
          <div className="editorial-hero__actions">
            <Link className="editorial-button" to="/products/gfci">
              Explore GFCI outlets <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="product-family-section editorial-products" aria-labelledby="product-family-title">
        <div className="container editorial-heading">
          <div>
            <p className="editorial-eyebrow">Five product families</p>
            <h2 id="product-family-title">One coordinated product platform.</h2>
          </div>
          <p>
            Select a family to explore the product platforms available for coordinated branded and OEM/ODM programs.
          </p>
        </div>

        <div className="editorial-product-mosaic product-family-grid">
          {productFamilies.map((family) => (
            <Link className="editorial-product-panel product-family-card" key={family.name} to={family.href}>
              <SafeImage src={family.image} alt="" loading="lazy" />
              <div className="editorial-panel__shade" />
              <div className="editorial-panel__content">
                <p className="editorial-panel__label">{family.label}</p>
                <h3>{family.name}</h3>
                <p>{family.summary}</p>
                <div className="editorial-panel__meta">
                  <span>Explore the family</span>
                  <span className="editorial-panel__arrow" aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="product-brand-system editorial-customization" aria-labelledby="product-brand-title">
        <div className="container editorial-customization__grid product-brand-system__inner">
          <div className="editorial-customization__media">
            <SafeImage
              src="assets/images/company/facility-sampleroom.webp"
              alt="Fahint sample room for product and finish review"
              loading="lazy"
            />
            <div className="editorial-customization__caption">
              <span>Brand system review</span>
              <strong>Product, finish and packaging reviewed as one program.</strong>
            </div>
          </div>
          <div className="editorial-customization__content">
            <p className="editorial-eyebrow">OEM/ODM program support</p>
            <h2 id="product-brand-title">Built for brands and OEM programs.</h2>
            <p className="editorial-customization__lede">
              Coordinate product selection, finishes, markings, documentation and packaging around one market-ready
              wiring-device program.
            </p>
            <Link className="editorial-button editorial-button--dark" to="/capabilities">
              Explore OEM/ODM capability <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="product-market-section editorial-applications" aria-labelledby="product-market-title">
        <div className="container editorial-heading">
          <div>
            <p className="editorial-eyebrow">Market applications</p>
            <h2 id="product-market-title">Specified for real projects.</h2>
          </div>
          <p>Start with the installation environment, then coordinate the product mix around the project brief.</p>
        </div>

        <div className="container">
          <div className="product-market-grid">
            {markets.map((market) => (
              <Link className="editorial-application" key={market.title} to={market.href}>
                <SafeImage src={market.image} alt="" loading="lazy" />
                <div className="editorial-application__shade" />
                <div className="editorial-application__copy">
                  <p>{market.label}</p>
                  <h3>{market.title}</h3>
                  <span>{market.summary}</span>
                </div>
                <span className="editorial-application__arrow" aria-hidden="true">
                  <ArrowRight size={19} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="product-evidence-section editorial-factory" aria-labelledby="product-evidence-title">
        <SafeImage
          className="editorial-factory__bg"
          src="assets/images/company/facility-workshop.webp"
          alt="Fahint wiring-device manufacturing workshop"
          loading="lazy"
        />
        <div className="editorial-factory__shade" />
        <div className="container editorial-factory__content product-evidence-section__grid">
          <div className="editorial-factory__copy">
            <p className="editorial-eyebrow">Factory evidence</p>
            <h2 id="product-evidence-title">Verified manufacturing and compliance.</h2>
            <p>
              Integrated production, functional inspection and standards-focused documentation support consistent
              product programs from approval sample through shipment.
            </p>
          </div>
          <div className="editorial-factory__points">
            <div>
              <span>01</span>
              <strong>Manufacturing capability</strong>
              <small>See the production, quality and program support behind the range.</small>
              <Link className="editorial-text-link" to="/capabilities">
                View manufacturing <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div>
              <span>02</span>
              <strong>Certification details</strong>
              <small>Review the compliance information available for product planning.</small>
              <Link className="editorial-text-link" to="/capabilities">
                View certification details <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="product-proof-strip editorial-proof" aria-label="Product program proof points">
        <div className="container editorial-proof__grid">
          {proofItems.map((item) => (
            <div key={item}>
              <Check size={19} aria-hidden="true" />
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="product-overview-cta home-cta" aria-labelledby="product-cta-title">
        <div className="container home-cta__inner">
          <div className="home-cta__copy">
            <p className="home-section-label">Start a program</p>
            <h2 id="product-cta-title">Tell us what your market needs.</h2>
            <p>Share your target product mix, finishes, compliance needs and forecast volume.</p>
          </div>
          <div className="home-cta__action">
            <Link className="btn btn--primary" to="/contact">
              Start a product program <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
