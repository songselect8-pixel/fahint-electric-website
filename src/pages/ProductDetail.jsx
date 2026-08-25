import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Check, Download, ShieldCheck } from 'lucide-react';
import { findProduct, productGallery, colorImage, colors, products, productImage } from '../data/products.js';
import { company } from '../data/company.js';
import ProductCard from '../components/ProductCard.jsx';
import InquiryForm from '../components/InquiryForm.jsx';

export default function ProductDetail() {
  const { sku } = useParams();
  const product = findProduct(sku);
  const [shot, setShot] = useState(0);

  if (!product) return <Navigate to="/products/gfci" replace />;

  const gallery = productGallery(product.sku);
  const related = products.filter((p) => p.sku !== product.sku).slice(0, 4);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <Link to="/products">Products</Link> <span>/</span>{' '}
            <Link to="/products/gfci">GFCI Outlets</Link> <span>/</span> <span>{product.sku}</span>
          </div>
          <h1>{product.name}</h1>
          <p>{product.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="container pd-layout">
          <div>
            <div className="pd-main">
              <img src={gallery[shot]} alt={`${product.sku} view ${shot + 1}`} />
            </div>
            <div className="pd-thumbs">
              {gallery.map((g, i) => (
                <button
                  key={g}
                  className={`pd-thumb ${shot === i ? 'is-active' : ''}`}
                  onClick={() => setShot(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={g} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">Model {product.sku}</div>
            <h2 style={{ textTransform: 'none', letterSpacing: '-0.6px', fontSize: 27 }}>Technical Specification</h2>

            <table className="spec-table">
              <tbody>
                <tr>
                  <td>Item code</td>
                  <td>{product.sku}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{product.rating}</td>
                </tr>
                <tr>
                  <td>NEMA configuration</td>
                  <td>{product.nema}</td>
                </tr>
                <tr>
                  <td>Feature set</td>
                  <td>{product.feature}</td>
                </tr>
                <tr>
                  <td>Application grade</td>
                  <td>{product.grade}</td>
                </tr>
                <tr>
                  <td>Standard</td>
                  <td>UL 943 5th Edition 2018, Class A</td>
                </tr>
                <tr>
                  <td>Certification</td>
                  <td>UL / cUL listed, file {company.ulFile}</td>
                </tr>
                <tr>
                  <td>Face dimensions</td>
                  <td>
                    {product.dimensions.face} × {product.dimensions.width}
                  </td>
                </tr>
                <tr>
                  <td>Body depth</td>
                  <td>{product.dimensions.depth}</td>
                </tr>
                <tr>
                  <td>Warranty</td>
                  <td>3 years</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ fontSize: 17, marginBottom: 4 }}>Available finishes</h3>
            <div className="swatches">
              {colors.map((c) => (
                <div className="swatch" key={c.slug}>
                  <div className="swatch__dot" style={{ background: c.hex }} />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#inquiry" className="btn btn--primary">
                Request a quote <ArrowRight size={16} />
              </a>
              <a href={`mailto:${company.email}?subject=Datasheet request: ${product.sku}`} className="btn btn--ghost">
                <Download size={16} /> Request datasheet
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container split">
          <div className="split__media">
            <img src={productImage(product.sku, 'features')} alt={`${product.sku} features`} loading="lazy" />
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
              <img src={productImage(product.sku, 'install')} alt={`${product.sku} wiring diagram`} loading="lazy" />
            </div>
            <div className="split__media">
              <img src={productImage(product.sku, 'dimensions')} alt={`${product.sku} dimensions`} loading="lazy" />
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
                  <img src={colorImage(product.sku, c.slug)} alt={`${product.sku} in ${c.name}`} loading="lazy" />
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
                  <ShieldCheck size={17} /> UL/cUL listed under file {company.ulFile}
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
