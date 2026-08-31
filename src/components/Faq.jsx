import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <div>
      {items.map((item, i) => (
        <div key={item.q} className={`faq-item ${open === i ? 'is-open' : ''}`}>
          <button type="button" className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`${id}-${i}`}>
            {item.q}
            <ChevronDown size={19} aria-hidden="true" />
          </button>
          <div id={`${id}-${i}`} className="faq-a" hidden={open !== i}>{item.a}</div>
        </div>
      ))}
    </div>
  );
}
