import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal.jsx';

const asset = (name) => `assets/images/editorial-home/${name}`;

const products = [
  {
    name: 'GFCI Outlets',
    label: 'Safety Protection',
    image: asset('product-gfci.jpg'),
    href: '/products/gfci',
    description: 'Self-test protection devices for residential, commercial and demanding installation environments.',
    specs: '15A / 20A · TR / WR options'
  },
  {
    name: 'USB & Type-C Outlets',
    label: 'In-Wall Charging',
    image: asset('product-usb.jpg'),
    href: '/products/usb-outlets',
    description: 'Integrated charging solutions designed for modern homes, hospitality and workplace projects.',
    specs: 'USB-A · Type-C · PD options'
  },
  {
    name: 'Receptacles',
    label: 'Wiring Devices',
    image: asset('product-receptacle.jpg'),
    href: '/products/receptacles',
    description: 'Decorator, duplex and specialty receptacles with coordinated plates and finish options.',
    specs: 'Residential / Commercial grade'
  },
  {
    name: 'Switches & Dimmers',
    label: 'Lighting Control',
    image: asset('category-switches.jpg'),
    href: '/products/dimmers',
    description: 'Decorator switches, dimmers and sensor controls for clean, consistent wall-device programs.',
    specs: 'Switch · Dimmer · Sensor'
  },
  {
    name: 'Smart Home Controls',
    label: 'Connected Living',
    image: asset('product-smart.jpg'),
    href: '/products/smart-switches',
    description: 'Wi-Fi and Zigbee lighting controls built for app, voice and shared-home experiences.',
    specs: 'Wi-Fi · Zigbee · Voice control'
  },
  {
    name: 'Wall Plates & Accessories',
    label: 'Finishing System',
    image: asset('category-wallplates.jpg'),
    href: '/products/wallplates',
    description: 'Screwless, standard and metal wall plates developed to complete a coordinated device range.',
    specs: 'Glossy · Matte · Metal'
  }
];

