import React from 'react';
import './Footer.css';
import { Link, Outlet } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              We share approachable, visual, and curiosity-driven stories about wildlife,
              pets, and the natural world so more people feel connected to conservation.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/Home">Home</Link></li>
              <li><Link to="/About">About</Link></li>
              <li><Link to="/Collection">Collection</Link></li>
              <li><Link to="/Notification">Notifications</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: gs.gopalsharma619@gmail.com</p>
            <p>Phone: 8149324289</p>
            <p>Address: 123 Wildlife Lane, Planet Earth</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright 2025 WILDLIFE. All rights reserved.</p>
        </div>

        <Outlet />
      </footer>
    </div>
  );
}
