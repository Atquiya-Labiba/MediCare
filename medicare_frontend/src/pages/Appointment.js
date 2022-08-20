import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import { DeleteOutlined } from '@ant-design/icons'
import moment from "moment";

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const { user } = useSelector((state) => state.user);
    const id = user._id
    const dispatch = useDispatch();
    const getAppointments = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get(`/api/user/getappointments/${id}`);
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

    const cancelappointment = async (record) => {
        try {
            dispatch(showLoading());
            const response = await axios.delete(`/api/user/deleteappointments/${record}`);
            if (response.data.success) {
                toast.success("Your Appointment is cancelled");
            }
        } catch (error) {
            toast.error("Could not cancel appointment!");
            dispatch(hideLoading());
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (text, record) => (
                <span>
                    {record._id}
                </span>
            ),
        },
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
            title: "Action",
            dataIndex: "_id",
            render: (record) => (
                <DeleteOutlined
                    onClick={() => cancelappointment(record)
                    }>
                </DeleteOutlined>

            ),
        },

    ];
    return (
        <Layout>
            <h1 className="page-header">Appointments </h1>
            <hr />
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    );
}


export default Appointment;