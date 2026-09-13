import React, { useEffect, useState } from 'react';
import './About.css';
import about from '../About/merlin.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../config';

export default function About() {
  const [UserName, setusername] = useState("");
  const [Email, setemail] = useState("");
  const [Message, setmessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("Userlogindata");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.length > 0 && parsedUser[0].Username) {
        setusername(parsedUser[0].Username);
      }
    }
  }, []);

  const clicksubmit = () => {
    // const formData = new FormData();
    // formData.append("UserName", UserName);
    // formData.append("Email", Email);
    // formData.append("Message", Message);

  
     axios.post(apiUrl('/api/AddMessage'), { UserName,Email,Message}, {
  headers: { "Content-Type": "application/json" }
})
      .then((apiOutput) => {
        console.log(apiOutput.data.Mess);
        alert("Message sent successfully!");
        navigate("/Home");
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });
  };

  return (
    <div>
      <section className="about-us">
        <div className="aboutt">
          <img src={about} alt="About Us" className="pic" />
          <div className="textt">
            <h2>About Us</h2>
            <h5>Rohan & <span className='spann'>Gopal</span></h5>
            <p>
              At our online animal encyclopedia, we are passionate about the animal kingdom.
              Our mission is to provide accurate, engaging, and up-to-date information about
              species from all over the world.
            </p>
            <div className="dataa">
              <Link className="hire" to="/Home">Explore</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="help-page-container">
        <h1 className="page-title">Help & Support</h1>
        
        <div className="faq-section">
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          <div className="faq-question">
            <h3>How do I reset my password?</h3>
          </div>
          <div className="faq-answer">
            <p>Click on 'Forgot Password' at the login page and follow the instructions.</p>
          </div>
          <div className="faq-question">
            <h3>How can I contact customer support?</h3>
          </div>
          <div className="faq-answer">
            <p>You can fill out the form below or email us at support@example.com.</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2 className="faq-heading">Contact Us</h2>

          <label htmlFor="name" className="form-label">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={UserName} 
            className="input-field" 
            disabled 
          />
          
          <label htmlFor="email" className="form-label">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="input-field"
            value={Email}
            onChange={(event) => setemail(event.target.value)}
            required 
          />
          
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            className="textarea-field" 
            rows="5" 
            value={Message}
            onChange={(event) => setmessage(event.target.value)}
            required
          ></textarea>
          
          <button type="submit" className="submit-button" onClick={clicksubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
