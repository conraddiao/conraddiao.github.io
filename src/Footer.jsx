import React from 'react';
import './Footer.css';

const Footer = ({ ballLanded = false }) => {
  return (
    <footer>
      <div className="footer-heading">
        {/* Resting place for the header's falling scroll-hint ball. It sits in
            the layout flow so it stays put however the page reflows. */}
        <span className={`footer-dot ${ballLanded ? 'is-visible' : ''}`} aria-hidden="true" />
        <p className="footer-qed">Quod erat demonstrandum.</p>
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
