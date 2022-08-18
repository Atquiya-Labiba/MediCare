import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import Appointment from './pages/Appointment';
import AddDoctor from './pages/AddDoctor';
import AddCabin from './pages/AddCabin';
import AddDept from './pages/AddDept';
import ApptInfo from './pages/ApptInfo';
import BookAppointment from './pages/BookAppointment';
import { Toaster } from "react-hot-toast";
import Department from './pages/Department';
import SelectDoctor from './pages/SelectDoctor';
import Profile from './pages/PatientProfile';
import Cabin from './pages/Cabin';
import AdminLogin from './pages/AdminLogin';
import UpdateProfile from './pages/Updateprofile';



function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/Home' element={<Homepage />} />
        <Route path='/bookappointment' element={<BookAppointment />} />
        <Route path='/getdoctors' element={<SelectDoctor />} />
        <Route path='/getappointments/:id' element={<Appointment />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/cabin' element={<Cabin/>} />
        <Route path='/department' element={<Department />} />
        <Route path='/updateprofile/:id' element={<UpdateProfile />} />        
        {/* Admin panel */}
        <Route path='/adddoctor' element={<AddDoctor />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/adddept' element={<AddDept />} />
        <Route path='/addcabin' element={<AddCabin />} />        
        <Route path='/appointmentinfo' element={<ApptInfo />} />        
       
      </Routes>
    </BrowserRouter>

  );
}

export default App;
