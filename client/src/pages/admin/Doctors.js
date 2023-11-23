import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";
import Translation from '.././././../Translation/Data.json';

const Doctors = () => {

  //translation
  const [language, setLanguage] = useState("english")
  const [content, setContent] = useState({})
  useEffect(() => {
    if (language == "english") {
      setContent(Translation.english)
    } else if (language == "hindi") {
      setContent(Translation.hindi)
    }
  })

  const [doctors, setDoctors] = useState([]);

  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Reject Doctor...
  const RejectDoctor = async (record) => {
    try {
      console.log(doctors);
      const res = await axios.post("/api/v1/doctor/rejectDoctor",
        { doctorId: record._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.alert("Doctor Deleted Successfully.");
        window.location.reload();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.alert("Doctor Successfully approved.");
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
              style={{ width: "100px", cursor: "pointer" }}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => RejectDoctor(record)} style={{ width: "100px", cursor: "pointer" }}>Reject</button>
          )}
        </div>
      ),
    },
  ];


  return (
    <Layout>
      <div className="backimg_1" style={{ minHeight: '100%' }}>
        <h1 className='text-center'>{'<<<'}{content.drpage}{'>>>'}</h1>
        <Table columns={columns} dataSource={doctors} bordered style={{ border: '1px solid black', margin: '5px 10px', backgroundColor: 'lightgray' }} />
      </div>
    </Layout>
  );
};

export default Doctors;