
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './Context/Notes/noteState';
import Alert from './Components/Alert';

import Login from './Components/Login';
import SignUpNewUser from './Components/SignUpNewUser';
import { useState } from 'react';


function App() {
  const [alert, setalert] = useState(null);
 
  let changeAlert = (message, type) => {
    setalert({
      msg: message,
      type: type

    })

    setTimeout(() => {
      setalert(null);
    }, 2000);

  }

  return (
      
    <>
      {/* NoteState is used for contextAPI */}
      <NoteState>                                        
      <BrowserRouter>
      <Navbar/>
      <Alert  alert={alert}/>
      <div className="container">
      <Routes>                             
          <Route exact path="/" element={<Home changeAlert={changeAlert}/>}/>
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/LognIn" element={<Login changeAlert={changeAlert}/>} />
          <Route exact path="/SignUp" element={<SignUpNewUser changeAlert={changeAlert}/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
   
    </>

  );
}

export default App;
