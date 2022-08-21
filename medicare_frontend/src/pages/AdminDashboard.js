import React from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../components/AdminLayout';
import image2 from "../background/image3.jpg"


function AdminDashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user')
        navigate("/adminlogin")
    }
    return (
        <Layout>           
            <img src={image2} style={{ height: '100%', width: '100%' }} />
        </Layout>
    )
}

export default AdminDashboard;