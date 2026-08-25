import { stats } from '../../data/company.js';
import { facilityShots } from '../../data/certificates.js';
import Reveal from '../Reveal.jsx';

const featuredShots = ['workshop', 'lab', 'sampleroom', 'warehouse'].map((slug) =>
  facilityShots.find((shot) => shot.slug === slug)
);

export default function ManufacturingProof() {
  return (
    <section className="home-proof" aria-labelledby="home-proof-title" data-title-align="left">
      <div className="container">
        <div className="home-proof__head">
          <div>
            <p className="home-section-label">Factory evidence</p>
            <h2 id="home-proof-title">Manufacturing You Can Verify.</h2>
          </div>
          <p>Real production, testing and sample-review spaces behind the product range.</p>
        </div>

        <div className="home-proof__stats" aria-label="Fahint manufacturing statistics">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>
                {stat.value}
                {stat.suffix}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="home-proof__gallery">
          {featuredShots.map((shot, index) => (
            <Reveal className={`home-proof__shot home-proof__shot--${index + 1}`} key={shot.slug} delay={index * 55}>
              <img src={shot.image} alt={shot.title} loading="lazy" />
              <div>
                <strong>{shot.title}</strong>
                <span>{shot.body}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
