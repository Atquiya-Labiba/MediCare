import { Breadcrumb, Layout,Button } from 'antd';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
const { Content } = Layout;

const AdminLayout=({children}) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user')
        navigate("/adminlogin")
    }
    return (
        <Layout>
            <Content
                className="site-layout"
                style={{
                    padding: '0 0px',
                    marginTop: 5,
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Link to="/adddoctor" className="anchor mt-2">
                        <span /> &nbsp; Add Doctor / &nbsp; <span />
                    </Link>
                    <Link to="/addcabin" className="anchor mt-2">
                        <span /> Add Cabin / &nbsp; <span />
                    </Link>
                    <Link to="/adddept" className="anchor mt-2">
                        <span /> Add Department   &nbsp; <span />
                    </Link>
                    <Link to="/appointmentinfo" className="anchor mt-2">
                        <span /> All Appointments /   &nbsp; <span />
                    </Link>
                    <Button onClick={logout}>Logout</Button>

                </Breadcrumb>
                <div className="body">{children}</div>
            </Content>
        </Layout>
    )
}

export default AdminLayout;