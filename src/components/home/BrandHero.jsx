import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function BrandHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title" data-title-align="left">
      <img
        className="home-hero__image"
        src="assets/images/hero/hero-interior.webp"
        alt="Fahint receptacle installed in a modern North American interior"
        fetchpriority="high"
      />
      <div className="home-hero__shade" />
      <div className="container home-hero__content">
        <p className="home-hero__kicker">North American wiring devices</p>
        <h1 id="home-hero-title">Wiring Devices, Built for Your Brand.</h1>
        <p className="home-hero__lead">
          Five coordinated product platforms, backed by certified manufacturing and private-label support.
        </p>
        <div className="home-hero__actions">
          <Link to="/products" className="btn btn--primary">
            Explore products <ArrowRight size={17} />
          </Link>
          <Link to="/contact" className="home-hero__text-link">
            Start an OEM/ODM project <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
