
import axios from 'axios';
import { adminApiUrl, mediaUrl } from '../config';
// import './Animal.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Petsdata() {
  const[Petsdetail,setpetsdetail]=useState([0])


   useEffect(()=> {
    
    axios
      .post(adminApiUrl('/api/getpetdata'),{Status:"Pending"})
      .then((apioutput) => {
        console.log(apioutput.data.Pets);
        setpetsdetail(apioutput.data.Pets)
      })
      .catch((err) => {
        console.log(err);
      })
    },[])

  const handleclick=(status) => {
    axios
      .post(adminApiUrl('/api/getpetdata'),{Status:`${status}`})
      .then((apioutput) => {
        console.log(apioutput.data.Pets);
        setpetsdetail(apioutput.data.Pets)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  return (
    <div className='table-container'>
      <div className="button-group">
      <button onClick={()=>handleclick("Pending")}>Pending</button>
      <button onClick={()=>handleclick("Approved")}>Approved</button>
      <button onClick={()=>handleclick("Rejected")}>Rejected</button>

      </div>

      <table>
  <thead>
    <tr>
      <th>Username</th>
        <th>Image</th>
      <th>PetName</th>
      <th>Whichpet</th>
      <th>Status</th>
      <th>View</th>
    </tr>
  </thead>
  <tbody>
    {Petsdetail.map((element, index) => (
      <tr key={element._id || index}>
        <td>{element.Username}</td>
        <td>
          <img
            className="cimg"
            src={mediaUrl(element.file)}
            alt={element.PetName}
            width="200px"
            height="200px"
            // Handle missing images
          />
        </td>
        <td>{element.PetName}</td>
        <td>{element.Whichpet}</td>
        <td>{element.Status}</td>
        <td>
          <Link to={`/Petsdetails/?id=${element._id}`}>
            <button className="view-btn">View Animals</button>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}
