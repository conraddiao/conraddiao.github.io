import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-heading">
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
