"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, role, nic } = data;

        localStorage.setItem("nic", nic);

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        console.log("Login successful");

        // Print the token and role in the console
        console.log("Token:", token);
        console.log("Role:", role);
        console.log("NIC:", nic);

        alert("Login successful");

        // Role-based redirection
        if (role === "admin") {
          router.push("/admin");
        } else {
          // Fallback for unknown role
          alert("Unknown role. Redirecting to home.");
          router.push("/");
        }
      } else {
        const errorData = await response.json();
        alert(`Login failed: check email and password`);
      }
    } catch (error) {
      alert(`Login failed: Please Register first`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/")}
            type="button"
            className="w-full bg-white text-black border border-black p-2 rounded"
          >
            Cancel
          </button>
        </div>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
