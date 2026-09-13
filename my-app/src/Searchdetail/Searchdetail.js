import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, mediaUrl } from '../config';
import { useLocation } from "react-router-dom";

export default function SearchAnimaldetails() {
  const [Animaldetails, setAnimaldetails] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let paramName = searchParams.get("Name");

    if (!paramName) {
      setError("No animal name provided.");
      return;
    }

    axios
      .post(apiUrl('/api/getAnimalSearch'), { params: { Name: paramName } })
      .then((apioutput) => {
        if (apioutput.data && apioutput.data.animals) {
          setAnimaldetails(apioutput.data.animals);
        } else {
          setError("No matching animal found.");
        }
      })
      .catch((err) => {
        setError("Error fetching animal details.");
        console.error(err);
      });
  }, [location.search]); // Dependency added to trigger re-fetch when URL changes

  const openFullscreen = () => {
    document.getElementById("image")?.requestFullscreen();
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {Animaldetails.length === 0 && !error && <p>Loading...</p>}

      {Animaldetails.map((categories) => (
        <div key={categories._id}>
          {/* Video Section */}
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
            </div>
          </div>

          {/* Image & Info Section */}
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
              <h1 className="adtag"> <span className="tag">Category:</span> {categories.Categoryname}</h1>
              <h1 className="adtag"> <span className="tag">LifeSpan:</span> {categories.LifeSpan}</h1>
              <h1 className="adtag"> <span className="tag">Top Speed:</span> {categories.Topspeed}</h1>
              <h1 className="adtag"> <span className="tag">Weight:</span> {categories.Weight}</h1>
              <h1 className="adtag"> <span className="tag">Length:</span> {categories.Length}</h1>
              <h1 className="adtag"> <span className="tag">Population Size:</span> {categories.PopulationSize}</h1>
              <h1 className="tag">Animal Sound: <audio src={mediaUrl(categories.Audiofile)} controls /></h1>
            </div>
          </div>

          {/* Detailed Info Section */}
          <div className="details-section">
            <h1 className="adatag">Short Description</h1> 
            <p className="sd">{categories.ShortDescription}</p>

            <h1 className="adatag">Appearance</h1> 
            <p className="sd">{categories.Appearance}</p>

            <h1 className="adatag">Mating Habits</h1> 
            <p className="sd">{categories.MatingHabits}</p>

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
