"use client"
import React, { useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import { ConfigContext } from "../../contexts/ConfigContext";

const Intro = () => {
  const {
    showSetupInfoModal,
    setShowSetupInfoModal,
    setShowCurrencySelectionModal,
   } = useContext(ConfigContext).walletSetup;

  const handleCloseModal = () => {
    setShowSetupInfoModal(false);
  };
  const handleContinue = () => {
    setShowSetupInfoModal(false);
    setShowCurrencySelectionModal(true);
  };

  if (showSetupInfoModal) {
    return (
      <main className="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-[#00000063] backdrop-blur-sm z-40">
        <section className="bg-white w-[30%] h-[50%] px-8 flex flex-col justify-between py-5">
          <FaXmark
            className="block ml-auto text-red-400"
            onClick={handleCloseModal}
          />
          <span className="font-bold">Setup Your Foreign Currency Wallet </span>
          <p className="text-sm ">
            Requesting a funding account is like opening a regular bank account.
            You will be given a GBP (Global British Pound) Bank account which
            can be used in receiving GBP currency.
          </p>
          <button
            className="bg-[#2C698D] text-sm text-white py-2"
            onClick={handleContinue}
          >
            Continue
          </button>
        </section>
      </main>
    );
  }
};

export default Intro;
