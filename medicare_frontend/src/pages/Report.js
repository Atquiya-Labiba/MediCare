import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "antd";






function Report() {  
    const[record,setRecords]=useState('') 
    const params=useParams()
    const { user } = useSelector((state) => state.user);
    const userId = user._id
    
    const dispatch = useDispatch();    
    const getRecords = async () => {
        try {            
            dispatch(showLoading());
            const response = await axios.get(`/api/user/viewrecords/${params.id}/${userId}`);            
            dispatch(hideLoading());
            if (response.data.success) {
                setRecords(response.data.data);                
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getRecords();
    }, []);
   
   
    
    return (
        <Layout>
            <h1 className="page-header">Reports</h1>
            <hr />
            <div className="site-card-border-less-wrapper">
                <Card>
                    <div className="additional">
                        <p className="medical_record" style={{fontWeight:"bold", fontSize:"20px"}}>Medical Record:</p> {<img alt="Record" src={record.medical_image}/>}
                        
                    </div>
                </Card>                
            </div>

        </Layout>
    );
}


export default Report;