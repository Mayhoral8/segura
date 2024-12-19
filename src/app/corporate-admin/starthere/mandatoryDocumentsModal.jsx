import React from "react";
import Image from "next/image";
import Uploader from "../../../components/Uploader";

// assets import
import BackArrow from "../../../assets/adminDashboard/arrowback.svg";
import FileInputIcon from "../../../assets/adminDashboard/fileIcon.svg";

const MandatoryDocumentsModal = ({
  toggleMandatoryDocumentsModal,
  handleToggleMandatoryDocumentsModal,
}) => {
  return (
    <>
      {toggleMandatoryDocumentsModal && (
        <div className="w-screen min-h-screen backdrop-blur-[7px] bg-[#0D1012B2] fixed py-[20px] top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white min-h-[90vh] w-[784px] relative px-[100px] py-[50px]">
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
              <button className="h-[36px] w-[100px] rounded-[4px] bg-[#2C698D] text-white">
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
                  <Uploader />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Memorandum & Articles of Assosciation
                  </label>
                  <Uploader />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Form CAC 2 (Statement of Share Capital)
                  </label>
                  <Uploader />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="flex text-[#787878] text-[14px]">
                    <Image src={FileInputIcon} alt="" className="mr-2" />
                    Approval for Account Opening
                  </label>
                  <Uploader />
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
