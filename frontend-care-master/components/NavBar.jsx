"use client";
import React from "react";
import Image from "next/image";
import { BiArrowBack, BiArrowForward } from "react-icons/bi";
import { useRouter } from "next/navigation";

const NavBar = ({ title, hideTitle }) => {
  const router = useRouter();

  return (
    <nav className="flex flex-col items-center pt-5">
      <div className="flex-grow"></div> {/* This creates the white space */}
      <div className="absolute top-5 left-5 flex items-center space-x-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-lg font-bold p-2 rounded hover:bg-gray-200"
        >
          &#8592;
        </button>

        {/* Home Button */}
        <button
          onClick={() => router.push("/")}
          className="text-lg font-bold p-2 rounded hover:bg-gray-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3l-7 7h2v7h10v-7h2l-7-7z" />
          </svg>
        </button>

        {/* Forward Button */}
        <button
          onClick={() => router.forward()}
          className="text-lg font-bold p-2 rounded hover:bg-gray-200"
        >
          &#8594;
        </button>
      </div>
      {/* Home Button - Positioned on the right */}
      <Image
        src="/logo.png"
        alt="We care"
        width={50}
        height={50}
        className="mx-auto"
      />
      {!hideTitle && (
        <>
          <p className="mt-2 text-center text-lg font-bold">WeCare</p>
          <p className="text-center font-medium">We Care Always</p>
        </>
      )}
      <p className="text-center pt-2 font-light">{title}</p>
      <div className="border-b w-full mt-5 border-black " />
    </nav>
  );
};

export default NavBar;
