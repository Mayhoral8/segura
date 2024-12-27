"use client"
import React, { useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";
import { BiSolidError } from "react-icons/bi";

const ErrorModal = () => {
  const capitalize = (words) => {
    return words
      .split(" ")
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  };

  const { errorMsg, showErrorModal, setShowErrorModal } =
    useContext(ConfigContext).errorModal;

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  if (showErrorModal) {
    return (
      <main className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)] z-50  backdrop-blur-sm">
        <section className="border w-[30%] h-[40%] bg-white flex flex-col justify-evenly items-center gap-y-4 rounded-md">
          <BiSolidError className="text-4xl text-red-400" />
          <p className="text-base text-center px-6">{capitalize(errorMsg)}</p>
          <button
            className="h-10 w-20 bg-[#2c698d] text-white rounded-md"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </section>
      </main>
    );
  }
};

export default ErrorModal;
