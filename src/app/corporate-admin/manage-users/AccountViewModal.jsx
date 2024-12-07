"use client";
import React, { useContext } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { useRouter } from "next/navigation";
import { AnimateRightModal } from "../../../components/Animate";
import TransactionsHistory from "../dashboard/TransactionsHistory";
import { Checkbox } from "@mui/material";
import Link from "next/link";

const AccountViewModal = () => {
  const router = useRouter();
  const { showCorporateDetails, setShowCorporateDetails, userContext } =
    useContext(ConfigContext);
    const {userInView, setUserInView} = userContext

    console.log(userInView);
    

  const hideModal = () => {
    setShowCorporateDetails(false);
  };

  const viewTxn = () => {
    router.push(
      "/corporate/accounts/view/a4afdede-9e3e-4698-b745-4653f30f80c5"
    );
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
            
            <div className=" flex flex-col w-[92%] h-[80%] mx-auto gap-y-2">
              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">First Name</span>
                  <span className="font-semibold"> {userInView.firstName} </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Last Name</span>
                  <span className="font-semibold">{userInView.lastName} </span>
                </div>
              </article>

              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Username</span>
                  <span className="font-semibold">{userInView.username} </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">
                    Email
                  </span>
                  <span className="font-semibold">{userInView.email} </span>
                </div>
              </article>
              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">
                    Phone Number
                  </span>
                  <span className="font-semibold">{userInView.phoneNumber} </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Verified</span>
                  <span className="font-semibold">{String(userInView.verified)} </span>
                </div>
              </article>
            </div>
          </article>
          
        </section>

      
        {/* <div className="fixed bottom-0 bg-white flex items-center justify-center border w-[600px] z-10 shadow-sm mt-2">
          <button className="bg-[#2C698D] w-32 rounded-sm h-8 block mx-auto items-center text-white mb-2 mt-2">
            <Link href="/corporateAdmin/manage-users/verify">
            Verify
            </Link>
          </button>
        </div> */}
      </section>
      {/* </main> */}
    </AnimateRightModal>
  );
};

export default AccountViewModal;
