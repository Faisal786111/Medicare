import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table } from "antd";
import Translation from "../Translation/Data.json";

const Appointments = () => {

  //translation
  const[language , setLanguage] = useState("english")
  const[content , setContent] = useState({})
  useEffect(()=>{
    if(language=="english"){
      setContent(Translation.english)
    }else if(language=="hindi"){
      setContent(Translation.hindi)
    }
  })


  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                <option>english</option>
                <option>hindi</option>
      </select>
      <div className="backimg_1" style={{ minHeight: '100%' }}>
        <h1 className="text-center">{'<<<'}{content.appoinmentHeading}{'>>>'}</h1>
        <Table columns={columns} dataSource={appointments} bordered style={{ border: '1px solid black', margin: '5px 10px', backgroundColor: 'lightgray' }} />
      </div>
    </Layout>
  );
};

export default Appointments;
