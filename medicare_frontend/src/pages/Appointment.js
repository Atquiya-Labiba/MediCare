import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const { user } = useSelector((state) => state.user);
    const id=user._id          
    const dispatch = useDispatch();
    const getAppointments = async () => {
        try {
            console.log(id)
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