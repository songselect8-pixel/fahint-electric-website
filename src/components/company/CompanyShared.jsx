import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { publicAsset } from '../../utils/publicAsset.js';
import '../../styles/company-pages.css';

export function usePageMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    const element = document.querySelector('meta[name="description"]');
    const previousDescription = element?.getAttribute('content');
    document.title = `${title} | FAHINT`;
    if (element && description) element.setAttribute('content', description);
    return () => {
      document.title = previousTitle;
      if (element && previousDescription !== null) element.setAttribute('content', previousDescription);
    };
  }, [title, description]);
}

export function CompanyImage({ src, alt, width = 1600, height = 900, priority = false, ...props }) {
  return <img src={publicAsset(src)} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding="async" {...props} />;
}

export function CompanyLink({ to, children, secondary = false, light = false, ...props }) {
  return <Link to={to} className={`${secondary ? 'company-text-link' : 'company-button'}${light ? ' is-light' : ''}`} {...props}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

export function CompanyBreadcrumb({ current }) {
  return <nav className="company-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>;
}

export function CompanyClosing({ title = 'Let’s make your next range.', text = 'Send the models, quantities and market requirements you have in mind. We will help define the next step.', to = '/contact', action = 'Talk to FAHINT' }) {
  return <section className="company-closing"><div className="company-wrap company-heading"><div><h2>{title}</h2><p>{text}</p></div><CompanyLink to={to} light>{action}</CompanyLink></div></section>;
}
