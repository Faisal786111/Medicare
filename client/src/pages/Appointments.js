import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table } from "antd";
import Translation from "../Translation/Data.json";

const Appointments = () => {

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

  const [appointmentData, setAppointmentData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  
  
  // app1,app2,app3
  //   const doct = doctorModel.find(app1.docId)


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

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/v1/user/user-appointments", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }); // Update the API endpoint
  //       const data = await response.json();

  //       // Assuming the API returns an array of objects with properties: appointmentDate, patientName, doctorId
  //       // You may need to adjust this based on your actual data structure
  //       const enrichedData = await Promise.all(
  //         data.map(async (appointment) => {
  //           const doctorResponse = await fetch(
  //             '/api/v1/doctor/getDoctorInfo',
  //             { userId: appointment.doctorId },
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
  //               },
  //             }
  //           );
  //           const doctorData = await doctorResponse.json();

  //           return {
  //             ...appointment,
  //             doctorName: doctorData.name,
  //             // Add more doctor details if needed
  //           };
  //         })
  //       );

  //       setAppointmentData(enrichedData);
  //       console.log(appointmentData)
  //     } catch (error) {
  //       console.error('Error fetching appointment data:', error);
  //     }
  //   };
    
  //   fetchData();
  // }, []);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/v1/user/user-appointments', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }); // Update the API endpoint
  //       const data = response.data;

  //       // Ensure that the data is an array before using map
  //       if (Array.isArray(data)) {
  //         const enrichedData = await Promise.all(
  //           data.map(async (appointment) => {
  //             // Check if the appointment object has the 'doctorId' property
  //             if ('doctorId' in appointment) {
  //               const doctorResponse = await axios.get(`/api/v1/doctor/getDoctorInfo${appointment.doctorId}`);
  //               const doctorData = doctorResponse.data;

  //               return {
  //                 ...appointment,
  //                 doctorName: doctorData.name,
  //                 // Add more doctor details if needed
  //               };
  //             }

  //             // If 'doctorId' is missing, return the original appointment data
  //             return appointment;
  //           })
  //         );

  //         setAppointmentData(enrichedData);
  //       } else {
  //         console.error('API did not return an array:', data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching appointment data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
    },
    {
      title: "Appointment",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {record.date}&nbsp;
          {record.time}
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
      {/* <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                <option>english</option>
                <option>hindi</option>
      </select> */}
      <div className="backimg_1" style={{ minHeight: '100%' }}>
        <h1 className="text-center">{'<<<'}{content.appoinmentHeading}{'>>>'}</h1>
        <Table columns={columns} dataSource={appointments} bordered style={{ border: '1px solid black', margin: '5px 10px', backgroundColor: 'lightgray' }} />
      </div>
    </Layout>
  );
};

export default Appointments;
