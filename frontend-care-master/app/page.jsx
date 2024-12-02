"use client";
import Layout from "@/components/layout";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
  const options = { year: "numeric", month: "long", day: "numeric" }; // Formatting options
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to update date and time
    const updateDateTime = () => {
      setCurrentDate(new Date().toLocaleDateString(undefined, options)); // Get current date in words
      setCurrentTime(new Date().toLocaleTimeString()); // Get current time
    };

    updateDateTime(); // Initial call to set the date and time immediately

    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString()); // Update current time every second
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <Layout>
      <p className="mt-5 mb-2 text-center text-2xl font-serif font-thin ">
        Welcome to WeCare
      </p>
      <div className="flex justify-between items-center mt-20 px-10">
        {" "}
        <p className="text-3xl font-medium">{currentDate}</p>
        <p className="text-6xl font-bold">{currentTime}</p>
      </div>
      <div>
        <p className="pt-20 px-10 text-left font-serif font-thin ">Features</p>
        <div className=" px-10 border-b min-w-400 mt-5 " />
      </div>
      <div className="container mx-auto">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-10">
          {/* Staff Login Card */}

          <div className=" rounded-lg  p-4  flex flex-col border border-black items-center h-full">
            <Image
              src="/staff.png"
              alt="Staff Login"
              width={150}
              height={150}
              className="object-cover"
            />
            <h3 className="text-sm font-bold text-center mt-4">Staff Login</h3>
          </div>

          {/* Consult Login Card */}

          <div className=" rounded-lg  p-4 flex flex-col border border-black items-center h-full">
            <Image
              src="/conslt.png"
              alt="Consult Login"
              width={150}
              height={150}
              className="object-cover"
            />
            <h3 className="text-sm font-bold text-center mt-4">
              Consult Login
            </h3>
          </div>

          {/* Admin Login Card */}

          <div className="rounded-lg  p-4   flex flex-col items-center border border-black h-full">
            <Image
              src="/admin.png"
              alt="Admin Login"
              width={150}
              height={150}
              className="object-cover"
            />
            <h3 className="text-sm font-bold text-center mt-4">Admin Login</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}
