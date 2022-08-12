import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";

function Cabin() {
    const [cabins, setCabin] = useState([]);
    const dispatch = useDispatch();
    const getCabin = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get("/api/user/cabin");
            dispatch(hideLoading());
            if (resposne.data.success) {
                setCabin(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getCabin();
    }, []);
    const columns = [
        {
            title: "Type",
            dataIndex: "type", 
            sorter: (a, b) => a.type.localeCompare(b.type),            
            render: (text, record) => (                
                <span>
                    {record.type}
                </span>
            ),
        },

        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => (
                <span>
                    {record.status}
                </span>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => a.price.localeCompare(b.price),           
            render: (text, record) => (
                <span>
                    {record.price}
                </span>
            ),
        },

        {
            title: "Contact Info",
            dataIndex: "phn_num",                     
            render: (text, record) => (
                <span>
                    {record.phn_num}
                </span>
            ),
        },
    ];

    return (
        <Layout>
            <h1 className="page-header">Cabin </h1>
            <hr />
            <Table columns={columns} dataSource={cabins} />
        </Layout>

    );
}

export default Cabin;