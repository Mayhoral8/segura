"use client";
import React from "react";
import { useContext } from "react";
import { ConfigContext } from "@/contexts/ConfigContext";
import AnimateButton from "./@extended/AnimateButton";

const Modal = () => {
  const { showModal, setShowModal } = useContext(ConfigContext);

  const handleModal = () => {
    setShowModal(false);
  };

  if (showModal) {
    return (
      <section className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-40 backdrop-blur-sm">
        <div className="bg-white w-[30%] h-[45%] rounded-md grid grid-flow-row items-center justify-center gap-y-4 px-10 py-5">
          <h2 className="text-xl text-center font-bold">
            {" "}
            Registration Successful 🎉
          </h2>
          
          <p className=" text-center">
            A verification link has been sent to your email. <br/>
            Click on it to continue
          </p>
          <div className="flex items-center justify-center" >
            <AnimateButton>
              <button
                className="h-10 w-24 rounded-md border bg-[#2c698d]  text-white mx-auto block"
                onClick={handleModal}
              >
                Close
              </button>
            </AnimateButton>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default Modal;
