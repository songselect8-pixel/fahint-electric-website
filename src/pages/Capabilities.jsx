import { CompanyBreadcrumb, CompanyClosing, CompanyImage, CompanyLink, usePageMeta } from '../components/company/CompanyShared.jsx';
import EditorialPhoto from '../components/company/EditorialPhoto.jsx';
import { companyPhotos } from '../data/companyProfile.js';

const steps = [
  ['Define the brief', 'Share your market, model mix, target quantities and installation requirements.'],
  ['Configure the range', 'Review available finishes, wall plates, authorized branding and packaging.'],
  ['Approve the sample', 'Confirm appearance, function, model documentation and artwork before the order.'],
  ['Plan production', 'Agree on quantities, lead times, packing and delivery requirements for the selected models.']
];

export default function Capabilities() {
  usePageMeta('Manufacturing & OEM / ODM', 'Explore FAHINT manufacturing, functional testing and private-label support for wiring devices. Review products, samples and model-specific documentation.');
  return <div className="company-page">
    <header className="company-masthead company-masthead--dark">
      <div className="company-wrap">
        <CompanyBreadcrumb current="Manufacturing & OEM / ODM" />
        <div className="company-heading company-heading--hero">
          <h1>Your product.<br /><span>Our production.</span></h1>
          <div><p>Wiring-device manufacturing in Wenzhou, China. From product selection and sample review to assembly, testing and packaging, bring your next range together with FAHINT.</p><div className="company-actions"><CompanyLink to="/contact?topic=oem" light>Discuss your OEM / ODM project</CompanyLink><CompanyLink to="#production" secondary light>Inside production</CompanyLink></div></div>
        </div>
        <figure className="company-panorama"><CompanyImage src="assets/images/editorial-home/factory-optimized.webp" alt="GFCI assembly and functional testing at FAHINT" priority /><figcaption><span>Inside FAHINT</span><span>GFCI assembly & functional testing · Wenzhou, China</span></figcaption></figure>
      </div>
    </header>
    <section className="company-section" id="production" aria-labelledby="production-title">
      <div className="company-wrap">
        <div className="company-heading"><h2 id="production-title">Built on the line.<br /><span>Checked along the way.</span></h2><p>Product development, manufacturing and quality control work together. The checks and documentation follow the device family and its intended application.</p></div>
        <div className="company-columns company-columns--photographic">
          <div><EditorialPhoto {...companyPhotos.assembly} /><h3>Assembly & production</h3><p>Coordinate the device components, assembly and product identification around the selected model.</p></div>
          <div><EditorialPhoto src="assets/images/editorial-home/factory-optimized.webp" alt="GFCI functional test stations at FAHINT" width={1600} height={900} position="76% center" /><h3>Functional inspection</h3><p>GFCI test stations support functional checks during production. Review the relevant inspection requirements for your range with our team.</p></div>
          <div><EditorialPhoto src="assets/images/company/fahint-laboratory-catalog.webp" alt="Product verification equipment in the FAHINT laboratory" width={1417} height={422} position="85% center" /><h3>Laboratory support</h3><p>Review product verification needs and the supporting test documentation before confirming a specification.</p></div>
        </div>
        <figure className="company-laboratory company-laboratory--tooling"><CompanyImage src="assets/images/company/catalog-tooling.jpg" alt="Metal tooling photographed for the FAHINT product catalog" width={786} height={248} /><figcaption>Metal tooling · Original FAHINT catalog photograph.</figcaption></figure>
      </div>
    </section>
    <section className="company-section company-section--paper" id="oem" aria-labelledby="oem-title">
      <div className="company-wrap">
        <div className="company-heading"><h2 id="oem-title">Your range.<br /><span>Down to the details.</span></h2><p>Start with FAHINT product platforms. Then discuss the product, finish and presentation your market needs. Availability and customization requirements are confirmed per model.</p></div>
        <div className="company-oem-layout">
          <figure className="company-packaging"><CompanyImage src="assets/images/products/gf15-package-standard-white-v1.jpg" alt="FAHINT GF15 retail packaging and white wall plate" width={1000} height={1000} /><figcaption>FAHINT packaging example. Private-label artwork requires authorization and approval.</figcaption></figure>
          <div className="company-options">
            <div><h3>Products & finishes</h3><p>Select device families, electrical ratings, available colors and matching wall plates. Confirm combinations with actual samples.</p></div>
            <div><h3>Branding & identification</h3><p>Review authorized logos, product markings and artwork placement together with model-specific identification requirements.</p></div>
            <div><h3>Packaging & instructions</h3><p>Coordinate retail or neutral packaging, carton information and product literature around your distribution needs.</p></div>
            <div><h3>Product development</h3><p>Have a requirement beyond the existing range? Share the brief so our team can assess technical feasibility, tooling and verification needs.</p></div>
            <CompanyLink to="/contact?topic=oem" secondary>Send your requirements</CompanyLink>
          </div>
        </div>
      </div>
    </section>
    <section className="company-section company-section--navy" aria-labelledby="process-title">
      <div className="company-wrap"><div className="company-heading"><h2 id="process-title">From a product brief<br /><span>to an agreed order.</span></h2><p>A clear approval path keeps product choices, documentation and delivery expectations aligned.</p></div>
        <ol className="company-process" aria-label="From brief to production">{steps.map(([title, body], index) => <li key={title}><span className="company-step">0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
        <p className="company-process-note">Order quantities, sample arrangements and lead times are confirmed in your quotation. There is no single minimum or delivery promise for every product.</p>
      </div>
    </section>
    <section className="company-section"><div className="company-wrap company-heading"><div><h2>Documentation for<br /><span>the model you choose.</span></h2><p>Certification coverage is model-specific. Review the original certificate and addendum, then confirm the exact model, finish and construction for your order.</p></div><div className="company-document-callout"><h3>Check the details before you specify.</h3><p>Access original UL product-family files and the ISO 9001 quality-system document. A company certificate does not certify every product in the range.</p><CompanyLink to="/about#certifications" secondary>Review certificates</CompanyLink></div></div></section>
    <CompanyClosing title="Bring us your product brief." text="A new range, a private-label program or a model-specific question. Start with what your market needs." to="/contact?topic=oem" action="Start a project" />
  </div>;
}
