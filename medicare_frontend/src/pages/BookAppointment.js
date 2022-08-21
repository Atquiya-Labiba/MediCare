import React, { useState } from 'react';
import { Button, DatePicker, TimePicker, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from '../components/Layout';
import "../layout.css";
import { useSearchParams } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import moment from "moment";


function BookAppointment() {
    const dispatch = useDispatch();
    const [isAvailable, setIsAvailable] = useState(false);
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
                toast.success("Slot Available");
                setIsAvailable(true);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {            
            toast.error("Slot not Available");
            dispatch(hideLoading());
        }
    };


    const bookNow = async () => {
        setIsAvailable(false);
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
                toast.success("Appointment Booked");

            }
        } catch (error) {
            console.log(error)
            toast.error("Could not book an appointment");
            dispatch(hideLoading());
        }
    };
    return (
        <Layout>
            <div>
                <h1 className="page-header">Make An Appointment </h1>
                <hr />
                <Row>
                    <Col span={8} sm={24} xs={24} lg={8}>
                        <h1 className='normal-text'>
                        </h1>

                        <div className="d-flex flex-column pt-2 mt-2">
                            <DatePicker format="DD-MM-YYYY"
                                onChange={(value) => {
                                    setDate(moment(value).format('DD-MM-YYYY'));
                                    setIsAvailable(false);
                                }} />
                            <TimePicker
                                format="HH:mm"
                                className="mt-3"
                                onChange={(value) => {
                                    setIsAvailable(false);
                                    setTime(moment(value).format("HH:mm"));
                                }}
                            />
                            <Button
                                className="primary-button my-2 full-width-button" onClick={Availabilitycheck}>
                                Check Availability
                            </Button>
                            {isAvailable && (<Button
                                className="primary-button my-2 full-width-button" onClick={bookNow}>
                                Book Now
                            </Button>)}
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}
export default BookAppointment;