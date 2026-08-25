import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((item, i) => (
        <div key={item.q} className={`faq-item ${open === i ? 'is-open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {item.q}
            <ChevronDown size={19} />
          </button>
          <div className="faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
