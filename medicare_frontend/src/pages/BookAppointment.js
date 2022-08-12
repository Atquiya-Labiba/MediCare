import React, { useState } from 'react';
import { Button, DatePicker, Select, TimePicker, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from '../components/Layout';
import "../layout.css";
import { useSearchParams } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import moment from "moment";
const { Option } = Select;




function BookAppointment() {
    const dispatch = useDispatch();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const { user } = useSelector((state) => state.user);
    const [searchParams] = useSearchParams()
    const doctorname = (searchParams.get('name'))


    const Availabilitycheck = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/availabilitycheck",
                {
                    docname: doctorname,
                    date: date,
                    time: time,
                }
            );
            if (response.data.success) {
                toast.success(response.data.data);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Booking appointment error");
            dispatch(hideLoading());
        }
    };


    const bookNow = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/bookappointment",
                {
                    docname: doctorname,
                    userId: user._id,
                    date: date,
                    time: time,
                }
            );
            if (response.data.success) {
                toast.success(response.data.data);

            }
        } catch (error) {
            console.log(error)
            toast.error("Booking appointment error");
            dispatch(hideLoading());
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
                            <DatePicker format="DD-MM-YYYY"
                                onChange={(value) =>
                                    setDate(moment(value).format('DD-MM-YYYY'))} />
                            <TimePicker
                                format="HH:mm"
                                className="mt-3"
                                onChange={(value) => {
                                    // setIsAvailable(false);
                                    setTime(moment(value).format("HH:mm"));
                                }}
                            />
                            <Button
                                className="primary-button my-2 full-width-button" onClick={Availabilitycheck}
                                htmlType="submit">
                                Check Availability
                            </Button>
                            <Button
                                className="primary-button my-2 full-width-button" onClick={bookNow}
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