const applications = [
  {
    title: 'Kitchens & Wet Areas',
    label: 'Residential safety',
    image: asset('application-kitchen-v2.png'),
    href: '/products/gfci',
    copy: 'Integrated GFCI protection for premium kitchens and water-adjacent locations.'
  },
  {
    title: 'Hospitality & Multifamily',
    label: 'Connected convenience',
    image: asset('application-hotel-v2.png'),
    href: '/products/usb-outlets',
    copy: 'USB and Type-C charging where guests and residents naturally need power.'
  },
  {
    title: 'Commercial Fit-Out',
    label: 'Professional installation',
    image: asset('application-commercial-v2.png'),
    href: '/capabilities',
    copy: 'Dependable wiring-device programs for contractors and project buyers.'
  },
  {
    title: 'Bathrooms & Renovation',
    label: 'Protected spaces',
    image: asset('application-bathroom-v2.png'),
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

const proof = [
  ['UL / cUL', 'Listed product lines'],
  ['100%', 'Comprehensive testing'],
  ['2,400m²', 'Manufacturing facility'],
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
          src={asset('hero-1.jpg')}
          alt="Fahint North American wiring devices"
          fetchpriority="high"
        />
        <div className="editorial-hero__shade" />
        <div className="editorial-hero__grid" />
        <div className="container editorial-hero__content">
          <p className="editorial-eyebrow">Wiring-device manufacturer · Yueqing, China</p>
          <h1 id="editorial-hero-title">Safer Power.<br />Smarter Control.</h1>
          <p className="editorial-hero__copy">
            GFCI outlets, USB charging receptacles and connected wiring devices engineered for distributors,
            contractors and OEM partners.
          </p>
          <div className="editorial-hero__actions">
            <Link className="editorial-button" to="/products">
              Explore Products <ArrowRight size={17} />
            </Link>
            <Link className="editorial-text-link" to="/capabilities">
              See our manufacturing capability <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="container editorial-hero__note" aria-label="Product program values">
          <span>Product safety</span><span>Verified testing</span><span>Program flexibility</span>
        </div>
      </section>

      <section className="editorial-proof" aria-label="Fahint manufacturing highlights">
        <div className="container editorial-proof__grid">
          {proof.map(([value, label]) => (
            <div key={value}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>

      <section className="editorial-brand" aria-labelledby="editorial-brand-title">
        <div className="container editorial-brand__grid">
          <Reveal className="editorial-brand__media reveal--media">
            <img
              src={asset('brand-system-family-final.png')}
              alt="Fahint coordinated wiring-device product family"
              loading="lazy"
            />
            <span className="editorial-brand__index">One system · Five product platforms</span>
          </Reveal>
          <div className="editorial-brand__copy">
            <p className="editorial-eyebrow">Built as one brand system</p>
            <h2 id="editorial-brand-title">A wiring-device brand built as one system.</h2>
            <p className="editorial-brand__lede">
              Fahint brings protection, charging, receptacles and control into one coordinated range—so the product,
              finish, documentation and packaging all speak the same brand language.
            </p>
            <div className="editorial-brand__principles" aria-label="Fahint brand principles">
              <div><span>01</span><strong>Coordinated product systems</strong></div>
              <div><span>02</span><strong>Verified engineering</strong></div>
              <div><span>03</span><strong>Market-ready support</strong></div>
            </div>
            <Link className="editorial-text-link editorial-text-link--dark" to="/about">
              Discover Fahint <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="editorial-products" aria-labelledby="editorial-products-title">
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
              <img src={product.image} alt={product.name} loading={index > 1 ? 'lazy' : 'eager'} />
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

      <section className="editorial-engineering" aria-labelledby="editorial-engineering-title">
        <img className="editorial-engineering__bg" src={asset('product-gfci.jpg')} alt="Fahint wiring-device engineering platform" loading="lazy" />
        <div className="editorial-engineering__shade" />
        <div className="container editorial-engineering__content">
          <div className="editorial-engineering__copy">
            <p className="editorial-eyebrow">Shared engineering platform</p>
            <h2 id="editorial-engineering-title">Engineering shared across every device platform.</h2>
            <p>
              Protection, charging, switching and control are developed as one coordinated system—making the range
              easier to specify, brand and support across different project types.
            </p>
            <ul className="editorial-feature-list editorial-feature-list--platform">
              {engineeringCapabilities.map(([number, title, copy]) => (
                <li key={number}><span>{number}</span><div><strong>{title}</strong><small>{copy}</small></div></li>
              ))}
            </ul>
            <Link className="editorial-button editorial-button--outline" to="/capabilities">
              Explore engineering capability <ArrowRight size={17} />
            </Link>
          </div>
          <div className="editorial-engineering__callout">
            <span>One coordinated platform</span>
            <strong>Protection, charging, control and finish developed to work as one range.</strong>
          </div>
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
              key={item.title}
              to={item.href}
              aria-label={`View ${item.title} solution`}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="editorial-application__shade" />
              <div className="editorial-application__copy">
                <p>{item.label}</p><h3>{item.title}</h3><span>{item.copy}</span>
              </div>
              <span className="editorial-application__arrow" aria-hidden="true"><ArrowRight size={19} /></span>
            </Link>
          ))}
        </Reveal>
      </section>

      <section className="editorial-customization" aria-labelledby="editorial-customization-title">
        <div className="container editorial-customization__grid">
          <Reveal className="editorial-customization__media reveal--media">
            <img src={asset('product-receptacle.jpg')} alt="Coordinated Fahint receptacle and switch range" loading="lazy" />
            <div className="editorial-customization__caption">
              <span>Private-label programme</span>
              <strong>One product language across the wall.</strong>
            </div>
          </Reveal>
          <div className="editorial-customization__content">
            <p className="editorial-eyebrow">OEM/ODM customization</p>
            <h2 id="editorial-customization-title">Your brand, specified down to the last detail.</h2>
            <p className="editorial-customization__lede">
              Start with proven device platforms, then coordinate the visible details, product information and
              approval path around your market programme.
            </p>
            <div className="editorial-customization__list">
              {customizationOptions.map(([number, title, copy]) => (
                <div className="editorial-customization__item" key={number}>
                  <span>{number}</span><div><strong>{title}</strong><small>{copy}</small></div>
                </div>
              ))}
            </div>
            <Link className="editorial-button editorial-button--dark" to="/contact">
              Start a customization brief <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="editorial-factory" aria-labelledby="editorial-factory-title">
        <img className="editorial-factory__bg" src={asset('factory.jpg')} alt="Fahint production and testing line" loading="lazy" />
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

      <section className="editorial-oem" aria-labelledby="editorial-oem-title">
        <img className="editorial-oem__bg" src={asset('about-fahint.jpg')} alt="Fahint automated manufacturing equipment" loading="lazy" />
        <div className="editorial-oem__shade" />
        <div className="container editorial-oem__content">
          <div className="editorial-heading">
            <div>
              <p className="editorial-eyebrow">OEM & ODM</p>
              <h2 id="editorial-oem-title">From market requirement to production-ready program.</h2>
            </div>
            <p>
              Share your market, target specification, forecast volume and branding needs. Our team will help define
              the next practical step.
            </p>
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
    </div>
  );
}
