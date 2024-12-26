"use client";
import React, { useState } from "react";
import MyWallet from "./my-wallet/page";
import SendMoney from "./send-money/page";
import TopUpWallet from "./topup-wallet/page";
import ConvertFunds from "./convert-funds/page";
import TopBar from "../topbar";

const Page = () => {
  const [walletTab, setWalletTab] = useState({
    myWallets: true,
    sendMoney: false,
    topUpWallet: false,
    convertFunds: false,
  });

  const handleActiveTab = (type) => {
    type === "MY_WALLET"
      ? setWalletTab({
          ...walletTab,
          myWallets: true,
          sendMoney: false,
          topUpWallet: false,
          convertFunds: false,
        })
      : type === "SEND_MONEY"
      ? setWalletTab({
          ...walletTab,
          myWallets: false,
          sendMoney: true,
          topUpWallet: false,
          convertFunds: false,
        })
      : type === "TOP_UP_WALLET"
      ? setWalletTab({
          ...walletTab,
          myWallets: false,
          sendMoney: false,
          topUpWallet: true,
          convertFunds: false,
        })
      : type === "CONVERT_FUNDS"
      ? setWalletTab({
          ...walletTab,
          myWallets: false,
          sendMoney: false,
          topUpWallet: false,
          convertFunds: true,
        })
      : { ...walletTab };
  };

  return (
    <>
      <TopBar page="Wallets" />
      <main className="px-8 min-h-[88vh]">
        <section className="h-[56px] bg-white w-full mt-4 flex gap-x-10 px-2 rounded-md text-[#8C8C8C] text-sm">
          <article
            className={`${
              walletTab.myWallets &&
              " border-b-2 border-[#2C698D] text-[#2C698D]"
            } h-full flex items-end w-32 justify-center cursor-pointer`}
            onClick={() => handleActiveTab("MY_WALLET")}
          >
            <h2 className="pb-3" font-medium>
              My wallet
            </h2>
          </article>
          <article
            className={`${
              walletTab.sendMoney &&
              " border-b-2 border-[#2C698D] text-[#2C698D]"
            } h-full flex items-end w-32 justify-center cursor-pointer`}
            onClick={() => handleActiveTab("SEND_MONEY")}
          >
            <h2 className="pb-3 font-medium">Send Money</h2>
          </article>
          <article
            className={`${
              walletTab.topUpWallet &&
              " border-b-2 border-[#2C698D] text-[#2C698D]"
            } h-full flex items-end w-32 justify-center cursor-pointer`}
            onClick={() => handleActiveTab("TOP_UP_WALLET")}
          >
            <h2 className="pb-3 font-medium">Top up wallet</h2>
          </article>
          <article
            className={`${
              walletTab.convertFunds &&
              " border-b-2 border-[#2C698D] text-[#2C698D]"
            } h-full flex items-end w-32 justify-center cursor-pointer`}
            onClick={() => handleActiveTab("CONVERT_FUNDS")}
          >
            <h2 className="pb-3 font-medium">Convert funds</h2>
          </article>
        </section>
        {walletTab.myWallets ? (
          <MyWallet />
        ) : walletTab.sendMoney ? (
          <SendMoney />
        ) : walletTab.topUpWallet ? (
          <TopUpWallet />
        ) : (
          <ConvertFunds />
        )}
      </main>
    </>
  );
};

export default Page;
