import React from "react";
import "../layout.css";
import { Link} from "react-router-dom";


function Layout({ children }) {

    const userMenu = [
        {
            name: "Home",
            path: "/Home",
            icon: "ri-home-line",
        },
        {
            name: "Appointments",
            path: "/getdoctors",
            icon: "ri-file-list-line",
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "ri-hospital-line",
        }
    ];

    const menuToBeRendered = userMenu

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
                        MediCare
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    );


}

export default Layout;