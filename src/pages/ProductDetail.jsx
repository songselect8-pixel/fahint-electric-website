import { Link, Navigate, useParams } from 'react-router-dom';
import { findProduct, products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import ProductDetailHero from '../components/products/ProductDetailHero.jsx';
import {
  ProductApplicationStory,
  ProductFeatureStory,
  ProductOemStory
} from '../components/products/ProductStorySections.jsx';
import {
  ProductCertification,
  ProductInstallation,
  ProductManufacturingProof,
  ProductSpecifications
} from '../components/products/ProductTechnicalSections.jsx';

function RelatedProducts({ products: related }) {
  return (
    <section className="product-related">
      <div className="container">
        <div className="product-technical__head">
          <p className="product-section-label">Related models</p>
          <h2>Other verified GFCI models.</h2>
        </div>
        <div className="prod-grid">
          {related.map((product) => <ProductCard key={product.sku} product={product} />)}
        </div>
      </div>
    </section>
  );
}

function ProductInquiry({ product }) {
  return (
    <section className="product-inquiry" id="inquiry">
      <div className="container product-inquiry__layout">
        <div className="product-inquiry__intro">
          <p className="product-section-label">Project inquiry</p>
          <h2>Request a quotation for {product.sku}.</h2>
          <p>
            Share the intended application, target finish and documentation needs so the team can review the product brief.
          </p>
          <Link className="textlink" to={`/contact?model=${encodeURIComponent(product.sku)}`}>
            Use the full contact page
          </Link>
        </div>
        <InquiryForm defaultModel={product.sku} title="Send a product brief." />
      </div>
    </section>
  );
}

export default function ProductDetail() {
  const { sku } = useParams();
  const product = findProduct(sku);

  if (!product) return <Navigate to="/products/gfci" replace />;

  const related = products.filter((candidate) => candidate.sku !== product.sku).slice(0, 4);
  const detailPath = `/products/gfci/${product.sku.toLowerCase()}`;

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
      <ProductFeatureStory product={product} />
      <ProductApplicationStory product={product} />
      <ProductOemStory product={product} />
      <ProductSpecifications product={product} />
      <ProductInstallation product={product} />
      <ProductCertification product={product} />
      <ProductManufacturingProof />
      <RelatedProducts products={related} />
      <ProductInquiry product={product} />

      <Link className="product-mobile-quote" to={`${detailPath}#inquiry`}>
        Request quote for {product.sku}
      </Link>
    </>
  );
}
