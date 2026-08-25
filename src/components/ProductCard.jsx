import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productImage } from '../data/products.js';
import SafeImage from './SafeImage.jsx';

export default function ProductCard({ product }) {
  const productLabel = `${product.sku} ${product.name}`;
  const receptacleType = product.nema === 'Blank face' ? product.nema : `NEMA ${product.nema}`;

  return (
    <Link
      to={`/products/gfci/${product.sku.toLowerCase()}`}
      className="pcard"
      aria-label={productLabel}
    >
      <div className="pcard__media">
        <span className="pcard__tag">{product.feature}</span>
        <SafeImage src={productImage(product.sku, 'card')} alt={productLabel} loading="lazy" />
      </div>
      <div className="pcard__body">
        <div className="pcard__sku">{product.sku}</div>
        <h3 className="pcard__name">{product.name}</h3>
        <div className="pcard__meta">
          <span>{product.rating}</span>
          <span>{receptacleType}</span>
        </div>
        <div className="pcard__foot">
          <span className="textlink">
            View details <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
