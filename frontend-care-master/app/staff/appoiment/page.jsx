"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "@/components/NavBar";
import Image from "next/image";

const AddAppoimentpage = () => {
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ]);
  const [takenTimeSlots, setTakenTimeSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedNic, setSelectedNic] = useState("");
  const [patients, setPatients] = useState([]);

  const [selectedPatientNic, setSelectedPatientNic] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctorCharge, setDoctorCharge] = useState("");
  const [hospitalCharge, setHospitalCharge] = useState("");

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Details</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { text-align: center; }
            .details { margin: 20px; }
            .details div { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h2>Payment Details</h2>
          <div class="details">
            <div><strong>Charge Doctor:</strong> ${doctorCharge}</div>
            <div><strong>Charge Hospital:</strong> ${hospitalCharge}</div>
            <div><strong>Full Amount:</strong> $${(
              Number(hospitalCharge) + Number(doctorCharge)
            ).toFixed(2)}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePayment = async () => {
    // Prepare the payment data
    const paymentData = {
      doctorNic: selectedNic,
      doctor_charge: Number(doctorCharge),
      hospital_charge: Number(hospitalCharge),
      patientNic: selectedPatientNic,
    };

    console.log("Payment Data:", paymentData);
    try {
      const response = await axios.post(
        "http://localhost:5001/payment",
        paymentData
      );
      // Handle the response, e.g., show a success message or redirect
      console.log("Payment successful:", response.data);
      alert("Payment successful!");
      // Reset fields after successful payment
      setDoctorCharge("");
      setHospitalCharge("");
      handlePrint();
    } catch (error) {
      if (error.response) {
        console.error("Error making payment:", error.response.data); // Log the error details from the server
        alert("Error making payment: " + JSON.stringify(error.response.data));
      } else {
        console.error("Error making payment:", error.message);
        alert("Error making payment!");
      }
    }
  };
  useEffect(() => {
    // Fetch the doctor data from the backend
    axios
      .get("http://localhost:5001/doctor/name")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the doctors!", error);
      });

    // Fetch the patient data from the backend
    axios
      .get("http://localhost:5001/patient/name")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the patients!", error);
      });
  }, []);

  // 1. Fetch taken time slots from localStorage when component mounts
  useEffect(() => {
    const takenTimeSlots =
      JSON.parse(localStorage.getItem("takenTimeSlots")) || [];
    setAvailableTimeSlots((prevTimeSlots) =>
      prevTimeSlots.filter((slot) => !takenTimeSlots.includes(slot))
    );
  }, []);

  // 2. When a time slot is selected, save it to localStorage
  const handleTimeSlotSelect = (selectedSlot) => {
    setTimeSlot(selectedSlot);

    // Get the taken time slots from localStorage (if any) and add the selected slot
    const takenTimeSlots =
      JSON.parse(localStorage.getItem("takenTimeSlots")) || [];
    if (!takenTimeSlots.includes(selectedSlot)) {
      takenTimeSlots.push(selectedSlot);
      localStorage.setItem("takenTimeSlots", JSON.stringify(takenTimeSlots));
    }

    // Remove the selected slot from available time slots
    setAvailableTimeSlots((prevTimeSlots) =>
      prevTimeSlots.filter((slot) => slot !== selectedSlot)
    );
  };

  // Function to fetch appointments
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAppointments = () => {
    if (selectedNic) {
      axios
        .get(`http://localhost:5001/appointment/doctor/${selectedNic}`)
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching appointments for this doctor!", error);
        });
    } else {
      setAppointments([]);
    }
  };

  // Fetch appointments when selectedNic changes
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, selectedNic]);

  const handleDoctorChange = (event) => {
    const nic = event.target.value;
    setSelectedNic(nic);

    if (nic) {
      // Fetch the selected doctor's details
      axios
        .get(`http://localhost:5001/doctor/nic/${nic}`)
        .then((response) => {
          setDoctorDetails(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the doctor details!",
            error
          );
        });
    } else {
      setDoctorDetails(null);
    }
  };
  const handlePatientChange = () => {
    console.log("Added patient NIC:", selectedPatientNic);

    if (selectedPatientNic) {
      // Fetch the selected patient's details
      axios
        .get(`http://localhost:5001/patient/nic/${selectedPatientNic}`)
        .then((response) => {
          setPatientDetails(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the patient details!",
            error
          );
        });
    } else {
      setPatientDetails(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorNic = selectedNic;
    const patientNic = selectedPatientNic;
    const smsDate = date.toISOString().split("T")[0];
    const smsEmail = patientDetails.email;
    const smsContact = patientDetails.contact;

    // Fetch doctor details by NIC
    let doctorName;
    try {
      const doctorResponse = await axios.get(
        `http://localhost:5001/doctor/nic/${doctorNic}`
      );
      doctorName = doctorResponse.data.name; // Assuming the response contains { name: "Doctor Name" }
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      alert("Failed to retrieve doctor information");
      return;
    }
    // Create the request body
    const appointmentData = {
      doctorNic,
      patientNic,
      date: date.toISOString().split("T")[0],
      time: timeSlot,
      appointmentNumber,
    };

    console.log("Appointment Data:", appointmentData);

    try {
      const response = await axios.post(
        "http://localhost:5001/appointment",
        appointmentData
      );
      console.log("Appointment added successfully:", response.data);
      alert("Appointment added successfully");
      fetchAppointments();
      sendSMS(
        smsContact,
        smsDate,
        appointmentNumber,
        doctorName,
        timeSlot,
        smsEmail
      );

      setAvailableTimeSlots((prevSlots) =>
        prevSlots.filter((slot) => slot !== timeSlot)
      );
      setTakenTimeSlots((prevTaken) => [...prevTaken, timeSlot]);
    } catch (error) {
      console.error("There was an error adding the appointment:", error);
      alert("There was an error adding the appointment");
    }
  };
  const sendSMS = async (
    mobile,
    date,
    appointmentNumber,
    doctorName,
    time,
    email
  ) => {
    try {
      await axios.post("http://localhost:5001/sms-send", {
        mobile: mobile,
        appointmentId: appointmentNumber,
        date: date,
        time: time,
        doctorName: doctorName,
        email: email,
      });
      console.log(mobile, appointmentNumber, date, time, doctorName, email);
      console.log("Appointment data sent to backend successfully");
      alert("SMS sent to owner's mobile");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <div>
      {/* Header / Title */}
      <NavBar title={"Appointments"} hideTitle={true} />

      {/* Sidebar Section */}
      <div className="flex h-screen ">
        {/* Doctor and Patient Selection */}
        <div className="flex-1 w-64 flex flex-col py-6 border-r border-black">
          <div className="flex items-center mt-6 mb-4">
            <Image
              src="/care/doctor.png"
              alt="Patient Icon"
              width={30}
              height={30}
              className="w-6 h-6 mr-2"
            />
            <h2 className="text-2xl p-1">Select Doctor </h2>
          </div>

          <div className="flex flex-col p-4">
            <select
              className="mt-2 p-2 w-full border rounded-lg text-gray-700"
              value={selectedNic}
              onChange={handleDoctorChange}
            >
              <option value="">Select a Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.nic} value={doctor.nic}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          {doctorDetails && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
              <p>
                <strong>Name:</strong> {doctorDetails.name}
              </p>

              <p>
                <strong>Contact:</strong> {doctorDetails.contact}
              </p>

              <p>
                <strong>NIC:</strong> {doctorDetails.nic}
              </p>
            </div>
          )}

          <div className="flex items-center mt-6 mb-4">
            <Image
              src="/care/patient.png"
              alt="Patient Icon"
              width={30}
              height={30}
              className="w-6 h-6 mr-2"
            />
            <h2 className="text-2xl p-1">Search Patient Using NIC</h2>
          </div>

          <div className="flex flex-col p-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={selectedPatientNic}
                onChange={(e) => setSelectedPatientNic(e.target.value)}
                placeholder="Enter NIC"
                className="p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button
                onClick={handlePatientChange}
                className="bg-gray-500 text-white p-2 rounded-r-lg hover:bg-gray-600 focus:outline-none flex items-center justify-center"
              >
                <FaSearch size={20} />{" "}
                {/* Set size to match the text box height */}
              </button>
            </div>
          </div>

          {patientDetails && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
              <h3 className="text-sm font-bold mb-2">{patientDetails.name}</h3>
              <p>
                <strong>Address:</strong> {patientDetails.address}
              </p>
              <p>
                <strong>Email:</strong> {patientDetails.email}
              </p>
              <p>
                <strong>Contact:</strong> {patientDetails.contact}
              </p>
              <p>
                <strong>Gender:</strong> {patientDetails.gender}
              </p>
              <p>
                <strong>Age:</strong> {patientDetails.age}
              </p>
              <p>
                <strong>NIC:</strong> {patientDetails.nic}
              </p>
            </div>
          )}
        </div>

        <div className="flex-grow p-6">
          {/* Flex container for Date Picker and Time Slots */}
          <div className="flex">
            {/* Date Picker Section (Left Side) */}
            <div className="w-1/2 p-4">
              <h4 className="text-xl font-bold mb-2">Select Date</h4>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Time Slots and Appointment Section (Right Side) */}
            <div className="w-1/2 p-4">
              {/* Time Slots Section */}
              <h4 className="text-xl font-bold mb-2">Select Time Slot</h4>
              <div className="grid grid-cols-2 gap-4">
                {availableTimeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`p-2 ${
                      timeSlot === slot
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                    onClick={() => handleTimeSlotSelect(slot)}
                    disabled={takenTimeSlots.includes(slot)} // Disable if slot is taken
                  >
                    {slot}
                  </button>
                ))}
              </div>

              {/* Appointment Number and Submit Section (Moved Below Time Slots) */}
              <div className="w-full p-6 mt-4">
                <div className="mb-4">
                  {/* Appointment Number Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="appointmentNumber"
                      className="text-sm font-bold block mb-1"
                    >
                      Appointment Number:
                    </label>
                    <input
                      type="text"
                      id="appointmentNumber"
                      value={appointmentNumber}
                      onChange={(e) => setAppointmentNumber(e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="Enter Appointment Number"
                    />
                  </div>

                  {/* Selected Time Slot Input */}
                  <div>
                    <label
                      htmlFor="selectedTimeSlot"
                      className="text-sm font-bold block mb-1"
                    >
                      Selected Time Slot:
                    </label>
                    <input
                      type="text"
                      id="selectedTimeSlot"
                      value={timeSlot}
                      readOnly
                      className="border p-2 w-full rounded bg-gray-100"
                      placeholder="Select Time Slot"
                    />
                  </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="mt-4">
                  <button
                    className="bg-black text-white px-6 py-2 rounded"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button className="bg-gray-400 text-white px-6 py-2 rounded ml-4">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Table (Now placed below all other sections) */}
          <div className="w-full p-6 mt-6">
            <div className="border border-gray-300 rounded-lg p-4">
              <table className="w-full table-auto border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-4 text-left">
                      Appo. Number
                    </th>
                    <th className="border border-gray-300 p-4 text-left">
                      Date
                    </th>
                    <th className="border border-gray-300 p-4 text-left">
                      Time
                    </th>
                    <th className="border border-gray-300 p-4 text-left">
                      Patient Name
                    </th>
                    <th className="border border-gray-300 p-4 text-left">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="border border-gray-300 p-4">
                          {appointment.appointmentNumber}
                        </td>
                        <td className="border border-gray-300 p-4">
                          {appointment.date}
                        </td>
                        <td className="border border-gray-300 p-4">
                          {appointment.time}
                        </td>
                        <td className="border border-gray-300 p-4">
                          {appointment.Patient.name}
                        </td>
                        <td className="border border-gray-300 p-4">
                          {appointment.Patient.contact || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border border-gray-300 p-4" colSpan="5">
                        No appointments available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full p-6 mt-6">
            {/* Wrapper Box with Border and Rounded Corners */}
            <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-start">
              {/* Left Side: Doctor and Hospital Change Text Boxes */}
              <div className="flex flex-col w-1/2">
                {/* Doctor Change Input */}
                <div className="mb-4">
                  <label
                    htmlFor="doctorChange"
                    className="text-sm font-bold block mb-1"
                  >
                    Charge Doctor:
                  </label>
                  <input
                    type="text"
                    id="doctorChange"
                    value={doctorCharge}
                    onChange={(e) => setDoctorCharge(e.target.value)}
                    className="border p-2 w-full rounded"
                    placeholder="Enter new doctor name"
                  />
                </div>

                {/* Hospital Change Input */}
                <div>
                  <label
                    htmlFor="hospitalChange"
                    className="text-sm font-bold block mb-1"
                  >
                    Charge Hospital:
                  </label>
                  <input
                    value={hospitalCharge}
                    onChange={(e) => setHospitalCharge(e.target.value)}
                    type="text"
                    id="hospitalChange"
                    className="border p-2 w-full rounded"
                    placeholder="Enter new hospital name"
                  />
                </div>
              </div>

              {/* Right Side: Full Amount and Payment Button */}
              <div className="flex flex-col items-end w-1/2">
                <div className="mb-4">
                  <h4 className="text-sm font-bold">Full Amount</h4>
                  <p className="text-xl font-semibold text-black">
                    LKR.
                    {(Number(hospitalCharge) + Number(doctorCharge)).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-black text-white px-6 py-2 rounded mr-4"
                    onClick={handlePayment}
                  >
                    Make Payment
                  </button>
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center"
                    onClick={handlePrint}
                  >
                    <FontAwesomeIcon icon={faPrint} className="mr-2" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppoimentpage;
