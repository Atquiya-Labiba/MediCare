import React from 'react';
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import Layout from '../components/Layout';
const { Option } = Select;


function UpdateProfile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const id = user._id
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.put(`/api/user/updateprofile/${id}`, values);
            dispatch(hideLoading());
            if (response.status === 200) {
                toast.success("Success")
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <h1 className="page-header">Edit Profile</h1>
            <hr />
            <div className="authentication">
                <div className="authentication-form card p-3">
                    <h1 className="card-title">Edit Information</h1>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Name" name="name">
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item label="Age" name="age">
                            <Input placeholder="Age" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
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
                            Update
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>
    );
}

export default UpdateProfile;