const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const moment = require("moment");


//Get Doctor Information............
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId }).exec();
    if (!doctor) {
      // Return a 404 response with a message indicating that the doctor is not found
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    const formattedTimings = {
      startTime: doctor.timings.startTime,
      endTime: doctor.timings.endTime,
    };

    res.status(200).send({
      success: true,
      message: "Doctor data fetch successfully",
      data: {
        ...doctor._doc,
        timings: formattedTimings,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching Doctor Details",
    });
  }
};


// Update Doctor Profile.........
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

// Get Single Doctor...........
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    const startTime = doctor.timings.startTime;
    const endTime = doctor.timings.endTime;

    const drStartTime = parseFloat(startTime)
    const drEndTime = parseFloat(endTime)
    const subTime = drEndTime - drStartTime
    const drSTFormat = moment(drStartTime,"HH:mm")
    const drETFormat = moment(drEndTime, "HH:mm")


    const availableTimes = [];
    while (drSTFormat.isBefore(drETFormat)) {
      const startTime = drSTFormat.format("HH:mm");
      drSTFormat.add("00:30"); // Add 30 minutes to drSTFormat
      const endTime = drSTFormat.format("HH:mm");
      
      availableTimes.push(`${startTime} - ${endTime}`);
    }
    console.log(availableTimes)



    res.status(200).send({
      success: true,
      message: "Single Doctor Information Fetched",
      data   : {doctor,availableTimes},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docotor info",
    });
  }
};

//Doctor Appointment Controller.........
const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments Fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doctor Appointments",
    });
  }
};

//Status update Controller.........
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
