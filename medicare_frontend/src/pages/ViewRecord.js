import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Card } from "antd";





function ViewRecord() {
    const [medrecords, setRecords] = useState([]);
    const [rectype, setType] = useState([]);
    const { user } = useSelector((state) => state.user);
    const id = user._id
    // const dispatch = useDispatch();
    
    // const getRecords = async () => {
    //     try {
    //         dispatch(showLoading());
    //         const response = await axios.get(`/api/user/getrecords/${id}`);
    //         dispatch(hideLoading());
    //         if (response.data.success) {
    //             setRecords(response.data.data);
    //         }
    //     } catch (error) {
    //         dispatch(hideLoading());
    //     }
    // };

    // useEffect(() => {
    //     getRecords();
    // }, []);
   
    // const getRecordType = async () => {
    //     try {
    //         dispatch(showLoading());
    //         const response = await axios.get(`/api/user/recordtype/${id}`);
    //         dispatch(hideLoading());
    //         if (response.data.success) {
    //             setType(response.data.data);
    //         }
    //     } catch (error) {
    //         dispatch(hideLoading());
    //     }
    // };

    // useEffect(() => {
    //     getRecordType();
    // }, []);
    return (
        <Layout>
            <h1 className="page-header">Medical Records </h1>
            <hr />
            <div className="site-card-border-less-wrapper">
                <Card>
                    <div className="additional">
                        <p className="medical_record">Medical Record: {<img alt="Record" src={user.medical_record}/>}</p>
                        <p className="record_type">Type: {user.record_type}</p>
                    </div>
                </Card>
            </div>

        </Layout>
    );
}


export default ViewRecord;