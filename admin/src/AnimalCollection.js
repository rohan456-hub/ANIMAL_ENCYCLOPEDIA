import React from 'react'
import axios from 'axios'
import { adminApiUrl, mediaUrl } from './config';
import { useState,useEffect } from 'react'

export default function AnimalCollection() {
    const [Animaldetails, setAnimaldetails] = useState([0])
    const [_id, setparamID] = useState()
  
  
    useEffect(() => {
      const url = new URL(window.location.href);
      const searchParams3 = new URLSearchParams(url.search);
      console.log(searchParams3.has("id")); // true
      console.log(searchParams3.get("id"));
      let paramID = searchParams3.get("id");
          setparamID(paramID)
  
      axios
        .post(adminApiUrl('/api/getAnimalCategorybyID'), { id: paramID })
        .then((apioutput) => {
          console.log(apioutput.data.Animals);
          setAnimaldetails(apioutput.data.Animals)
  
        })
        .catch((err) => {
          console.log(err);
        });
        
    })
   const statusHandle=(status)=>{
      axios
      .patch(adminApiUrl('/api/patchAnimalCategory/'+_id),{Status:`${status}`})
      .then((apioutput) => {
        console.log(apioutput);
        alert("status changed to "+status)
         window.location.href='/Animal'
        // axios
        // .post("http://localhost:4000/api/postusernotification",{
        //   Title:this.state.variableTitle,  
        //   UserName:this.state.variableAuthor,
        //   IsRead:false,
        //   Status:status
        // })
        .then((UserData)=>{
          console.log(UserData)
          //  window.location.href='/Animal'
        })
       .catch((err)=>{
        console.log(err);
       })
      })
      .catch((err) => {
        console.log(err);
      });
     //call api to udpate status
    }
   const openFullscreen=()=> {
      document.getElementById('image')?.requestFullscreen()
    }
  
  return (
    <div>
         {
        Animaldetails.map((element) => (
          <div>
              <div className='adboxa'>  <img id='image' onClick={openFullscreen} className='adimg' src={mediaUrl(element.file)} width="800px" height="600px" />
                </div>
                <div>{element.Categoryname}</div>


          </div>

        ))
      }
       <button onClick={()=>statusHandle("Approved")}>Approved</button>
       <button onClick={()=>statusHandle("Rejected")}>Reject</button>
    </div>
  )
}
