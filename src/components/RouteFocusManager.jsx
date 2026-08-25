import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteFocusManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let target = null;

      try {
        target = document.querySelector(hash);
      } catch {
        target = null;
      }

      if (target) {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        return undefined;
      }
    }

    window.scrollTo({ top: 0 });
    const frame = window.requestAnimationFrame(() => {
      document.querySelector('#main-content')?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
