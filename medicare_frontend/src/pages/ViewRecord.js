import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "antd";
import { Table } from "antd";





function ViewRecord() {
    const onChange = (filters) => {
        console.log('params', filters);
    };
    const [medrecords, setRecords] = useState([]);
    const [rectype, setType] = useState([]);
    const { user } = useSelector((state) => state.user);
    const id = user._id
        
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
            title: "Record Type",
            dataIndex: "type",
            filters: [
                {
                    text: 'Prescription',
                    value: 'Prescription',
                },
                {
                    text: 'X-Ray',
                    value: 'X-Ray',
                },
                {
                    text: 'Tests',
                    value: 'Tests',
                },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,

        },
        {
            title: "Image",
            dataIndex: "medical_image",
            render: (text, record) => (
                <Link to={`/viewimage/${record._id}`}>{"View"}</Link>

            ),
        },
    ];
    return (
        <Layout>
            <h1 className="page-header">Medical Records </h1>
            <hr />
            <div className="site-card-border-less-wrapper">
                <Table columns={columns} dataSource={user.medical_records} onChange={onChange} />
            </div>

        </Layout>
    );
}


export default ViewRecord;