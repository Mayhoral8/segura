"use client";
import React, { useContext } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Field, ErrorMessage } from "formik";
import Link from "next/link";
import mainBg from "../../../assets/forgot-password/main-bg.png"

const ForgotPassword = () => {
  return (
    <main className="fixed flex items-center justify-center top-0 bottom-0 left-0 right-0"  style={{
      backgroundImage: `url(${mainBg.src})`,
      backgroundSize: `cover`,
      backgroundRepeat: "no-repeat",
    }}>
      <section className="w-[30%] h-[45%] bg-white border rounded-sm py-10 px-8 flex flex-col gap-y-4 items-center justify-center">
        <span className="text-lg font-medium inline-block text-start w-full  justify-start">Forgot Password?</span>
        <div className="flex flex-col gap-y-2 w-full">
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            className="border focus:outline-none px-1 text-xs h-8 rounded-sm w-full"
          />
          <span className="text-red-500 text-xs">
            {/* <ErrorMessage name="username" /> */}
          </span>
          <button className="w-full border rounded-sm bg-[#2c698d] text-white text-sm h-8">Continue</button>
        </div>
        <div className="text-xs">
          <Link href="/auth/login" className="text-[#2c698d]">Back to login page</Link>
        </div>
        <article className="grid grid-cols-3 gap-x-4">
          <div className="border  flex items-center justify-center gap-x-2 py-1 ">
            <FcGoogle />
            <span>Google</span>
          </div>
          <div className="border  flex items-center justify-center gap-x-2 py-1 ">
            <FaSquareXTwitter />
            <span>Twitter</span>
          </div>
          <div className="border  flex items-center justify-center gap-x-2 py-1 ">
            <GrFacebookOption className="text-blue-600" />
            <span>Facebook</span>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ForgotPassword;
