"use client"
import React, { useContext } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const SuccessModal = () => {
  const { showLoginSuccessModal } = useContext(ConfigContext).login;

  if (showLoginSuccessModal) {
    return (
      <main className="fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-30 bg-[#0000005f]">
        <section className="w-[25%] h-[30%] bg-white border rounded-md py-4 px-4 flex flex-col gap-y-4 items-center justify-center">
          <IoCheckmarkCircleOutline className="text-green-400 text-xl" />
          <span className="text-2xl font-bold">Success!</span>
          <span className="text-sm font-light">
            You have successfully logged in
          </span>
        </section>
      </main>
    );
  }
};

export default SuccessModal;
