import { useRef, useState, useEffect, useCallback, useId } from 'react';
import { ChevronLeft, ChevronRight, Download, Expand, X, ZoomIn, ZoomOut } from 'lucide-react';
import { certificates } from '../data/certificates';

// Horizontal scroller with arrow paging, like the reference site's cert strip.
export default function CertCarousel() {
  const trackRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(100);
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

  useEffect(() => {
    if (!selected) return;
    dialogRef.current.showModal();
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [selected]);

  const openCertificate = (certificate, event) => {
    triggerRef.current = event.currentTarget;
    setZoom(100);
    setSelected(certificate);
  };

  const closeCertificate = () => dialogRef.current?.close();

  const page = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: reduceMotion ? 'instant' : 'smooth' });
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
            <button type="button" className="certcard__media" aria-label={`View ${c.name} certificate`} onClick={(event) => openCertificate(c, event)}>
              <img
                src={c.image}
                alt={`${c.name} certificate`}
                width="900"
                height={c.slug === 'iso-9001' ? 1214 : 1165}
                loading="lazy"
              />
              <span className="certcard__view"><Expand size={16} aria-hidden="true" /> View certificate</span>
            </button>
            <figcaption>
              <strong>{c.name}</strong>
              <span>{c.file}</span>
              <a className="certcard__download" href={c.document} download aria-label={`Download ${c.name} PDF`}>
                <Download size={15} aria-hidden="true" /> PDF
              </a>
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
      <dialog
        ref={dialogRef}
        className="certificate-viewer"
        aria-labelledby={titleId}
        onClick={(event) => { if (event.target === event.currentTarget) closeCertificate(); }}
        onCancel={(event) => { event.preventDefault(); closeCertificate(); }}
        onClose={() => { setSelected(null); triggerRef.current?.focus(); }}
      >
        {selected && <div className="certificate-viewer__inner">
          <header className="certificate-viewer__header">
            <div><h2 id={titleId}>{selected.name}</h2><p>{selected.file} · Issued {selected.issued}</p></div>
            <button ref={closeRef} type="button" onClick={closeCertificate} aria-label="Close certificate"><X size={22} aria-hidden="true" /></button>
          </header>
          <div className="certificate-viewer__toolbar" role="group" aria-label="Certificate viewing controls">
            <button type="button" onClick={() => setZoom((value) => Math.max(100, value - 25))} disabled={zoom === 100} aria-label="Zoom out"><ZoomOut size={18} aria-hidden="true" /></button>
            <output aria-live="polite">{zoom}%</output>
            <button type="button" onClick={() => setZoom((value) => Math.min(200, value + 25))} disabled={zoom === 200} aria-label="Zoom in"><ZoomIn size={18} aria-hidden="true" /></button>
            <button type="button" onClick={() => setZoom(100)}>Fit width</button>
            <a href={selected.document} download><Download size={17} aria-hidden="true" /> Download full PDF</a>
          </div>
          <div className="certificate-viewer__page" tabIndex={0} role="region" aria-label="Scrollable certificate preview">
            <img src={selected.image} alt={`${selected.name} certificate first page`} width="900" height={selected.slug === 'iso-9001' ? 1214 : 1165} style={{ width: `${zoom}%` }} />
          </div>
          <footer className="certificate-viewer__scope">
            <strong>Document scope</strong><p>{selected.scope}</p>
            <p>Preview shows the first page. Download the full PDF for the model addendum. Confirm current status and exact model coverage before ordering.</p>
          </footer>
        </div>}
      </dialog>
    </div>
  );
}
