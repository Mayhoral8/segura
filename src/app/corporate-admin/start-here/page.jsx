"use client";
import Image from "next/image";
import React, { useState } from "react";
import PersonalInfo from "../../../assets/adminDashboard/personalInfo.svg";
import BusinessInfo from "../../../assets/adminDashboard/businessInfo.svg";
import BusinessPartnerInfo from "../../../assets/adminDashboard/businessPartnerInfo.svg";
import MandatoryDouments from "../../../assets/adminDashboard/mandatoryDocs.svg";
import BusinessInfoModal from "./businessInfoModal";
import MandatoryDocumentsModal from "./mandatoryDocumentsModal";
import BusinessParnerInfoModal from "./businessPartnerInfoModal";
import TopBar from "../topbar";

const StartHere = () => {
  const [toggleBusinessInfoModal, setToggleBusinessInfoModal] = useState(false);
  const [toggleMandatoryDocumentsModal, setToggleMandatoryDocumentsModal] =
    useState(false);
  const [toggleBusinessParnerInfoModal, setToggleBusinessParnerInfoModal] =
    useState(false);

  const handleToggleBusinessInfoModal = () => {
    setToggleBusinessInfoModal(!toggleBusinessInfoModal);
  };

  const handleToggleMandatoryDocumentsModal = () => {
    setToggleMandatoryDocumentsModal(!toggleMandatoryDocumentsModal);
  };

  const handleToggleBusinessParnerInfoModal = () => {
    setToggleBusinessParnerInfoModal(!toggleBusinessParnerInfoModal);
  };

  return (
    <>
    <TopBar page="Start Here"/>
    <div className="px-8 py-4 min-h-screen flex flex-col">
      <BusinessInfoModal
        toggleBusinessInfoModal={toggleBusinessInfoModal}
        handleToggleBusinessInfoModal={handleToggleBusinessInfoModal}
      />
      <MandatoryDocumentsModal
        handleToggleMandatoryDocumentsModal={
          handleToggleMandatoryDocumentsModal
        }
        toggleMandatoryDocumentsModal={toggleMandatoryDocumentsModal}
      />
      <BusinessParnerInfoModal
        toggleBusinessParnerInfoModal={toggleBusinessParnerInfoModal}
        handleToggleBusinessParnerInfoModal={
          handleToggleBusinessParnerInfoModal
        }
      />
      <div className="bg-[#272643] w-full py-[26px] px-[23px] text-[#F0F0F0] rounded-[4px]">
        <h3 className="text-[30px] font-medium mb-2">
          Congratulations you made it
        </h3>
        <p className="text-[18px]">
          Welcome to your dashboard. Your account is currently in demo mode. To
          go live and begin transacting payments, there are a few steps to
          complete. Follow the guide below to activate your account.
        </p>
      </div>
      <div className="flex flex-col w-full gap-5 mt-5">
        <div
          className="bg-white h-[100px] rounded-[10px] px-[20px] py-[17px] flex flex-col justify-between cursor-pointer"
          onClick={handleToggleBusinessInfoModal}
        >
          <div className="flex items-center">
            <Image src={BusinessInfo} alt="" />
            <p className="ml-2">Business Information</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="bg-[#F5F5F5] h-[8px] rounded-[4px] w-[91%]">
              <div className="bg-[#09DD49] w-[80%] h-full rounded-[8px]"></div>
            </div>
            <p>80%</p>
          </div>
        </div>
        <div
          className="bg-white h-[100px] rounded-[10px] px-[20px] py-[17px] flex flex-col justify-between cursor-pointer"
          onClick={() => handleToggleBusinessParnerInfoModal()}
        >
          <div className="flex items-center">
            <Image src={BusinessPartnerInfo} alt="" />
            <p className="ml-2">Business Partner Information</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="bg-[#F5F5F5] h-[8px] rounded-[4px] w-[91%]">
              <div className="bg-[#09DD49] w-[3%] h-full rounded-[8px]"></div>
            </div>
            <p>0%</p>
          </div>
        </div>
        <div
          className="bg-white h-[100px] rounded-[10px] px-[20px] py-[17px] flex flex-col justify-between cursor-pointer"
          onClick={() => handleToggleMandatoryDocumentsModal()}
        >
          <div className="flex items-center">
            <Image src={MandatoryDouments} alt="" />
            <p className="ml-2">Mandatory Documents</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="bg-[#F5F5F5] h-[8px] rounded-[4px] w-[91%]">
              <div className="bg-[#09DD49] w-[3%] h-full rounded-[8px]"></div>
            </div>
            <p>0%</p>
          </div>
        </div>
        <button className="bg-[#2C698D] text-white w-[200px] h-[36px] rounded-[4px] ml-auto justify-self-end">
          Submit For Review
        </button>
      </div>
    </div>
    </>

  );
};

export default StartHere;
