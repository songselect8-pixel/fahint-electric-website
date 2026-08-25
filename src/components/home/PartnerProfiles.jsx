import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal.jsx';

const partners = [
  {
    title: 'Private-label brands',
    body: 'A coordinated product system, appearance direction and packaging support for building a recognisable line.',
    image: 'assets/images/company/team-meeting.webp'
  },
  {
    title: 'Electrical distributors',
    body: 'Market-ready model selection, compliance references and a practical path from sample review to repeat orders.',
    image: 'assets/images/company/facility-sampleroom.webp'
  },
  {
    title: 'Project buyers',
    body: 'A consolidated source for matched wiring-device families across residential and commercial specifications.',
    image: 'assets/images/company/facility-uswarehouse.webp'
  }
];

export default function PartnerProfiles() {
  return (
    <section className="home-partners" aria-labelledby="home-partners-title" data-title-align="right">
      <div className="container">
        <div className="home-partners__head">
          <p className="home-section-label">Partnership fit</p>
          <h2 id="home-partners-title">Built for Different Buying Programs.</h2>
        </div>

        <div className="home-partners__grid">
          {partners.map((partner, index) => (
            <Reveal className="home-partner" key={partner.title} delay={index * 70}>
              <img src={partner.image} alt="" loading="lazy" />
              <div className="home-partner__shade" />
              <div className="home-partner__body">
                <span>0{index + 1}</span>
                <h3>{partner.title}</h3>
                <p>{partner.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Link to="/about" className="home-arrow-link home-partners__link">
          See how Fahint works <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
