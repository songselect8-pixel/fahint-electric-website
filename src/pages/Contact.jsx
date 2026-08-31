import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { company, faqs } from '../data/company.js';
import InquiryForm from '../components/InquiryForm.jsx';
import Faq from '../components/Faq.jsx';
import { findProduct, products } from '../data/products.js';
import { catalogProducts, modelKey } from '../data/catalogProducts.js';
import { CompanyBreadcrumb, CompanyLink, usePageMeta } from '../components/company/CompanyShared.jsx';

const inquiryModels = [...products, ...catalogProducts.filter(product => !product.draft)];
const topics = [
  { id: 'products', label: 'Product inquiry', hint: 'Tell us the models, quantities, finishes and delivery market you have in mind.' },
  { id: 'oem', label: 'OEM / ODM inquiry', hint: 'Share your product range, authorized branding, packaging requirements and target quantities.' },
  { id: 'technical', label: 'Technical question', hint: 'Include the model number and the specification or document you would like to review.' }
];

export default function Contact() {
  usePageMeta('Contact FAHINT', 'Talk to FAHINT about product orders, OEM / ODM projects and model-specific documentation. Contact our team in Wenzhou, China.');
  const [searchParams] = useSearchParams();
  const requestedModel = searchParams.get('model');
  const requestedProduct = findProduct(requestedModel) || inquiryModels.find(product => modelKey(product.sku) === modelKey(requestedModel));
  const defaultModel = requestedProduct?.sku || '';
  const topic = topics.find(item => item.id === searchParams.get('topic')) || topics[0];
  const topicHref = (id) => {
    const params = new URLSearchParams({ topic: id });
    if (defaultModel) params.set('model', defaultModel);
    return '/contact?' + params.toString();
  };
  return <div className="company-page company-contact">
    <header className="company-wrap company-contact-heading"><CompanyBreadcrumb current="Contact" /><div className="company-heading company-heading--hero"><h1>Let’s talk about<br /><span>your next project.</span></h1><p>A FAHINT product order, a range under your own name or a technical question. Tell us where you want to start.</p></div></header>
    <section className="company-contact-main" aria-label="Contact the FAHINT team"><div className="company-wrap company-contact-layout">
      <aside className="company-contact-details">
        <h2>A direct connection<br />to our team.</h2>
        <p>{company.name}</p>
        <ul>
          <li><Mail size={20} aria-hidden="true" /><div><span>Email</span><a href={`mailto:${company.email}`}>{company.email}</a></div></li>
          <li><MessageCircle size={20} aria-hidden="true" /><div><span>WhatsApp</span><a href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">Message our team</a></div></li>
          <li><Phone size={20} aria-hidden="true" /><div><span>Phone</span><a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></div></li>
          <li><MapPin size={20} aria-hidden="true" /><div><span>Based in</span><strong>{company.location}</strong></div></li>
          <li><Clock size={20} aria-hidden="true" /><div><span>Business hours</span><strong>{company.hours}</strong></div></li>
        </ul>
        <div className="company-contact-help"><h3>Looking for a document?</h3><p>Original product-family certificates are available before you write.</p><CompanyLink to="/about#certifications" secondary light>View certificate library</CompanyLink></div>
      </aside>
      <div className="company-contact-form">
        <nav className="company-contact-topics" aria-label="Inquiry type">{topics.map(item => <Link key={item.id} to={topicHref(item.id)} aria-current={item.id === topic.id ? 'page' : undefined}>{item.label}</Link>)}</nav>
        <p className="company-contact-context">{topic.hint}</p>
        <InquiryForm defaultModel={defaultModel} modelOptions={inquiryModels} title="Tell us what you need" />
      </div>
    </div></section>
    <section className="company-section company-section--paper"><div className="company-wrap company-faq-layout"><div><h2>Before you<br /><span>send your brief.</span></h2><p>Answers to common ordering and product questions. Exact terms are confirmed for your selected models.</p></div><Faq items={faqs} /></div></section>
  </div>;
}
