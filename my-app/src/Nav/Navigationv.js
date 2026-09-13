import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navigationv.css";
import image from "../Nav/wild.png";
import axios from "axios";
import { apiUrl } from '../config';

function Navbar() {
  const [loginlogout, setLoginLogout] = useState("Login");
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("Userlogindata");

    if (!storedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoginLogout("Logout");

      if (Array.isArray(parsedUser) && parsedUser.length > 0) {
        const currentUsername = parsedUser[0].Username;
        setUsername(currentUsername);

        axios
          .post(apiUrl('/api/getnumbernoti'), { Username: currentUsername })
          .then((res) => setUnreadCount(res.data.count))
          .catch((err) => console.error("Error getting noti count:", err));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleLoginLogout = () => {
    if (loginlogout === "Login") {
      window.location.href = "/Login";
    } else {
      sessionStorage.removeItem("Userlogindata");
      setUser(null);
      setUsername("");
      setLoginLogout("Login");
      window.location.href = "/Home";
    }

    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <Link to="/Home" className="logo-link">
            <img src={image} alt="Wildlife Logo" className="logo-img" />
            <span className="logo-text">WILDLIFE</span>
          </Link>
        </div>

        <button className="menu-icon" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {isOpen ? "X" : "Menu"}
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/Home" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/Collection" onClick={() => setIsOpen(false)}>Collection</Link></li>
          <li><Link to="/About" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/AddAnimal" onClick={() => setIsOpen(false)}>Add Animal</Link></li>
          <li>
            <div className="nav-meta">
              {user && <span className="user-chip">{username}</span>}
              <button className="nav-action-btn" onClick={handleLoginLogout}>
                {loginlogout}
              </button>
            </div>
          </li>
          <li>
            <Link to="/Notification" onClick={() => setIsOpen(false)} className="button">
              <svg className="bell" viewBox="0 0 448 512">
                <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
              </svg>
              Notifications
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              <span className="arrow">{">"}</span>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;
