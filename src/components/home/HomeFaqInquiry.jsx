import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { company, faqs } from '../../data/company.js';
import Faq from '../Faq.jsx';
import InquiryForm from '../InquiryForm.jsx';

export default function HomeFaqInquiry() {
  return (
    <>
      <section className="home-faq" aria-labelledby="home-faq-title" data-title-align="right">
        <div className="container home-faq__layout">
          <div className="home-faq__intro">
            <p className="home-section-label">Before you write</p>
            <h2 id="home-faq-title">Buyer Questions, Answered.</h2>
            <p>Quick answers on certification, customization, logistics and private-label packaging.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="home-inquiry" aria-label="Send an inquiry" data-title-align="left">
        <div className="container home-inquiry__layout">
          <div className="home-inquiry__intro">
            <p className="home-section-label">Start a project</p>
            <h2>Tell Us What You Want to Build.</h2>
            <p>Share your market, product mix, annual volume and branding requirements. We will route the brief to the right team.</p>

            <ul className="home-inquiry__contacts">
              <li>
                <Mail size={18} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <Phone size={18} />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
              </li>
              <li>
                <MessageCircle size={18} />
                <a href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}>WhatsApp sales</a>
              </li>
              <li>
                <MapPin size={18} />
                <span>{company.location}</span>
              </li>
            </ul>
          </div>
          <InquiryForm title="Send a Project Brief" />
        </div>
      </section>
    </>
  );
}
