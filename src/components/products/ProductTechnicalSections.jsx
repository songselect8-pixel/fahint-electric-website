import { ArrowRight, FileCheck2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SafeImage from '../SafeImage.jsx';

const VERIFIED_GFCI_MODELS = new Set(['GF15', 'GF20', 'GT15', 'GT20', 'GW15', 'GW20']);

export function isVerifiedGfciModel(product) {
  return VERIFIED_GFCI_MODELS.has(product?.sku);
}

export function productSpecificationRows(product) {
  const verified = isVerifiedGfciModel(product);
  const configuration = product.nema === 'Blank face' ? product.nema : `NEMA ${product.nema}`;
  const faceDimensions = [product.dimensions?.face, product.dimensions?.width].filter(Boolean).join(' × ');
  return [
    ['Item code', product.sku],
    ['Rating', product.rating],
    ['NEMA configuration', configuration],
    ['Variant', product.feature],
    ['Application grade', product.grade],
    ['Standard', verified ? 'UL 943' : null],
    ['Certification', verified ? 'UL/cUL listed · file E504391' : 'Documentation review required'],
    ['Face dimensions', faceDimensions],
    ['Body depth', product.dimensions?.depth]
  ].filter(([, value]) => value);
}

export function ProductSpecifications({ product }) {
  const rows = productSpecificationRows(product);
  return (
    <section className="product-technical product-specifications" id="technical-details">
      <div className="container product-technical__narrow">
        <p className="product-section-label">Model data</p>
        <h2>Technical specifications.</h2>
        <div className="product-specifications__desktop">
          <table>
            <caption className="sr-only">{product.sku} technical specifications</caption>
            <tbody>
              {rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="product-specifications__mobile">
          {rows.map(([label, value]) => (
            <details key={label}><summary>{label}</summary><p>{value}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductInstallation({ product }) {
  return (
    <section className="product-technical product-installation">
      <div className="container">
        <div className="product-technical__head">
          <p className="product-section-label">Installation reference</p>
          <h2>Wiring and dimensions.</h2>
          <p>Use the model drawings as a review aid and follow the approved installation instructions and applicable codes.</p>
        </div>
        <div className="product-installation__grid">
          <figure>
            <SafeImage src={product.assets.installation} alt={`${product.sku} wiring reference`} loading="lazy" />
            <figcaption>Wiring reference</figcaption>
          </figure>
          <figure>
            <SafeImage src={product.assets.dimensions} alt={`${product.sku} dimension drawing`} loading="lazy" />
            <figcaption>Dimension drawing</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function ProductDownloads({ documents }) {
  if (!Array.isArray(documents) || documents.length === 0) return null;
  return (
    <div className="product-certification__downloads" aria-label="Product downloads">
      {documents.map((document) => {
        const href = typeof document === 'string' ? document : document.href || document.url;
        const label = typeof document === 'string' ? 'Product document' : document.label || document.name;
        return href ? <a key={href} href={href}>{label || 'Product document'}</a> : null;
      })}
    </div>
  );
}

export function ProductCertification({ product }) {
  const verified = isVerifiedGfciModel(product);
  if (!verified) {
    return (
      <section className="product-technical product-certification product-certification--review">
        <div className="container product-certification__review">
          <FileCheck2 size={34} aria-hidden="true" />
          <div>
            <p className="product-section-label">Model documentation</p>
            <h2>Documentation review for {product.sku}.</h2>
            <p>Certification status requires model-specific documentation review before specification or purchase.</p>
            <Link className="textlink" to={`/contact?model=${encodeURIComponent(product.sku)}`}>
              Request a documentation review <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-technical product-certification">
      <div className="container product-certification__grid">
        <figure className="product-certification__media">
          <SafeImage src="assets/images/certs/ul-gfci.webp" alt={`${product.sku} UL/cUL certification reference`} loading="lazy" />
        </figure>
        <div>
          <p className="product-section-label">Model verification</p>
          <h2>Certification your team can verify.</h2>
          <p className="product-certification__reference">UL/cUL — GFCI Receptacles · file E504391</p>
          <p>Confirm the listing and model scope as part of your normal technical review.</p>
          <Link className="textlink" to="/capabilities">
            Review quality capabilities <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <ProductDownloads documents={product.documents} />
        </div>
      </div>
    </section>
  );
}

const MANUFACTURING_EVIDENCE = [
  ['assets/images/company/facility-workshop.webp', 'Production', 'Production facility'],
  ['assets/images/company/facility-lab.webp', 'Testing', 'Testing facility'],
  ['assets/images/company/facility-sampleroom.webp', 'Sample review', 'Sample review facility']
];

export function ProductManufacturingProof() {
  return (
    <section className="product-technical product-manufacturing">
      <div className="container">
        <div className="product-technical__head">
          <p className="product-section-label">Factory context</p>
          <h2>Manufacturing evidence.</h2>
        </div>
        <div className="product-manufacturing__grid">
          {MANUFACTURING_EVIDENCE.map(([src, caption, alt]) => (
            <figure key={src}><SafeImage src={src} alt={alt} loading="lazy" /><figcaption>{caption}</figcaption></figure>
          ))}
        </div>
      </div>
    </section>
  );
}
