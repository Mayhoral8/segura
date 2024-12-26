import React, { useReducer, useState, useContext } from "react";
import { ConfigContext } from "../../contexts/ConfigContext";
import { FaXmark } from "react-icons/fa6";
import { AnimateDropdown } from "../Animate";
import { Avatar } from "@mui/material";

const ChooseCurrency = () => {
  const {
    setShowSuccessfulWalletSetupModal,
    showCurrencySelectionModal,
    setShowCurrencySelectionModal,
  } = useContext(ConfigContext).walletSetup;
  const [showWallets, setShowWallets] = useState(false);
  const [showReqFundForm, setShowReqFundForm] = useState(false);

  const handleShowWallets = () => {
    setShowWallets(!showWallets);
  };

  const submitWalletSelect = () => {
    setShowCurrencySelectionModal(false);
    setShowSuccessfulWalletSetupModal(true);
  };

  const initialState = {
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
  };

  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "DOLLAR": {
        return {
          ...state,
          dollar: { isActive: true },
          euro: { isActive: false },
          pounds: { isActive: false },
          naira: { isActive: false },
        };
      }
      case "EURO": {
        return {
          ...state,
          dollar: { isActive: false },
          euro: { isActive: true },
          pounds: { isActive: false },
          naira: { isActive: false },
        };
      }
      case "POUNDS": {
        return {
          ...state,
          dollar: { isActive: false },
          euro: { isActive: false },
          pounds: { isActive: true },
          naira: { isActive: false },
        };
      }
      case "NAIRA": {
        return {
          ...state,
          dollar: { isActive: false },
          euro: { isActive: false },
          pounds: { isActive: false },
          naira: { isActive: true },
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const handleDispatch = (type) => {
    dispatch({ type });
  };

  const handleCloseModal = ()=>{
    setShowCurrencySelectionModal(!showCurrencySelectionModal)
  }
  if (showCurrencySelectionModal) {
    return (
      <main className="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-[#00000063] backdrop-blur-sm z-40">
        <section className="bg-white w-[30%] h-[50%] px-8 flex flex-col justify-between py-5">
          <FaXmark className="block ml-auto text-red-400" onClick={handleCloseModal}/>
          <span className="font-bold">Select Preferred Currency </span>
          <article>
            <label className="text-[#434343] ">Currency Wallet</label>
            <div className="border flex items-center">
              <div
                className="h-8 focus:outline-none px-1 w-[70%] flex items-center"
                // onChange={}
                
                >
                  {
                  state.dollar.isActive
                    ? "Dollar wallet"
                    : state.euro.isActive
                    ? "Euro wallet"
                    : state.pounds.isActive
                    ? "Pounds Wallet"
                    : state.naira.isActive
                    ? "Naira Wallet"
                    : ""
                }
              </div>
              <div
                className="flex flex-row rounded-lg items-center cursor-pointer gap-x-1 w-20"
                onClick={handleShowWallets}
              >
                <Avatar
                  src={`${
                    state.dollar.isActive
                      ? "https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740"
                      : state.euro.isActive
                      ? "https://img.freepik.com/premium-vector/european-union-logo-vector-illustration-glossy-button_118339-2135.jpg?w=740"
                      : state.pounds.isActive
                      ? "https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740"
                      : "https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740"
                  }`}
                />
                <span>
                  {state.dollar.isActive
                    ? "USD"
                    : state.euro.isActive
                    ? "EUR"
                    : state.pounds.isActive
                    ? "GBP"
                    : "NGN"}
                </span>

                {/* <HiSwitchHorizontal /> */}
              </div>
            </div>

            <AnimateDropdown isVisible={showWallets}>
              <article className="absolute border  text-sm flex-col rounded-md w-[222px] bg-white  transition-transform shadow-sm z-30 ml-24 mt-2">
                <div
                  className="flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs"
                  onClick={() => {
                    handleDispatch("DOLLAR"), handleShowWallets();
                  }}
                >
                  <Avatar src="https://img.freepik.com/premium-vector/united-states-america-flag-usa-flag-button_97458-15.jpg?w=740" />
                  <span>Us Dollar ($)</span>
                </div>
                <div
                  className="flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs"
                  onClick={() => {
                    handleDispatch("EURO"), handleShowWallets();
                  }}
                >
                  <Avatar src="https://img.freepik.com/premium-vector/european-union-logo-vector-illustration-glossy-button_118339-2135.jpg?w=740" />
                  <span>Euro</span>
                  {/* (<TbCurrencyPound /> ) */}
                </div>
                <div
                  className="flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs"
                  onClick={() => {
                    handleDispatch("POUNDS"), handleShowWallets();
                  }}
                >
                  <Avatar src="https://img.freepik.com/premium-vector/united-kingdom-flag-button-uk-flag-icon_97458-16.jpg?w=740" />
                  <span>British Pound</span>
                  {/* (<FaEuroSign />) */}
                </div>
                <div
                  className="flex flex-row  items-center hover:bg-[#e3f6f5] cursor-pointer text-xs"
                  onClick={() => {
                    handleDispatch("NAIRA"), handleShowWallets();
                  }}
                >
                  <Avatar src="https://img.freepik.com/premium-vector/nigeria-flag-round-circle-vector-icon_601748-26416.jpg?w=740" />
                  <span>Nigeria Naira</span>
                  {/* (<FaNairaSign />) */}
                </div>
              </article>
            </AnimateDropdown>
          </article>
          <button
            className="bg-[#2C698D] text-sm text-white py-2"
            onClick={submitWalletSelect}
          >
            Done
          </button>
        </section>
      </main>
    );
  }
};

export default ChooseCurrency;
