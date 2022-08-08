import React from 'react';
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";



function AddDoctor() {    
    const onFinish = async (values) => {
        try {
            const response = await axios.post("/api/admin/adddoctor", values);
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
                <h1 className="card-title">Doctor Information</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Department" name="department">
                        <Input placeholder="Department" />
                    </Form.Item>
                    <Form.Item label="Degree" name="degree">
                        <Input placeholder="Degree"  />
                    </Form.Item>
                    <Button
                        className="primary-button my-2 full-width-button"
                        htmlType="submit">
                        Add Doctor Information
                    </Button>                    
                </Form>
            </div>
        </div>
    );
}

export default AddDoctor;