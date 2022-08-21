import { Breadcrumb, Tabs, Button } from 'antd';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../layout.css";



const AdminLayout = ({ children }) => {
    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user')
        navigate("/")
    }
    const adminMenu = [
        {
            name: "Dashboard",
            path: "/admindashboard",
            icon: "ri-home-line",
        },
        {
            name: "Add Doctor",
            path: "/adddoctor",
            icon: "ri-user-add-fill",
        },
        {
            name: "Add Department",
            path: `/adddept`,
            icon: "ri-add-circle-fill",
        },
        {
            name: "Add Cabin",
            path: `/addcabin`,
            icon: "ri-add-box-line",
        },
        {
            name: "All Appointments",
            path: `/appointmentinfo`,
            icon: "ri-play-list-add-line",
        },
        

    ];
    const menuToBeRendered = adminMenu

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
                            navigate("/")
                        }}>
                            <i className="ri-logout-circle-r-line"></i>
                            <Link to="/">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header" >
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
        // <Layout>
        //     <Content
        //         className="site-layout"
        //         style={{
        //             padding: '0 0px',
        //             marginTop: 5,
        //         }}
        //     >
        //         <Breadcrumb
        //             style={{
        //                 margin: '16px 0',
        //             }}
        //         >
        //             <Link to="/admindashboard" className="anchor mt-2">
        //                 <span /> &nbsp; Dashboard /  <span />
        //             </Link>
        //             <Link to="/adddoctor" className="anchor mt-2">
        //                 <span /> &nbsp; Add Doctor / &nbsp; <span />
        //             </Link>
        //             <Link to="/addcabin" className="anchor mt-2">
        //                 <span /> Add Cabin / &nbsp; <span />
        //             </Link>
        //             <Link to="/adddept" className="anchor mt-2">
        //                 <span /> Add Department /   &nbsp; <span />
        //             </Link>
        //             <Link to="/appointmentinfo" className="anchor mt-2">
        //                 <span /> All Appointments    &nbsp; <span />
        //             </Link>
        //             <Button onClick={logout}>Logout</Button>

        //         </Breadcrumb>                
        //         <div className="body" style={{ height: '100%', width: '100%' }}>{children}
        //         </div>
        //     </Content>
        // </Layout>
    )
}

export default AdminLayout;