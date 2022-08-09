import React from 'react';
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";



function BookAppointment() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await axios.post("/api/user/bookappointment", values);
            if (response.status === 201) {
                toast.success("Success")
                navigate("/login")
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="authentication">
            <div className="authentication-form card p-3">
                <h1 className="card-title">Signup</h1>
                <Form layout="horizontal" onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password" />
                    </Form.Item>

                    <Button
                        className="primary-button my-2 full-width-button"
                        htmlType="submit">
                        Sign-Up
                    </Button>
                    <Link to="/login" className="anchor mt-2">
                        Already have an account? Login Here
                    </Link>
                </Form>
            </div>
        </div>
    );
}

export default BookAppointment;