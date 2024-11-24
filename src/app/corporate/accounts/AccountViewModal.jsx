"use client"
import React, { useContext } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { ConfigContext } from "@/contexts/ConfigContext";
import { useRouter } from "next/navigation";

const AccountViewModal = () => {
  const router = useRouter()
  const { showAccountDetailsModal, setShowAccountDetailsModal } =
    useContext(ConfigContext);

  const hideModal = () => {
    setShowAccountDetailsModal(false);
  };

  const viewTxn = ()=>{
      router.push("/corporate/accounts/view/a4afdede-9e3e-4698-b745-4653f30f80c5")
  }

  if (showAccountDetailsModal) {
    return (
      <main className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50 h-full px-5">
        <section className="h-[95%] w-[30%] bg-white ml-auto rounded-lg">
          <div className="flex flex-row justify-between px-4 items-center mt-2 text-lg">
            <span className=" font-semibold">Account Details</span>
            <HiMiniXMark
              onClick={hideModal}
              className="border text-2xl rounded-md cursor-pointer"
            />
          </div>

          <section className="flex flex-col gap-y-2">
            <article className="w-full flex flex-col mt-2 text-xs">
              <span className="ml-5 text-xs capitalize font-semibold text-[#2c698d]">
                Primary
              </span>
              <div className=" flex flex-col w-[90%] h-[80%] mx-auto rounded-md border gap-y-2">
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">First Name</span>
                  <span>John </span>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Last Name</span>
                  <span>Doe</span>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Middle Name</span>
                  <span>Robert</span>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Phone Number</span>
                  <span>+1234567890</span>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">BVN</span>
                  <span>12345678901</span>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Email</span>
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Date of Birth</span>
                  <span>1990-01-01</span>
                </div>
                <div className="flex flex-row justify-between px-2 ">
                  <span className="font-light">Corporate Id</span>
                  <span>CORP123</span>
                </div>
              </div>
            </article>
            <article>
              <span className="ml-5 text-xs capitalize font-semibold text-[#2c698d]">
                Account References
              </span>
              <div className=" flex flex-col w-[90%] h-[80%] mx-auto rounded-md border gap-y-2 text-xs">
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Account Number</span>
                  <span>8976746772</span>
                </div>

                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Currency</span>
                  <span>USD</span>
                </div>

                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Status</span>
                  <span>INACTIVE</span>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Lien Status</span>
                  <span>FALSE</span>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Account ID</span>
                  <span>a4afdede-9e3e-4698-b745-4653f30f80c5</span>
                </div>
              </div>
            </article>
            <article className="">
              <span className="ml-5 text-xs capitalize font-semibold text-[#2c698d]">
                Identifications
              </span>
              <div className=" flex flex-col w-[90%] h-[80%] mx-auto rounded-md border gap-y-2 text-xs">
                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Type</span>
                  <span>PASSPORT</span>
                </div>

                <div className="flex flex-row justify-between px-2">
                  <span className="font-light">Number</span>
                  <span>P123456789</span>
                </div>
              </div>
            </article>
          </section>

          <button onClick={viewTxn} className="bg-[#2c698d] w-32 h-8 rounded-sm text-white mx-auto block mt-2">
            View Txn History
          </button>
        </section>
      </main>
    );
  }
};

export default AccountViewModal;
