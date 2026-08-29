import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faInstagramSquare,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import Honorific from './Honorific';

// The title prefix, split into segments so the name can be bolded while the
// rest stays normal weight. Everything types out as one continuous stream.
const TITLE_SEGMENTS = [
  { text: 'Hi, I\'m ' },
  { text: 'Conrad Diao', bold: true },
  { text: ', ' }, // nbsp so the space before the honorific isn't trimmed
];

// Types `segments` out one character at a time across the whole stream, then
// calls `onDone`. Reuses the honorific caret so the cursor matches the
// honorific animation.
const Typewriter = ({ segments, speed = 40, onDone }) => {
  const total = segments.reduce((n, s) => n + s.text.length, 0);
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (count >= total) {
      if (!doneRef.current) {
        doneRef.current = true;
        if (onDone) onDone();
      }
      return undefined;
    }
    const id = setTimeout(() => setCount(c => c + 1), speed);
    return () => clearTimeout(id);
  }, [count, total, speed, onDone]);

  let offset = 0;
  const rendered = segments.map((seg, i) => {
    const start = offset;
    offset += seg.text.length;
    const shownCount = Math.max(0, Math.min(seg.text.length, count - start));
    if (shownCount === 0) return null;
    const shown = seg.text.slice(0, shownCount);
    return seg.bold ? (
      <strong key={i} className="header-name">{shown}</strong>
    ) : (
      <React.Fragment key={i}>{shown}</React.Fragment>
    );
  });

  const typing = count < total;
  return (
    <>
      {rendered}
      {typing && <span className="honorific-caret" aria-hidden="true">|</span>}
    </>
  );
};

// A company link that types out a tagline in grey on hover, and backspaces it
// away on mouse-out. Reuses the honorific caret so the cursor matches.
const CompanyLink = ({ href, label, tagline, typeSpeed = 28, deleteSpeed = 16 }) => {
  const [hovered, setHovered] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (hovered) {
      if (count < tagline.length) {
        const id = setTimeout(() => setCount(c => c + 1), typeSpeed);
        return () => clearTimeout(id);
      }
      return undefined;
    }
    // Not hovered: backspace the tagline away one character at a time.
    if (count > 0) {
      const id = setTimeout(() => setCount(c => c - 1), deleteSpeed);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [hovered, count, tagline, typeSpeed, deleteSpeed]);

  return (
    <span
      className="company"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={href}>{label}</a>
      {count > 0 && (
        <span className="company-tagline">
          {' — '}{tagline.slice(0, count)}
          {count < tagline.length && (
            <span className="honorific-caret" aria-hidden="true">|</span>
          )}
        </span>
      )}
    </span>
  );
};

const Header = ({ honorifics, allTags = [], activeTag, setActiveTag }) => {
  const [prefixDone, setPrefixDone] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const leadRef = useRef(null);

  // Start the ball a bit after the bio has finished fading in (~0.7s fade).
  useEffect(() => {
    if (!introDone) return undefined;
    const id = setTimeout(() => setHintVisible(true), 1000);
    return () => clearTimeout(id);
  }, [introDone]);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const bioWrapRef = useRef(null);

  // The title bar is a top-level sticky element so it persists over every post.
  // A lead spacer centers the title + bio on the first screen, and the bio
  // wrapper fills the rest so the first post starts off-screen.
  useEffect(() => {
    const recompute = () => {
      const vh = window.innerHeight;
      const titleH = titleRef.current ? titleRef.current.offsetHeight : 0;
      const bioH = bioRef.current ? bioRef.current.offsetHeight : 0;
      const lead = Math.max(0, Math.round((vh - titleH - bioH) / 2));
      if (leadRef.current) leadRef.current.style.height = `${lead}px`;
      if (bioWrapRef.current) {
        bioWrapRef.current.style.minHeight = `${Math.max(0, vh - lead - titleH)}px`;
      }
      document.documentElement.style.setProperty('--titlebar-h', `${titleH}px`);
    };
    recompute();
    window.addEventListener('resize', recompute);
    // Recompute on title reflow (font load, honorific width) — not the bio, so
    // hover taglines don't re-center the hero.
    const ro = new ResizeObserver(recompute);
    if (titleRef.current) ro.observe(titleRef.current);
    return () => {
      window.removeEventListener('resize', recompute);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <div className="hero-lead" ref={leadRef} aria-hidden="true" />
      <div className="header-titlebar" ref={titleRef}>
        <h1 id="header-title" className="display-flex">
          <span><Typewriter segments={TITLE_SEGMENTS} onDone={() => setPrefixDone(true)} /></span>
          <span>
            <Honorific
              honorifics={honorifics}
              started={prefixDone}
              onReady={() => setIntroDone(true)}
            />
          </span>
        </h1>
      </div>
      <div className="header-hero-bio" ref={bioWrapRef}>
        <div className={`header-subheader ${introDone ? 'is-visible' : ''}`} ref={bioRef}>
          <p>
            Product Manager with Full-stack Operations, Growth, and Design background.
            <br />
            <br />
            Head of Product & Design at <CompanyLink href="https://www.getonecrew.com/" label="OneCrew" tagline="Digitizing construction" />
            <br />
            <em>prev. </em>Product at <CompanyLink href="https://www.fiercehealthcare.com/health-tech/primary-care-player-forward-shutters-after-raising-400m-rolling-out-carepods" label="Forward" tagline="Direct to consumer, insurance free healthcare" />
            <br />
            <em>prev. </em>Strategy & Ops at <CompanyLink href="https://www.salesforce.com/" label="Salesforce" tagline="Business as a platform for change" />
            <br />
            <em>prev. </em>SWE Intern at <CompanyLink href="https://numie.co/" label="Numie" tagline="Digital creative consultancy" />, <CompanyLink href="https://poshly.com" label="Poshly" tagline="Unbelievably detailed consumer insights" />, and <CompanyLink href="https://qb3.org/" label="QB3" tagline="The Biotech+ idea factory" />
            <br />
            <br />
            B.S. Architecture at <CompanyLink href="https://taubmancollege.umich.edu/" label="Michigan" tagline="Go Blue!" />
            <br />
            <br />
            Find me on&nbsp;
            <a href="https://www.linkedin.com/in/conraddiao/"><FontAwesomeIcon icon={faLinkedin} size="1x" /></a>,&nbsp;
            <a href="https://www.instagram.com/conraddiao/"><FontAwesomeIcon icon={faInstagramSquare} size="1x" /></a>,&nbsp;
            <a href="https://github.com/conraddiao/"><FontAwesomeIcon icon={faGithub} size="1x" /></a>.
          </p>
          <div className="grid-feed-filters">
            <button
              className={`grid-feed-tag ${activeTag === null ? 'active' : ''}`}
              onClick={() => setActiveTag(null)}
            >
              all
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`grid-feed-tag ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`scroll-hint ${hintVisible ? 'is-visible' : ''}`}
          aria-hidden="true"
        >
          <span className="scroll-hint__line" />
          <span className="scroll-hint__ball" />
        </div>
      </div>
    </>
  );
};

export default Header;
