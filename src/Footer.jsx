import React from 'react';
import './Footer.css';

// `dot`: the resting place of the header's falling dot. It is laid out here so
// it keeps its spacing at every width; 'waiting' holds the spot invisibly until
// the falling dot arrives, 'landed' shows it. Omit for pages with no header.
const Footer = ({ dot }) => {
  return (
    <footer>
      <div className="footer-heading">
        {dot && (
          <span
            className={`footer-dot ${dot === 'landed' ? 'is-landed' : ''}`}
            aria-hidden="true"
          />
        )}
        <p className="footer-qed">Quod erat demonstrandum.</p>
        <br />
      </div>

      <div className="headshot">
        {/* Add an image or style this div if needed */}
      </div>

      <div className="footer-byline">
        <span className="copywrite">Copyright © 2025 E. Conrad Diao. All rights reserved.</span>
        <span>
          Hastily made with 🖤 and ☕️ by{' '}
          <a href="https://linkedin.com/in/conraddiao">@econraddiao</a>.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
