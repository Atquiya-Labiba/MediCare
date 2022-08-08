import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import AddDoctor from './pages/AddDoctor';
import AddCabin from './pages/AddCabin';
import AddDept from './pages/AddDept';
import BookAppointment from './pages/BookAppointment';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/bookappointment' element={<BookAppointment />} />
        <Route path='/adddoctor' element={<AddDoctor />} />
        <Route path='/adddept' element={<AddDept />} />
        <Route path='/addcabin' element={<AddCabin />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
