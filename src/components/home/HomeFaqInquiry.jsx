import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { company, faqs } from '../../data/company.js';
import { products } from '../../data/products.js';
import Faq from '../Faq.jsx';
import InquiryForm from '../InquiryForm.jsx';

export default function HomeFaqInquiry() {
  const inquiryRef = useRef(null);
  const [inquiryModels, setInquiryModels] = useState(products);
  const [catalogUnavailable, setCatalogUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    let requested = false;
    let observer;
    const section = inquiryRef.current;
    const loadModels = () => {
      if (requested) return;
      requested = true;
      import('../../data/catalogProducts.js').then(({ catalogProducts }) => {
        if (!active) return;
        setInquiryModels([...products, ...catalogProducts.filter((product) => !product.draft)]);
        setCatalogUnavailable(false);
        observer?.disconnect();
      }).catch(() => {
        requested = false;
        if (active) setCatalogUnavailable(true);
      });
    };
    if (typeof IntersectionObserver === 'undefined') loadModels();
    else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadModels();
      }, { rootMargin: '600px' });
      observer.observe(section);
    }
    section.addEventListener('focusin', loadModels);
    section.addEventListener('pointerenter', loadModels);
    return () => {
      active = false;
      observer?.disconnect();
      section.removeEventListener('focusin', loadModels);
      section.removeEventListener('pointerenter', loadModels);
    };
  }, []);

  return (
    <>
      <section className="home-faq" aria-labelledby="home-faq-title" data-title-align="left">
        <div className="container home-faq__layout">
          <div className="home-faq__intro">
            <h2 id="home-faq-title">Buyer questions, answered.</h2>
            <p>Quick answers on certification, customization, logistics and private-label packaging.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <section ref={inquiryRef} className="home-inquiry" aria-label="Send an inquiry" data-title-align="left">
        <div className="container home-inquiry__layout">
          <div className="home-inquiry__intro">
            <h2>Request a quote.</h2>
            <p>Tell us the product, quantity and delivery market. For private-label orders, include your packaging or branding requirements.</p>

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
          <div className="home-inquiry__form">
            <InquiryForm title="Tell us what you need" modelOptions={inquiryModels} />
            {catalogUnavailable && <p role="status">The full model list is unavailable. Please add your model number under Requirements.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
