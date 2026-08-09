import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { adminApiUrl } from '../config';
// import { getAnimalbyID } from '../../adminserver/controller';

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate()

  const loginbtnclick = () => {
    setErrorMessage(""); // Reset error message before validation

    // ✅ Email validation regex
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

    if (!Password) {
      setErrorMessage("Invalid password!");
      return;
    }
    if(Email=="gopal000@gmail.com"){
      axios
      .post(adminApiUrl('/api/getUser'), {Email: Email, Password:Password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((apiOutput) => {
        console.log(apiOutput.data.userdetails);

        if (apiOutput.data.userdetails.length === 0) {
          setErrorMessage("Invalid email or password!");
        } else {
          sessionStorage.setItem('Userlogindata', JSON.stringify(apiOutput.data.userdetails));
          sessionStorage.setItem('adminAuthToken', apiOutput.data.token);
          axios.defaults.headers.common.Authorization = `Bearer ${apiOutput.data.token}`;
          alert("Admin Login Successfully");
          navigate('/Animal')
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("An error occurred while logging in.");
      });
    }
    else{
      alert("only admin login")
    }
    // ✅ Sending request to the backend
   
  };

  return (
    <div>
     <center>   



      <div className="wrapper">
      <span class="text">admin</span>


        <div className="form">
          <h2>Login</h2>
          <br />
          
          {/* Error message display */}
       
      

          <div className="input-box">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Enter your password" 
              required  
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}<br/>

          <div>
            <button className='Login' onClick={loginbtnclick}>Login</button>
          </div> 
          
          {/* <div className="text">
            <h3>Don't have an account? <Link to='/Registration'>Register now</Link></h3>
          </div> */}
        </div>
      </div>
      </center>
    </div>
  );
}
