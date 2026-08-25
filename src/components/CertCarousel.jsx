import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { certificates } from '../data/certificates';

// Horizontal scroller with arrow paging, like the reference site's cert strip.
export default function CertCarousel() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const page = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div className="certcar">
      <button
        type="button"
        className="certcar__nav certcar__nav--prev"
        onClick={() => page(-1)}
        disabled={atStart}
        aria-label="Previous certificates"
      >
        <ChevronLeft size={22} />
      </button>

      <div className="certcar__track" ref={trackRef} onScroll={sync}>
        {certificates.map((c) => (
          <figure className="certcard" key={c.slug}>
            <div className="certcard__media">
              <img src={c.image} alt={`${c.name} certificate`} loading="lazy" />
            </div>
            <figcaption>
              <strong>{c.name}</strong>
              <span>{c.file}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <button
        type="button"
        className="certcar__nav certcar__nav--next"
        onClick={() => page(1)}
        disabled={atEnd}
        aria-label="Next certificates"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
