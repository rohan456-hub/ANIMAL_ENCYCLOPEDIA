
import axios from 'axios';
import { adminApiUrl } from '../config';
import './UserData.css'
import { useEffect, useState } from 'react';

export default function UserData() {
  const[Userdetail,setUserdetail]=useState([0])


   useEffect(()=> {
    axios
      .post(adminApiUrl('/api/getuserdetail'))
      .then((apioutput) => {
        console.log(apioutput.data.User);
        setUserdetail(apioutput.data.User)
      })
      .catch((err) => {
        console.log(err);
      })
    },[])
  return (
    <div>
      <div className="tableo">

      <table >
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>ConfirmPassword</th>
          </tr>
        </thead>
        {
         Userdetail.map((element)=>(
        <tbody>
          <tr>
            <td>{element.Username}</td>
            <td>{element.Email}</td>
            <td>{element.Password}</td>
            <td>{element.ConfirmPassword}</td>
          </tr>
        </tbody>
          ))}
      </table>
      </div>
    </div>
  )
}
