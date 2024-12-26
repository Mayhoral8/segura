import Image from "next/image";
import React from "react";

// media imports
import LeftArrow from "../../../../assets/adminDashboard/arrowback.svg";
import NGFlag from "../../../../assets/adminDashboard/NGFlag.svg";
import USFlag from "../../../../assets/adminDashboard/UsFlag.svg";
import UkFlag from "../../../../assets/adminDashboard/UkFlag.svg";
import Copy from "../../../../assets/adminDashboard/copy.svg";

const Cashdepositmodal = ({
  toggleCashDepositModal,
  handleCashDepositModal,
}) => {
  const wallets = [
    {
      flag: NGFlag,
      currency: "Naira Wallet",
      accountName: "Jones and firms limited",
      accountNumber: "708899797755677",
    },
    {
      flag: USFlag,
      currency: "USD Wallet",
      accountName: "Jones and firms limited",
      accountNumber: "708899797755677",
    },
    {
      flag: UkFlag,
      currency: "Euro Wallet",
      accountName: "Jones and firms limited",
      accountNumber: "708899797755677",
    },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Account number copied to clipboard!");
  };

  return (
    <>
      {toggleCashDepositModal && (
        <div className="flex absolute top-0 left-0 flex-col items-center bg-white w-full py-[50px] px-[100px]">
          <div
            className="absolute left-[50px] top-[50px] cursor-pointer "
            onClick={() => handleCashDepositModal()}
          >
            <Image src={LeftArrow} alt="close" />
          </div>
          <div className="w-full bg-white">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold leading-none    ">
                Cash Deposit/ Bank Transfer
              </h1>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Transfer desired amount to your wallet using either account number
              below.
            </p>
            <div className="space-y-4">
              {wallets.map((wallet, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white hover:shadow-sm"
                >
                  <div className="flex items-start">
                    <Image className="mr-2" src={wallet.flag} />
                    <div className="">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-medium text-gray-800 leading-none">
                          {wallet.currency}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        <p className="text-[12px]">Account Name</p>
                        <p className="text-gray-800 font-semibold text-base">
                          {wallet.accountName}
                        </p>
                      </p>
                      <div className="text-gray-500 mt-1">
                        <p className="text-[12px]">Account Number</p>
                        <p className="text-gray-800 font-semibold text-[24px] flex items-center">
                          {wallet.accountNumber}
                          <div
                            onClick={() =>
                              copyToClipboard(wallet.accountNumber)
                            }
                            className="ml-3 cursor-pointer"
                          >
                            <Image src={Copy} alt="copy" />
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cashdepositmodal;
