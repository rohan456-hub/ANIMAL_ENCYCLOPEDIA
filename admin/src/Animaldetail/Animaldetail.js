import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { adminApiUrl, mediaUrl } from '../config';
import './Animaldetail.css'

export default function Animaldetails() {
  const [Animaldetails, setAnimaldetails] = useState([0])
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
      .post(adminApiUrl('/api/getAnimalbyID'), { id: paramID })
      .then((apioutput) => {
        console.log(apioutput.data.Animals);
        let obj=apioutput.data.Animals[0];
        let VarName=obj.Name
        let VarShortDescription=obj.ShortDescription
        let VarUsername=obj.Username
        setName(VarName)
        setShortDescription(VarShortDescription)
        setusername(VarUsername)
        setAnimaldetails(apioutput.data.Animals)
        

       
      })
      .catch((err) => {
        console.log(err);
      });
      
  })
 const statusHandle=(status)=>{
    axios
    .patch(adminApiUrl('/api/patchAnimals/'+_id),{Status:`${status}`})
    .then((apioutput) => {
      console.log(apioutput);
      alert("status changed to "+status)
       window.location.href='/Animal'
      axios
      .post(adminApiUrl('/api/postusernotification'),{
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
        Animaldetails.map((categories) => (
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
    <h1>{categories.Name}</h1>
    <p>{categories.ShortDescription}</p>
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
              <h1 className="adname">{categories.Name}</h1>
              <hr className="hrt" />
              <h1 className="adtag"> <span className="tag">Category:</span> {categories.Categoryname}</h1>
              <h1 className="adtag"> <span className="tag">LifeSpan:</span> {categories.LifeSpan}</h1>
              <h1 className="adtag"> <span className="tag">Top Speed:</span> {categories.Topspeed}</h1>
              <h1 className="adtag"> <span className="tag">Weight:</span> {categories.Weight}</h1>
              <h1 className="adtag"> <span className="tag">Length:</span> {categories.Length}</h1>
              <h1 className="adtag"> <span className="tag">Population Size:</span> {categories.PopulationSize}</h1>
              <h1 className="tag">Animal Sound: <audio src={mediaUrl(categories.Audiofile)} controls /></h1>
            </div>
          </div>
          <div className='details-section'>

          <h1 className="adatag">Short Description</h1> 
          <p className="sd">{categories.ShortDescription}</p>

          <h1 className="adatag">Appearance</h1> 
          <p className="sd">{categories.Appearance}</p>

          <h1 className="adatag">Mating Habits</h1> 
          <p className="sd">{categories.MatingHabits}</p>
          <div>
           <h1 className="adatag">Gallery</h1> 
           {categories.Gallery?.map((imagePath, index) => (
      <img
        key={index}
        id="image"
        onClick={openFullscreen}
        className="adimg"
        src={mediaUrl(imagePath)}
        alt={`${categories.Name} ${index + 1}`}
      />
    ))}
            </div>
          

          <h1 className="adatag">Population</h1> 
          <p className="sd">{categories.Population}</p>

          <h1 className="adatag">Diet and Nutrition</h1> 
          <p className="sd">{categories.DietandNutrition}</p>

          <h1 className="adatag">Habits and Lifestyle</h1> 
          <p className="sd">{categories.HabitsandLifestyle}</p>
        </div>
        </div>

        ))
      }
       <button  className="btn-approve" onClick={()=>statusHandle("Approved")}>Approved</button>
       <button className="btn-reject"onClick={()=>statusHandle("Rejected")}>Reject</button>
    </div>
  )
}
