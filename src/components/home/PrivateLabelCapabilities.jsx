import { ArrowRight, Boxes, FileBadge2, PackageCheck, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal.jsx';

const capabilities = [
  {
    icon: Boxes,
    title: 'Select the right platform',
    body: 'Build your range across GFCI, USB, receptacle, smart-control and lighting-switch families.'
  },
  {
    icon: Palette,
    title: 'Coordinate the finish',
    body: 'Align colours, plates and device faces so every product reads as one intentional collection.'
  },
  {
    icon: PackageCheck,
    title: 'Apply your brand system',
    body: 'Add approved logos, body markings, colour boxes and market-ready private-label packaging.'
  },
  {
    icon: FileBadge2,
    title: 'Prepare the documentation',
    body: 'Coordinate model data, certification references and approval samples before production.'
  }
];

export default function PrivateLabelCapabilities() {
  return (
    <section className="home-capabilities" aria-labelledby="home-capabilities-title" data-title-align="left">
      <div className="container home-capabilities__layout">
        <div className="home-capabilities__intro">
          <p className="home-section-label">Built as one brand system</p>
          <h2 id="home-capabilities-title">Private-label Support, Built Into the Range.</h2>
          <p>Start with proven product platforms, then shape the details customers see and buyers need to approve.</p>
          <Link to="/capabilities#oem" className="home-arrow-link">
            Explore OEM/ODM capabilities <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-capabilities__grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="home-capability" key={item.title} delay={index * 60}>
                <span className="home-capability__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.7} />
                </span>
                <span className="home-capability__number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
