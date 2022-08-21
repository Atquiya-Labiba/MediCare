import React from 'react';
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { Layout } from "antd"
const { Header, Footer } = Layout
const { Option } = Select;



function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/signup", values);
            dispatch(hideLoading());
            if (response.status === 201) {
                navigate("/")
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <Header>
                <h1 style={{ color: "white", paddingTop: "5px" }}>MediCare</h1>
            </Header>
            <div className="authentication">
                <div className="authentication-form card p-3">
                    <h1 className="card-title">Signup</h1>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Name" name="name">
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input placeholder="Password" type="password" />
                        </Form.Item>
                        <Form.Item label="Age" name="age">
                            <Input placeholder="Age" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select your gender">
                                <Option value="Female">Female</Option>
                                <Option value="Male">Male</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Contact no" name="contact_no">
                            <Input placeholder="Contact_no" />
                        </Form.Item>

                        <Button
                            className="primary-button my-2 full-width-button"
                            htmlType="submit">
                            Sign-Up
                        </Button>
                        <Link to="/" className="anchor mt-2">
                            Already have an account? Login Here
                        </Link>
                    </Form>
                </div>
            </div>
            <Footer style={{ height: "100%" }}></Footer>
        </Layout>
    );
}

export default Signup;