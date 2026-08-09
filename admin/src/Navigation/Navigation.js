import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const [displaydata, setdisplaydata] = useState(false);
  const [loginlogout, setLoginLogout] = useState("Login");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("Userlogindata");
    if (user) {
      setLoginLogout("Logout");
      setdisplaydata(true);
    } else {
      setLoginLogout("Login");
      setdisplaydata(false);
    }
  }, []);

  const handleLogout = () => {
    if (loginlogout === "Logout") {
      sessionStorage.removeItem("Userlogindata");
      sessionStorage.removeItem("adminAuthToken");
      setLoginLogout("Login");
      navigate("/Login");
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      {displaydata && (
        <div>
          <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? "Close" : "Menu"}
          </div>

          <div className="topbar">
            <div className="topbar-brand">Wildlife Admin</div>
            <div className="topbar-actions">
              <NavLink to="/Animal" className="topbar-link">
                Dashboard
              </NavLink>
              <NavLink to="/Login" onClick={handleLogout} className="topbar-link">
                {loginlogout}
              </NavLink>
            </div>
          </div>

          <div className="main">
            <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
              <nav className="nav">
                <ul>
                  <li>
                    <NavLink to="/Animal" onClick={() => setMenuOpen(false)}>
                      Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Animal" onClick={() => setMenuOpen(false)}>
                      Animals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Petsdata" onClick={() => setMenuOpen(false)}>
                      Pets Collection
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/UserData" onClick={() => setMenuOpen(false)}>
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Message" onClick={() => setMenuOpen(false)}>
                      Messages
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </aside>

            <div className="page-shell">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
