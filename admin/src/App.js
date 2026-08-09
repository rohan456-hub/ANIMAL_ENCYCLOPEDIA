import React from "react";
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Animal from "./Animal/Animal";
import Navigation from "./Navigation/Navigation";
import Animaldetails from "./Animaldetail/Animaldetail";
import Collection from "./collection/collection";
import AnimalCollection from "./AnimalCollection";
import UserData from "./UserData/UserData";
import Login from "./Login/Login";
import Petsdata from "./Petsdata/Petsdata";
import Petsdetails from "./Petsdetails/Petsdetails";
import Message from "./Message/Message";


function App() {
  return (
  <div >
      <BrowserRouter>
      <Routes>
          <Route index element={<Login/>} />
          {/* <Route path='/Registration' element={<Registration/>}/> */}
          <Route path='/Login' element={<Login/>}/>
          <Route path="/" element={<Navigation/>}>
          <Route path="/Animal" element={<Animal/>} />
          <Route path="Animaldetails/*" element={<Animaldetails/>}/>
          {/* <Route path="/Collection" element={<Collection/>} /> */}
          <Route path="/AnimalCollection/*" element={<AnimalCollection/>} />
          <Route path="/UserData" element={<UserData/>} />
          <Route path="/Petsdata" element={<Petsdata/>} />
          <Route path="/Petsdetails/*" element={<Petsdetails/>} />
          <Route path="/Message" element={<Message/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
