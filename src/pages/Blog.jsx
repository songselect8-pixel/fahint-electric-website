import { useState } from 'react';
import { posts, postCategories } from '../data/posts.js';
import { CompanyBreadcrumb, CompanyClosing, usePageMeta } from '../components/company/CompanyShared.jsx';
import { ReadingCard } from '../components/company/ReadingShared.jsx';

export default function Blog() {
  usePageMeta('Wiring Device Guides', 'Product selection, documentation and sourcing guides for wiring-device buyers. Read FAHINT guides with original references.');
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? posts : posts.filter(post => post.category === category);
  const [lead, ...rest] = filtered;
  return <div className="company-page reading-page">
    <header className="company-masthead company-section--paper"><div className="company-wrap"><CompanyBreadcrumb current="Guides & insights" /><div className="company-heading company-heading--hero"><h1>A closer look<br /><span>at wiring devices.</span></h1><p>Practical reading for product buyers. Understand the options, review the documentation and prepare a better sourcing brief.</p></div></div></header>
    <section className="company-section"><div className="company-wrap">
      <div className="reading-filters"><div role="group" aria-label="Article category">{postCategories.map(item => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div><p role="status">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</p></div>
      {lead && <ReadingCard post={lead} lead />}
      {rest.length > 0 && <div className="reading-grid">{rest.map(post => <ReadingCard key={post.slug} post={post} />)}</div>}
    </div></section>
    <CompanyClosing title="Have a model-specific question?" text="Share the product and application you are reviewing. Our team can help you find the relevant specifications and documentation." to="/contact?topic=technical" action="Ask our team" />
  </div>;
}
