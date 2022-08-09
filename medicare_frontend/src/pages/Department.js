import { Breadcrumb, Layout, Menu, Image } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const { Header, Content } = Layout;

const Department = () => {
    const onFinish = async (values) => {
        try {
            const response = await axios.get("/api/admin/department", values);
            if (response.status === 201) {
                toast.success("Success")
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                }}
            >
                <div className="logo" />
                <Menu
                    theme='dark'
                    mode="horizontal"
                    items={new Array(1).fill(null).map((_, index) => ({
                        key: String(index + 1),
                        label: `Logout`,
                    }))}

                />
            </Header>
            <Content
                className="site-layout"
                style={{
                    padding: '0 0px',
                    marginTop: 64,
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Link to="/" className="anchor mt-2">
                        <span /> &nbsp; Home &nbsp; &nbsp; <span />
                    </Link>
                    <Link to="/bookappointment" className="anchor mt-2">
                        <span /> Book Appointment &nbsp; &nbsp; <span />
                    </Link>
                    <Link to="/addcabin" className="anchor mt-2">
                        <span /> Cabin &nbsp; &nbsp; <span />
                    </Link>
                    <Link to="/adddept" className="anchor mt-2">
                        <span /> Profile &nbsp; &nbsp; <span />
                    </Link>
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 380,
                    }}
                >
                </div>
            </Content>
        </Layout>
    );
}

export default Department;