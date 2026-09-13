import React from 'react'
import './Cat.css'
import axios from 'axios';
import { apiUrl, mediaUrl } from '../config';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



export default function Cat() {
  const[Petsdetails,setpetsdetails]=useState([])

  useEffect(() => {
    axios
      .get(apiUrl('/api/getcat'))
      .then((apioutput) => {
        console.log(apioutput.data.Pets);
        setpetsdetails(apioutput.data.Pets)
      })
      .catch((err) => {
        console.log(err);
      });

  },[]);
  return (
    <div className="cat-page">
<div className="home-container">
    
    </div>
    <div className="text-boxx">
		<h1 className="heading-primaryy">
			<span className="heading-primary-mainn">welcome to wildelife.pet</span>
			<span className="heading-primary-subb">The cat section</span>
		</h1>
	
	</div>


        <div className="dog-container">
                {Petsdetails.map((element) => (
                  <div className="pet-card" key={element._id}>
                    <img className='imge' src={mediaUrl(element.file)} alt={element.PetName} />
                    <div className="pet-name-overlay"><Link to={`/Petsdetails?id=${element._id}`} >{element.PetName}</Link></div>
                  </div>
                ))}
     
    </div>
</div>
  )
}
