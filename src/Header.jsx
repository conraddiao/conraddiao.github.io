import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faInstagramSquare,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import Honorific from './Honorific';
// import { headerHeight, setHeaderHeight } from './App';
import { useRef } from 'react';

// The title prefix, split into segments so the name can be bolded while the
// rest stays normal weight. Everything types out as one continuous stream.
const TITLE_SEGMENTS = [
  { text: 'Hi, I\'m ' },
  { text: 'Conrad Diao', bold: true },
  { text: ', the ' },
];

// Types `segments` out one character at a time across the whole stream, then
// calls `onDone`. Reuses the honorific caret so the cursor matches the
// honorific animation.
const Typewriter = ({ segments, speed = 45, onDone }) => {
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

const Header = ({ honorifics, allTags = [], activeTag, setActiveTag }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [prefixDone, setPrefixDone] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    let touchStartY = 0;

    if (!isCollapsed) {
      // EXPANDED: lock page scroll, listen for collapse gesture
      document.body.style.overflow = 'hidden';

      const collapse = () => setIsCollapsed(true);

      const handleWheel = (e) => { if (e.deltaY > 0) collapse(); };
      const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
      const handleTouchEnd = (e) => {
        if (e.changedTouches[0].clientY - touchStartY < -30) collapse();
      };

      const headerEl = headerRef.current;
      window.addEventListener('wheel', handleWheel, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      if (headerEl) headerEl.addEventListener('click', collapse);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
        if (headerEl) headerEl.removeEventListener('click', collapse);
      };
    } else {
      // COLLAPSED: watch for scroll-to-top to re-expand
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (window.scrollY === 0) setIsCollapsed(false);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const headerHeight = `${entry.contentRect.height}px`;
      document.documentElement.style.setProperty(
        '--header-height',
        headerHeight
      );
      console.log('header-height:', headerHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
    ref={headerRef}
    className="header" id="header">
      <h1 id="header-title" className='display-flex'>
        <span><Typewriter segments={TITLE_SEGMENTS} onDone={() => setPrefixDone(true)} /></span>
        <span>
          <Honorific
            honorifics={honorifics}
            started={prefixDone}
          />
        </span>
      </h1>
      <div className={`slider header-subheader ${isCollapsed ? 'closed' : 'open'}`}>
        <p>
          Product Manager with Full-stack Operations, Growth, and Design background.
          <br />
          <br />
          Head of Product @ <a href="https://www.getonecrew.com/">OneCrew</a>.
          <br />
          <em>prev. </em>Product @ <a href="https://www.fiercehealthcare.com/health-tech/primary-care-player-forward-shutters-after-raising-400m-rolling-out-carepods">Forward</a>.
          <br />
          <em>prev. </em>Strategy & Ops @ <a href="https://www.salesforce.com/">Salesforce</a>.
          <br />
          <em>prev. </em>SWE Intern @ <a href="https://numie.co/">Numie</a>, <a href="https://poshly.com">Poshly</a>, and <a href="https://qb3.org/">QB3</a>.
          <br />
          <br />
          B.S. Architecture @ <a href="https://taubmancollege.umich.edu/">Michigan</a>.
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
      <hr />
    </header>
  );
};

export default Header;
