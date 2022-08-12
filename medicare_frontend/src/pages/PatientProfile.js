import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";




function Profile() {
    const [patients, setPatients] = useState([]);
    const { user } = useSelector((state) => state.user);
    const id = user._id
    const dispatch = useDispatch();
    const getPatients = async () => {
        try {
            dispatch(showLoading());
            console.log(id)
            const resposne = await axios.get(`/api/user/profile/${id}`);
            dispatch(hideLoading());
            if (resposne.data.success) {
                setPatients(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getPatients();
    }, []);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (                
                <span>
                {record.name} 
                </span>
            ),
        },

        {
            title: "Age",
            dataIndex: "age",
            render: (text, record) => (
                <span>
                    {record.age}
                </span>
            ),
        },
        {
            title: "Gender",
            dataIndex: "gender",
            render: (text, record) => (
                <span>
                    {record.gender}
                </span>
            ),
        },
        {
            title: "Prescription",
            dataIndex: "prescription",
            render: (text, record) => (                
                <span>
                {record.name} 
                </span>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (text, record) => (                
                <span>
                {record.email} 
                </span>
            ),
        },
        {
            title: "Contact No",
            dataIndex: "contact number",
            render: (text, record) => (                
                <span>
                {record.contact_no} 
                </span>
            ),
        },
    ];
    return (
        <Layout>

            <h1 className="page-header">Profile </h1>
            <hr />
            <Table columns={columns} dataSource={patients} />
        </Layout>
    );
}

export default Profile;