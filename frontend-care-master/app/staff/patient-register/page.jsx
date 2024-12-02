"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios"; // Ensure you have axios installed for the delete functionality
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
const PatientRegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    contact: "",
    gender: "",
    nic: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        resetForm();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      email: "",
      contact: "",
      gender: "",
      nic: "",
      age: "",
    });
  };

  const handleUpdate = (nic) => {
    try {
      axios.put(`http://localhost:5001/patient/${nic}`, formData);
      alert("patient updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Error updating patient");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/patient/${id}`);
      alert("patient deleted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Error deleting patient");
    }
  };

  const handleSearch = async () => {
    if (!formData.nic) {
      alert("Please enter a NIC to search.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5001/patient/nic/${formData.nic}`
      );
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name,
          address: data.address,
          email: data.email,
          contact: data.contact,
          gender: data.gender,
          nic: data.nic,
          age: data.age,
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg text-black text-sm shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          {/* Close Icon */}
          <button
            onClick={() => router.push("/staff")} // Navigate to home
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose size={24} /> {/* Close icon size */}
          </button>
          <Image
            src="/care/patient.png"
            alt="Doctor"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Patient Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NIC Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">NIC</label>
            <input
              type="text"
              name="nic"
              id="nic"
              value={formData.nic}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>
          {/* Name Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Address Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Age Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">Age</label>
            <input
              type="text"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Contact Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">Contact</label>
            <input
              type="text"
              name="contact"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          {/* Gender Radio Buttons */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">
              Select Gender:
            </label>
            <div className="flex items-center w-2/3">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="mr-2 text-sm"
                required
              />
              <label className="mr-4 text-sm">Male</label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mr-2 text-sm"
                required
              />
              <label className="text-sm">Female</label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between  p-4 mt-6 ">
            <button
              type="submit"
              className="w-full  py-3 text-sm border  border-gray-500 rounded-lg hover:gray-600"
            >
              Register
            </button>
            <button
              onClick={() => handleUpdate(formData.nic)}
              className="w-full py-3 text-sm rounded-lg border  border-gray-500 hover:gray-600 mx-1"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(formData.nic)}
              className="w-full  py-3 text-sm border  border-gray-500 rounded-lg hover:gray-600 mx-1"
            >
              Delete
            </button>
            <button
              onClick={handleSearch}
              type="button" // Ensure this button does not submit the form
              className="w-full py-3 text-sm border  border-gray-500  hover:gray-600 rounded-lg mx-1"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegisterPage;
