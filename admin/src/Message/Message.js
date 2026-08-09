
import axios from 'axios';
import { adminApiUrl } from '../config';
// import './UserData.css'
import { useEffect, useState } from 'react';

export default function Message() {
  const[Messagerdetail,setMessagedetail]=useState([0])


   useEffect(()=> {
    axios
      .post(adminApiUrl('/api/getMessagedetails'))
      .then((apioutput) => {
        console.log(apioutput.data.Mess);
        setMessagedetail(apioutput.data.Mess)
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
            <th>Message</th>
          </tr>
        </thead>
        {
         Messagerdetail.map((element)=>(
        <tbody>
          <tr>
            <td>{element.UserName}</td>
            <td>{element.Email}</td>
            <td>{element.Message}</td>
          </tr>
        </tbody>
          ))}
      </table>
      </div>
    </div>
  )
}
