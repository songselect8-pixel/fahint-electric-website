import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { findLine, productLines } from '../data/lines.js';
import { filterCatalogProducts, getCatalogProducts } from '../data/catalogProducts.js';
import CatalogModelCard from '../components/products/CatalogModelCard.jsx';

function ModelCatalogue({ line }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('');
  const models = getCatalogProducts(line.slug);
  const groups = [...new Set(models.map((product) => product.group))];
  const filtered = filterCatalogProducts(models, { query, group });
  const clear = () => { setQuery(''); setGroup(''); };

  useEffect(() => {
    const previous = document.title;
    document.title = `${line.name} · Models & Specifications | Fahint Electric`;
    return () => { document.title = previous; };
  }, [line]);

  return <div className="catalog-series">
    <section className="catalog-series__intro">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/products">Products</Link>
          <span aria-hidden="true">/</span><span aria-current="page">{line.name}</span>
        </nav>
        <div className="catalog-section-heading">
          <div><p className="product-section-label">Explore the range</p><h1>{line.name}</h1></div>
          <p>{line.summary}</p>
        </div>
        <div className="catalog-series__meta">
          <span>{models.length} model configurations</span><span>Model-specific specifications</span><span>Original product references</span>
        </div>
      </div>
    </section>
    <section className="catalog-series__models" aria-label={`${line.name} models`}>
      <div className="container">
        <div className="catalog-filters">
          <label className="catalog-filters__search"><span>Search models</span><div><Search size={18} aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Model number or feature" />
          </div></label>
          <label><span>Configuration</span><select value={group} onChange={(event) => setGroup(event.target.value)}>
            <option value="">All configurations</option>{groups.map((name) => <option key={name} value={name}>{name}</option>)}
          </select></label>
          <p className="catalog-filters__count" aria-live="polite">{filtered.length} of {models.length} models</p>
        </div>
        {filtered.length ? <div className="catalog-model-grid">{filtered.map((product) => <CatalogModelCard key={product.slug} product={product} />)}</div>
          : <div className="catalog-empty"><p role="status">No models match your selection.</p><button className="btn btn--outline" onClick={clear}>Clear filters</button></div>}
      </div>
    </section>
    <section className="catalog-series__footer">
      <div className="container">
        <header className="catalog-section-heading"><div><p className="product-section-label">Product families</p><h2>Explore the other ranges.</h2></div>
          <Link className="textlink" to="/contact">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
        </header>
        <div className="catalog-family-links">{productLines.filter((item) => item.slug !== line.slug).map((item) =>
          <Link key={item.slug} to={`/products/${item.slug}`}><span>{item.name}</span><ArrowRight size={18} aria-hidden="true" /></Link>
        )}</div>
      </div>
    </section>
  </div>;
}

export default function LineDetail() {
  const { line: slug } = useParams();
  const line = findLine(slug);
  if (!line) return <Navigate to="/products" replace />;
  return <ModelCatalogue key={line.slug} line={line} />;
}
