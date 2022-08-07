import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path= '/login' element={<Login />}/>
      <Route path= '/signup' element={<Signup />}/>
      <Route path= '/' element={<Homepage />}/>
    </Routes>    
    </BrowserRouter>
    
  );
}

export default App;
