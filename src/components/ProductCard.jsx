import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productImage } from '../data/products.js';

export default function ProductCard({ product }) {
  return (
    <article className="pcard">
      <Link to={`/products/gfci/${product.sku.toLowerCase()}`} className="pcard__media">
        <span className="pcard__tag">{product.feature}</span>
        <img src={productImage(product.sku, 'plate')} alt={`${product.sku} ${product.name}`} loading="lazy" />
      </Link>
      <div className="pcard__body">
        <div className="pcard__sku">{product.sku}</div>
        <h3 className="pcard__name">{product.name}</h3>
        <div className="pcard__meta">
          <span>{product.rating}</span>
          <span>NEMA {product.nema}</span>
        </div>
        <div className="pcard__foot">
          <Link to={`/products/gfci/${product.sku.toLowerCase()}`} className="textlink">
            Details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
