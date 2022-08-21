import React from 'react';
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from '../components/AdminLayout';
const { TextArea } = Input;


function AddDept() {
    const onFinish = async (values) => {
        try {
            const response = await axios.post("/api/admin/adddept", values);
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
                    <h3 className="card-title">Department Info</h3>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Name" name="name">
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <TextArea placeholder="Add Description"
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 10,
                                }} />
                        </Form.Item>
                        <Form.Item label="Facility" name="facility">
                            <TextArea placeholder=" Add Facility"
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 10,
                                }} />
                        </Form.Item>

                        <Button
                            className="primary-button my-2 full-width-button"
                            htmlType="submit">
                            Add Department Information
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>
    );
}

export default AddDept;