"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    contact: "",
    nic: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        router.push("/login");
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-4 border"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full p-2 mb-4 border"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          className="w-full p-2 mb-4 border"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nic"
          placeholder="NIC"
          className="w-full p-2 mb-4 border"
          value={formData.nic}
          onChange={handleChange}
          required
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full bg-white text-black border border-black p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
