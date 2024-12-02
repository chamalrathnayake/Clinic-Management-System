"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function AddTreatmentpage({ searchParams }) {
  const { nic, name, email, contact } = searchParams;
  console.log("New Search Params:", nic, name, email, contact);

  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [treatmentID, setTreatmentID] = useState("");
  const [date, setDate] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [illnessDescription, setIllnessDescription] = useState("");
  const [medicalPrescription, setMedicalPrescription] = useState("");
  const [prescribe, setPrescribe] = useState("");
  const [selectedNic, setSelectedNic] = useState("");
  const [patientName, setPatientName] = useState("");
  const [doctorNic, setDoctorNic] = useState("");

  const [treatments, setTreatments] = useState([]);

  const [userData, setUserData] = useState(null); // State to hold user data
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile display

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const role = localStorage.getItem("role");
        const nic = localStorage.getItem("nic");

        if (!nic) {
          console.error("NIC not found in local storage");
          return;
        }

        let url;

        if (role === "doctor") {
          url = `http://localhost:5001/doctor/nic/${nic}`;
        } else if (role === "staff") {
          url = `http://localhost:5001/staff/nic/${nic}`;
        } else if (role === "auth") {
          url = `http://localhost:5001/auth/nic/${nic}`;
        } else {
          console.error("Invalid user role");
          return;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserData(data);
        setShowProfile(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.nic) {
      console.log("UserData NIC:", userData.nic);
      axios
        .get(`http://localhost:5001/treatment/doctor/${userData.nic}`)
        .then((response) => {
          setTreatments(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the treatments for this doctor!",
            error
          );
        });
    } else {
      setTreatments([]);
    }
  }, [userData]);

  // Handle Save button click
  const handleSave = async () => {
    const treatmentData = {
      id: treatmentID,
      prescribe,
      medicine_discription: medicalPrescription,
      Illness_description: illnessDescription,
      treatment_type_discription: treatmentType,
      date_time: date,
      patient_name: patientName,
      patientNic: nic,
      doctorNic: selectedNic,
    };

    console.log("Treatment Data:", treatmentData); // Log treatment data

    try {
      const response = await axios.post(
        "http://localhost:5001/treatment",
        treatmentData
      );
      console.log("Response:", response); // Log full response

      if (response.status === 201) {
        console.log("Treatment added:", response.data);
        alert("Treatment added successfully!");
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      alert("Error adding treatment:", error.message);
      console.error("Error adding treatment:", error);
    }
  };

  const handleCancel = () => {
    clearForm();
  };

  // Function to clear form fields
  const clearForm = () => {
    setTreatmentID("");
    setDate("");
    setTreatmentType("");
    setIllnessDescription("");
    setMedicalPrescription("");
    setPrescribe("");
    setDoctorNic("");
    setPatientName("");
  };

  return (
    <div>
      {/* Header / Title */}
      <NavBar hideTitle={true} title="Add Treatment" />

      {/* Sidebar Section */}
      <div className="flex h-screen">
        {/* Doctor and Patient Selection */}
        <div className="w-80 border-r-2 border-r-black text-black font-bold text-lg flex flex-col py-6 justify-start">
          <div className="flex items-center mt-6 mb-4">
            <Image
              src="/care/doctor.png"
              alt="Patient Icon"
              width={30}
              height={30}
              className="w-6 h-6 mr-2"
            />
            <h2 className="text-2xl p-1">Doctor Details</h2>
          </div>
          <div className="flex flex-col p-4 font-normal">
            {localStorage.getItem("token") && userData ? (
              <div className="text-left mb-4">
                {/* <h3 className="font-sans text-xl">{userData.name}</h3> */}
                <p>
                  <strong>NIC:</strong> {userData.nic}
                </p>
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Contact:</strong> {userData.contact}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No user logged in</p>
            )}
          </div>
          <div className="flex items-center mt-6 mb-4">
            <Image
              src="/care/patient.png"
              alt="Patient Icon"
              width={30}
              height={30}
              className="w-6 h-6 mr-2"
            />
            <h2 className="text-2xl p-1">Patient Details</h2>
          </div>

          <div className="flex flex-col p-4 font-normal ">
            <p>
              <strong>NIC:</strong> {nic}
            </p>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Contact:</strong> {contact}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow p-6">
          {/* Patient History Section */}
          <div className="border-2 border-gray-300 p-4 rounded-lg mb-6">
            {/* Appointment Table (Now placed below all other sections) */}
            <div className="w-full p-6 mt-6">
              {/* Wrapper Box with Border and Rounded Corners */}
              <div className="border border-gray-300 rounded-lg p-4">
                <table className="w-full table-auto border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-4 text-left">
                        Treatment Number
                      </th>
                      <th className="border border-gray-300 p-4 text-left">
                        Date
                      </th>
                      <th className="border border-gray-300 p-4 text-left">
                        Prescribe
                      </th>
                      <th className="border border-gray-300 p-4 text-left">
                        Patient Name
                      </th>
                      <th className="border border-gray-300 p-4 text-left">
                        Treatment Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through treatments to display each one */}
                    {treatments.length > 0 ? (
                      treatments.map((treatment) => (
                        <tr key={treatment.id}>
                          <td className="border border-gray-300 p-4">
                            {treatment.id}
                          </td>
                          <td className="border border-gray-300 p-4">
                            {new Date(treatment.date_time).toLocaleString()}
                          </td>
                          <td className="border border-gray-300 p-4">
                            {treatment.prescribe}
                          </td>
                          <td className="border border-gray-300 p-4">
                            {treatment.patient_name}
                          </td>
                          <td className="border border-gray-300 p-4">
                            {treatment.treatment_type_discription}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="border border-gray-300 p-4" colSpan="5">
                          No treatments available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add Treatment Section */}
          <div className="border-2 border-gray-300 p-4 rounded-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4">Add Treatment</h2>

            <div className="flex mb-4">
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Treatment ID</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter treatment ID"
                  value={treatmentID}
                  onChange={(e) => setTreatmentID(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block font-bold mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex mb-4">
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Treatment Type</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter treatment type"
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block font-bold mb-2">
                  Illness Description
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  placeholder="Describe the illness"
                  value={illnessDescription}
                  onChange={(e) => setIllnessDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">
                  Medical Prescription
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Medical Prescription"
                  value={medicalPrescription}
                  onChange={(e) => setMedicalPrescription(e.target.value)}
                />
              </div>
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Prescribe</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter prescription"
                  value={prescribe}
                  onChange={(e) => setPrescribe(e.target.value)}
                />
              </div>
            </div>

            <div className="flex mb-4">
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Doctor NIC</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Doctor NIC"
                  value={selectedNic}
                  onChange={(e) => setSelectedNic(e.target.value)}
                />
              </div>
              <div className="mr-2 w-full">
                <label className="block font-bold mb-2">Patient Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Patient Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSave}
                className="p-2 border rounded-lg bg-black text-white hover:bg-gray-600  "
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="p-2 border rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
