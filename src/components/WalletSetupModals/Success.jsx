"use client";
import React, { useContext } from "react";
import { ConfigContext } from "../../contexts/ConfigContext";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const SuccessModal = () => {
  const {showSuccessfulWalletSetupModal, setShowSuccessfulWalletSetupModal} =
    useContext(ConfigContext).walletSetup;
  // const { showLoginSuccessModal } = useContext(ConfigContext).login;

  const handleCloseModal = ()=>{
    setShowSuccessfulWalletSetupModal(false)
  }
  if (showSuccessfulWalletSetupModal) {
    return (
      <main className="fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-40 bg-[#0000005f]">
        <section className="w-[30%] h-[40%] bg-white border rounded-md py-4 px-4 flex flex-col gap-y-4 items-center justify-center">
          <IoCheckmarkCircleOutline className="text-green-400 text-5xl cursor-pointer"  onClick={handleCloseModal}/>
          <span className="text-2xl font-bold">Success!</span>
          <span className="text-sm font-light text-center">
            You have successfully requested for your wallet. our compliance team
            are currently reviewing your request.
          </span>
        </section>
      </main>
    );
  }
};

export default SuccessModal;
