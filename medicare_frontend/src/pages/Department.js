import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";

function Department() {
    const [departments, setDept] = useState([]);
    const dispatch = useDispatch();
    const getDept = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get("/api/user/department");
            dispatch(hideLoading());
            if (resposne.data.success) {
                setDept(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getDept();
    }, []);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <Link to={'/getdoctors?name=' + record.name}>{text}</Link>
            ),
        },

        {
            title: "Description",
            dataIndex: "description",
            render: (text, record) => (
                <span>
                    {record.description}
                </span>
            ),
        },
        {
            title: "Facility",
            dataIndex: "facility",
            render: (text, record) => (
                <span>
                    {record.facility}
                </span>
            ),
        },
    ];

    return (
        <Layout>
            <h1 className="page-header">Department </h1>
            <hr />
            <Table columns={columns} dataSource={departments} />
        </Layout>

    );
}

export default Department;