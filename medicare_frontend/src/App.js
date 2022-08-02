import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
    <Toaster position ="top-center" reverseOrder={false}/>    
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
