import React, { useState } from 'react';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config';

export default function Registration() {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = () => {
    setErrorMessage("");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!Username) {
      setErrorMessage("Username is required!");
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
      setErrorMessage("Password must be at least 6 characters!");
      return;
    }

    if (Password !== ConfirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    axios
      .post(apiUrl('/api/Adduserdetail'), { Username, Email, Password, ConfirmPassword }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        alert("Registration successful! Please log in.");
        navigate('/Login');
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error registering user. Please try again.");
      });
  };

  return (
    <div className="backgroundg">
      <div className="formg">
        <HowToRegSharpIcon fontSize="large" />
        <h2 className="reg">Registration</h2>

        <div className="input-box">
          <input 
            type="text" 
            className="input" 
            placeholder="Enter your Name" 
            value={Username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="input-box">
          <input 
            type="email" 
            className="input" 
            placeholder="Enter your email" 
            value={Email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="input-box">
          <input 
            type={showPassword ? "text" : "password"}
            className="input" 
            placeholder="Create password" 
            value={Password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        </div>

        <div className="input-box">
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            className="input" 
            placeholder="Confirm password" 
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <InputAdornment position="end">
            <IconButton onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div>
          <button className="form-btn" onClick={handleRegister}>Register Now</button>
        </div>

        <div className="text">
          <h3>Already have an account? <Link to="/Login">Login now</Link></h3>
        </div>
      </div>
    </div>
  );
}
