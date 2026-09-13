import React from 'react'
import './FooterPets.css'
import { Link, Outlet } from 'react-router-dom'

export default function FooterPets() {
  return (
    <div>
        <footer className="footerpets">
      <div className="footer-contentpets">
        <h2>wildelife.pet</h2>
        <p>Connecting you and your furry friends.</p>
      </div>
      <div className="footer-linkspets">
        <ul>
          <li>
          <Link to="/Dog">Dog</Link>
          </li>
          <li>
          <Link to="/Cat">Cat</Link>
          </li>
        </ul>
      </div>
      {/* <div className="footer-socialpets">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/facebook.png" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/instagram.png" alt="Instagram" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/twitter.png" alt="Twitter" />
        </a>
      </div> */}
      <div className="footer-copyrightpets">
        <p>&copy; {new Date().getFullYear()} WILDLIFE.PETS. All rights reserved.</p>
      </div>
    </footer>
    <Outlet/>
    </div>
  )
}
