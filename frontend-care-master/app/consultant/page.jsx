import React from "react";
import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";

const ConsultPage = () => {
  
  return (
    <Layout>
      <div className="grid grid-cols-3 pt-10 gap-4 p-4">
        {/* First Row: 2 Cards */}
        <Link href="/consultant/view-patients">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg  flex flex-col items-center">
            <Image
              src="/care/add-treatment.png"
              alt="Add Treatment"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Add Treatment</p>
          </div>
        </Link>
        <Link href="/consultant/treatment-history">
          <div className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg  flex flex-col items-center">
            <Image
              src="/care/view-treatment.png"
              alt="Treatment History"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>Treatment History</p>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default ConsultPage;
