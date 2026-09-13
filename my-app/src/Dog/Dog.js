import React, { useState, useEffect } from 'react';
import './dog.css';
import axios from 'axios';
import { apiUrl, mediaUrl } from '../config';
import { Link } from 'react-router-dom';

export default function Dog() {
  const [Petsdetails, setPetsDetails] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl('/api/getdog'))
      .then((apioutput) => {
        console.log(apioutput.data.Pets);
        setPetsDetails(apioutput.data.Pets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dog-page">
      <header className="header">

	
	
</header>
<div className="text-box">
		<h1 className="heading-primary">
			<span className="heading-primary-main">welcome to wildelife.pet</span>
			<span className="heading-primary-sub">The dog section</span>
		</h1>
	
	</div>

      {/* Grid Layout for Pets */}
      <div className="dog-container">
        {Petsdetails.map((element,index) => (
          <div className="pet-card" key={element._id ||index}>
            <img className='imge' src={mediaUrl(element.file)} alt={element.PetName} />
            <div className="pet-name-overlay"><Link to={`/Petsdetails?id=${element._id}`} >{element.PetName}</Link></div>
          </div>
        ))}
      </div>
    </div>
  );
}

