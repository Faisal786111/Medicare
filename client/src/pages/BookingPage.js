import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, DatePicker, message, TimePicker, Button, Divider } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Table } from "antd";
import DataTable from 'react-data-table-component';


const BookingPage = () => {

  const currentDate = new Date();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(moment(currentDate, "DD-MM-YYYY").format("DD-MM-YYYY"));
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [availableTime, setAvailableTime] = useState([])
  const [appointments, setAppointments] = useState([])
  const dispatch = useDispatch();
  const [arr, setArr] = React.useState([]);

  // login user data

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // Adjust as needed
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        // Add more styles as needed
      },
    },
  };

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data.doctor);
        console.log("Doctors ########:",doctors)

        // const times = res.data.data.availableTimes; // Assuming this contains the times array
        // const mergedArray = [...availableTimes, ...times];

        // console.log(mergedArray); // ["4", "5", "6", "7"]
        setAvailableTime(res.data.data.availableTimes)
        // setAvailableTimes(times)
      }
      console.log(availableTime)
    } catch (error) {
      console.log(error);
    }
  };
  // ============ handle availiblity
  const handleAvailability = async (newDate) => {

    try {
      // dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date : newDate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
     
      if (res.data.success) {
        setIsAvailable(true);
        setAppointments(res.data.data)  // when res.data.data is updated then log the appointments
        console.log("Appointment:", res.data.data);
          // setAppointments((prevAppointments) => {
          //   console.log("Previous Appointments:", prevAppointments);
          //   return res.data.data; // Set the new value of appointments
          // });
        
        //console.log("Appointment:", appointments)
        //console.log("Appointment:", res.data.data);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =============== booking function==========================
  const handleBooking = async (row) => {
    try {
      console.log(row.timeSlot)
      setIsAvailable(true);
      if (!date) {
        return alert("Date Required");
      }
      // dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: row.timeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };


  useEffect(() => {
    getUserData();
    handleAvailability(date)
    console.log(appointments)
    //eslint-disable-next-line
  }, []);

  const arrayOfObjects = availableTime.map((value, index) => ({
    id: index + 1, // Adding 1 to the index to start with id 1
    timeSlot: value,
  }));

  const dateChange = (newDate) => {
    setDate(newDate)
    handleAvailability(newDate)
  }

  const col = [
    {
      name: 'Time Slot',
      selector: row => row.timeSlot,
      sortable: true,
    },
    {
      name: 'Availability',
      cell: (row) => {
        return (
          appointments[row.id-1]?.time === row.timeSlot ? (
            <button disabled>Booked</button>
          ) : (
            <button
              onClick={() => handleBooking(row)}
              className="btn btn-primary"
            >
              Book Now
            </button>
          )
        );
      },
    }
    
  ];

  return (
    <Layout>
      {console.log(1)}
      <div className="common_bacKImg" style={{ minHeight: '100%' }}>
        {/* <h3 className="text-center">{'<<<<'}Booking Page{'>>>>'}</h3> */}
        <div className="container w-75 mt-5 pl-5">
          <Card className='fant' style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            {doctors && (
              <div className="border border-black text-center">
                <h4>Dr.{doctors.firstName} heil {doctors.lastName} {availableTime} </h4>
                <h4>Fees : {doctors.feesPerCunsaltation}</h4>
                <h4>
                  Timings : {doctors.timings && doctors.timings.startTime} -{" "}
                  {doctors.timings && doctors.timings.endTime}{" "}
                </h4>
                <Divider style={{ borderColor: 'black' }}></Divider>
                {<div className="d-flex flex-column w-75" style={{ marginLeft: 80 }}>
                  <DatePicker
                    aria-required="true"
                    defaultValue={moment(currentDate, 'DD-MM-YYYY')}
                    className="m-2"
                    format="DD-MM-YYYY"
                    onChange={(value) => dateChange(value.format("DD-MM-YYYY"))}
                  />
                </div>}


                <DataTable
                  columns={col}
                  data={arrayOfObjects}
                  customStyles={customStyles} // Apply custom styles

                />

              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
