import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Image } from 'antd';
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
const { Header, Content, Footer } = Layout;

function EditAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [posts, setPosts] = useState([]);         
    const dispatch = useDispatch();
    const getAppointments = async () => {
        try {
           
            dispatch(showLoading());
            const resposne = await axios.get("/api/admin/appointmentinfo");
            dispatch(hideLoading());
            if (resposne.data.success) {
                setAppointments(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);
    const columns = [        
        {
            title: "Doctor",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.docname}
                </span>
            ),
        },
        {
            title: "User",
            dataIndex: "user",
            render: (text, record) => (
                <span>
                    {record.userId}
                </span>
            ),
        },

        {
            title: "Date",
            dataIndex: "created at",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} 
                </span>
            ),
        }, 
        
        {
            title: "Time",
            dataIndex: "created time",
            render: (text, record) => (
                <span>
                   {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        
        {
            title: "Appointment status",
            dataIndex: "status",
            render: (text, record) => (
                <button onClick={()=> console.log(record)}>
                  {"Cancel Appointment"}
                </button>
            ),
        }, 
       
    ];
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
                <Link to="/adddoctor" className="anchor mt-2">
                    <span /> &nbsp; Add Doctor / &nbsp; <span />
                </Link>
                <Link to="/addcabin" className="anchor mt-2">
                    <span /> Add Cabin / &nbsp; <span />
                </Link>
                <Link to="/adddept" className="anchor mt-2">
                    <span /> Add Department /  &nbsp; <span />
                </Link>
                <Link to="/appointmentinfo" className="anchor mt-2">
                    <span /> All Appointments   &nbsp; <span />
                </Link>
            </Breadcrumb>
            <Table columns={columns} dataSource={appointments} />
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
export default EditAppointment;