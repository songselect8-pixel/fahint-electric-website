import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { publicAsset } from '../../utils/publicAsset.js';

export function useStudioPageMeta(title, description) {
  const { pathname } = useLocation();
  const preview = ['/home-studio', '/products-studio'].includes(pathname.replace(/\/$/, ''));
  useEffect(() => {
    const oldTitle = document.title;
    let robots = document.querySelector('meta[name="robots"]');
    const original = robots?.getAttribute('content');
    const created = !robots;
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.append(robots); }
    let descriptionMeta = document.querySelector('meta[name="description"]');
    const oldDescription = descriptionMeta?.getAttribute('content');
    const createdDescription = !descriptionMeta;
    if (!descriptionMeta) { descriptionMeta = document.createElement('meta'); descriptionMeta.name = 'description'; document.head.append(descriptionMeta); }
    descriptionMeta.content = description;
    robots.content = preview ? 'noindex, nofollow' : 'index, follow';
    document.title = `FAHINT | ${title}${preview ? ' — Preview' : ''}`;
    return () => {
      document.title = oldTitle;
      if (created) robots.remove();
      else if (original === null) robots.removeAttribute('content');
      else robots.content = original;
      if (createdDescription) descriptionMeta.remove();
      else if (oldDescription === null) descriptionMeta.removeAttribute('content');
      else descriptionMeta.content = oldDescription;
    };
  }, [title, description, preview]);
}

export function StudioImage({ src, alt = '', className = '', width = 800, height = 800, priority = false, ...props }) {
  return <img className={className} src={publicAsset(src)} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : undefined} decoding="async" {...props} />;
}

export function StudioLink({ to, children, light = false, className = '', ...props }) {
  return <Link to={to} className={`studio-button ${light ? 'studio-button--light' : ''} ${className}`} {...props}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>;
}
