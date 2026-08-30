import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageCircle, Globe } from 'lucide-react';
import { company, faqs } from '../data/company.js';
import InquiryForm from '../components/InquiryForm.jsx';
import Faq from '../components/Faq.jsx';
import { findProduct, products } from '../data/products.js';
import { catalogProducts, modelKey } from '../data/catalogProducts.js';

const inquiryModels = [...products, ...catalogProducts.filter((product) => !product.draft)];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const requestedModel = searchParams.get('model');
  const requestedProduct = findProduct(requestedModel)
    || inquiryModels.find((product) => modelKey(product.sku) === modelKey(requestedModel));
  const defaultModel = requestedProduct?.sku || '';

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
          </div>
          <h1>Talk to Our Product Team</h1>
          <p>
            Send your model mix, target finishes, packaging requirements and project context. Our team will review the brief and
            follow up through the contact method you provide.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <div>
            <ul className="contact-info">
              <li>
                <span className="contact-info__icon">
                  <Mail size={19} />
                </span>
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
              </li>
              <li>
                <span className="contact-info__icon">
                  <Phone size={19} />
                </span>
                <div>
                  <strong>Phone</strong>
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                </div>
              </li>
              <li>
                <span className="contact-info__icon">
                  <MessageCircle size={19} />
                </span>
                <div>
                  <strong>WhatsApp</strong>
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {company.phone}
                  </a>
                </div>
              </li>
              <li>
                <span className="contact-info__icon">
                  <MapPin size={19} />
                </span>
                <div>
                  <strong>Factory</strong>
                  <span className="value">{company.address}</span>
                </div>
              </li>
              <li>
                <span className="contact-info__icon">
                  <Clock size={19} />
                </span>
                <div>
                  <strong>Business hours</strong>
                  <span className="value">{company.hours}</span>
                </div>
              </li>
              <li>
                <span className="contact-info__icon">
                  <Globe size={19} />
                </span>
                <div>
                  <strong>Company</strong>
                  <span className="value">{company.name}</span>
                </div>
              </li>
            </ul>
          </div>

          <InquiryForm defaultModel={defaultModel} modelOptions={inquiryModels} />
        </div>
      </section>

      <section className="section section--gray">
        <div className="container faq-layout">
          <div>
            <div className="eyebrow">/ Before You Write /</div>
            <h2>You Might Find It Here</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
