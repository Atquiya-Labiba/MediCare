import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from '../components/Layout';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";



function SelectDoctor() {
  const onChange = (filters) => {
    console.log('params', filters);
  };
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Link to={'/bookappointment?name=' + record.name}>{text}</Link>
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
      filters: [
        {
          text: 'Cardiology',
          value: 'Cardiology',
        },
        {
          text: 'Dermatology',
          value: 'Dermatology',
        },
        {
          text: 'Neonatology',
          value: 'Neonatology',
        },
        {
          text: 'Nutrition',
          value: 'Nutrition',
        },
        {
          text: 'ENT & Head Neck Surgery',
          value: 'ENT & Head Neck Surgery',
        },
        {
          text: 'Neurology',
          value: 'Neurology',
        },
        {
          text: 'Orthopedics',
          value: 'Orthopedics',
        },
        {
          text: 'Pediatrics',
          value: 'Pediatrics',
        },
      ],
      onFilter: (value, record) => record.department.indexOf(value) === 0,
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Select a doctor </h1>
      <hr />

      <Table columns={columns} dataSource={doctors} onChange={onChange} />
    </Layout>
  );
}

export default SelectDoctor;