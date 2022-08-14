import { Breadcrumb} from 'antd';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Layout from '../components/AdminLayout';


function AdminDashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user')
        navigate("/adminlogin")
    }
    return (
        <Layout>
            
        </Layout>
    )
}

export default AdminDashboard;