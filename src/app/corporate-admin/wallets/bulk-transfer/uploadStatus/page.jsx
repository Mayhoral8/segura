import React from "react";
import Image from "next/image";

// asset importation
import BackArrow from "../../../../../assets/adminDashboard/arrowback.svg";

const UploadStatus = () => {
  return (
    <div className="h-full w-full relative px-[100px] py-[50px] overflow-hidden">
      <div
        className="absolute left-[50px] cursor-pointer"
        //   onClick={() => handleToggleBusinessInfoModal()}
      >
        <Image src={BackArrow} alt="back arrow" />
      </div>
      <div className="h-full w-full overflow-scroll relative">
        <div className="flex justify-between items-center">
          <div className="">
            <h4 className="text-[#1F1F1F] text-[20px] font-bold">
              Upload Status
            </h4>
          </div>
        </div>
        <p className="text-[#787878] text-[14px] mt-[40px] mb-2">
          Pending Transaction
        </p>
        <div className="">
          {/* <div className="mt-[30px] pt-10">
            <p className="text-center">No pending Transactions</p>
          </div> */}
          <div className="mt-5">
            <div className="w-[520px] h-[66px] flex flex-col justify-center p-5 mb-5 shadow-md">
              <div className="flex justify-between w-full">
                <div className="text-[14px] text-[#1F1F1F] font-bold">
                  HR Team
                </div>
                <div className="text-[14px] text-[#1F1F1F] font-bold">
                  NGN 20,005,000.00
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="text-[12px]">
                  Microsoft PDF Document/HR Team/ 250 KB{" "}
                </div>
                <div className="text-[12px] text-[#F5222D]">
                  7 Pending Payments
                </div>
              </div>
            </div>
            <div className="w-[520px] h-[66px] flex flex-col justify-center p-5 mb-5 shadow-md">
              <div className="flex justify-between w-full">
                <div className="text-[14px] text-[#1F1F1F] font-bold">
                  HR Team
                </div>
                <div className="text-[14px] text-[#1F1F1F] font-bold">
                  NGN 20,005,000.00
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="text-[12px]">
                  Microsoft PDF Document/HR Team/ 250 KB{" "}
                </div>
                <div className="text-[12px] text-[#F5222D]">
                  7 Pending Payments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadStatus;
