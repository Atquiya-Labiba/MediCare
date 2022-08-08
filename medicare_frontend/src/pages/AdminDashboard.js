import { Breadcrumb, Layout, Menu, Image } from 'antd';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const AdminDashboard = () => (
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
                <Link to="/adddoctor" className="anchor mt-2">
                    <span /> &nbsp; Add Doctor / &nbsp; <span />
                </Link>
                <Link to="/addcabin" className="anchor mt-2">
                    <span /> Add Cabin / &nbsp; <span />
                </Link>
                <Link to="/adddept" className="anchor mt-2">
                    <span /> Add Department   &nbsp; <span />
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

export default AdminDashboard;