import React from "react";
import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";

const Staffpage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-3 pt-10 gap-4 p-4">
        {/* First Row: 2 Cards */}
        <Link href="/staff/patient-register">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg  flex flex-col items-center">
            <Image
              src="/care/patient.png"
              alt="patient Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p >Patient Register</p>
          </div>
        </Link>
        <Link href="staff/appoiment">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg flex flex-col items-center">
            <Image
              src="/care/Book_check_fill.png"
              alt="Fix Appoimnet"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Fix Appoimnet</p>
          </div>
        </Link>
        <Link href="/staff/inventrory">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg  flex flex-col items-center">
            <Image
              src="/care/issue.png"
              alt="Staff Register"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Issue Medicine</p>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default Staffpage;
