"use client";
import React, { useContext } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { useRouter } from "next/navigation";
import { AnimateRightModal } from "../../../components/Animate";

const CorporateDetailsModal = () => {
  const router = useRouter();
  const { showCorporateDetails, setShowCorporateDetails, userContext } =
    useContext(ConfigContext);
  const { userInView } = userContext;

  const hideModal = () => {
    setShowCorporateDetails(false);
  };

  return (
    <AnimateRightModal isVisible={showCorporateDetails}>
      <section className="absolute h-full w-[600px] bg-white overflow-y-scroll">
        <div className="flex flex-row justify-between px-4 items-center text-lg fixed bg-white top-0 w-[600px] z-10 shadow-sm py-2">
          <span className=" font-semibold">Corporate Info</span>
          <HiMiniXMark
            onClick={hideModal}
            className="border text-2xl rounded-md cursor-pointer"
          />
        </div>

        <section className="flex flex-col gap-y-2 mt-10">
          <article className="w-full flex flex-col mt-2 ">
            <div className=" flex flex-col w-[92%] h-[80%] justify-center items-center mx-auto gap-y-2 bg-[#efefef] mt-4">
                <div className="flex flex-row justify-between px-2 gap-x-2  w-full items-center rounded-sm py-1">
                  <span className="font-light text-sm">First Name</span>
                  <span className="font-semibold">
                    {" "}
                    {userInView.firstName}{" "}
                  </span>
                </div>
                <div className="flex flex-row justify-between px-2 gap-x-2  w-full items-center rounded-sm py-1">
                  <span className="font-light text-sm">Last Name</span>
                  <span className="font-semibold">{userInView.lastName} </span>
                </div>
  

                <div className="flex flex-row justify-between px-2 gap-x-2  w-full items-center rounded-sm py-1">
                  <span className="font-light text-sm">Username</span>
                  <span className="font-semibold">{userInView.username} </span>
                </div>
                <div className="flex flex-row justify-between px-2 gap-x-2  w-full items-center rounded-sm py-1">
                  <span className="font-light text-sm">Email</span>
                  <span className="font-semibold">{userInView.email} </span>
                </div>

                <div className="flex flex-row justify-between px-2 gap-x-2  w-full items-center rounded-sm py-1">
                  <span className="font-light text-sm">Phone Number</span>
                  <span className="font-semibold">
                    {userInView.phoneNumber}{" "}
                  </span>
                </div>
                <div className="flex flex-row justify-between px-2 gap-x-2  w-full items-center rounded-sm py-1">
                  <span className="font-light text-sm">Verified</span>
                  <span className="font-semibold">
                    {String(userInView.verified)}{" "}
                  </span>
                </div>

            </div>
          </article>
        </section>
      </section>
    </AnimateRightModal>
  );
};

export default CorporateDetailsModal;
