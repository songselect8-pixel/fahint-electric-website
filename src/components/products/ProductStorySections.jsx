import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { colors, productFinishImage } from '../../data/products.js';
import SafeImage from '../SafeImage.jsx';

function productEngineeringPoints(product) {
  const candidates = [
    ...(product.highlights || []),
    ...(product.features || []).filter((feature) => (
      !product.listing?.reportReference || !feature.includes(product.listing.reportReference)
    ))
  ];
  const themes = [
    ['self-test', /self[- ]test/i],
    ['reverse-wiring', /reverse|reversed/i],
    ['feed-through', /feed[- ]through/i],
    ['tamper-resistant', /tamper[- ]resistant/i],
    ['weather-resistant', /weather[- ]resistant/i],
    ['blank-face', /blank[- ]face/i]
  ];
  const seen = new Set();

  return candidates.filter((point) => {
    const theme = themes.find(([, pattern]) => pattern.test(point))?.[0] || point.toLowerCase();
    if (seen.has(theme)) return false;
    seen.add(theme);
    return true;
  }).slice(0, 4);
}

export function ProductFeatureStory({ product }) {
  const points = productEngineeringPoints(product);

  return (
    <section className="product-story product-story--feature">
      <div className="container product-story__split">
        <figure className="product-story__media">
          <SafeImage src={product.assets.feature} alt={`${product.sku} product engineering details`} loading="lazy" />
        </figure>
        <div className="product-story__content">
          <p className="product-section-label">Product engineering</p>
          <h2>Protection engineered for everyday installation.</h2>
          <p className="product-story__summary">{product.summary}</p>
          <ul className="product-story__points">
            {points.map((point) => (
              <li key={point}><Check size={18} aria-hidden="true" /><span>{point}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProductApplicationStory({ product }) {
  const lifestyleImage = product.assets.gallery?.[4] || product.assets.gallery?.at(-1) || product.assets.hero;

  return (
    <section className="product-story product-story--application">
      <div className="container product-story__split product-story__split--reverse">
        <div className="product-story__content">
          <p className="product-section-label">Application review</p>
          <h2>Designed for the environments in the specification.</h2>
          <p className="product-story__grade">{product.grade}</p>
          <p className="product-story__summary">{product.summary}</p>
          <p className="product-story__note">
            Confirm the intended location, enclosure and applicable code requirements before specifying a model.
          </p>
          <Link className="textlink" to={`/contact?model=${encodeURIComponent(product.sku)}`}>
            Review your application <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <figure className="product-story__media product-story__media--cover">
          <SafeImage src={lifestyleImage} alt={`${product.sku} representative application setting`} loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

const OEM_CAPABILITIES = [
  'Finish coordination',
  'Approved brand marking',
  'Packaging coordination',
  'Documentation support'
];

export function ProductOemStory({ product }) {
  return (
    <section
      className="product-story product-story--oem product-story--cool"
      data-testid="product-oem-story"
    >
      <div className="container">
        <div className="product-story__oem-head">
          <div>
            <p className="product-section-label">Program configuration</p>
            <h2>Configure the product around your program.</h2>
          </div>
          <p>Align the visible finish and approved program materials around a reviewed product specification.</p>
        </div>
        <div className="product-finish-strip" aria-label={`${product.sku} finish references`}>
          {colors.map((finish) => (
            <figure key={finish.slug} data-testid="product-finish-cell">
              <SafeImage
                src={productFinishImage(product.sku, finish.slug)}
                alt={`${product.sku} ${finish.name} finish`}
                width={620}
                height={620}
                loading="lazy"
              />
              <figcaption>{finish.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="product-oem__footer">
          <ul className="product-oem__capabilities">
            {OEM_CAPABILITIES.map((capability) => (
              <li key={capability}><Check size={17} aria-hidden="true" /> {capability}</li>
            ))}
          </ul>
          <Link className="btn btn--primary" to={`/contact?model=${encodeURIComponent(product.sku)}`}>
            Discuss {product.sku} configuration <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
