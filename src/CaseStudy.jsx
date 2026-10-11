import React, { useEffect } from 'react';
import { markdownToHtml } from './Post';
import './CaseStudy.css';

// Renders one paragraph-or-more markdown string as HTML.
const Md = ({ text, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }} />
);

// Inline-only markdown (no wrapping <p>), for list items and short fields.
const InlineMd = ({ text }) => {
  const html = markdownToHtml(text).replace(/^<p>/, '').replace(/<\/p>$/, '');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const Section = ({ section, index }) => (
  <section className="cs-section">
    <h2 className="cs-section__heading">
      <span className="cs-section__num">{String(index + 1).padStart(2, '0')}</span>
      {section.heading}
    </h2>

    {(section.body || []).map((p, i) => <Md key={i} text={p} className="cs-prose" />)}

    {section.tree && (
      <ol className="cs-tree">
        {section.tree.map((step, i) => (
          <li key={i} style={{ '--depth': i }}>{step}</li>
        ))}
      </ol>
    )}

    {section.items && (
      <ul className="cs-list">
        {section.items.map((item, i) => (
          <li key={i}><InlineMd text={item} /></li>
        ))}
      </ul>
    )}

    {section.decisions && (
      <div className="cs-decisions">
        {section.decisions.map((d, i) => (
          <article className="cs-decision" key={i}>
            <h3 className="cs-decision__q">{d.question}</h3>
            <dl>
              <dt>Options</dt>
              <dd><InlineMd text={d.options} /></dd>
              <dt>The call</dt>
              <dd><InlineMd text={d.call} /></dd>
            </dl>
          </article>
        ))}
      </div>
    )}

    {(section.after || []).map((p, i) => <Md key={`a${i}`} text={p} className="cs-prose" />)}
  </section>
);

const CaseStudy = ({ study }) => {
  useEffect(() => {
    const prev = document.title;
    document.title = study ? `${study.title} — econr.ad` : 'Not found — econr.ad';
    window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, [study]);

  if (!study) {
    return (
      <main className="case-study">
        <a className="cs-back" href="/">← Conrad Diao</a>
        <p className="cs-prose">That page doesn't exist.</p>
      </main>
    );
  }

  return (
    <main className="case-study">
      <a className="cs-back" href="/">← Conrad Diao</a>

      <header className="cs-header">
        <div className="cs-header__kicker">
          <span>{study.year}</span>
          {(study.tags || []).map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <h1 className="cs-header__title">{study.title}</h1>
        {study.subtitle && <p className="cs-header__subtitle">{study.subtitle}</p>}
        {study.meta && (
          <dl className="cs-meta">
            {study.meta.map(m => (
              <div className="cs-meta__item" key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      {study.sections.map((section, i) => (
        <Section section={section} index={i} key={section.heading} />
      ))}

      <a className="cs-back cs-back--end" href="/">← Back to all work</a>
    </main>
  );
};

export default CaseStudy;
