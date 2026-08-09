
import axios from 'axios';
import { adminApiUrl, mediaUrl } from '../config';
import './Animal.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Animal() {
  const[Animaldetail,setAnimaldetail]=useState([0])
  const navigate=useNavigate()


   useEffect(()=> {
    
    axios
      .post(adminApiUrl('/api/getAnimal'),{Status:"Pending"})
      .then((apioutput) => {
        console.log(apioutput.data.Animals);
        setAnimaldetail(apioutput.data.Animals)
      })
      .catch((err) => {
        console.log(err);
      })
    },[])

  const handleclick=(status) => {
    axios
      .post(adminApiUrl('/api/getAnimal'),{Status:`${status}`})
      .then((apioutput) => {
        console.log(apioutput.data.Animals);
        setAnimaldetail(apioutput.data.Animals)
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
      <th>Animal Name</th>
      <th>Category Name</th>
      <th>Status</th>
      <th>View</th>
    </tr>
  </thead>
  <tbody>
    {Animaldetail.map((element, index) => (
      <tr key={element._id || index}>
        <td>{element.Username}</td>
        <td>
          <img
            className="cimg"
            src={mediaUrl(element.file)}
            alt={element.Name}
            width="200px"
            height="200px"
            // Handle missing images
          />
        </td>
        <td>{element.Name}</td>
        <td>{element.Categoryname}</td>
        <td>{element.Status}</td>
        <td>
          <Link to={`/Animaldetails/?id=${element._id}`}>
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
