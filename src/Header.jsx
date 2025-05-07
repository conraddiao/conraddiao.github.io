import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faInstagramSquare,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import Honorific from './Honorific';

const Header = ({ honorifics }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldCollapse = window.scrollY !== 0;
          setIsCollapsed(shouldCollapse);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <h1>
        <span> ~&nbsp;hi,</span>
        <span> I'm </span>
        <span><a href="#">@conraddiao</a></span>
        <span>, the&nbsp;</span>
        <Honorific honorifics={honorifics} />
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
        <a href="https://twitter.com/conraddiao/"><FontAwesomeIcon icon={faTwitterSquare} size="1x" /></a>.
      </p>
      <hr />
    </header>
  );
};

export default Header;
