import { Link, useParams, Navigate } from 'react-router-dom';
import { Check, ShieldCheck } from 'lucide-react';
import { findProduct, colorImage, colors, products, productImage } from '../data/products.js';
import { company } from '../data/company.js';
import ProductCard from '../components/ProductCard.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import SafeImage from '../components/SafeImage.jsx';
import ProductDetailHero, { hasVerifiedListing } from '../components/products/ProductDetailHero.jsx';

export default function ProductDetail() {
  const { sku } = useParams();
  const product = findProduct(sku);

  if (!product) return <Navigate to="/products/gfci" replace />;

  const related = products.filter((p) => p.sku !== product.sku).slice(0, 4);
  const listed = hasVerifiedListing(product);

  return (
    <>
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <div className="container crumbs">
          <Link to="/">Home</Link> <span aria-hidden="true">/</span> <Link to="/products">Products</Link>{' '}
          <span aria-hidden="true">/</span> <Link to="/products/gfci">GFCI Outlets</Link>{' '}
          <span aria-hidden="true">/</span> <span aria-current="page">{product.sku}</span>
        </div>
      </nav>

      <ProductDetailHero product={product} />

      <section className="section section--gray">
        <div className="container split">
          <div className="split__media">
            <SafeImage src={productImage(product.sku, 'features')} alt={`${product.sku} features`} loading="lazy" />
          </div>
          <div>
            <div className="eyebrow">/ Product Features /</div>
            <h2 style={{ marginBottom: 18 }}>Why This Model Passes Inspection</h2>
            <ul className="checklist">
              {product.features.map((f) => (
                <li key={f}>
                  <Check size={17} /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Installation /</div>
            <h2>Wiring and Dimensions</h2>
            <p>
              Insert wires through the terminal holes under the screws, tighten clockwise, then press RESET — the green LED
              confirms correct installation. Test the device monthly.
            </p>
          </div>
          <div className="split">
            <div className="split__media">
              <SafeImage src={productImage(product.sku, 'install')} alt={`${product.sku} wiring diagram`} loading="lazy" />
            </div>
            <div className="split__media">
              <SafeImage src={productImage(product.sku, 'dimensions')} alt={`${product.sku} dimensions`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Finish Range /</div>
            <h2>{product.sku} in Every Colour</h2>
          </div>
          <div className="color-grid">
            {colors.map((c) => (
              <div className="color-cell" key={c.slug}>
                <div className="color-cell__img">
                  <SafeImage src={colorImage(product.sku, c.slug)} alt={`${product.sku} in ${c.name}`} loading="lazy" />
                </div>
                <strong>{c.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="inquiry">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Inquiry /</div>
            <h2>Request Pricing for {product.sku}</h2>
          </div>
          <div className="contact-layout">
            <div>
              <ul className="checklist" style={{ marginBottom: 22 }}>
                <li>
                  <ShieldCheck size={17} />{' '}
                  {listed
                    ? `UL/cUL listed under file ${company.ulFile}`
                    : 'Certification documentation available on request'}
                </li>
                <li>
                  <Check size={17} /> Customisation MOQ from 400 cartons
                </li>
                <li>
                  <Check size={17} /> Engineering response within 6 hours
                </li>
                <li>
                  <Check size={17} /> US warehouse stock ships in 3 days
                </li>
              </ul>
              <p style={{ color: 'var(--gray-600)' }}>
                Prefer to write directly? Email{' '}
                <a href={`mailto:${company.email}`} style={{ color: 'var(--blue)', fontWeight: 600 }}>
                  {company.email}
                </a>{' '}
                or message {company.phone} on WhatsApp.
              </p>
            </div>
            <InquiryForm defaultModel={product.sku} />
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Related /</div>
            <h2>Other Models in the Range</h2>
          </div>
          <div className="prod-grid">
            {related.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
