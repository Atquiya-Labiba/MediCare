import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select, TimePicker, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from '../components/Layout';
import "../layout.css";
import { useParams, useNavigate, Link } from "react-router-dom";
const { Option } = Select;



function BookAppointment() {

    const onFinish = async (values) => {
        try {
            const response = await axios.get("/api/user/bookappointment", values);
            if (response.status === 201) {
                toast.success("Success")
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div>
                <h1>Make an Appointment</h1>
                <hr />
                <Row>
                    <Col span={8} sm={24} xs={24} lg={8}>
                        <h1 className='normal-text'>
                        </h1>

                        <div className="d-flex flex-column pt-2 mt-2">
                            <DatePicker format="DD-MM-YYY" />
                            <TimePicker.RangePicker format="HH: mm" className='mt-3' />
                            <Button
                                className="primary-button my-2 full-width-button"
                                htmlType="submit">
                                Check Availability
                            </Button>
                            <Button
                                className="primary-button my-2 full-width-button"
                                htmlType="submit">
                                Book Now
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}
export default BookAppointment;