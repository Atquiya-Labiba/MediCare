import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row, Tabs} from 'antd';
const { TabPane } = Tabs;



function Profile() {
    const [patients, setPatients] = useState([]);
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
            <h1 className="page-header">Profile </h1>
            <hr />
            <Tabs defaultActiveKey="1" >
                <TabPane tab={<Link to="/upload">Upload Medical Records</Link>} key="1">
                </TabPane>
                <TabPane tab={<Link to={`/getrecords/${id}`}>View Records</Link>} key="2">
                </TabPane>
                <TabPane tab={<Link to={`/updateprofile/${id}`}>Edit Profile</Link>} key="3">
                </TabPane>
            </Tabs>

            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <Card style={{
                            width: 400,
                            height: 500,
                            backgroundImage: 'linear-gradient(#737373,#bfbfbf, white)',
                            fontSize: "130% ",
                            float: "left"
                        }}

                            title="Personal Information" bordered={false}>
                            <strong className="name">Name <br /></strong> {user.name}
                            <br /><br />
                            <strong className="age">Age <br /></strong> {user.age} <br /><br />
                            <strong className="gender">Gender <br /></strong>{user.gender} <br /><br />
                            <strong className="email">Email <br /></strong> {user.email} <br /><br />
                            <strong className="contact_no">Contact <br /></strong> {user.contact_no}
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout >
    );
}

export default Profile;