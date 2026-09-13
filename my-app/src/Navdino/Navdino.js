import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navdino.css";

export default function Navdino() {
  const navigate = useNavigate();

  const clickhanndle = () => {
    navigate("/Home");
  };
  
  const clickAbout = () => {
    navigate("/About");
  };
  const clickHome = () => {
    navigate("/Extinct");
  };

  useEffect(() => {
    const user = sessionStorage.getItem("Userlogindata");
    if (!user) {
      navigate("/Login");
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="headerdio">
        <div className="container">
          <h1 className="logo">
            <h1>WILDLIFE.DINO</h1>
          </h1>
          <nav className="navdio">
            <ul className="uldio">
              <li className="lidio">
                <a onClick={clickHome}>Home</a>
              </li>
              <li className="lidio">
                <a onClick={clickAbout}>About</a>
              </li>

              <li className="lidio">
                <button className="back-btn" onClick={clickhanndle}>
                  Back to WILDLIFE
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

    </>
  );
}
