import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiUrl, mediaUrl } from '../config';
import './Petsdetails.css'
//

export default function Petsdetails() {
  const [Petsdetails, setPetsdetails] = useState([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams3 = new URLSearchParams(url.search);
    let paramID = searchParams3.get("id");

    axios
      .post(apiUrl('/api/getPetbyID'), { id: paramID })
      .then((apioutput) => {
        setPetsdetails(apioutput.data.Pets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 

  const openFullscreen = () => {
    document.getElementById('image')?.requestFullscreen();
  };

  return (
    <div>
      {Petsdetails.map((categories) => (
        <div key={categories._id}>
          {/* Video on Top */}
          <div className="video-container">
          <div className="video-container">
  <video 
    className="videoa" 
    src={mediaUrl(categories.Videofile)} 
    autoPlay 
    loop 
    muted 
  />
  <div className="video-textt">
    <h1 className='kj'>{categories.PetName}</h1>
  </div>
</div>


          </div>

          <div className="admain">
            <div className="adboxa">
              <img 
                id="image" 
                onClick={openFullscreen} 
                className="adimg" 
                src={mediaUrl(categories.file)} 
                alt={categories.PetName} 
              />
            </div>

            <div className="adboxb">
              <h1 className="adname">{categories.PetName}</h1>
              <hr className="hrt" />
              {/* <h1 className="adtag"> <span className="tag">Category:</span> {categories.Categoryname}</h1> */}
              <h1 className="adtag"> <span className="tag">LifeSpan:</span> {categories.Lifespan}</h1>
              {/* <h1 className="adtag"> <span className="tag">Top Speed:</span> {categories.Topspeed}</h1> */}
              <h1 className="adtag"> <span className="tag">Weight:</span> {categories.Weight}</h1>
              <h1 className="adtag"> <span className="tag">Height:</span> {categories.Height}</h1>
              {/* <h1 className="adtag"> <span className="tag">Population Size:</span> {categories.PopulationSize}</h1> */}
              {/* <h1 className="tag">Animal Sound: <audio src={`http://localhost:4000/${categories.Audiofile}`} controls /></h1> */}
            </div>
          </div>
          <div className='details-section'>

          <h1 className="adatag">Description</h1> 
          <p className="sd">{categories.Description}</p>

          <h1 className="adatag">Appearance</h1> 
          <p className="sd">{categories.Appearance}</p>

          <h1 className="adatag">Origion</h1> 
          <p className="sd">{categories.Origion}</p>

          <h1 className="adatag">Temperament</h1> 
          <p className="sd">{categories.Temperament}</p>

          <h1 className="adatag">Training</h1> 
          <p className="sd">{categories.Training}</p>

          <h1 className="adatag">Interesting facts</h1> 
          <p className="sd">{categories.Interestingfacts}</p>
        </div>
        </div>
      ))}
    </div>
  );
}
