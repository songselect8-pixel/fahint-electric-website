import { ExternalLink } from 'lucide-react';
import SafeImage from '../SafeImage.jsx';
import { publicAsset } from '../../utils/publicAsset.js';

const viewLabels = {
  front: ['Glass face', 'Tempered glass panel and model-specific touch controls.'],
  side: ['Side profile', 'A closer look at the face edge and rear housing.'],
  rear: ['Rear housing', 'Review the terminal layout and the model label.']
};

export function SmartSwitchDetails({ product }) {
  return <section className="product-story product-story--feature smart-product-details">
    <div className="container">
      <header className="catalog-section-heading">
        <div><p className="product-section-label">Product details</p><h2>Every angle.<br />One considered design.</h2></div>
        <p>{product.sku} — front, profile and rear views from the product library.</p>
      </header>
      <div className="smart-product-details__views">
        {product.assets.detailViews.map((image, index) => <figure key={image.kind}>
          <div className="smart-product-details__image"><SafeImage src={image.src} alt={`${product.sku} ${image.kind} detail`} width={image.width} height={image.height} loading="lazy" /></div>
          <figcaption><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{viewLabels[image.kind][0]}</h3><p>{viewLabels[image.kind][1]}</p></div></figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}

export function SmartSwitchReferences({ product }) {
  const us = product.sku.startsWith('US');
  const wiring = product.keyFacts.find(([label]) => label === 'Wiring')?.[1];
  return <section className="product-technical smart-product-references" id="installation-reference">
    <div className="container">
      <header className="catalog-section-heading">
        <div><p className="product-section-label">Technical references</p><h2>Dimensions &amp;<br />installation reference.</h2></div>
        <p>Original library drawings for {product.sku}. Open either sheet to review it at full resolution.</p>
      </header>
      {product.reviewNotice && <aside className="catalog-model-notice">{product.reviewNotice}</aside>}
      <div className="smart-product-references__grid">
        {product.assets.drawings.map((drawing) => <figure key={drawing.kind}>
          <figcaption><span className="product-section-label">{drawing.kind === 'dimensions' ? '01 / Model dimensions' : '02 / Wiring reference'}</span>
            <h3>{drawing.kind === 'dimensions' ? 'Dimensions' : 'Installation & wiring'}</h3>
            <p>{drawing.kind === 'dimensions' ? (us ? 'Original face and housing measurements.' : 'Series dimension sheet — confirm the supplied rear housing version.')
              : `${wiring}. ${us ? 'Library wiring artwork; verify against the supplied device.' : 'Series sheet includes different circuits; not all shown variants apply to this model.'}`}</p>
          </figcaption>
          <a href={publicAsset(drawing.src)} target="_blank" rel="noreferrer" aria-label={`Open ${product.sku} ${drawing.kind} source reference`}>
            <SafeImage src={drawing.src} alt={`${product.sku} ${drawing.kind} source reference`} width={drawing.width} height={drawing.height} loading="lazy" />
            <span>Open {drawing.kind === 'dimensions' ? 'dimension sheet' : 'wiring reference'} <ExternalLink size={16} aria-hidden="true" /></span>
          </a>
        </figure>)}
      </div>
      <p className="smart-product-references__note">Each sheet is a source reference, not a substitute for the approved installation manual. Confirm the exact model, wiring version, terminal markings and load compatibility before installation.</p>
    </div>
  </section>;
}
