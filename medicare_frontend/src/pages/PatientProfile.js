import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card } from 'antd';
import { Form } from 'react-bootstrap';




function Profile() {
    const [patients, setPatients] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState('')
    const { user } = useSelector((state) => state.user);
    const id = user._id
    const dispatch = useDispatch();
    const getPatients = async () => {
        try {
            dispatch(showLoading());            
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

    return (
        <Layout>
            <div className="site-card-border-less-wrapper">
                <Card
                    title="Profile"
                    bordered={false}
                    style={{
                        width: 300,
                    }}
                >
                    <div className="additional">
                        <p className="name">Name: {user.name}</p>
                        <p className="age">Age: {user.age}</p>
                        <p className="gender">Gender: {user.gender}</p>
                        <p className="email">Email: {user.email}</p>
                        <p className="contact_no">Contact: {user.contact_no}</p>
                        <p className="medicalrecord">Medical Record                            
                        </p>
                        <Link to={'/upload'}>
                        <Button
                            className="primary-button my-2 full-width-button"
                            htmlType="button">
                            Upload Medical Record                            
                        </Button>
                        </Link> 
                        <Link to={`/getrecords/${id}`}>                      
                        <Button
                            className="primary-button my-2 full-width-button"
                            htmlType="button">
                            View Medical Records
                        </Button>
                        </Link> 
                        <Link to={`/updateprofile/${id}`}>
                            <button
                                className="primary-button my-2 full-width-button"
                                type="button">
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </Card>
            </div>
        </Layout >
    );
}

export default Profile;