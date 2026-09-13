import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../config';
import './Animal.css'
import { useNavigate } from 'react-router-dom';



export default function AddAnimal() {
    const [showInput, setShowInput] = useState(false);
    const [Username, setusername] = useState();
    const navigate = useNavigate(); // React Router navigation

    const [Name, setname] = useState()
    const [Weight, setweight] = useState()
    const [Length, setlength] = useState()
    const [Appearance, setappearance] = useState()
    const [Population, setpopulation] = useState()
    const [DietandNutrition, setdiet] = useState()
    const [LifeSpan, setlifespan] = useState()
    const [MatingHabits, sethabits] = useState()
    const [PopulationSize, setpopulationsize] = useState()
    const [ShortDescription, setshortdescription] = useState()
    const [Topspeed, settopspeed] = useState()
    const [Categoryname, setcategoryname] = useState()
    const [HabitsandLifestyle, setlifestyle] = useState()
    const [file, setFile] = useState(null)
    const [Audiofile, setAudioFile] = useState(null)
    const [Videofile, setVideoFile] = useState(null)
    const [Gallery, setGalleryFile] = useState([])
    const [Status] = useState("Pending")


    // useEffect(() => {
    //     let user = sessionStorage.getItem("Userlogindata")
    //     if (user == null) {
    //         window.location.href = '/Login'

    //     } else {
    //         let _username = JSON.parse(user)[0].Username
    //         setusername(_username)
    //     }
    // })
    
      useEffect(() => {
        const user = sessionStorage.getItem("Userlogindata");
    
        if (!user) { // If user data is null or empty, redirect
          navigate("/Login");
        }else {
                    let _username = JSON.parse(user)[0].Username
                    setusername(_username)
                }
      }, []);



    const buttonclick = async () => {

        const formData = new FormData();
        formData.append('Name', Name)
        formData.append('Weight', Weight)
        formData.append('Length', Length)
        formData.append('Appearance', Appearance)
        formData.append('Population', Population)
        formData.append('DietandNutrition', DietandNutrition)
        formData.append('LifeSpan', LifeSpan)
        formData.append('MatingHabits', MatingHabits)
        formData.append('PopulationSize', PopulationSize)
        formData.append('ShortDescription', ShortDescription)
        formData.append('Topspeed', Topspeed)
        formData.append('Categoryname', Categoryname)
        formData.append('HabitsandLifestyle', HabitsandLifestyle)
        formData.append('file', file)
        formData.append('audio', Audiofile)
        formData.append('video', Videofile)
        for (let i = 0; i < Gallery.length; i++) {
            formData.append('gallery', Gallery[i]);
        }
        formData.append('Status', Status)
        formData.append('Username', Username)
        // formData.append('Categoryname', Categoryname)
        // formData.append('file', file)
        // formData.append('Status', Status)

        // axios
        //     .post("http://localhost:4000/api/AddAnimalcategory", formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         }

        //     })
        //     .then((apioutput) => {
        //         console.log(apioutput.data.Animal);
        //         // alert("Add new category successfully ")
        //         // setShowInput(false);
        //         //   window.location.href='/Home'


        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        

        axios
            .post(apiUrl('/api/AddAnimals'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }


            })
            .then((apioutput) => {
                console.log(apioutput.data.Animal);
                alert("Animal Submitting succssefully...watting for Approval ")
                navigate('/Home')

            })
            .catch((err) => {
                console.log(err);
            });



    }
    // const handleClick = () => {
    //     setShowInput(true); // Show the input field when the button is clicked
    // };
    //   

    return (
        <div>
            <div className="form-container">
                <h1>Animal Details</h1>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name"  onChange={(event) => setname(event.target.value)}  required/>
                </div>
                <div className="form-group">
                    <label for="weight">Weight</label>
                    <input type="text" id="weight" name="weight" onChange={(event) => setweight(event.target.value)} />
                </div>
                <div className="form-group">
                    <label for="length">Length</label>
                    <input type="text" id="length" name="length" onChange={(event) => setlength(event.target.value)} />
                </div>
                <div className="form-group">
                    <label for="appearance">Appearance</label>
                    <textarea id="appearance" name="appearance" onChange={(event) => setappearance(event.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label for="population">Population</label>
                    <input type="text" id="population" name="population" onChange={(event) => setpopulation(event.target.value)} />
                </div>
                <div className="form-group">
                    <label for="diet">Diet and Nutrition</label>
                    <textarea id="diet" name="diet" onChange={(event) => setdiet(event.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label for="habits">Habits and Lifestyle</label>
                    <textarea id="habits" name="habits" onChange={(event) => setlifestyle(event.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label for="lifespan">Life Span</label>
                    <input type="text" id="lifespan" name="lifespan" onChange={(event) => setlifespan(event.target.value)} />
                </div>
                <div className="form-group">
                    <label for="mating">Mating Habits</label>
                    <textarea id="mating" name="mating" onChange={(event) => sethabits(event.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label for="population-size">Population Size</label>
                    <input type="text" id="population-size" name="population-size" onChange={(event) => setpopulationsize(event.target.value)} />
                </div>
                <div className="form-group">
                    <label for="short-desc">Short Description</label>
                    <textarea id="short-desc" name="short-desc" onChange={(event) => setshortdescription(event.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label for="top-speed">Top Speed</label>
                    <input type="text" id="top-speed" name="top-speed" onChange={(event) => settopspeed(event.target.value)} />
                </div>
                <div className="form-group">
                    <label for="category">Category Name</label>
                        <select value={Categoryname} onChange={(event) => setcategoryname(event.target.value)}>
                            <option value="">Select a Category Name</option>
                            <option value="Mammals">Mammals</option>
                            <option value="Birds">Birds</option>
                            <option value="Fish">Fish</option>
                            <option value="Invertabrates">Invertabrates</option>
                            <option value="Reptiles">Reptiles</option>
                            <option value="Amphibians">Amphibians</option>
                            <option value="Red Animal">Red Animal</option>
                            <option value="Colorful Animals">Colorful Animals</option>
                            <option value="Art Of Attraction">Art Of Attraction</option>
                            <option value="Snow White">Snow White</option>
                            <option value="Gliding Animals">Gliding Animals</option>
                            <option value="Weird Animals">Weird Animals</option>
                            <option value="Ancient Animals">Ancient Animals</option>
                        </select>
                    </div>
                <div className="form-group">
                    <label for="image">Animal Image</label>
                    <input type="file" onChange={(event) => setFile(event.target.files[0])} />
                </div>
                <div className="form-group">
                    <label for="gallery">Gallery Image</label>
                    <input type="file" multiple accept="image/*" onChange={(event) => setGalleryFile(event.target.files)} />
                </div>
                <br />
                <div className="form-group">
                    <label for="audio">Audio File</label>
                    <input type="file" accept="audio/*" onChange={(event) => setAudioFile(event.target.files[0])} />
                </div>
                <div className="form-group">
                    <label for="video">Video File</label>
                    <input type="file" accept="video/*" onChange={(event) => setVideoFile(event.target.files[0])} />
                </div>
                <div className="form-group">
                    <label for="name">UserName</label>
                    <input type="text" id="name" name="name" value={Username} onClick={(event)=>setusername(event.target.value)} disabled />
                </div>

                <div className="form-group">
                    <button className='btnnn' type='submit' onClick={buttonclick}>submit</button>
                </div>
            </div>
        </div>
    )
}

{/* <div className="form-group">
    <label for="image">Image Category</label>
    <input type="file" onChange={(event) => setFile(event.target.files[0])} />
</div> */}
