"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Link from "next/link";

const ViewPatientpage = () => {
  const router = useRouter();

  const [patients, setPatients] = useState([]);

  const [userData, setUserData] = useState(null); // State to hold user data
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile display

  // Fetch patient data from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5001/patient");
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

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
  return (
    <div>
      {/* Header / Title */}
      <NavBar hideTitle={true} title="View Patients" />

      {/* Sidebar Section */}
      <div className="flex h-screen">
        {/* Doctor and Patient Selection */}
        <div className="w-64 border-r-2 border-r-black text-black font-bold text-sm flex flex-col py-6 justify-start h-full">
          <div className="flex flex-col items-center mt-4">
            {localStorage.getItem("token") && userData ? (
              <div className="text-center mb-4">
                <h3 className="font-sans text-xl">{userData.name}</h3>
                <p className="text-sm text-gray-600">{userData.role}</p>
              </div>
            ) : (
              <p className="text-gray-500">No user logged in</p>
            )}

            <div className="relative">
              <FaUserCircle
                className="text-6xl cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              />
            </div>
          </div>

          {showProfile && userData && (
            <div className="mt-4 p-4 border font-normal rounded bg-gray-200">
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Contact:</strong> {userData.contact}
              </p>
              <p>
                <strong>NIC:</strong> {userData.nic}
              </p>
            </div>
          )}

          <div className="flex flex-col p-4"></div>
        </div>
        <div className="flex-grow p-6">
          <div className="flex">
            <div className="w-1/2 p-4">
              <h4 className="text-xl font-bold mb-2">Patients</h4>
              <ul>
                {patients.map((patient) => (
                  <li
                    key={patient.nic}
                    className="border p-4 mb-2 rounded cursor-pointer hover:bg-gray-100"
                  >
                    <Link
                      href={{
                        pathname: "/consultant/add-treatment",
                        query: {
                          nic: patient.nic,
                          name: patient.name,
                          email: patient.email,
                          contact: patient.contact,
                        },
                      }}
                    >
                      <h5 className="font-semibold">{patient.name}</h5>
                      <p>{patient.contact}</p>
                      <p>{patient.email}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default ViewPatientpage;
