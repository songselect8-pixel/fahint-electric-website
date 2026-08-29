import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CertCarousel from '../CertCarousel.jsx';

export default function HomeCertifications() {
  return (
    <section className="home-certificates" aria-labelledby="home-certificates-title" data-title-align="left">
      <div className="container">
        <div className="home-certificates__head">
          <div>
            <p className="home-section-label">Manufacturing &amp; compliance</p>
            <h2 id="home-certificates-title">Manufacturing and compliance, documented for review.</h2>
          </div>
          <div>
            <p>Review production evidence, selected product-family files and quality-system documentation before specifying a model.</p>
            <Link to="/about#certifications" className="home-arrow-link">
              View certification details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <CertCarousel />
      </div>
    </section>
  );
}
