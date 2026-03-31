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

const Header = ({ honorifics, allTags = [], activeTag, setActiveTag }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
        <span> <a href="#">~&nbsp;hi,</a></span>
        <span>&nbsp;I'm&nbsp;</span>
        <span><a href="#">@conraddiao</a></span>
        <span>,&nbsp;</span>
        <span>the&nbsp;</span>
        <span><Honorific honorifics={honorifics} forcePaused={isCollapsed} /></span>
        <span>.&nbsp;~</span>
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
