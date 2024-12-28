import React from "react";
import CheckMark from "@/assets/auth/greenCheck.svg";
import Image from "next/image";

const SecurityPinModal = () => {
  return (
    <div className="w-screen h-screen backdrop-blur-[7px] bg-[#0D1012B2] z-50 absolute top-0 left-0 flex justify-center items-center">
      {/* verification code */}
      {/* <div className="bg-white p-10 w-[500px] rounded-[4px]">
        <h3 className="text-[20px] font-bold">Verify Email Address</h3>
        <p className="text-[#787878] text-sm">We sent you a mail</p>

        <div className="mt-[20px]">
          <p className="text-sm mb-5">
            Enter verification code sent to you on jone****@company.com
          </p>
          <div className="flex justify-between mb-5">
            <input
              type="text"
              placeholder="9"
              maxLength={1}
              className="placeholder:text-[#D9D9D9] w-[83.5px] flex-shrink-0 border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
            />
            <input
              type="text"
              placeholder="9"
              maxLength={1}
              className="placeholder:text-[#D9D9D9] w-[83.5px] flex-shrink-0 border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
            />
            <input
              type="text"
              placeholder="9"
              maxLength={1}
              className="placeholder:text-[#D9D9D9] w-[83.5px] flex-shrink-0 border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
            />
            <input
              type="text"
              placeholder="0"
              maxLength={1}
              className="placeholder:text-[#D9D9D9] w-[83.5px] flex-shrink-0 border-[#D9D9D9] border-[1px] border-solid focus:outline-none px-3 text-xs h-10 rounded-[4px]"
            />
          </div>
          <button className="capitalize text-white bg-[#2C698D] outline-none border-none w-full h-[40px] rounded-[4px] text-sm mb-5">
            continue
          </button>
          <div className="flex justify-between">
            <p className="text-sm text-[#1f1f1f] w-[278px]">
              Did not receive the email? Check your spam filter, or
            </p>
            <p className="text-[#1890FF] text-sm ">Resend Code</p>
          </div>
        </div>
      </div> */}
      {/* verification success */}
      <div className="bg-white px-10 py-[50px] w-[500px] rounded-[4px] flex flex-col items-center">
        <Image src={CheckMark} alt="checkmark" className="mb-[2px]" />
        <p className="text-[#262626] text-[20px] mb-[5px] font-bold">
          Verification success!
        </p>
        <p className="text-[#8C8C8C] mb-[30px]">
          Your email has been verified successfully{" "}
        </p>
        <button className="capitalize text-white bg-[#2C698D] outline-none border-none w-[400px] h-[40px] rounded-[4px] text-sm">
          continue
        </button>
      </div>
    </div>
  );
};

export default SecurityPinModal;
