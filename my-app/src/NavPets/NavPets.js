import React, { useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './Pets.css';
import { useEffect } from 'react';


export default function NavPets() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    const user = sessionStorage.getItem("Userlogindata");

    if (!user) { // If user data is null or empty, redirect
      navigate("/Login");
    }
  }, []);

  const handleclick = () => {
    window.location.href = "/Home";
  };

  return (
    <div>
      <nav className="navbarpets">
        <div className="navbar-logopets">
          <h1>WILDLIFE.PETS</h1>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
          <div className={isOpen ? "bar open" : "bar"}></div>
        </div>

        {/* Navbar Links */}
        <ul className={`navbar-linkspets ${isOpen ? "active" : ""}`}>
          <li><Link to="/Dog" className='mainlink' onClick={toggleMenu}>Dog</Link></li>
          <li><Link to="/Cat" className='mainlink' onClick={toggleMenu}>Cat</Link></li>
          <li><Link to="/AddPets" className='mainlink' onClick={toggleMenu}>AddPets</Link></li>
          <li><button onClick={handleclick} className='back-to-wildlife'>Back to WILDLIFE</button></li>
        </ul>
      </nav>

      <Outlet />  
    </div>
  );
}
