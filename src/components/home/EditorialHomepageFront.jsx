import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { stats as companyStats } from '../../data/company.js';
import Reveal from '../Reveal.jsx';
import HomeCertifications from './HomeCertifications.jsx';

const asset = (name) => `assets/images/editorial-home/${name}`;

const products = [
  {
    name: 'GFCI Outlets',
    label: 'Safety Protection',
    image: asset('product-gfci-optimized.webp'),
    imageSize: [1600, 888],
    href: '/products/gfci',
    description: 'Self-test protection devices for residential, commercial and demanding installation environments.',
    specs: '15A / 20A · TR / WR options'
  },
  {
    name: 'USB & Type-C Outlets',
    label: 'In-Wall Charging',
    image: asset('product-usb-optimized.webp'),
    imageSize: [1600, 888],
    href: '/products/usb-outlets',
    description: 'Integrated charging solutions designed for modern homes, hospitality and workplace projects.',
    specs: 'USB-A · Type-C · PD options'
  },
  {
    name: 'Receptacles',
    label: 'Wiring Devices',
    image: asset('product-receptacle-optimized.webp'),
    imageSize: [1600, 888],
    href: '/products/receptacles',
    description: 'Decorator, duplex and specialty receptacles with coordinated plates and finish options.',
    specs: 'Residential / Commercial grade'
  },
  {
    name: 'Switches & Dimmers',
    label: 'Lighting Control',
    image: asset('category-switches-scene.webp'),
    imageSize: [1600, 900],
    href: '/products/dimmers',
    description: 'Decorator switches, dimmers and sensor controls for clean, consistent wall-device programs.',
    specs: 'Switch · Dimmer · Sensor'
  },
  {
    name: 'Smart Home Controls',
    label: 'Connected Living',
    image: asset('product-smart-optimized.webp'),
    imageSize: [1600, 888],
    href: '/products/smart-switches',
    description: 'Wi-Fi and Zigbee lighting controls built for app, voice and shared-home experiences.',
    specs: 'Wi-Fi · Zigbee · Voice control'
  },
  {
    name: 'Wall Plates & Accessories',
    label: 'Finishing System',
    image: asset('category-wallplates-scene.webp'),
    imageSize: [1600, 900],
    href: '/products/wallplates',
    description: 'Screwless, standard and metal wall plates developed to complete a coordinated device range.',
    specs: 'Glossy · Matte · Metal'
  }
];

const applications = [
  {
    title: 'Kitchens & Wet Areas',
    label: 'Residential safety',
    image: asset('application-kitchen-v2-optimized.webp'),
    mobileFocal: 'right',
    href: '/products/gfci',
    copy: 'Integrated GFCI protection for premium kitchens and water-adjacent locations.'
  },
  {
    title: 'Hospitality & Multifamily',
    label: 'Connected convenience',
    image: asset('application-hotel-v2-optimized.webp'),
    mobileFocal: 'left',
    href: '/products/usb-outlets',
    copy: 'USB and Type-C charging where guests and residents naturally need power.'
  },
  {
    title: 'Commercial Fit-Out',
    label: 'Professional installation',
    image: asset('application-commercial-v2-optimized.webp'),
    mobileFocal: 'center',
    href: '/capabilities',
    copy: 'Dependable wiring-device programs for contractors and project buyers.'
  },
  {
    title: 'Bathrooms & Renovation',
    label: 'Protected spaces',
    image: asset('application-bathroom-v2-optimized.webp'),
    mobileFocal: 'center',
    href: '/products/receptacles',
    copy: 'Clean, coordinated protection for modern bathroom and renovation projects.'
  }
];

const engineeringCapabilities = [
  ['01', 'Safety & compliance', 'Listed platforms and market-ready documentation across selected device families.'],
  ['02', 'Charging performance', 'USB-A, Type-C and PD options configured for modern in-wall charging programs.'],
  ['03', 'Control intelligence', 'Switching, dimming and connected control options built around the same system.'],
  ['04', 'Coordinated form & finish', 'Aligned faces, plates, colours and markings across a complete wall-device range.']
];

const customizationOptions = [
  ['01', 'Product mix', 'Build a range across protection, charging, receptacle, switch and control families.'],
  ['02', 'Colours & finishes', 'Coordinate device faces, plates and surface treatments for one brand language.'],
  ['03', 'Logo & markings', 'Define logo placement, rating marks and market-ready product identification.'],
  ['04', 'Packaging', 'Prepare cartons, manuals and retail or project packaging around your program.'],
  ['05', 'Compliance files', 'Coordinate model data, certification references and approval documentation.'],
  ['06', 'Samples & testing', 'Review appearance, fit, function and packaging before production handoff.']
];

