import React from 'react';
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";




function AddDept() {
    const onFinish = async (values) => {
        try {
            const response = await axios.post("/api/admin/adddept", values);
            if (response.status === 201) {
                toast.success("Success")
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="authentication">
            <div className="authentication-form card p-3">
                <h1 className="card-title">Department Information</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input placeholder="Description" />
                    </Form.Item>
                    <Form.Item label="Facility" name="facility">
                        <Input placeholder="Facility" />
                    </Form.Item>

                    <Button
                        className="primary-button my-2 full-width-button"
                        htmlType="submit">
                        Add Department Information
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddDept;