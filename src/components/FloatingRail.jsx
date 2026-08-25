import { useEffect, useState } from 'react';
import { Mail, MessageCircle, ArrowUp } from 'lucide-react';
import { company } from '../data/company.js';

// Each entry slides a label panel out to the left on hover, so buyers can read
// the actual number/address without clicking.
export default function FloatingRail() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="rail">
      <a
        className="rail__item rail__item--wa"
        href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp ${company.phone}`}
      >
        <span className="rail__panel">
          <strong>WhatsApp</strong>
          <span>{company.phone}</span>
        </span>
        <span className="rail__icon">
          <MessageCircle size={20} />
        </span>
      </a>

      <a className="rail__item" href={`mailto:${company.email}`} aria-label={`Email ${company.email}`}>
        <span className="rail__panel">
          <strong>Email</strong>
          <span>{company.email}</span>
        </span>
        <span className="rail__icon">
          <Mail size={20} />
        </span>
      </a>

      {show && (
        <button
          className="rail__item rail__item--top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <span className="rail__panel">
            <strong>Back to top</strong>
          </span>
          <span className="rail__icon">
            <ArrowUp size={20} />
          </span>
        </button>
      )}
    </div>
  );
}
