import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Table, Tabs } from "antd";
const { TabPane } = Tabs

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
            filters: [
                {
                    text: 'Available',
                    value: 'Available',
                },
                {
                    text: 'Not Available',
                    value: 'Not Available',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a, b) => parseInt(a.price) - parseInt(b.price),
        },

    ];

    return (
        <Layout>
            <h1 className="page-header">Cabin </h1>
            <hr />
            <Tabs >
                <TabPane tab="Contact Number: 16630" >
                </TabPane>
            </Tabs>
            <Table columns={columns} dataSource={cabins} />
        </Layout>

    );
}

export default Cabin;