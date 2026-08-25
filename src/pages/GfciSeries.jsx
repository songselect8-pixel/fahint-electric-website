import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import SafeImage from '../components/SafeImage.jsx';
import { filterGfciProducts, isVerifiedListing, products } from '../data/products.js';

const AMPERAGES = [
  { value: '', label: 'All' },
  { value: '15A', label: '15A' },
  { value: '20A', label: '20A' }
];

const VARIANTS = [
  { value: '', label: 'All' },
  { value: 'standard', label: 'Standard' },
  { value: 'tr', label: 'TR' },
  { value: 'wr', label: 'WR' },
  { value: 'blank', label: 'Blank face' }
];

const APPLICATIONS = [
  { value: '', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' }
];

const verifiedListings = products.filter(isVerifiedListing);
const reviewListings = products.filter((product) => !isVerifiedListing(product));
const verifiedListingFile = verifiedListings[0]?.listing.file;

const ENGINEERING_PROOF = [
  {
    title: 'Self-test protection',
    body: 'Automatic protection monitoring across the published GFCI platform.'
  },
  {
    title: 'Reverse-wiring lockout',
    body: 'Line/load reversal prevents power at the receptacle face.'
  },
  {
    title: 'Verified GFCI platform',
    body: `${verifiedListings.length === 6 ? 'Six' : verifiedListings.length} published models are named under UL / cUL file ${verifiedListingFile}; ${reviewListings.map((product) => product.sku).join(', ')} documentation remains under review.`
  }
];

const OEM_OPTIONS = [
  'Finish coordination',
  'Brand marking',
  'Packaging coordination',
  'Documentation support'
];

function SelectControl({ label, value, options, onChange }) {
  const id = `gfci-${label.toLowerCase()}`;

  return (
    <label className="gfci-series__control" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value || 'all'} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

export default function GfciSeries() {
  const [query, setQuery] = useState('');
  const [amperage, setAmperage] = useState('');
  const [variant, setVariant] = useState('');
  const [application, setApplication] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filteredProducts = filterGfciProducts(products, {
    query,
    amperage,
    variant,
    application
  });

  function clearFilters() {
    setQuery('');
    setAmperage('');
    setVariant('');
    setApplication('');
  }

  return (
    <div className="gfci-series">
      <section className="gfci-series__hero">
        <div className="container">
          <p className="gfci-series__eyebrow">GFCI product family</p>
          <h1>Verified protection for residential and commercial programs.</h1>
          <p className="gfci-series__hero-copy">
            Compare seven published models, then confirm the finish and program requirements for your market.
          </p>
        </div>
      </section>

      <section className="gfci-series__catalog section" aria-labelledby="gfci-models-heading">
        <div className="container">
          <div className="gfci-series__catalog-head">
            <div>
              <p className="eyebrow">Published range</p>
              <h2 id="gfci-models-heading">Find a published GFCI model</h2>
            </div>
            <button
              type="button"
              className="gfci-series__filter-toggle"
              aria-label="Filter GFCI models"
              aria-expanded={filtersOpen}
              aria-controls="gfci-filters"
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <Filter size={17} aria-hidden="true" /> Filters
            </button>
          </div>

          <div
            id="gfci-filters"
            className={`gfci-series__filters${filtersOpen ? ' is-open' : ''}`}
            role="search"
            aria-label="GFCI model filters"
          >
            <label className="gfci-series__control gfci-series__search" htmlFor="gfci-search">
              <span>Search models</span>
              <span className="gfci-series__search-field">
                <Search size={17} aria-hidden="true" />
                <input
                  id="gfci-search"
                  type="search"
                  aria-label="Search GFCI models"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Model or feature"
                />
              </span>
            </label>
            <SelectControl label="Amperage" value={amperage} options={AMPERAGES} onChange={setAmperage} />
            <SelectControl label="Variant" value={variant} options={VARIANTS} onChange={setVariant} />
            <SelectControl label="Application" value={application} options={APPLICATIONS} onChange={setApplication} />
          </div>

          <div className="gfci-series__results-head">
            <span aria-live="polite">
              {filteredProducts.length} published {filteredProducts.length === 1 ? 'model' : 'models'}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="prod-grid gfci-series__product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          ) : (
            <div
              className="gfci-series__empty"
              role="status"
              aria-label="No published models match these filters."
            >
              <h2>No published models match these filters.</h2>
              <p>Try a different model number or clear the current filters to restore the published range.</p>
              <div className="gfci-series__empty-actions">
                <button type="button" className="btn btn--primary" onClick={clearFilters}>Clear filters</button>
                <Link to="/contact" className="btn btn--outline">Contact sales</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="gfci-series__comparison section section--gray" aria-labelledby="gfci-comparison-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">At-a-glance comparison</p>
            <h2 id="gfci-comparison-heading">Compare the published range</h2>
          </div>
          <div
            className="gfci-series__table-wrap"
            role="region"
            aria-label="GFCI model comparison"
            tabIndex={0}
          >
            <table className="spec-table">
              <thead>
                <tr>
                  {['Model', 'Rating', 'NEMA', 'Variant', 'Application'].map((heading) => (
                    <th scope="col" key={heading}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.sku}>
                    <th scope="row"><Link to={`/products/gfci/${product.sku.toLowerCase()}`}>{product.sku}</Link></th>
                    <td>{product.rating}</td>
                    <td>{product.nema}</td>
                    <td>{product.feature}</td>
                    <td>{product.grade.replace(' Grade', '')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="engineering-proof" className="gfci-series__engineering section" aria-labelledby="gfci-engineering-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Engineering proof</p>
            <h2 id="gfci-engineering-heading">Protection documented at platform level</h2>
          </div>
          <div className="gfci-series__proof-grid">
            {ENGINEERING_PROOF.map((item, index) => (
              <article key={item.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gfci-series__application section section--gray" aria-labelledby="gfci-application-heading">
        <div className="container gfci-series__application-grid">
          <div className="gfci-series__application-media">
            <SafeImage
              src="assets/images/editorial-home/application-kitchen-v2.png"
              alt="Coordinated kitchen wiring-device application"
              loading="lazy"
            />
          </div>
          <div className="gfci-series__application-copy">
            <p className="eyebrow">Application support</p>
            <h2 id="gfci-application-heading">Specify from documented requirements.</h2>
            <p>
              Match the published model, rating and variant to documented project requirements, then confirm the selected configuration before ordering.
            </p>
            <Link to="/contact" className="textlink">Discuss a project <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="gfci-series__oem section" aria-labelledby="gfci-oem-heading">
        <div className="container gfci-series__oem-grid">
          <div>
            <p className="eyebrow">OEM configuration</p>
            <h2 id="gfci-oem-heading">Coordinate the program around the documented platform.</h2>
          </div>
          <div>
            <ul className="gfci-series__oem-list">
              {OEM_OPTIONS.map((option) => <li key={option}>{option}</li>)}
            </ul>
            <Link to="/contact" className="btn btn--primary">
              Start an OEM conversation <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
