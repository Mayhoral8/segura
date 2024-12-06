import React, { useEffect, useReducer, useContext, useState } from "react";
import Link from "next/link";
import { ConfigContext } from "@/contexts/ConfigContext";
import { usePathname } from "next/navigation";
// import { MdDashboard } from "react-icons/md";
// import { GoSignOut } from "react-icons/go";
// import { FaCircleXmark } from "react-icons/fa6";
// import { MdManageAccounts } from "react-icons/md";
// import { CiWallet } from "react-icons/ci";
// import { FaUsers } from "react-icons/fa6";
// import { IoMdSettings } from "react-icons/io";
// import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { useSearchParams } from "next/navigation";

const Sidebar = () => {
  const searchParams = useSearchParams()
  const { setShowSignOutModal, check } = useContext(ConfigContext);
  const [showDropdown, setShowDropDown] = useState(false);

  const handleSettingsDropdown = () => {
    setShowDropDown(!showDropdown);
  };

  const handleSignOutModal = () => {
    setShowSignOutModal(true);
  };

  // const { logout, userRole } = useContext(CreateContext).auth;
  const pathname = usePathname();

  const initialState = {
    dashboard: {
      isActive: true
    },
    accounts: {
      isActive: false
    },
    wallets: {
      isActive: false
    },
    userManagement: {
      isActive: false
    },
    settings: {
      isActive: false
    }
    
  };

  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "DASHBOARD": {
        return {
          ...state,
          dashboard: { isActive: true },
          settings: { isActive: false },
          userManagement: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
        };
      }
      case "SETTINGS": {
        return {
          ...state,
          dashboard: { isActive: false },
          settings: { isActive: true },
          userManagement: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
        };
      }
      case "USER_MANAGEMENT": {
        return {
          ...state,
          dashboard: { isActive: false },
          settings: { isActive: false },
          userManagement: { isActive: true },
          accounts: { isActive: false },
          wallets: { isActive: false },
        };
      }
      case "ACCOUNTS": {
        console.log("fgd");
        return {
          ...state,
          dashboard: { isActive: false },
          settings: { isActive: false },
          userManagement: { isActive: false },
          accounts: { isActive: true },
          wallets: { isActive: false },
        };
      }
      case "WALLETS": {
        return {
          ...state,
          dashboard: { isActive: false },
          settings: { isActive: false },
          userManagement: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: true },
        };
      }
      case "DEFAULT": {
        return {
          ...state,
          dashboard: { isActive: false },
          settings: { isActive: false },
          userManagement: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  useEffect(() => {
    
    if (pathname === "/corporate/dashboard") {
      return dispatch({ type: "DASHBOARD" });
    } else if (pathname.includes("/corporate/settings")) {
      setShowDropDown(true);
      return dispatch({ type: "SETTINGS" });
    } else if (pathname === "/corporate/user-management") {
      return dispatch({ type: "USER_MANAGEMENT" });
    } else if (pathname.includes("/corporate/accounts")) {
      
      return dispatch({ type: "ACCOUNTS" });
    } else if (pathname.includes("/corporate/wallets")) {
      return dispatch({ type: "WALLETS" });
    }
   
  }, [pathname, searchParams]);



  const handleDispatch = (type) => {
    dispatch({ type });
  };

  useEffect(() => {
    showDropdown === false && handleDispatch("DEFAULT");
  }, [showDropdown]);

  
  return (
    <section className="hidden lg:flex flex-col justify-between bg-white text-gray-600 border-solid mt-10 fixed z-30 lg:h-full shadow-md  text-3xl h-20 bottom-0  w-full lg:w-[16%]  ">
      <div className="flex-row items-center gap-x-1 lg:flex hidden border h-[100px] justify-center lg:px-4">
        <p className="font-semibold text-base text-primary-500 text-center">
          SEGURA
        </p>
      </div>
      <section className="flex flex-row lg:flex-col lg:gap-y-4 w-full lg:mt-4 overflow-y-auto scrollbar-hide h-[400px] lg:px-4">
        <Link
          href="/corporate/dashboard"
          onClick={() => handleDispatch("DASHBOARD")}
          className={`w-full  flex items-center lg:rounded-md lg:px-2 justify-center  ${
            state.dashboard.isActive  ? "bg-[#2c698d] text-white"
            : "hover:bg-[#e3f6f5]"} `}
        >
          <div className="flex flex-col w-full text-[12px] gap-x-1 lg:flex-row items-center  ">
            {/* <MdDashboard className="text-lg " /> */}
            <span className="">Dashboard</span>
          </div>
        </Link>

        <Link
          href="/corporate/accounts"
          onClick={() => handleDispatch("ACCOUNTS")}
          className={`w-full flex items-center lg:rounded-md lg:px-2 justify-center  ${
            state.accounts.isActive  ? "bg-[#2c698d] text-white"
            : "hover:bg-[#e3f6f5]"} `}
        >
          <div className="flex flex-col w-full text-[12px] gap-x-1 lg:flex-row items-center  ">
            {/* <FaUsers className="text-lg " /> */}
            <span className="">Accounts</span>
          </div>
        </Link>

        <Link
          href="/corporate/wallets"
          onClick={() => handleDispatch("WALLETS")}
          className={`w-full  flex items-center lg:rounded-md lg:px-2 justify-center  ${
            state.wallets.isActive  ? "bg-[#2c698d] text-white"
            : "hover:bg-[#e3f6f5]"} `}
        >
          <div className="flex flex-col w-full text-[12px] gap-x-1 lg:flex-row items-center  ">
            {/* <CiWallet className="text-lg " /> */}
            <span className="">Wallets</span>
          </div>
        </Link>

        <Link
          href="/corporate/user-management"
          onClick={() => handleDispatch("USER_MANAGEMENT")}
          className={`w-full  flex items-center lg:rounded-md lg:px-2 justify-center  ${
            state.userManagement.isActive ? "bg-[#2c698d] text-white"
          : "hover:bg-[#e3f6f5]"} `}
        >
          <div className=" w-full flex flex-col  text-[12px] gap-x-1 lg:flex-row  items-center">
            {/* <MdManageAccounts className="text-lg" /> */}
            <span className="">User Management</span>
          </div>
        </Link>

        <article
          className="w-full flex items-center lg:rounded-md justify-center flex-col cursor-pointer"
          onClick={() => handleDispatch("SETTINGS")}
        >
          <div
            onClick={handleSettingsDropdown}
            className={`flex flex-col w-full text-[12px] gap-x-1 lg:flex-row items-center rounded-md px-2 justify-between ${
              state.settings.isActive && "bg-[#2c698d] text-white"
            }`}
          >
            <div className="flex items-center gap-x-1">
              {/* <IoMdSettings className="text-lg " /> */}
              <span>Settings</span>
            </div>
            {/* {showDropdown ? (
              <RxCaretUp className="text-lg " />
            ) : (
              <RxCaretDown className="text-lg " />
            )} */}
          </div>
          <article
            className={`flex flex-col ${
              showDropdown ? "h-auto" : "h-0 hidden"
            }  transition-all text-[12px] w-full  `}
          >
            <Link
              href="/corporate/settings/verification"
              className="hover:bg-[#e3f6f5]"
            >
              <div className="pl-5">Verification</div>
            </Link>
            <Link
              href="/corporate/settings/profile"
              className="hover:bg-[#e3f6f5]"
            >
              <div className="pl-5">Profile</div>
            </Link>
            <Link
              href="/corporate/settings/policy"
              className="hover:bg-[#e3f6f5]"
            >
              <div className="pl-5">Policy</div>
            </Link>
          </article>
        </article>
      </section>

      <div className="border w-full lg:px-0"></div>
      <article className=" h-[150px] lg:flex hidden border-t flex-col justify-evenly py-2 lg:px-4">
        <div className="text-xs flex flex-row gap-x-2">
          <span className="font-light">Status:</span>
          <div className="flex items-center gap-x-1">
            <span>Unverified</span>
            {/* <FaCircleXmark className="text-red-400" /> */}
          </div>
        </div>
        <div className="hover:lg:bg-PrimaryPurple cursor-pointer rounded-md h-8  flex flex-col w-full text-sm gap-x-1 lg:flex-row items-center justify-between">
          <span className="text-xs ">
            ABC Company <br />
            corporate{" "}
          </span>
          {/* <GoSignOut onClick={handleSignOutModal} className="text-lg" /> */}
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
