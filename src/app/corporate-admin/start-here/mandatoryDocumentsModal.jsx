"use client";
import React, { useContext } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext";
import Image from "next/image";
import Uploader from "../../../components/Uploader2";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// assets import
import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import FileInputIcon from "../../../assets/adminDashboard/fileIcon.svg";
import { MdVerified } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";

const MandatoryDocumentsModal = ({
  toggleMandatoryDocumentsModal,
  handleToggleMandatoryDocumentsModal,
  mandatoryDocs,
}) => {
  const { data: session } = useSession();
  const { corporateDocs, spinner } = useContext(ConfigContext);
  const { setShowSpinner } = spinner;
  const queryClient = useQueryClient();

  const upload = async () => {
    const corporateId = localStorage.getItem("corporateId");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/onboarding/${corporateId}/documents`,
        {
          method: "POST",
          body: JSON.stringify(corporateDocs),
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      console.log(response);
      if (!response.ok) {
        console.log(response.error);
        throw new Error(response.error);
      }
      toast.success("Details Update Succesful!");
      queryClient.invalidateQueries(["corporate-mandatory-docs"]);
      handleToggleMandatoryDocumentsModal();

      setShowSpinner(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setShowSpinner(false);
      // setShowErrorModal(true);
      // setErrorMsg(error.message);
    }
  };
  const certOfIncDoc = mandatoryDocs?.data?.find((doc, index) => {
    return doc.documentName === "Certificate of Incorporation";
  });
  const memoDoc = mandatoryDocs?.data?.find((doc, index) => {
    return doc.documentName === "Memorandum & Articles of Assosciation";
  });
  const statementOfShareDoc = mandatoryDocs?.data?.find((doc, index) => {
    return doc.documentName === "Statement of Share Capital";
  });
  const approvalOfAccOpening = mandatoryDocs?.data?.find((doc, index) => {
    return doc.documentName === "Approval for Account Opening";
  });

  console.log(memoDoc);
  
  return (
    <>
      {toggleMandatoryDocumentsModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] fixed py-[20px]bottom-0 right-0 top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white h-[100vh] w-[784px] relative px-[100px] py-[50px]">
            <div
              className="absolute left-[50px] cursor-pointer"
              onClick={() => handleToggleMandatoryDocumentsModal()}
            >
              <Image src={BackArrow} alt="back arrow" />
            </div>
            <div className="flex justify-between items-center">
              <div className="">
                <h4 className="text-[#1F1F1F] text-[20px] font-bold">
                  Mandatory documents
                </h4>
              </div>
              <button
                className="h-[36px] w-[100px] rounded-[4px] bg-[#2C698D] text-white"
                onClick={upload}
              >
                Save
              </button>
            </div>
            <p className="text-[#787878] text-[14px] mt-1 mb-5">
              Fill the necessary fields below with details about yourself
            </p>
            <div className="flex w-full justify-between mt-3">
              <div className="w-[47%]">
                <h4 className="font-bold mb-2">Image requirements</h4>
                <ul className="ml-5 list-disc text-[#787878] leading-6">
                  <li>File size not more than 3MB</li>
                  <li>BMP, JPG, JPEG or PNG format</li>
                  <li>Contained your name and address</li>
                  <li>Issues within the last 1 year</li>
                  <li>
                    Accepted Valid ID (International Passport/ National ID/
                    Drivers License)
                  </li>
                </ul>
              </div>
              <div className="w-[50%]">
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Certificate of Incorporation
                  </label>

                  {certOfIncDoc?.documentUrl ? (
                    <div
                       // Ensure unique keys for each mapped item
                      className="border h-[60px] rounded-md flex items-center justify-center text-[#787878] gap-x-2"
                    >
                      <span className="text-sm">Document Uploaded</span>
                      <MdVerified className="text-green-400 text-2xl" />
                    </div>
                  ) : (
                    <Uploader
                       // Use a unique key for this component as well
                      type="Certificate of Incorporation"
                      user="corporate"
                    />
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Memorandum & Articles of Assosciation
                  </label>

                  {memoDoc?.documentUrl ? (
                    <div
                       // Ensure unique keys for each mapped item
                      className="border h-[60px] rounded-md flex items-center justify-center text-[#787878] gap-x-2"
                    >
                      <span className="text-sm">Document Uploaded</span>
                      <MdVerified className="text-green-400 text-2xl" />
                    </div>
                  ) : (
                    <Uploader
                       // Use a unique key for this component as well
                      type="Memorandum & Articles of Assosciation"
                      user="corporate"
                    />
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Form CAC 2 (Statement of Share Capital)
                  </label>
                  {statementOfShareDoc?.documentUrl ? (
                    <div
                       // Ensure unique keys for each mapped item
                      className="border h-[60px] rounded-md flex items-center justify-center text-[#787878] gap-x-2"
                    >
                      <span className="text-sm">Document Uploaded</span>
                      <MdVerified className="text-green-400 text-2xl" />
                    </div>
                  ) : (
                    <Uploader
                       // Use a unique key for this component as well
                      type="Statement of Share Capital"
                      user="corporate"
                    />
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Approval for Account Opening
                  </label>
                  {approvalOfAccOpening?.documentUrl ? (
                    <div
                       // Ensure unique keys for each mapped item
                      className="border h-[60px] rounded-md flex items-center justify-center text-[#787878] gap-x-2"
                    >
                      <span className="text-sm">Document Uploaded</span>
                      <MdVerified className="text-green-400 text-2xl" />
                    </div>
                  ) : (
                    <Uploader
                       // Use a unique key for this component as well
                      type="Approval for Account Opening"
                      user="corporate"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MandatoryDocumentsModal;
