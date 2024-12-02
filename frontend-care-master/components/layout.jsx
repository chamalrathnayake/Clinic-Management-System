"use client";
import AsideBar from "@/components/AsideBar";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { FaUserCircle } from "react-icons/fa"; // Import a user icon from react-icons

export default function Layout({ children }) {
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState(null); // State to hold user data
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile display

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleProfileClick = async () => {
    try {
      const role = localStorage.getItem("role"); // Retrieve the role from local storage
      const nic = localStorage.getItem("nic"); // Retrieve the NIC from local storage

      // Check if NIC is available
      if (!nic) {
        console.error("NIC not found in local storage");
        return; // Exit if NIC is not found
      }

      let url;

      // Determine the URL based on user role
      if (role === "doctor") {
        url = `http://localhost:5001/doctor/nic/${nic}`;
      } else if (role === "staff") {
        url = `http://localhost:5001/staff/nic/${nic}`;
      } else if (role === "admin") {
        url = `http://localhost:5001/auth/nic/${nic}`;
      } else {
        console.error("Invalid user role");
        return; // Exit the function if the role is invalid
      }

      // Fetch data from the determined URL
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Store the fetched user data
      setUserData(data);
      setShowProfile(true); // Show the user profile
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <NavBar hideTitle={false} />
      <div className="flex">
        {/* Pass role as a direct value */}
        <AsideBar role={role} />
        <main className="flex-1 p-4">{children}</main>

        {/* Right User Info Sidebar */}
        <div className="h-screen w-54 flex flex-col py-6 border-l border-black bg-white-100">
          {showProfile && userData && (
            <div className="pl-14">
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Role:</strong> {userData.role}
              </p>
            </div>
          )}

          <div className="flex flex-col items-center mt-4">
            {localStorage.getItem("token") ? (
              <div className="relative">
                <FaUserCircle
                  className="text-6xl cursor-pointer"
                  onClick={handleProfileClick} // Fetch and show user data on click
                />
              </div>
            ) : (
              <p className="text-gray-500">No user logged in</p>
            )}
          </div>

          {/* Display User Data when showProfile is true */}
          {showProfile && userData && (
            <div className="mt-4 p-4 border rounded bg-gray-200">
              <p>
                <strong>Contact:</strong> {userData.contact}
              </p>
              <p>
                <strong>NIC:</strong> {userData.nic}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>

              <button
                onClick={() => setShowProfile(false)}
                className="mt-2 py-1 px-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
