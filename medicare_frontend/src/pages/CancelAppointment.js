import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import Layout from '../components/AdminLayout';


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
                <button onClick={() => console.log(record)}>
                    {"Cancel Appointment"}
                </button>
            ),
        },

    ];
    return (
        <Layout>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    );

}
export default EditAppointment;