import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Input, Form, Select } from 'antd';
const { Option } = Select;






function UploadRecord() {
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const { user } = useSelector((state) => state.user);
    const id = user._id
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('api/user/upload', formData, config)
            setImage(data)

        } catch (error) {
            console.error(error)

        }
    }

    const onFinish = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(`/api/user/updaterecord/${id}`, { name: name, medical_image: image, type: type });
            dispatch(hideLoading());
            if (response.status === 200) {
                toast.success("Success")
                navigate(`/getrecords/${id}`)
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    const handleType = (value) => {
        switch (value) {
            case 'Tests':
                setType("Tests")
                return;

            case 'Prescription':
                setType("Prescription")
                return;

            case 'X-Ray':
                setType("X-Ray")
                return;
        }
    };

    return (
        <Layout>
            <h1>Upload Your Records</h1>
            <div className="authentication">
                <div className="authentication-form card p-3">
                    <h1 className="card-title">Edit Information</h1>
                    <Form layout="horizontal" onFinish={onFinish}>
                        <Form.Item label="Name" name="name">
                            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </Form.Item>
                        <Form.Item name="type" label="Record Type" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select a type"
                                onChange={handleType}
                                allowClear
                            >
                                <Option value="Tests">Tests</Option>
                                <Option value="Prescription">Prescription</Option>
                                <Option value="X-Ray">X-Ray</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='Choose file' name='medical_record'>
                            <Input type='file' onChange={uploadFileHandler} /></Form.Item>
                        <Button
                            className="primary-button my-2 full-width-button"
                            htmlType="submit">
                            Submit
                        </Button>
                    </Form>

                </div>
            </div>
        </Layout >
    );
}

export default UploadRecord;