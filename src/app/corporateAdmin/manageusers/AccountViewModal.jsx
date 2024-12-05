"use client";
import React, { useContext } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { ConfigContext } from "@/contexts/ConfigContext";
import { useRouter } from "next/navigation";
import { AnimateRightModal } from "../../../components/Animate";
import TransactionsHistory from "../dashboard/TransactionsHistory";
import { Checkbox } from "@mui/material";

const AccountViewModal = () => {
  const router = useRouter();
  const { showAccountDetailsModal, setShowAccountDetailsModal } =
    useContext(ConfigContext);

  const hideModal = () => {
    setShowAccountDetailsModal(false);
  };

  const viewTxn = () => {
    router.push(
      "/corporate/accounts/view/a4afdede-9e3e-4698-b745-4653f30f80c5"
    );
  };

  return (
    <AnimateRightModal isVisible={showAccountDetailsModal}>
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
            <span className="ml-6  capitalize font-semibold text-[#2c698d]">
              Primary
            </span>
            <div className=" flex flex-col w-[92%] h-[80%] mx-auto gap-y-2">
              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Corporate Name</span>
                  <span className="font-semibold"> Lorem </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Corporate Address</span>
                  <span className="font-semibold">Doe </span>
                </div>
              </article>

              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Corporate Email</span>
                  <span className="font-semibold">Roberts </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">
                    Corporate Phone Number
                  </span>
                  <span className="font-semibold">+2340985761346 </span>
                </div>
              </article>
              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">
                    Corporate Reg Number
                  </span>
                  <span className="font-semibold">12345678901 </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Corporate Id</span>
                  <span className="font-semibold">CORP123 </span>
                </div>
              </article>
            </div>
          </article>
          <article>
            <span className="ml-6 capitalize font-semibold text-[#2c698d]">
              Account References
            </span>
            <div className=" flex flex-col w-[92%] h-[80%] mx-auto  gap-y-2 text-xs">
              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Account Number</span>
                  <span className="font-semibold">8997330993 </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Currency</span>
                  <span className="font-semibold">NGN</span>
                </div>
              </article>

              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Status</span>
                  <span className="font-semibold">Active </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Account Id</span>
                  <span className="font-semibold text-[11px]">
                    a4afdede-9e3e-4698-b745-4653f30f80c5{" "}
                  </span>
                </div>
              </article>
            </div>
          </article>
          <article className="">
            <span className="ml-6  capitalize font-semibold text-[#2c698d]">
              Identifications
            </span>
            <div className=" flex flex-col w-[92%] h-[80%] mx-auto  gap-y-2 text-xs">
              <article className="flex flex-row justify-between items-center gap-x-4">
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Type</span>
                  <span className="font-semibold">PASSPORT </span>
                </div>
                <div className="flex flex-col justify-between px-2 gap-x-2 bg-[#efefef] w-[50%] items-center rounded-sm py-1">
                  <span className="font-light text-xs">Passport No</span>
                  <span className="font-semibold">P123456789 </span>
                </div>
              </article>
            </div>
          </article>
        </section>

        <div className="px-4 mt-4">
          <h3 className="font-semibold text-lg">User Permissions</h3>
          <div className="">
            <div className="flex flex-row justify-between w-full items-center mt-4">
              <span>Permissions</span>
              <div className="flex flex-row gap-x-4">
                <span>Select</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-4 ">
              <div className="flex flex-col w-full  bg-white">
                <article className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-y-4">
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                  </div>
                  <article className="flex flex-col">
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          color: "#2c698d",
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                  </article>
                </article>
              </div>
              <div className="flex flex-col w-full  bg-white">
                {/* <span className="font-bold text-lg color-[#272643]">
                  Account
                </span> */}
                <article className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-y-4">
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                  </div>
                  <article className="flex flex-col">
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                  </article>
                </article>
              </div>
              <div className="flex flex-col w-full  bg-white">
                {/* <span className="font-bold text-lg color-[#272643]">
                  Wallets
                </span> */}
                <article className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-y-4">
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                  </div>
                  <article className="flex flex-col">
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                  </article>
                </article>
              </div>
              <div className="flex flex-col w-full  bg-white">
                {/* <span className="font-bold text-lg color-[#272643]">
                  Transaction
                </span> */}
                <article className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-y-4">
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                    <span>Lorem</span>
                  </div>
                  <article className="flex flex-col">
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4 text-2xl">
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c698d",
                          },
                        }}
                      />
                    </div>
                  </article>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </main> */}
    </AnimateRightModal>
  );
};

export default AccountViewModal;
