import React, { useContext } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { ConfigContext } from "../contexts/ConfigContext";

const ErrorModal = () => {
  const { errorMsg, showErrorModal, setShowErrorModal } =
    useContext(ConfigContext).errorModal;

    const handleCloseModal = ()=>{
      setShowErrorModal(false)
    }

  if (showErrorModal) {
    return (
      <main className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)]  z-50">
        <section className="border w-[30%] h-[40%] bg-white flex flex-col justify-evenly items-center gap-y-4 rounded-md">
          <FaCircleXmark className="text-2xl text-red-400"/>
          <p className="text-base text-center px-6">{errorMsg}</p>
          <button className="h-10 w-20 bg-[#2c698d] text-white rounded-md" onClick={handleCloseModal}>Close</button>
        </section>
      </main>
    );
  }
};

export default ErrorModal;
