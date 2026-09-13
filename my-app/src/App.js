import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./home/home";
import About from "./About/About";
import Navbar from "./Nav/Navigationv";
import Collection from "./Collection/collection";
// import Pets from "./NavPets/NavPets";
import Animalcategory from "./Animalbycategory/Animalcategory";
import AddAnimal from "./AddAnimal/AddAnimal";
import Animaldetails from "./Animaldetails/Animaldetails";
import Footer from "./Footer/Footer";
import Dog from "./Dog/Dog";
import Extinct from "./extinct/extinct";
import Cat from "./Cat/Cat";
import NavPets from "./NavPets/NavPets";
import FooterPets from "./Footerpets/FooterPets";
import AddPets from "./AddPets/AddPets";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import Navdino from "./Navdino/Navdino";
import './app.css'
import Footerdino from "./Footerdino/Footerdino";
import Petsdetails from "./Petsdetails/Petsdetails";
import Extinctdetails from "./Extinctdetails/Extinctdetails";
import Searchdetail from "./firstChardetail/FirstChardetail";
import FirstChardetail from "./firstChardetail/FirstChardetail";
import Notification from "./Notification/Notification";
import SearchAnimaldetails from "./Searchdetail/Searchdetail";




function App() {

  return (
    <div className="app-shell">
        
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<> <Navbar  /><Home /> <Footer /></>} />
          <Route path="/Home"  element={<> <Navbar  /><Home /> <Footer /></>} />
          <Route path="/About" element={<> <Navbar /><About /><Footer /></>} />
          <Route path="/Collection" element={<> <Navbar /><Collection /><Footer /></>} />
          <Route path="/Pets" element={<><NavPets /><Dog/><FooterPets/></>} />
          <Route path="Animalcategory/*" element={<> <Navbar /><Animalcategory /><Footer /></>} />
          <Route path="/AddAnimal" element={<> <Navbar /><AddAnimal /><Footer /></>} />
          <Route path="Animaldetails/*" element={<> <Navbar /><Animaldetails /><Footer /></>} />
          <Route path="/Dog" element={<><NavPets/><Dog /><FooterPets/></>} />
          <Route path="/Cat" element={<><NavPets/><Cat /><FooterPets/></>} />
          <Route path="/AddPets" element={<><NavPets/><AddPets /><FooterPets/></>} />
          <Route path="/Registration" element={<> <Navbar /><Registration/><Footer /></>} />
          <Route path="/Login" element={<> <Navbar /><Login/><Footer /></>} />
          <Route path="/Extinct" element={ <><Navdino/><Extinct/><Footerdino/></>} />
          <Route path="/Petsdetails/*" element={<> <NavPets/><Petsdetails /><FooterPets/></>} />
          <Route path="/Extinctdetails/*" element={<> <Navdino/><Extinctdetails/><Footerdino/></>} />
          <Route path="FirstChardetail/*" element={<> <Navbar /><FirstChardetail /><Footer /></>} />
          <Route path="/Notification" element={<> <Navbar /><Notification /><Footer /></>} />
          <Route path="SearchAnimaldetails/*" element={<> <Navbar /><SearchAnimaldetails /><Footer /></>} />
          

        </Routes>

       
      </BrowserRouter>
    
    
    </div>
    
  );
}

export default App;
