"use client"
import React, { useContext } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { FaXmark } from "react-icons/fa6";

const OTP = () => {
  const { showOtpModal } = useContext(ConfigContext).login;

  if (showOtpModal) {
    return (
      <main className="fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-30 bg-[#0000005f]">
        <section className="bg-white lg:w-[25%] lg:h-[50%] border flex flex-col py-6 px-4 justify-evenly rounded-sm">
          <FaXmark className="block ml-auto text-end text-red-500" />
          <div className="flex flex-col">
            <span>Two-Factor Authentication (OTP) </span>
            <span className="text-xs">
              We sent a one-time code to Jone****@gmail.com
            </span>
          </div>

          <article className="flex flex-col gap-y-1">
            <span>Enter four digit code</span>

            <div className="grid grid-cols-4 gap-x-2">
              <div className="border h-6 w-12 rounded-sm"></div>
              <div className="border h-6 w-12 rounded-sm"></div>
              <div className="border h-6 w-12 rounded-sm"></div>
              <div className="border h-6 w-12 rounded-sm"></div>
            </div>
          </article>
          <button className="bg-[#2c698d] text-white h-8 block">Confirm</button>
        </section>
      </main>
    );
  }
};

export default OTP;