const factoryArea = companyStats.find((item) => item.label === 'Factory area (sq ft)');

const proof = [
  ['UL / cUL', 'Selected listed models'],
  ['100%', 'Comprehensive testing'],
  [factoryArea?.value || '70,000', factoryArea?.label || 'Factory area (sq ft)'],
  ['OEM / ODM', 'Flexible program support']
];

const process = [
  ['01', 'Requirement review', 'Market, application, rating and certification needs.'],
  ['02', 'Product configuration', 'Device family, color, plate and packaging options.'],
  ['03', 'Sample & verification', 'Confirm appearance, fit, function and documentation.'],
  ['04', 'Production & delivery', 'Manufacturing, testing, packing and shipment support.']
];

export default function EditorialHomepageFront() {
  return (
    <div className="editorial-home-front">
      <section className="editorial-hero" aria-labelledby="editorial-hero-title">
        <img
          className="editorial-hero__image"
          src={asset('hero-1-optimized.webp')}
          alt="Fahint North American wiring devices"
          width="1600"
          height="458"
          fetchpriority="high"
          decoding="async"
        />
        <div className="editorial-hero__shade" />
        <div className="editorial-hero__grid" />
        <div className="container editorial-hero__content">
          <p className="editorial-eyebrow">North American wiring devices · OEM/ODM manufacturing</p>
          <h1 id="editorial-hero-title">Wiring-device programs built for your market.</h1>
          <p className="editorial-hero__copy">
            GFCI outlets, USB and Type-C receptacles, wiring devices, controls and wall plates for distributors,
            contractors and private-label programs.
          </p>
          <div className="editorial-hero__actions">
            <Link className="editorial-button" to="/products">
              Browse certified models <ArrowRight size={17} />
            </Link>
            <Link className="editorial-text-link" to="/contact">
              Start an OEM brief <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="container editorial-hero__note" aria-label="Product program values">
          <span>Product safety</span><span>Verified testing</span><span>Program flexibility</span>
        </div>
      </section>

      <section className="editorial-proof homepage-proof-bridge" aria-label="Fahint manufacturing highlights">
        <div className="container editorial-proof__grid">
          {proof.map(([value, label]) => (
            <div key={value}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>

      <section className="editorial-products homepage-product-portfolio" aria-labelledby="editorial-products-title">
        <div className="container editorial-heading">
          <div>
            <p className="editorial-eyebrow">Product portfolio</p>
            <h2 id="editorial-products-title">One platform. Six focused product systems.</h2>
          </div>
          <p>
            Explore Fahint by application and product family. Each system can be configured around your rating,
            finish, market and program requirements.
          </p>
        </div>
        <Reveal className="editorial-product-mosaic reveal--group">
          {products.map((product, index) => (
            <Link
              className="editorial-product-panel"
              key={product.name}
              to={product.href}
              aria-label={`View ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                width={product.imageSize[0]}
                height={product.imageSize[1]}
                loading={index > 1 ? 'lazy' : 'eager'}
                decoding="async"
              />
              <div className="editorial-panel__shade" />
              <div className="editorial-panel__content">
                <div className="editorial-panel__number">{String(index + 1).padStart(2, '0')}</div>
                <p className="editorial-panel__label">{product.label}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="editorial-panel__meta">
                  <span>{product.specs}</span>
                  <span className="editorial-panel__arrow" aria-hidden="true"><ArrowRight size={18} /></span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <section className="editorial-brand homepage-why-fahint" aria-labelledby="editorial-brand-title">
        <div className="container editorial-brand__grid">
          <Reveal className="editorial-brand__media reveal--media">
            <img
              src={asset('brand-system-family-final-optimized.webp')}
              alt="Fahint coordinated wiring-device product family"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
            />
            <span className="editorial-brand__index">One system · Five product platforms</span>
          </Reveal>
          <div className="editorial-brand__copy">
            <p className="editorial-eyebrow">Why Fahint</p>
            <h2 id="editorial-brand-title">One coordinated system—from product platform to program support.</h2>
            <p className="editorial-brand__lede">
              Product families, visible finishes, model documentation and program support are developed as one system,
              helping buyers build a coherent range without coordinating disconnected suppliers.
            </p>
            <ul className="editorial-feature-list editorial-feature-list--platform">
              {engineeringCapabilities.map(([number, title, copy]) => (
                <li key={number}><span>{number}</span><div><strong>{title}</strong><small>{copy}</small></div></li>
              ))}
            </ul>
            <Link className="editorial-text-link editorial-text-link--dark" to="/about">
              Discover Fahint <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="editorial-factory" aria-labelledby="editorial-factory-title">
        <img className="editorial-factory__bg" src={asset('factory-optimized.webp')} alt="Fahint production and testing line" width="1600" height="900" loading="lazy" decoding="async" />
        <div className="editorial-factory__shade" />
        <div className="container editorial-factory__content">
          <div className="editorial-factory__copy">
            <p className="editorial-eyebrow">Manufacturing confidence</p>
            <h2 id="editorial-factory-title">Quality is checked on the line, not promised after it.</h2>
            <p>
              Fahint integrates product development, manufacturing and quality control in Yueqing, Wenzhou.
              Complete production lines and test benches support consistent output for export programs.
            </p>
          </div>
          <div className="editorial-factory__points">
            {[
              ['01', 'Integrated production', 'Manufacturing and assembly under one coordinated system.'],
              ['02', 'Functional inspection', 'Comprehensive testing before products leave the line.'],
              ['03', 'Laboratory support', 'Supporting equipment for standards-focused verification.'],
              ['04', 'Export experience', 'Programs serving North and Latin American markets.']
            ].map(([number, title, copy]) => (
              <div key={number}><span>{number}</span><strong>{title}</strong><small>{copy}</small></div>
            ))}
          </div>
        </div>
      </section>

      <HomeCertifications />

      <section className="editorial-customization homepage-oem-program" aria-labelledby="editorial-customization-title">
        <div className="container editorial-customization__grid">
          <Reveal className="editorial-customization__media reveal--media">
            <img src={asset('product-receptacle-optimized.webp')} alt="Coordinated Fahint receptacle and switch range" width="1600" height="888" loading="lazy" decoding="async" />
            <div className="editorial-customization__caption">
              <span>Private-label program</span>
              <strong>One product language across the wall.</strong>
            </div>
          </Reveal>
          <div className="editorial-customization__content">
            <p className="editorial-eyebrow">OEM/ODM configuration</p>
            <h2 id="editorial-customization-title">Configure a production-ready program around your market.</h2>
            <p className="editorial-customization__lede">
              Start with proven device platforms, then coordinate the visible details, product information,
              documentation and approval path around your market program.
            </p>
            <div className="editorial-customization__list">
              {customizationOptions.map(([number, title, copy]) => (
                <div className="editorial-customization__item" key={number}>
                  <span>{number}</span><div><strong>{title}</strong><small>{copy}</small></div>
                </div>
              ))}
            </div>
            <Link className="editorial-button editorial-button--dark" to="/contact">
              Start an OEM brief <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="container homepage-oem-program__process">
          <div className="editorial-heading homepage-oem-program__heading">
            <div>
              <p className="editorial-eyebrow">Program path</p>
              <h3>Four steps from requirement to production.</h3>
            </div>
            <p>Share the market, target specification, forecast volume and branding needs. We will define the next practical step.</p>
          </div>
          <Reveal className="editorial-process reveal--group">
            {process.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p><Check size={16} aria-hidden="true" />
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="editorial-applications" aria-labelledby="editorial-applications-title">
        <div className="container editorial-heading editorial-heading--applications">
          <div>
            <p className="editorial-eyebrow">Applications</p>
            <h2 id="editorial-applications-title">Built for the places power matters most.</h2>
          </div>
          <p>Product programs for residential construction, hospitality, commercial projects and field installation.</p>
        </div>
        <Reveal className="editorial-application-grid reveal--group">
          {applications.map((item) => (
            <Link
              className="editorial-application"
              data-mobile-focal={item.mobileFocal}
              key={item.title}
              to={item.href}
              aria-label={`View ${item.title} solution`}
            >
              <img src={item.image} alt={item.title} width="1600" height="900" loading="lazy" decoding="async" />
              <div className="editorial-application__shade" />
              <div className="editorial-application__copy">
                <p>{item.label}</p><h3>{item.title}</h3><span>{item.copy}</span>
              </div>
              <span className="editorial-application__arrow" aria-hidden="true"><ArrowRight size={19} /></span>
            </Link>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
