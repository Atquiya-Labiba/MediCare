import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import axios from "axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";


function AdminLogin() {    
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/admin/adminlogin", values);
            dispatch(hideLoading());
            if (response.status === 200) {
                dispatch(setUser(response.data.data));
                toast.success("Login success");                
                localStorage.setItem("user", JSON.stringify(response.data.data));
                navigate("/admindashboard")
            } else {
                toast.error("Login error");
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="authentication">
            <div className="authentication-form card p-3">
                <h1 className="card-title">Login</h1>
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
                        Login
                    </Button>                    
                </Form>
            </div>
        </div>
    );
}

export default AdminLogin