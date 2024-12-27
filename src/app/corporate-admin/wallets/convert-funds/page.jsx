"use client";

import React, { useState } from "react";
import TableComponent from "../../../../components/Table";
import { RiSwapFill } from "react-icons/ri";
import { AnimateDropdown } from "../../../../components/Animate";
import { Avatar } from "@mui/material";
import { RxCaretDown } from "react-icons/rx";

const ConvertFunds = () => {
  const [showToCurrencyWallets, setShowToCurrencyWallets] = useState(false);
  const [showFromCurrencyWallets, setShowFromCurrencyWallets] = useState(false);
  const [fromCurrency, setFromCurrency] = useState({
    dollar: {
      isActive: true,
    },
    euro: {
      isActive: false,
    },
    pounds: {
      isActive: false,
    },
    naira: {
      isActive: false,
    },
  });
  const [toCurrency, setToCurrency] = useState({
    dollar: {
      isActive: false,
    },
    euro: {
      isActive: false,
    },
    pounds: {
      isActive: false,
    },
    naira: {
      isActive: true,
    },
  });

  

  const handleShowWallets = (type) => {
    type === "toCurrency"
      ? setShowToCurrencyWallets(!showToCurrencyWallets)
      : setShowFromCurrencyWallets(!showFromCurrencyWallets);
  };

  const dollarActive = {
    dollar: { isActive: true },
    euro: { isActive: false },
    pounds: { isActive: false },
    naira: { isActive: false },
  };
  const poundsActive = {
    dollar: { isActive: false },
    euro: { isActive: false },
    pounds: { isActive: true },
    naira: { isActive: false },
  };
  const euroActive = {
    dollar: { isActive: false },
    euro: { isActive: true },
    pounds: { isActive: false },
    naira: { isActive: false },
  };

  const nairaActive = {
    dollar: { isActive: false },
    euro: { isActive: false },
    pounds: { isActive: false },
    naira: { isActive: true },
  };

  const handleChangeCurrency = (type, swapObject) => {
    switch (type) {
      case "DOLLAR": {
        return swapObject === "fromCurrency"
          ? setFromCurrency({ ...fromCurrency, ...dollarActive })
          : setToCurrency({ ...toCurrency, ...dollarActive });
      }
      case "EURO": {
        console.log("fd", swapObject);
        return swapObject === "fromCurrency"
          ? setFromCurrency({ ...fromCurrency, ...euroActive })
          : setToCurrency({ ...toCurrency, ...euroActive });
      }
      case "POUNDS": {
        return swapObject === "fromCurrency"
          ? setFromCurrency({ ...fromCurrency, ...poundsActive })
          : setToCurrency({ ...toCurrency, ...poundsActive });
      }
      case "NAIRA": {
        return swapObject === "fromCurrency"
          ? setFromCurrency({ ...fromCurrency, ...nairaActive })
          : setToCurrency({ ...toCurrency, ...nairaActive });
      }
      default:
        return swapObject === "fromCurrency"
          ? setFromCurrency(fromCurrency)
          : setToCurrency(toCurrency);
    }
  };

  const tableHeaders = ["Currency", "Buying", "Selling"];
  const tableValues = [
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
    {
      currency: "USD",
      buying: "#890",
      selling: "#1890",
    },
  ];

  const handleSwap = () => {
    const from = Object.entries(fromCurrency).find((value) => {
      return value[1].isActive === true;
    });
    const to = Object.entries(toCurrency).find((value) => {
      return value[1].isActive === true;
    });

    handleChangeCurrency(from[0].toUpperCase(), "toCurrency");
    handleChangeCurrency(to[0].toUpperCase(), "fromCurrency");
  };

  return (
    <main className=" flex bg-white  mt-4 mb-4 min-h-[800px]">
      <section className="w-[40%] flex flex-col mx-auto justify-center gap-y-10 px-8 border-r">
        <article>
          <span>Exchange Rate</span>
          <TableComponent
            tableHeaders={tableHeaders}
            tableValues={tableValues}
          />
        </article>
      </section>
      <section className="flex flex-col w-[60%] border px-16">
        <span className="text-center mt-16 font-bold text-xl">Convert Money</span>
        <form className="w-full flex flex-col gap-y-4 mt-8">
          <article className="flex flex-col w-full py-1  ">
            <label className="text-sm">Amount you wish to convert</label>
            <div className="border flex h-10 justify-center">
              <input
                placeholder="00.0"
                className="border px-1 w-[80%] focus:outline-none"
              />
              <div className="border w-[20%] flex items-center">
                <div
                  className="flex flex-row rounded-lg items-center cursor-pointer"
                  onClick={() => handleShowWallets("fromCurrency")}
                >
                  <Avatar
                    src={`${
                      fromCurrency.dollar.isActive
                        ? "https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740"
                        : fromCurrency.euro.isActive
                        ? "https://img.freepik.com/premium-vector/european-union-logo-vector-illustration-glossy-button_118339-2135.jpg?w=740"
                        : fromCurrency.pounds.isActive
                        ? "https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740"
                        : "https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740"
                    }`}
                    className="z-10 absolute"
                    sx={{height: "30px", width: "30px"}}
                  />
                  <span className="text-sm">
                    {fromCurrency.dollar.isActive
                      ? "USD"
                      : fromCurrency.euro.isActive
                      ? "EURO"
                      : fromCurrency.pounds.isActive
                      ? "GBP"
                      : "NGN"}
                  </span>

                  <RxCaretDown />
                </div>
                <div className="ml-[-130px] mt-[-45px]">
                  <AnimateDropdown isVisible={showFromCurrencyWallets}>
                  <article className="absolute border  text-sm flex-col rounded-md w-[222px] bg-white  transition-transform shadow-sm z-30 ml-[-78px] mt-12">
                    <div
                       className={`${!toCurrency.dollar.isActive ? "flex" :"hidden"} flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs `}
                      onClick={() => {
                        handleChangeCurrency("DOLLAR", "fromCurrency"),
                          handleShowWallets("fromCurrency");
                      }}
                    >
                      <Avatar src="https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740" />
                      <span>Us Dollar ($)</span>
                    </div>
                    <div
                      className={`${!toCurrency.euro.isActive ? "flex" :"hidden"} flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs`}
                      onClick={() => {
                        handleChangeCurrency("EURO", "fromCurrency"),
                          handleShowWallets("fromCurrency");
                      }}
                    >
                      <Avatar src="https://img.freepik.com/premium-vector/european-union-logo-vector-illustration-glossy-button_118339-2135.jpg?w=740" />
                      <span>Euro</span>
                      {/* (<TbCurrencyPound /> ) */}
                    </div>
                    <div
                      className={`${!toCurrency.pounds.isActive ? "flex" :"hidden"} flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs`}
                      onClick={() => {
                        handleChangeCurrency("POUNDS", "fromCurrency"),
                          handleShowWallets("fromCurrency");
                      }}
                    >
                      <Avatar src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740" />
                      <span>British Pound</span>
                      {/* (<FaEuroSign />) */}
                    </div>
                    <div
                      className={`${!toCurrency.naira.isActive ? "flex" :"hidden"} flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs`}
                      onClick={() => {
                        handleChangeCurrency("NAIRA", "fromCurrency"),
                          handleShowWallets("fromCurrency");
                      }}
                    >
                      <Avatar src="https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740" />
                      <span>Nigeria Naira</span>
                      {/* (<FaNairaSign />) */}
                    </div>
                    </article>
                  </AnimateDropdown>
                </div>
              </div>
            </div>
          </article>
          <RiSwapFill
            className="text-center text-3xl block mx-auto text-[#2C698D] cursor-pointer"
            title="Click to swap"
            onClick={handleSwap}
          />
          <article className="flex flex-col w-full py-1  ">
            <label className="text-sm">Amount To Be Received</label>
            <div className="border flex h-10 justify-center">
              <input
                placeholder="00.0"
                className="border px-1 w-[80%] focus:outline-none"
              />
              <div className="border w-[20%] flex items-center ">
                <div
                  className="flex flex-row  rounded-lg items-center cursor-pointer "
                  onClick={() => handleShowWallets("toCurrency")}
                >
                  <Avatar
                    src={`${
                      toCurrency.dollar.isActive
                        ? "https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740"
                        : toCurrency.euro.isActive
                        ? "https://img.freepik.com/premium-vector/european-union-logo-vector-illustration-glossy-button_118339-2135.jpg?w=740"
                        : toCurrency.pounds.isActive
                        ? "https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740"
                        : "https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740"
                    }`}
                    className="z-10 absolute"
                    sx={{height: "30px", width: "30px"}}
                  />
                  <span className="text-sm">
                    {toCurrency.dollar.isActive
                      ? "USD"
                      : toCurrency.euro.isActive
                      ? "EURO"
                      : toCurrency.pounds.isActive
                      ? "GBP"
                      : "NGN"}
                  </span>

                  <RxCaretDown />
                  {/* <HiSwitchHorizontal /> */}
                </div>
                <div className="ml-[-130px] mt-[-45px]">
                  <AnimateDropdown isVisible={showToCurrencyWallets}>
                  <article className="absolute border  text-sm flex-col rounded-md w-[222px] bg-white  transition-transform shadow-sm z-30 ml-[-78px] mt-12">
                    <div
                      className={`${!fromCurrency.dollar.isActive ? "flex" :"hidden"} flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs `}
                      onClick={() => {
                        handleChangeCurrency("DOLLAR", "toCurrency"),
                          handleShowWallets("toCurrency");
                      }}
                    >
                      <Avatar src="https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740" />
                      <span>Us Dollar ($)</span>
                    </div>
                    <div
                      className={`${!fromCurrency.euro.isActive ? "flex" :"hidden"} flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs`}
                      onClick={() => {
                        handleChangeCurrency("EURO", "toCurrency"),
                          handleShowWallets("toCurrency");
                      }}
                    >
                      <Avatar src="https://img.freepik.com/premium-vector/european-union-logo-vector-illustration-glossy-button_118339-2135.jpg?w=740" />
                      <span>Euro</span>
                    </div>
                    <div
                      className={`${!fromCurrency.pounds.isActive ? "flex" :"hidden"} flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs`}
                      onClick={() => {
                        handleChangeCurrency("POUNDS", "toCurrency"),
                          handleShowWallets("toCurrency");
                      }}
                    >
                      <Avatar src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740" />
                      <span>British Pound</span>
                      {/* (<FaEuroSign />) */}
                    </div>
                    <div
                      className={`${!fromCurrency.naira.isActive ? "flex" :"hidden"} flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs`}
                      onClick={() => {
                        handleChangeCurrency("NAIRA", "toCurrency"),
                          handleShowWallets("toCurrency");
                      }}
                    >
                      <Avatar src="https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740" />
                      <span>Nigeria Naira</span>
                      {/* (<FaNairaSign />) */}
                    </div>
                    </article>
                  </AnimateDropdown>
                </div>
              </div>
            </div>
          </article>
          <div className="bg-[#FAFAFA] px-4 flex justify-between text-sm h-[40px] items-center">
            <span>Charges Fee</span>
            <span>#10.00</span>
          </div>
          <div className="flex justify-between h-[40px]">
            <button className="bg-[#D9D9D9] w-[40%]">Cancel</button>
            <button className=" w-[40%] bg-[#2C698D] text-white">
              Convert
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ConvertFunds;
