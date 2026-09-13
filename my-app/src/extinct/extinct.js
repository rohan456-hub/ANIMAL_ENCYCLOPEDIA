import React, { useState, useEffect } from 'react';
import './extinct.css';
import dino from '../extinct/dino.jpg'
import axios from 'axios';
import { apiUrl, mediaUrl } from '../config';
import { Link } from 'react-router-dom';

export default function Extinct() {
  const [Extinctdetails, setExtinctDetails] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl('/api/getAnimalbyextinct'))
      .then((apioutput) => {
        console.log(apioutput.data.Animal);
        setExtinctDetails(apioutput.data.Animal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="extinct-page">
      
      <div className="home-container">
      <div className="overlay"></div>
      <img
        src={dino}
        alt="Wildlife Background"
        className="background-imggg"
      />
      <div className="content">
        <h1>Welcome to Wildlife.Dino</h1>
        <p>Discover the beauty of nature and wildlife.</p>
        <button className="explore-btn">Explore Now</button>
      </div>
    </div>

      <div className="dino-container">
        {Extinctdetails.map((element,index) => (
          <div className="dino-card" key={element._id ||index}>
            <img className='dino-imge' src={mediaUrl(element.file)} alt={element.Name} />
            <div className="dino-name-overlay"><Link to={`/Extinctdetails?id=${element._id}`} >{element.Name}</Link></div>
          </div>
        ))}
      </div>
    </div>
  );
}
