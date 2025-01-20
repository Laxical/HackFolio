import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-links">
        <div className="slogan">
        <h2>Fueling <span className="highlight-green">innovation</span> by enabling the <span className="highlight-purple">builders</span> of tomorrow.</h2>
        </div>
          <div>
            <h3><b>Community</b></h3>
            <ul>
              <li><a href="/CreateHackathon">Organize a hackathon</a></li>
              <li><a href="/hackathons">Explore hackathons</a></li>
              <li><a href="/codeofconduct">Code of Conduct</a></li>
            </ul>
          </div>
          <div>
            <h3><b>Company</b></h3>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3><b>Support</b></h3>
            <ul>
              <li><a href="#">Help</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
