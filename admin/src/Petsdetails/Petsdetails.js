import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { adminApiUrl, mediaUrl } from '../config';
import './Petsdetails.css'

export default function Petsdetails() {
  const [petsdetails, setpetsdetails] = useState([0])
  const [_id, setparamID] = useState()
   const[Name,setName]=useState("")
    const[ShortDescription,setShortDescription]=useState("")
      const[Username,setusername]=useState("")
    


  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams3 = new URLSearchParams(url.search);
    console.log(searchParams3.has("id")); // true
    console.log(searchParams3.get("id"));
    let paramID = searchParams3.get("id");
        setparamID(paramID)

    axios
      .post(adminApiUrl('/api/getpetsbyID'), { id: paramID })
      .then((apioutput) => {
        console.log(apioutput.data.Pets);
        setpetsdetails(apioutput.data.Pets)

        let obj=apioutput.data.Pets[0]; 
        let VarName=obj.PetName
        let VarShortDescription=obj.Description
        let VarUsername=obj.Username
       
        setName(VarName)
        setShortDescription(VarShortDescription)
        setusername(VarUsername)
     
       
      


      })
      .catch((err) => {
        console.log(err);
      });
      
  })
 const statusHandle=(status)=>{
    axios
    .patch(adminApiUrl('/api/patchpets/'+_id),{Status:`${status}`})
    .then((apioutput) => {
      console.log(apioutput);
      alert("status changed to "+status)
    //  
      axios .post(adminApiUrl('/api/postusernotification'),{
        Username:Username,
        Name:Name,  
        ShortDescription:ShortDescription,
        IsRead:false,
        Status:status
      })
      .then((UserNotidata)=>{
        console.log(UserNotidata)
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
    <div className='mad'>
      {
        petsdetails.map((categories) => (
          <div key={categories._id}>
          {/* Video on Top */}
          <div className="video-container">
          <div className="video-container">
  <video 
    className="videoa" 
    src={mediaUrl(categories.Videofile)} 
    autoPlay 
    loop 
    muted 
  />
  <div className="video-text">
    <h1>{categories.PetName}</h1>
    <p>{categories.Description}</p>
  </div>
</div>


          </div >

          <div className="admain">
            <div className="adboxa">
              <img 
                id="image" 
                onClick={openFullscreen} 
                className="adimg" 
                src={mediaUrl(categories.file)} 
                alt={categories.Name} 
              />
            </div>

            <div className="adboxb">
              <h1 className="adname">{categories.PetName}</h1>
              <hr className="hrt" />
              {/* <h1 className="adtag"> <span className="tag">Category:</span> {categories.Categoryname}</h1> */}
              <h1 className="adtag"> <span className="tag">Lifespan:</span> {categories.Lifespan}</h1>
              {/* <h1 className="adtag"> <span className="tag">Top Speed:</span> {categories.Topspeed}</h1> */}
              <h1 className="adtag"> <span className="tag">Weight:</span> {categories.Weight}</h1>
              <h1 className="adtag"> <span className="tag">Height:</span> {categories.Height}</h1>
              {/* <h1 className="adtag"> <span className="tag">Population Size:</span> {categories.PopulationSize}</h1>
              <h1 className="tag">Animal Sound: <audio src={`http://localhost:4000/${categories.Audiofile}`} controls /></h1> */}
            </div>
          </div>
          <div className='details-section'>

          <h1 className="adatag">Description</h1> 
          <p className="sd">{categories.Description}</p>

          <h1 className="adatag">Appearance</h1> 
          <p className="sd">{categories.Appearance}</p>

          <h1 className="adatag">Origion</h1> 
          <p className="sd">{categories.Origion}</p>

          <h1 className="adatag">Temperament</h1> 
          <p className="sd">{categories.Temperament}</p>

          <h1 className="adatag">Training</h1> 
          <p className="sd">{categories.Training}</p>

          <h1 className="adatag">Interesting facts</h1> 
          <p className="sd">{categories.Interestingfacts}</p>
        </div>
        </div>

        ))
      }
       <button onClick={()=>statusHandle("Approved")}>Approved</button>
       <button onClick={()=>statusHandle("Rejected")}>Reject</button>
    </div>
  )
}
