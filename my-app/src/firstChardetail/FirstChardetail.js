import React from "react";
import axios from "axios";
import { apiUrl, mediaUrl } from '../config';
import { useState,useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import './collection.css'

function FirstChardetail() {
   const [category, setcategory] = useState([0])
   const location = useLocation(); // Get current URL
   const [first, setfirstchar] = useState()

  useEffect(() => {
  
    const params = new URLSearchParams(location.search);
    const firstChar = params.get("firstChar");
    setfirstchar(firstChar)
    axios
      .get(apiUrl(`/api/getAnimalByFirstChar?firstChar=${firstChar}`),)
      .then((apioutput) => {
        console.log(apioutput.data.animals);
        setcategory(apioutput.data.animals)
      })
      .catch((err) => {
        console.log(err);
      });
    },[])
  return (
    <div>
      <h3 className="title">ANIMALS STARTING WITH LETTER {first}</h3>
    
     
      <div className="list-container">
                {category.map((category) => (
                  <div key={category._id} className="list-item">
                    <Link to={`/Animaldetails?id=${category._id}`}>
                      <img className="list-img" src={mediaUrl(category.file)} alt={category.Name} />
                    </Link>
                    <div className="list-content">
                      <h2 className="list-title">
                        <Link to={`/Animaldetails?id=${category._id}`}>{category.Name}</Link>
                      </h2>
                      <p className="list-description">{category.ShortDescription}</p>
                      <Link to={`/Animaldetails?id=${category._id}`} className="discover-more">Discover more...</Link>
                    </div>
                  </div>
                ))}
              </div>
    
    <Outlet/>
    </div>
  )
}


export default FirstChardetail
