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

const Header = ({ honorifics }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    // Handles scroll events to toggle header collapse state
    const handleScroll = () => {
      // Prevents multiple rAF calls while scrolling rapidly
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Collapse header if user has scrolled down from top
          const shouldCollapse = window.scrollY !== 0;
          setIsCollapsed(shouldCollapse);
          // Allow future rAF invocations
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
    ref={headerRef}
    className="header" id="header">
      <h1 id="header-title" className='display-flex'>
        <span> <a href="#">~&nbsp;hi,</a></span>
        <span> I'm </span>
        <span><a href="#">@conraddiao</a></span>
        <span>,&nbsp;</span>
        <span>the&nbsp;</span>
        <span><Honorific honorifics={honorifics} /></span>
        <span>.&nbsp;~</span>
      </h1>
      <p className={`slider ${isCollapsed ? 'closed' : 'open'}`}>
        Looking for Product Management and Product Strategy roles in service of important missions.
        <br />
        <br />
        Product @ <a href="https://www.fiercehealthcare.com/health-tech/primary-care-player-forward-shutters-after-raising-400m-rolling-out-carepods">Forward</a>.
        <br />
        Strategy & Ops @ <a href="https://www.salesforce.com/">Salesforce</a>.
        <br />
        SWE Intern @ <a href="https://numie.co/">Numie</a>, <a href="https://poshly.com">Poshly</a>, and <a href="https://qb3.org/">QB3</a>.
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
      <hr />
    </header>
  );
};

export default Header;
