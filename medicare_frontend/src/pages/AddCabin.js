import React from 'react';
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from '../components/AdminLayout';
const { Option } = Select;


function AddCabin() {
    const onFinish = async (values) => {
        try {
            const response = await axios.post("/api/admin/addcabin", values);
            if (response.status === 200) {
                toast.success("Success")
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="authentication">
                <div className="authentication-form card p-3">
                    <h1 className="card-title">Cabin Information</h1>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Type" name="type">
                            <Input placeholder="Type" />
                        </Form.Item>
                        <Form.Item label="Price" name="price">
                            <Input placeholder="Price" />
                        </Form.Item>
                        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select cabin status">
                                <Option value="Available">Available</Option>
                                <Option value="Not Available">Not available</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Phone" name="phn_num">
                            <Input placeholder="Contact Number" />
                        </Form.Item>
                        <Button
                            className="primary-button my-2 full-width-button"
                            htmlType="submit">
                            Add Cabin Info
                        </Button>
                    </Form>
                </div>
            </div>

        </Layout>
    );
}

export default AddCabin;