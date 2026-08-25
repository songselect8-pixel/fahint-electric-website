import { Link } from 'react-router-dom';
import { ArrowRight, Check, Package, Palette, Tag, Boxes, Timer, Ship } from 'lucide-react';
import { company, capabilities } from '../data/company.js';
import { productImage } from '../data/products.js';
import Reveal from '../components/Reveal.jsx';

const oemOptions = [
  { icon: Package, title: 'Individual colour box', body: 'Fully printed retail packaging designed to your artwork and barcode system.' },
  { icon: Tag, title: 'Logo on wall plate', body: 'Your brand mark applied to the visible faceplate for shelf and jobsite recognition.' },
  { icon: Tag, title: 'Logo on body', body: 'Moulded or printed branding on the top and bottom body of the device.' },
  { icon: Palette, title: 'Colour customisation', body: 'Custom colour matching for wall plates, covers and bases beyond the standard seven finishes.' },
  { icon: Boxes, title: 'Bracket customisation', body: 'Modified yokes and mounting brackets for specific enclosure or box requirements.' },
  { icon: Ship, title: 'Neutral packaging', body: 'Unbranded cartons and inner boxes for distributors who apply their own labelling.' }
];

export default function Capabilities() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Capabilities</span>
          </div>
          <h1>Manufacturing, OEM &amp; ODM Capabilities</h1>
          <p>
            In-house tooling, injection, assembly and full electrical test — plus a customisation programme designed around
            private-label and distributor requirements.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Production /</div>
            <h2>Every Unit Is Tested Before It Is Packed</h2>
            <p>
              Twelve automated inspection lines run dielectric, trip-threshold and continuity checks on 100% of production. Our
              first pass yield exceeds 98%.
            </p>
          </div>
          <div className="cap-grid">
            {capabilities.map((c) => (
              <div className="cap" key={c.title}>
                <img src={c.image} alt={c.title} loading="lazy" />
                <div className="cap__overlay">
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--gray" id="oem">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ OEM &amp; ODM /</div>
            <h2>Six Ways We Customise Your Programme</h2>
            <p>Standard customisation MOQ is 400 cartons. Engineering returns a design solution within 6 hours.</p>
          </div>
          <div className="info-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {oemOptions.map((o, i) => (
              <Reveal className="info-card" key={o.title} delay={i * 60}>
                <span className="cert__icon" style={{ marginBottom: 14 }}>
                  <o.icon size={20} />
                </span>
                <h4>{o.title}</h4>
                <p>{o.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__media">
            <img src={productImage('GF15', 'mcu')} alt="GFCI MCU self-test architecture" loading="lazy" />
          </div>
          <div>
            <div className="eyebrow">/ Quality System /</div>
            <h2>Built Around UL 943 Compliance</h2>
            <ul className="checklist">
              <li>
                <Check size={17} /> Class A trip threshold meets or exceeds UL 943 5th Edition 2018 tripping time
              </li>
              <li>
                <Check size={17} /> MCU-controlled auto-monitoring exceeds the UL 943 self-test requirement
              </li>
              <li>
                <Check size={17} /> Mechanical structure allows trip and power-off in any device state
              </li>
              <li>
                <Check size={17} /> Reverse-wiring lockout prevents live face or downstream output
              </li>
              <li>
                <Check size={17} /> 1.2 mm zinc-plated steel yoke with auto-grounding clip
              </li>
              <li>
                <Check size={17} /> Thickened silver contacts controlling temperature rise under load
              </li>
              <li>
                <Check size={17} /> UL/cUL file {company.ulFile}, ETL verified, ISO 9001 certified
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Logistics /</div>
            <h2>North American Fulfilment</h2>
          </div>
          <div className="info-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              { icon: Timer, title: '3-day shipment', body: 'Stocked items leave our overseas warehouse within three days of order confirmation.' },
              { icon: Ship, title: '10-day delivery', body: 'Domestic North American transit gets product on your dock in as fast as ten days.' },
              { icon: Boxes, title: 'Factory-direct orders', body: 'Full container production runs typically complete in 25–35 days depending on volume and customisation.' }
            ].map((c, i) => (
              <Reveal className="info-card" key={c.title} delay={i * 70}>
                <span className="cert__icon" style={{ marginBottom: 14 }}>
                  <c.icon size={20} />
                </span>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Start Your Private-Label Programme</h2>
              <p>Send artwork, target finishes and annual volume — we will return a full costed customisation proposal.</p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/contact" className="btn btn--light">
                Request a proposal <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
