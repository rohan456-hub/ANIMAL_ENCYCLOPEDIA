import React, { useState } from 'react';
import './Loginw.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config';

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginbtnclick = () => {
    setErrorMessage("");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!Email) {
      setErrorMessage("Email is required!");
      return;
    }

    if (!emailPattern.test(Email)) {
      setErrorMessage("Invalid email format!");
      return;
    }

    if (!Password) {
      setErrorMessage("Password is required!");
      return;
    }

    if (Password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
      return;
    }

    axios.post(apiUrl('/api/getUser'), { Email, Password }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((apiOutput) => {
        console.log(apiOutput.data.userdetails);

        if (apiOutput.data.userdetails.length === 0) {
          setErrorMessage("Invalid email or password!");
        } else {
          sessionStorage.setItem('Userlogindata', JSON.stringify(apiOutput.data.userdetails));
          alert("Login Successfully");
          window.location.href = '/Home';
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("An error occurred while logging in.");
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="log">Login</h2>
        <p className="subtitle">Welcome Back! Please enter your details.</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-box">
          <input
            className="input"
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="form-btn" onClick={loginbtnclick}>Login</button>

        <div className="text">
          <h3>Don't have an account? <Link to='/Registration'>Register now</Link></h3>
        </div>
      </div>
    </div>
  );
}
