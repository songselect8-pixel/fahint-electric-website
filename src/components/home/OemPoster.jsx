import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function OemPoster() {
  return (
    <section className="home-oem-poster" aria-labelledby="home-oem-title" data-title-align="left">
      <img
        className="home-oem-poster__image"
        src="assets/images/hero/hero-factory.webp"
        alt="Fahint automated wiring device production line"
        loading="lazy"
      />
      <div className="home-oem-poster__shade" />
      <div className="container home-oem-poster__content">
        <p className="home-section-label">OEM and ODM manufacturing</p>
        <h2 id="home-oem-title">From Certified Platforms to Your Private-label Line.</h2>
        <p>Select the range. Align the brand. Approve the sample. Move into repeatable production.</p>
        <Link to="/capabilities#oem" className="btn btn--light">
          Explore OEM/ODM <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
