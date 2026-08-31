import { useEffect } from 'react';
import { CompanyLink, usePageMeta } from '../components/company/CompanyShared.jsx';

export default function NotFound() {
  usePageMeta('Page not found', 'The requested FAHINT page could not be found. Browse products or contact the team.');
  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    const previous = robots?.getAttribute('content');
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.append(robots); }
    robots.content = 'noindex, follow';
    return () => { if (created) robots.remove(); else if (previous === null) robots.removeAttribute('content'); else robots.content = previous; };
  }, []);
  return <div className="company-page"><section className="company-section company-not-found"><div className="company-wrap"><p className="company-error-code">404</p><h1>This page isn’t here.</h1><p>The address may be out of date or the page may have moved. Find your product in the catalog, or ask our team for help.</p><div className="company-actions"><CompanyLink to="/products">Browse products</CompanyLink><CompanyLink to="/contact" secondary>Contact FAHINT</CompanyLink></div></div></section></div>;
}
