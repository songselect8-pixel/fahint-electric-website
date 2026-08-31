import { company } from '../data/company.js';
import { Link } from 'react-router-dom';
import { CompanyBreadcrumb, CompanyClosing, CompanyImage, CompanyLink, usePageMeta } from '../components/company/CompanyShared.jsx';
import CertificateLibrary from '../components/company/CertificateLibrary.jsx';
import EditorialPhoto from '../components/company/EditorialPhoto.jsx';
import { companyProfile, companyPhotos } from '../data/companyProfile.js';
import { catalogueDocument } from '../data/documents.js';
import { publicAsset } from '../utils/publicAsset.js';

export default function About() {
  usePageMeta('About FAHINT', 'Meet Wenzhou Fahint Electric: wiring devices for North American markets, FAHINT-branded products and OEM / ODM manufacturing support.');
  return <div className="company-page">
    <header className="company-masthead company-about-opening">
      <div className="company-wrap">
        <CompanyBreadcrumb current="About FAHINT" />
        <div className="company-heading company-heading--hero">
          <h1>Everyday power.<br /><span>Made by FAHINT.</span></h1>
          <div><p>We are {company.name} A wiring-device manufacturer in Wenzhou, China, bringing research, product development, production and sales together — for the FAHINT brand and the brands we work with.</p><div className="company-actions"><CompanyLink to="/products">Explore FAHINT products</CompanyLink><CompanyLink to="/capabilities" secondary>Our manufacturing</CompanyLink></div></div>
        </div>
        <figure className="company-about-photo"><CompanyImage src="assets/images/company/catalog-production.jpg" alt="FAHINT staff and GFCI test stations on the production floor" width={1417} height={547} priority /><figcaption>GFCI production and functional testing · From the FAHINT company catalog</figcaption></figure>
      </div>
    </header>
    <nav className="company-about-nav company-wrap" aria-label="About FAHINT sections"><Link to="#company-profile">Our company</Link><Link to="#inside-fahint">Inside FAHINT</Link><Link to="#working-together">Working together</Link><Link to="#our-markets">Our markets</Link><Link to="#certifications">Certifications</Link></nav>
    <section id="company-profile" className="company-section" aria-labelledby="company-profile-title">
      <div className="company-wrap company-profile">
        <div><h2 id="company-profile-title">A product brand.<br /><span>A manufacturer behind it.</span></h2><dl className="company-facts"><div><dt>Established</dt><dd>{companyProfile.established}</dd></div><div><dt>Based in</dt><dd>{companyProfile.location}</dd></div><div><dt>Our work</dt><dd>{companyProfile.disciplines}</dd></div><div><dt>Our focus</dt><dd>American-standard wiring devices</dd></div></dl></div>
        <div className="company-profile__story"><h3>Wenzhou Fahint Electric Co., Ltd.</h3><p>Established in 2015, FAHINT develops and manufactures low-voltage electrical switches and receptacles in Yueqing, Wenzhou. Our work connects the device itself with the manufacturing and quality-control processes behind it.</p><p>GFCI protection and USB charging are central to our range, alongside standard receptacles, dimmers, smart switches, lighting switches and wall plates. These product families serve residential and commercial applications, with model-specific ratings, functions and finishes.</p><p>For customers, that means two ways to work with the same manufacturer: choose FAHINT-branded products or develop a private-label range with coordinated devices, markings and packaging.</p><a className="company-text-link" href={publicAsset(catalogueDocument)} download>Download our company & product catalog</a></div>
      </div>
    </section>
    <section id="inside-fahint" className="company-section company-section--paper" aria-labelledby="company-making-title"><div className="company-wrap">
      <div className="company-heading"><h2 id="company-making-title">From components<br /><span>to a finished device.</span></h2><p>Our company materials show the work behind the range: tooling, electronic assembly, product assembly, functional inspection and laboratory verification.</p></div>
      <div className="company-making-layout">
        <div className="company-making-copy">
          <div><h3>Product development & tooling</h3><p>Device construction and tooling are part of product development. The selected model defines the electrical configuration, face design and available finishes.</p></div>
          <div><h3>Electronics & assembly</h3><p>Electronic components and device assemblies are brought together on the production floor. The company catalog includes both assembly equipment and hands-on component work.</p></div>
          <div><h3>Testing & order preparation</h3><p>The production process includes functional testing and aging tests, followed by packaging and shipment preparation. Supporting laboratory equipment is shown in our company documentation.</p></div>
          <CompanyLink to="/capabilities#production" secondary>Explore manufacturing & testing</CompanyLink>
        </div>
        <div className="company-making-photos">
          <figure className="company-making-photos__main"><CompanyImage {...companyPhotos.electronics} /><figcaption>Electronic assembly equipment</figcaption></figure>
          <figure><EditorialPhoto {...companyPhotos.tooling} /><figcaption>Tooling & components</figcaption></figure>
          <figure><EditorialPhoto {...companyPhotos.assembly} /><figcaption>Component assembly</figcaption></figure>
          <p>Photographs from the original FAHINT product catalog.</p>
        </div>
      </div>
      <figure className="company-laboratory"><CompanyImage src="assets/images/company/fahint-laboratory-catalog.webp" alt="Laboratory verification equipment documented in the FAHINT catalog" width={1417} height={422} /><figcaption>Supporting laboratory equipment. The test plan and certification coverage depend on the product model.</figcaption></figure>
    </div></section>
    <section id="working-together" className="company-section company-section--navy">
      <div className="company-wrap"><div className="company-heading"><h2>One company.<br /><span>Two ways to work together.</span></h2><p>Choose the product range that fits your business, with support from selection through the order.</p></div>
        <div className="company-business-paths">
          <div><h3>FAHINT products</h3><p>Choose from our collection for distribution, retail or a project specification. Compare the model, electrical rating, available finish and relevant certification documents before confirming your order.</p><ul className="company-path-details"><li>GFCI protection, charging, switching and wall plates</li><li>Residential and commercial product options</li><li>Model documentation and sample review</li></ul><CompanyLink to="/products" secondary light>Find your product range</CompanyLink></div>
          <div><h3>Your brand, our manufacturing</h3><p>Build a private-label or OEM / ODM program with our team. Start with the device and its requirements, then coordinate the visible details and packaging for your market.</p><ul className="company-path-details"><li>Device colors and matching wall plates</li><li>Authorized logos and product markings</li><li>Color-box artwork and packaging requirements</li></ul><CompanyLink to="/capabilities#oem" secondary light>Explore OEM / ODM support</CompanyLink></div>
        </div>
      </div>
    </section>
    <section id="our-markets" className="company-section"><div className="company-wrap">
      <div className="company-heading"><h2>Built in Wenzhou.<br /><span>Working across markets.</span></h2><p>We work with distributors, retailers, contractors and private-label brands. Our export experience spans North America and markets across Latin America and the Caribbean.</p></div>
      <div className="company-markets-layout">
        <div><h3>A conversation around real products.</h3><p>Product displays and face-to-face discussions help turn a sourcing brief into a shared understanding of the device, finish and packaging. Our exhibition photographs show that work with buyers.</p><dl className="company-market-list"><div><dt>North America</dt><dd>United States, Canada and Mexico</dd></div><div><dt>Latin America & the Caribbean</dt><dd>Including Colombia, Panama, Honduras, Jamaica and the Dominican Republic</dd></div></dl><p className="company-market-note">Requirements differ by destination. Confirm the model, documentation and order details for your market with our team.</p><CompanyLink to="/contact" secondary>Meet your product team</CompanyLink></div>
        <figure><EditorialPhoto {...companyPhotos.discussion} /><figcaption>Product discussions at the FAHINT exhibition display · Company photo archive</figcaption></figure>
      </div>
    </div></section>
    <CertificateLibrary />
    <CompanyClosing title="Your next project starts with a conversation." text="Tell us what you are specifying, sourcing or building. We will help you find the relevant products and documentation." />
  </div>;
}
