import React from "react";
import "../layout.css";
import { Link,useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";
import { Button } from "antd";


function Layout({ children }) {
    const { user } = useSelector((state) => state.user);
    const id=user._id 

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
            icon: "ri-file-list-3-line",
        },
        {
            name: "Profile",
            path: `/profile/${id}`,
            icon: "ri-file-list-3-line",
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
    const logout = () =>{
        localStorage.removeItem('user')
        navigate("/")
    }

    return (
        <div className="main">
            <div className="d-flex layout">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1>Menu</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            return <div className="d-flex menu-item">
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        })}
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        MediCare /
                        <Button onClick={logout}>Logout</Button>
                        

                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    );


}

export default Layout;