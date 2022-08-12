import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import {Link} from "react-router-dom";
import axios from "axios";
import { Table } from "antd";


function SelectDoctor() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/getdoctors");
      dispatch(hideLoading());
      if (resposne.data.success) {
        setDoctors(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  
  useEffect(() => {
    getDoctorsData();
  }, []);
  const columns = [
    {
      title: "Name",      
      dataIndex: "name",
      render: (text, record) => (
        <Link to={'/bookappointment?name=' +record.name}>{text}</Link>
        // <span>
        //   {record.name} 
        // </span>
      ),
    }, 
    
    {
        title: "Degree",
        dataIndex: "degree",
        render: (text, record) => (
          <span>
            {record.degree} 
          </span>
        ),
      },
      {
        title: "Department",
        dataIndex: "department",
        render: (text, record) => (
          <span>
            {record.degree} 
          </span>
        ),
      },
  ];
  return (
    <Layout>
      <h1 className="page-header">Select a doctor </h1>
      <hr />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default SelectDoctor;