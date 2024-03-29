import React from "react";
import { Button, Form, Input, Radio } from "antd";
import axios from "axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";
import { Layout } from "antd"
const { Header, Footer } = Layout


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/", values);
            dispatch(hideLoading());
            if (response.status === 200) {
                dispatch(setUser(response.data.data));
                toast("Redirecting to Home Page");
                localStorage.setItem("user", JSON.stringify(response.data.data));
                navigate("/Home")
            } else {
                toast.error("Login error");
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <Header>
                <h1 style={{color:"white", paddingTop: "5px"}}>MediCare</h1>
            </Header>
            <div className="authentication">
                <div className="authentication-form card p-3">
                    <h1 className="card-title">Login</h1>
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
                        <Button
                            className="primary-button my-2 full-width-button"
                            htmlType="submit">
                            Login
                        </Button>
                        <Link to="/signup" className="anchor mt-2" style={{ marginLeft: 90 }}>
                            Not a Member? Signup
                        </Link>
                        <br></br>
                        <Link to="/adminlogin" className="anchor mt-2" style={{ marginLeft: 150 }}>
                            Admin
                        </Link>
                    </Form>
                </div>
            </div>
            <Footer style={{ height: "100%" }}></Footer>
        </Layout>
    );
}

export default Login