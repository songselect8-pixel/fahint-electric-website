import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { company } from '../data/company.js';
import { productLines } from '../data/lines.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <div className="logo" style={{ marginBottom: 18 }}>
              <span className="logo__mark">F</span>
              <span className="logo__text">
                <span className="logo__name">{company.brand}</span>
                <span className="logo__sub">Electric</span>
              </span>
            </div>
            <p>
              {company.name} develops coordinated North American wiring-device platforms for brands, distributors and
              private-label programs.
            </p>
            <p style={{ marginTop: 14, fontSize: 13.5, color: 'rgba(255,255,255,0.5)' }}>
              UL File {company.ulFile} | ISO 9001 Certified | US &amp; CN Patented
            </p>
          </div>

          <div>
            <h4>Product Series</h4>
            <ul>
              {productLines.map((l) => (
                <li key={l.slug}>
                  <Link to={`/products/${l.slug}`}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About Fahint</Link>
              </li>
              <li>
                <Link to="/capabilities">Manufacturing</Link>
              </li>
              <li>
                <Link to="/capabilities#oem">OEM &amp; ODM</Link>
              </li>
              <li>
                <Link to="/about#certifications">Certifications</Link>
              </li>
              <li>
                <Link to="/blog">Blog &amp; insights</Link>
              </li>
              <li>
                <Link to="/contact">Request a quote</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Mail size={17} style={{ marginTop: 4, flexShrink: 0 }} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Phone size={17} style={{ marginTop: 4, flexShrink: 0 }} />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={17} style={{ marginTop: 4, flexShrink: 0 }} />
                <span>{company.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {company.name} All rights reserved.
          </span>
          <span>{company.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
