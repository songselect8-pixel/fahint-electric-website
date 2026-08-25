import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../Reveal.jsx';

export default function BrandApplicationStory() {
  return (
    <section className="home-brand-story" data-title-align="right">
      <div className="container home-brand-story__grid">
        <Reveal className="home-brand-story__copy">
          <p className="home-section-label">Built as one brand system</p>
          <h2>A Product Range Buyers Can Recognize.</h2>
          <p>
            Align models, finishes, markings and packaging across a coordinated wall-device collection.
          </p>
          <Link to="/capabilities#oem" className="home-arrow-link">
            See private-label capabilities <ArrowRight size={17} />
          </Link>
        </Reveal>
        <Reveal className="home-brand-story__media" delay={100}>
          <img
            src="assets/images/company/team-meeting.webp"
            alt="Fahint team reviewing a private-label wiring device program with a customer"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
