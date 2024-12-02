"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
const StaffRegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    qualifications: "",
    contact: "",
    age: "",
    gender: "",
    nic: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/staff", {
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
      qualifications: "",
      contact: "",
      gender: "",
      nic: "",
      password: "",
      age: "",
    });
  };

  const handleUpdate = (nic) => {
    try {
      axios.put(`http://localhost:5001/staff/${nic}`, formData);
      alert("Staff updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Error updating Staff :", error);
      alert("Error updating Staff ");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/staff/${id}`);
      alert("Staff deleted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error deleting Staff:", error);
      alert("Error deleting Staff");
    }
  };

  const handleSearch = async () => {
    if (!formData.nic) {
      alert("Please enter a NIC to search.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5001/staff/nic/${formData.nic}`
      );
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name,
          address: data.address,
          email: data.email,
          qualifications: data.qualifications,
          contact: data.contact,
          gender: data.gender,
          nic: data.nic,
          password: data.password,
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
    <div className="flex justify-center items-center p-20 min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          {/* Close Icon */}
          <button
            onClick={() => router.push("/admin")} // Navigate to home
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose size={24} /> {/* Close icon size */}
          </button>
          <Image
            src="/staff.png"
            alt="Doctor"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Staff Registration
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
          {/* password Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
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

          {/* Qualifications Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 mr-4 text-right text-sm">
              Qualifications
            </label>
            <input
              type="text"
              name="qualifications"
              id="qualifications"
              value={formData.qualifications}
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
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-full py-3 text-sm border  border-gray-500  hover:gray-600 rounded-lg mx-1"
            >
              Register
            </button>
            <button
              onClick={() => handleUpdate(formData.nic)}
              className="w-full py-3 text-sm border  border-gray-500  hover:gray-600 rounded-lg mx-1"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(formData.nic)}
              className="w-full py-3 text-sm border  border-gray-500  hover:gray-600 rounded-lg mx-1"
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

export default StaffRegisterPage;
