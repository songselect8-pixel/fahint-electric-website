import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Clock, Mail } from 'lucide-react';
import { findPost, posts } from '../data/posts.js';
import { company } from '../data/company.js';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = findPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="page-banner page-banner--article">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <Link to="/blog">Blog</Link> <span>/</span>
            <span>{post.category}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="post-meta post-meta--light">
            <span>{formatDate(post.date)}</span>
            <span>
              <Clock size={14} /> {post.readMinutes} min read
            </span>
            <span>{post.category}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <article className="article">
            <img className="article__hero" src={post.cover} alt={post.title} />
            <p className="article__lead">{post.excerpt}</p>

            {post.body.map((block, i) =>
              block.type === 'h2' ? (
                <h2 key={i}>{block.text}</h2>
              ) : (
                <p key={i}>{block.text}</p>
              )
            )}

            <div className="article__cta">
              <h3>Need this specified for a live project?</h3>
              <p>
                Our engineering team answers NEC, UL 943 and product-selection questions directly — usually within one
                business day.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn--primary">
                  Ask a question <ArrowRight size={16} />
                </Link>
                <a href={`mailto:${company.email}`} className="btn btn--ghost">
                  <Mail size={16} /> {company.email}
                </a>
              </div>
            </div>
          </article>

          <aside className="article-side">
            <div className="side-card">
              <h4>About Fahint</h4>
              <p>
                {company.name} manufactures UL/cUL listed American standard wiring devices in Wenzhou, China. UL file{' '}
                {company.ulFile}, ISO 9001 certified, US and CN patented.
              </p>
              <Link to="/about" className="textlink">
                Company profile <ArrowRight size={15} />
              </Link>
            </div>

            <div className="side-card">
              <h4>More articles</h4>
              <ul className="side-list">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/blog/${r.slug}`}>{r.title}</Link>
                    <small>{formatDate(r.date)}</small>
                  </li>
                ))}
              </ul>
            </div>

            <div className="side-card side-card--dark">
              <h4>Request the catalogue</h4>
              <p>Full specifications for all seven product families, including datasheets and certification documents.</p>
              <Link to="/contact" className="btn btn--light" style={{ marginTop: 6 }}>
                Get catalogue <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">/ Keep Reading /</div>
            <h2>Related Articles</h2>
          </div>
          <div className="post-grid">
            {related.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="post-card">
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
