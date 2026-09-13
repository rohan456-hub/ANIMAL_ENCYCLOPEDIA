import React from "react";
import axios from "axios";
import { apiUrl, mediaUrl } from '../config';
import { useState,useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import './collection.css'

function Collection() {
   const [category, setcategory] = useState([])
   const[unreadCounts, setUnreadCounts] = useState({}); // State for unread counts of each category

   useEffect(() => {
    axios
      .get(apiUrl('/api/getAnimalcategory'))
      .then((apioutput) => {
        const categories = apioutput.data.Animal;
        setcategory(categories);

        // Now fetch count for each category
        categories.forEach((cat) => {
          axios
            .post(apiUrl('/api/getAnimalnumber'), {
              Categoryname: cat.Categoryname,
            })
            .then((res) => {
              setUnreadCounts((prevCounts) => ({
                ...prevCounts,
                [cat.Categoryname]: res.data.count,
              }));
            })
            .catch((err) =>
              console.error(`Error getting count for ${cat.Categoryname}:`, err)
            );
        });
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      });
  }, []);
  return (
    <div>
      <h1 className="title">Collections</h1>
    
     
       <div className="grid-containerrr">
           {
       
                 category.map((element) => {
       
                   return (
       
                     <div className="grid-itemmm">
                       <Link className="ctext-cate" to={"/Animalcategory?Categoryname=" + element.Categoryname}>
                         <img className="cimg" src={mediaUrl(element.file)} width="200px" height="200px" /><br />
                         {element.Categoryname} </Link>
                         <div >{unreadCounts[element.Categoryname] ||0} Species </div>
                         </div>
                         
       
                   )
                 })
       
               }
    </div>
    
    <Outlet/>
    </div>
  )
}


export default Collection
