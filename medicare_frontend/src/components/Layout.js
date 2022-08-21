import React from "react";
import "../layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function Layout({ children }) {
    const { user } = useSelector((state) => state.user);
    const id = user._id

    const userMenu = [
        {
            name: "Home",
            path: "/Home",
            icon: "ri-home-line",
        },
        {
            name: "Book Appointment",
            path: "/getdoctors",
            icon: "ri-hospital-line",
        },
        {
            name: "Appointments",
            path: `/getappointments/${id}`,
            icon: "ri-bill-line",
        },
        {
            name: "Profile",
            path: `/profile/${id}`,
            icon: "ri-account-circle-line",
        },
        {
            name: "Department",
            path: `/department`,
            icon: "ri-file-list-3-line",
        },
        {
            name: "Cabin",
            path: `/cabin`,
            icon: "ri-file-list-3-line",
        },

    ];

    const menuToBeRendered = userMenu
    const navigate = useNavigate();    

    return (
        <div className="main">
            <div className="d-flex layout">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1 className="logo">MediCare</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            return <div className="d-flex menu-item">
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        })}

                        <div className="d-flex menu-item" onClick={() => {
                                localStorage.removeItem('user')
                                navigate("/") }}>
                            <i className="ri-logout-circle-r-line"></i>
                            <Link to="/">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header" >
                        <h1>Welcome to MediCare</h1>                        
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    );


}

export default Layout;