import React from "react";
import AnimateButton from "@/components/@extended/AnimateButton";

const RequestFundingInfo = ({ nextStep }) => {
  const handleFormIndex = () => {
    nextStep();
  };
  return (
    <div className="flex flex-col items-center justify-between gap-y-10 py-4  h-[400px]">
      <h2 className="text-xl text-[#2c698d]">Request Funding Account</h2>
      <p className="text-center text-lg font-light">
        This works just like a regular bank account. You will be given an GBP
        bank account which can be used in receiving GBP.
      </p>
      <div className="flex flex-row gap-x-2 justify-center">
        <AnimateButton>
          <button className="border px-2 py-2 w-20 border-[#2c698d] text-gray-950 rounded-md">
            Cancel
          </button>
        </AnimateButton>
        <AnimateButton>
          <button
            type="submit"
            className={`border px-2 py-2 w-20 bg-[#2c698d] text-white rounded-md`}
            onClick={handleFormIndex}
          >
            Next
          </button>
        </AnimateButton>
      </div>
    </div>
  );
};

export default RequestFundingInfo;
