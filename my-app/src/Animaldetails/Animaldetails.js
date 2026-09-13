import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { apiUrl, mediaUrl } from '../config';
import './ad.css'
//

export default function Animaldetails() {
  const [Animaldetails, setAnimaldetails] = useState([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams3 = new URLSearchParams(url.search);
    let paramID = searchParams3.get("id");

    axios
      .post(apiUrl('/api/getAnimalbyID'), { id: paramID })
      .then((apioutput) => {
        setAnimaldetails(apioutput.data.Animal);
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
      {Animaldetails.map((categories) => (
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
  <div className="videotext">
    <h1>{categories.Name}</h1>
    {/* <p>{categories.ShortDescription}</p> */}
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
                alt={categories.Name} 
              />
            </div>

            <div className="adboxb">
              <h1 className="adname">{categories.Name}</h1>
              <hr className="hrt" />
              <h1 className="adtagg"> <span className="tag">Category:</span> {categories.Categoryname}</h1>
              <h1 className="adtag"> <span className="tag">LifeSpan:</span> {categories.LifeSpan}</h1>
              <h1 className="adtag"> <span className="tag">Top Speed:</span> {categories.Topspeed}</h1>
              <h1 className="adtag"> <span className="tag">Weight:</span> {categories.Weight}</h1>
              <h1 className="adtag"> <span className="tag">Length:</span> {categories.Length}</h1>
              <h1 className="adtag"> <span className="tag">Population Size:</span> {categories.PopulationSize}</h1>
              <div className="audio-container">
  <span className="tag">Animal Sound:</span>
  <button className="sound-button" onClick={() => document.getElementById("audio-player").play()}>
    <i className="fas fa-volume-up"></i> Play Sound
  </button>
  <audio id="audio-player" src={mediaUrl(categories.Audiofile)} />
</div>
            </div>
          </div>
          <div className='details-section'>

          <h1 className="adatag">Short Description</h1> 
          <p className="sd">{categories.ShortDescription}</p>

          <h1 className="adatag">Appearance</h1> 
          <p className="sd">{categories.Appearance}</p>

          <h1 className="adatag">Mating Habits</h1> 
          <p className="sd">{categories.MatingHabits}</p>
          <h1 className="adatag">Gallery</h1> 
            <div className='gallery-section'>

                  {categories.Gallery?.map((imagePath, index) => (
               <img
                key={index}
                id="image"
                onClick={openFullscreen}
                className="adimgg"      
                src={mediaUrl(imagePath)}
                alt={`${categories.Name} ${index + 1}`}
               />
            ))}
           </div>

          <h1 className="adatag">Population</h1> 
          <p className="sd">{categories.Population}</p>

          <h1 className="adatag">Diet and Nutrition</h1> 
          <p className="sd">{categories.DietandNutrition}</p>

          <h1 className="adatag">Habits and Lifestyle</h1> 
          <p className="sd">{categories.HabitsandLifestyle}</p>
        </div>
        </div>
      ))}
    </div>
  );
}
