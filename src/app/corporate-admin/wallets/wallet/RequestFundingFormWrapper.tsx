"use client";
import React, { useState } from "react";
import { AnimateModal , AnimateSlide } from "../../../../components/Animate";
import RequestFundingForm from "./RequestFundingForm";
// import { HiMiniXMark } from "react-icons/hi2";
import RequestFundingInfo from "./RequestFundingInfo";


const RequestFundingFormWrapper = ({ showReqFundForm, setShowReqFundForm }) => {
  const [currFormIndex, setCurrFormIndex] = useState<number>(1);
  const [direction, setDirection] = useState(-1);

  const nextStep = () => {
    setDirection(1); // Moving forward
    setCurrFormIndex((prev) => prev + 1);
  };
  
  const prevStep = () => {
    setDirection(-1); // Moving backward
    setCurrFormIndex((prev) => prev - 1);
  };
  
  const handleCloseForm = () => {
    setShowReqFundForm(false);
    setCurrFormIndex(1)
    setDirection(-1)
  };
  return (
    <AnimateModal isVisible={showReqFundForm}>
      <main className="bg-white w-[500px] h-[500px] px-10 py-2 gap-y-2 border over flex flex-col items-center overflow-hidden">
        {/* <HiMiniXMark
          onClick={handleCloseForm}
          className="text-3xl ml-auto cursor-pointer border rounded-md"
        /> */}
        <span className="text-lg border px-2 py-1 rounded-xl inline-block font-light">
          Step {currFormIndex} of 2
        </span>

        <AnimateSlide currFormIndex={currFormIndex} direction={direction}>
          

          {currFormIndex === 1 ? (
            <RequestFundingInfo nextStep={nextStep}/>
          ) : (
            <RequestFundingForm prevStep={prevStep}/>
          )}
          

        </AnimateSlide>
      </main>
    </AnimateModal>
  );
};

export default RequestFundingFormWrapper;
