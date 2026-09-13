import React from 'react'
import './Footerdino.css'
export default function Footerdino() {
  return (
    <div >
     
      {/* Footer */}
      <footer className="footerdio">
        <div className="footer-contentdio">
          <h2>WILDLIFE.DINO</h2>
          <p>Explore the past, connect with the present.</p>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="/Home">Home</a>
            </li>
            <li>
              <a href="/About">About</a>
            </li>
          </ul>
        </div>
        <div className="footer-copyrightdio">
          <p>&copy; {new Date().getFullYear()} Dino World. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
