import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl, mediaUrl } from '../config';
import { Link, Outlet } from 'react-router-dom';
import './abc.css';
import AppsIcon from '@mui/icons-material/Apps';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function Animalcategory() {
  const [categories, setCategories] = useState([]);
  const [isGridView, setIsGridView] = useState(true); // Toggle state

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams3 = new URLSearchParams(url.search);
    let paramcategory = searchParams3.get("Categoryname");

    axios
      .post(apiUrl('/api/getAnimalbycate'), { Categoryname: paramcategory })
      .then((apioutput) => {
        setCategories(apioutput.data.Animal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="containerr animal-category-page">
      <h1 className='abctag'>{categories.length > 0 ? categories[0].categoryname : "Animal Category"}</h1>

      {/* View Toggle Buttons */}
      <div className="toggle-buttons">
        <button onClick={() => setIsGridView(true)} className={isGridView ? "active" : ""}>
          <AppsIcon />
        </button>
        <button onClick={() => setIsGridView(false)} className={!isGridView ? "active" : ""}>
          <FormatListBulletedIcon />
        </button>
      </div>

      {/* Grid View */}
      {isGridView ? (
        <div className="card-container">
          {categories.map((category) => (
            <div key={category._id} className='carda'>
              <Link to={`/Animaldetails?id=${category._id}`}>
                <img className='abcimg' src={mediaUrl(category.file)} alt={category.Name} />
              </Link>
              <div className='card-content'>
                <h2 className='card-title'>
                  <Link to={`/Animaldetails?id=${category._id}`}>{category.Name}</Link>
                </h2>
                <p className='card-text'>
                  {category.ShortDescription}
                  <br />
                  <Link to={`/Animaldetails?id=${category._id}`} className='discover-more'>Discover more...</Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="list-container">
          {categories.map((category) => (
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
      )}

      <Outlet />
    </div>
  );
}


