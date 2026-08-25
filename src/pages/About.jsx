import { Link } from 'react-router-dom';
import { ArrowRight, Award, Check } from 'lucide-react';
import { company, stats, certifications, faqs } from '../data/company.js';
import { productImage } from '../data/products.js';
import Faq from '../components/Faq.jsx';
import Reveal from '../components/Reveal.jsx';

export default function About() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>About Us</span>
          </div>
          <h1>A Wenzhou Wiring Device Factory Built for the North American Market</h1>
          <p>
            {company.name} — established {company.since}, UL/cUL listed, ISO 9001 certified, patented in both the United States
            and China.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__media">
            <img src={productImage('GF20', 'lifestyle')} alt="Fahint GFCI outlet installed" loading="lazy" />
          </div>
          <div>
            <div className="eyebrow">/ Who We Are /</div>
            <h2>Specialists, Not Generalists</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: 17 }}>
              We are a professional manufacturer of American standard low voltage electrical switches and sockets, located in
              Wenzhou, Zhejiang Province — a major industrial hub in Eastern China. Our 70,000 square foot factory sits just 25
              minutes from Wenzhou International Airport, which keeps global logistics simple.
            </p>
            <p style={{ color: 'var(--gray-600)', fontSize: 17 }}>
              Our product range covers GFCI outlets, USB charging sockets, dimmer and sensor occupancy switches, standard
              receptacles, smart switches, lighting switches and wallplates for both commercial and residential projects.
            </p>
            <ul className="checklist">
              <li>
                <Check size={17} /> Patented technologies registered in both the U.S. and China
              </li>
              <li>
                <Check size={17} /> Production certified under UL, ETL and ISO 9001 standards
              </li>
              <li>
                <Check size={17} /> 12 automated inspection lines with a first pass yield above 98%
              </li>
              <li>
                <Check size={17} /> 3-year warranty on every product we ship
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tight section--gray">
        <div className="container">
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal className="stat" key={s.label} delay={i * 80}>
                <strong>
                  {s.value}
                  {s.suffix}
                </strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ How We Work /</div>
            <h2>Three Commitments We Make to Every Buyer</h2>
          </div>
          <div className="info-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              {
                title: '6-hour engineering response',
                body:
                  'Our experienced engineering team provides customised design solutions within 6 hours — individual colour box, logo on wall plate, logo on top or bottom body, colour customisation for plates, covers and bases, and bracket customisation. MOQ 400 cartons.'
              },
              {
                title: '3-day shipment, 10-day delivery',
                body:
                  'To serve North American customers better we maintain overseas warehouses, enabling shipment within 3 days and delivery in as fast as 10 days for stocked items.'
              },
              {
                title: 'A decade without a Category A complaint',
                body:
                  'Ten years of zero Category A complaints and recognition as an approved supplier for ALDI. That record is why retail and distribution buyers trust our compliance documentation.'
              }
            ].map((c, i) => (
              <Reveal className="info-card" key={c.title} delay={i * 80}>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--gray" id="certifications">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Certifications /</div>
            <h2>Documentation Your Compliance Team Can Verify</h2>
            <p>Full certificates and test reports are available on request for any model in the catalogue.</p>
          </div>
          <div className="cert-grid">
            {certifications.map((c, i) => (
              <Reveal className="cert" key={c.code} delay={i * 60}>
                <span className="cert__icon">
                  <Award size={20} />
                </span>
                <div>
                  <strong>{c.code}</strong>
                  <span>{c.detail}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <div>
            <div className="eyebrow">/ FAQ /</div>
            <h2>Common Questions</h2>
            <Link to="/contact" className="btn btn--ghost" style={{ marginTop: 18 }}>
              Ask us anything <ArrowRight size={16} />
            </Link>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Let&apos;s Build Your GFCI Programme</h2>
              <p>Tell us your volume, finish mix and packaging requirement — we will come back with a costed proposal.</p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/contact" className="btn btn--light">
                Contact us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
