import React, { useEffect, useState } from 'react';
import './AddPets.css';
import axios from 'axios';
import { apiUrl } from '../config';

export default function AddPets() {
    const [Username, setusername] = useState();
    const [PetName, setpetname] = useState();
    const [Description, setdescription] = useState();
    const [Appearance, setappearance] = useState();
    const [Origion, setorigion] = useState();
    const [Height, setheight] = useState();
    const [Lifespan, setlifespan] = useState();
    const [Weight, setweight] = useState();
    const [Temperament, settemperament] = useState();
    const [Training, settraining] = useState();
    const [Interestingfacts, setinterestingfacts] = useState();
    const [Whichpet, setwhichpet] = useState();
    const [file, setFile] = useState(null);
    const [Videofile, setVideoFile] = useState(null);
    const [Status] = useState("Pending");

    useEffect(() => {
        const user = sessionStorage.getItem("Userlogindata");
        let _username = JSON.parse(user)[0].Username;
        setusername(_username);
    }, []);

    const Submithandle = () => {
        const formData = new FormData();
        formData.append('PetName', PetName);
        formData.append('Weight', Weight);
        formData.append('Origion', Origion);
        formData.append('Appearance', Appearance);
        formData.append('Description', Description);
        formData.append('Height', Height);
        formData.append('Lifespan', Lifespan);
        formData.append('Temperament', Temperament);
        formData.append('Training', Training);
        formData.append('Interestingfacts', Interestingfacts);
        formData.append('Whichpet', Whichpet);
        formData.append('file', file);
        formData.append('video', Videofile);
        formData.append('Status', Status);
        formData.append('Username', Username);

        axios.post(apiUrl('/api/AddPets'), formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((apioutput) => {
                console.log(apioutput.data.Pets);
                alert("Pets detail submitted successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Add Pets</h1>

            <div className="form-group">
                <label>Pet Name</label>
                <input className="inputtt" type="text" required onChange={(e) => setpetname(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea className="textarea" required onChange={(e) => setdescription(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Appearance</label>
                <textarea className="textarea" required onChange={(e) => setappearance(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Origin</label>
                <textarea className="textarea" required onChange={(e) => setorigion(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Height</label>
                <input className="inputtt" type="text" required onChange={(e) => setheight(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Lifespan</label>
                <input className="inputtt" type="text" required onChange={(e) => setlifespan(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Weight</label>
                <input className="inputtt" type="text" required onChange={(e) => setweight(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Temperament</label>
                <textarea className="textarea" required onChange={(e) => settemperament(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Training</label>
                <textarea className="textarea" required onChange={(e) => settraining(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Interesting Facts</label>
                <textarea className="textarea" required onChange={(e) => setinterestingfacts(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Which Pet</label>
                <select className="inputtt" value={Whichpet} onChange={(e) => setwhichpet(e.target.value)}>
                    <option value="">Select a pet</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </select>
            </div>

            <div className="form-group">
                <label>Image</label>
                <input className="inputtt" type="file" required onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <div className="form-group">
                <label>Video</label>
                <input className="inputtt" type="file" required onChange={(e) => setVideoFile(e.target.files[0])} />
            </div>

            <div className="form-group">
                <label>Username</label>
                <input className="inputtt" type="text" value={Username} disabled />
            </div>

            <div className="form-group">
                <button className="btnnn" onClick={Submithandle}>Submit</button>
            </div>
        </div>
    );
}
