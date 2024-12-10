import React, { useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";
import { PiSpinnerGapBold } from "react-icons/pi";
import { CgSpinner } from "react-icons/cg";

export default function Spinner() {
  const { showSpinner } = useContext(ConfigContext).spinner;

  if (showSpinner) {
    return (
      <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center  bg-[rgba(0,0,0,0.36)]  z-50 fixed ">
        <CgSpinner className=" text-4xl animate-spin text-[#2c698d] " />
      </div>
    );
  }
}
