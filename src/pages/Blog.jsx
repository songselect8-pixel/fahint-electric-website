import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { posts, postCategories } from '../data/posts.js';
import Reveal from '../components/Reveal.jsx';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? posts : posts.filter((p) => p.category === cat);
  const [lead, ...rest] = list;

  return (
    <>
      <section className="blog-banner">
        <div className="blog-banner__bg">
          <img src="/assets/images/hero/hero-factory.webp" alt="" />
        </div>
        <div className="container blog-banner__inner">
          <h1>GFCI &amp; Wiring Device Insights, Standards and News</h1>
          <p>
            Practical guidance on NEC compliance, UL 943 requirements, product specification and sourcing — written for
            distributors, contractors and private-label buyers in North America.
          </p>
          <div className="crumbs crumbs--center">
            <Link to="/">Home</Link> <span>/</span> <span>Blog</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-row">
            {postCategories.map((c) => (
              <button key={c} className={`chip ${cat === c ? 'is-active' : ''}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>

          {lead && (
            <Link to={`/blog/${lead.slug}`} className="post-lead">
              <div className="post-lead__media">
                <img src={lead.cover} alt={lead.title} loading="lazy" />
              </div>
              <div className="post-lead__body">
                <span className="post-cat">{lead.category}</span>
                <h2>{lead.title}</h2>
                <p>{lead.excerpt}</p>
                <div className="post-meta">
                  <span>{formatDate(lead.date)}</span>
                  <span>
                    <Clock size={14} /> {lead.readMinutes} min read
                  </span>
                </div>
                <span className="textlink">
                  Read article <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          )}

          <div className="post-grid">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link to={`/blog/${p.slug}`} className="post-card">
                  <div className="post-card__media">
                    <img src={p.cover} alt={p.title} loading="lazy" />
                    <span className="post-cat post-cat--float">{p.category}</span>
                  </div>
                  <div className="post-card__body">
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <div className="post-meta">
                      <span>{formatDate(p.date)}</span>
                      <span>
                        <Clock size={14} /> {p.readMinutes} min
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Have a Technical Question We Have Not Covered?</h2>
              <p>Send it to our engineering team — we answer specification and compliance questions within one business day.</p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/contact" className="btn btn--light">
                Ask our engineers <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
