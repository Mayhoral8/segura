"use client";
import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import PersonalInfo from "../../../assets/adminDashboard/personalInfo.svg";
import BusinessInfo from "../../../assets/adminDashboard/businessInfo.svg";
import BusinessPartnerInfo from "../../../assets/adminDashboard/businessPartnerInfo.svg";
import MandatoryDouments from "../../../assets/adminDashboard/mandatoryDocs.svg";
import BusinessInfoModal from "./businessInfoModal";
import MandatoryDocumentsModal from "./mandatoryDocumentsModal";
import BusinessParnerInfoModal from "./businessPartnerInfoModal";
import TopBar from "../topbar";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import { RiCheckboxFill } from "react-icons/ri";
import { RiCheckboxBlankLine } from "react-icons/ri";

const StartHere = () => {
  const { spinner, errorModal } = useContext(ConfigContext);
  const { setShowSpinner } = spinner;
  const { setErrorMsg, setShowErrorModal } = errorModal;
  const { data: session } = useSession();
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

  const getPrimaryBusinessInfo = async () => {
    console.log(session?.user);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding?corporateAdminEmail=${session?.user?.corporateAdminEmail}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(response.error);
        throw new Error(response.error);
      }
      localStorage.setItem("corporateId", responseData.data.id);
      return responseData;
    } catch (error) {
      console.log(error);
      setShowSpinner(false);
      setShowErrorModal(true);
      setErrorMsg(error.message);
      return err.message;
    }
  };

  const getListOfDirectors = async () => {
    const corporateId = localStorage.getItem("corporateId");
    if (corporateId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/${corporateId}/directors`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          console.log(response.error);
          throw new Error(response.error);
        }
        return responseData;
      } catch (error) {
        console.log(error);
        setShowSpinner(false);
        setShowErrorModal(true);
        setErrorMsg(error.message);
        return err.message;
      }
    }
  };

  const getMandatoryDocs = async () => {
    const corporateId = localStorage.getItem("corporateId");
    if (corporateId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/${corporateId}/documents`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          console.log(response.error);
          throw new Error(response.error);
        }
        return responseData;
      } catch (error) {
        console.log(error);
        setShowSpinner(false);
        setShowErrorModal(true);
        setErrorMsg(error.message);
        return err.message;
      }
    }
  };
  const {
    data: responseData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["primaryBusinessInfo"],
    queryFn: getPrimaryBusinessInfo,
  });
  const { data: directorsInfo } = useQuery({
    queryKey: ["list-of-directors"],
    queryFn: getListOfDirectors,
  });
  const { data: mandatoryDocsRaw } = useQuery({
    queryKey: ["corporate-mandatory-docs"],
    queryFn: getMandatoryDocs,
  });

  const directorsList = directorsInfo?.data;

  const mandatoryDocs = mandatoryDocsRaw?.data;

  const uploadedDetails = responseData?.data;

  const isDetailsUploaded = uploadedDetails?.businessName;

  useEffect(() => {
    isLoading ? setShowSpinner(true) : setShowSpinner(false);
  }, [isLoading]);

  let corporateDocuments = [];
  mandatoryDocs?.map((doc, index) => {
    doc.documentName === "Certificate of Incorporation" &&
      doc.documentUrl &&
      corporateDocuments.push(doc);
  });
  mandatoryDocs?.map((doc, index) => {
    doc.documentName === "Memorandum & Articles of Assosciation" &&
      doc.documentUrl &&
      corporateDocuments.push(doc);
  });
  mandatoryDocs?.find((doc, index) => {
    doc.documentName === "Statement of Share Capital" &&
      doc.documentUrl &&
      corporateDocuments.push(doc);
  });
  mandatoryDocs?.find((doc, index) => {
    doc.documentName === "Approval for Account Opening" &&
      doc.documentUrl &&
      corporateDocuments.push(doc);
  });
  return (
    <>
      <TopBar page="Onboarding" />
      <div className="px-8 py-4 min-h-screen flex flex-col">
        <BusinessInfoModal
          toggleBusinessInfoModal={toggleBusinessInfoModal}
          handleToggleBusinessInfoModal={handleToggleBusinessInfoModal}
          isDetailsUploaded={isDetailsUploaded}
          uploadedDetails={uploadedDetails}
        />
        <MandatoryDocumentsModal
          handleToggleMandatoryDocumentsModal={
            handleToggleMandatoryDocumentsModal
          }
          toggleMandatoryDocumentsModal={toggleMandatoryDocumentsModal}
          mandatoryDocs={mandatoryDocs}
        />
        <BusinessParnerInfoModal
          toggleBusinessParnerInfoModal={toggleBusinessParnerInfoModal}
          handleToggleBusinessParnerInfoModal={
            handleToggleBusinessParnerInfoModal
          }
          directorsList={directorsList}
        />
        <div className="bg-[#272643] w-full py-[26px] px-[23px] text-[#F0F0F0] rounded-[4px]">
          <h3 className="text-[30px] font-medium mb-2">
            Congratulations you made it
          </h3>
          <p className="text-[18px]">
            Welcome to your dashboard. Your account is currently in demo mode.
            To go live and begin transacting payments, there are a few steps to
            complete. Follow the guide below to activate your account.
          </p>
        </div>
        <div className="flex flex-col w-full gap-5 mt-5">
          <div
            className="bg-white h-[100px] rounded-[10px] px-[20px] py-[17px] flex items-center justify-between cursor-pointer"
            onClick={handleToggleBusinessInfoModal}
          >
            <div className="flex items-center">
              <Image src={BusinessInfo} alt="" />
              <p className="ml-2">Business Information</p>
            </div>
            <p className="text-4xl text-[#2C698D] ">
              {isDetailsUploaded ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
            </p>
          </div>
          <div
            className="bg-white h-[100px] rounded-[10px] px-[20px] py-[17px] flex items-center justify-between cursor-pointer"
            onClick={() => handleToggleBusinessParnerInfoModal()}
          >
            <div className="flex items-center">
              <Image src={BusinessPartnerInfo} alt="" />
              <p className="ml-2">Business Partner Information</p>
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="bg-[#F5F5F5] h-[8px] rounded-[4px] w-[91%]">
                <div className="bg-[#09DD49] w-[3%] h-full rounded-[8px]"></div>
              </div>
              <p>0%</p>
            </div> */}
            <p className="text-4xl text-[#2C698D] ">
              {directorsList?.length >= 1 ? (
                <RiCheckboxFill />
              ) : (
                <RiCheckboxBlankLine />
              )}
            </p>
          </div>
          <div
            className="bg-white h-[100px] rounded-[10px] px-[20px] py-[17px] flex items-center justify-between cursor-pointer"
            onClick={() => handleToggleMandatoryDocumentsModal()}
          >
            <div className="flex items-center">
              <Image src={MandatoryDouments} alt="" />
              <p className="ml-2">Mandatory Documents</p>
            </div>
            <p className="text-4xl text-[#2C698D] ">
              {mandatoryDocs?.length >= 1 ? (
                <RiCheckboxFill />
              ) : (
                <RiCheckboxBlankLine />
              )}
            </p>
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
