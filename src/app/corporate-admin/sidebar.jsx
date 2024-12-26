import React, { useEffect, useReducer, useContext, useState } from "react";
import Link from "next/link";
import { ConfigContext } from "../../contexts/ConfigContext";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Image from "next/image";

// assets import
import Logo from "../../assets/landingPage/logo.svg";
import StartHereIcon from "../../assets/adminDashboard/starthere.svg";
import DashboardIcon from "../../assets/adminDashboard/dashboard.svg";
import AccountManagementIcon from "../../assets/adminDashboard/starthere.svg";
import WalletIcon from "../../assets/adminDashboard/wallet.svg";
import AuditLogsIcon from "../../assets/adminDashboard/auditlog.svg";
import HelpIcon from "../../assets/adminDashboard/help.svg";
import SettingsIcon from "../../assets/adminDashboard/settings.svg";
import LogoutIcon from "../../assets/adminDashboard/logout.svg";
import Avatar from "../../avatar.png";
import RightArrow from "../../assets/adminDashboard/rightArrow.svg";

const Sidebar = () => {
  const searchParams = useSearchParams();
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
    starthere: {
      isActive: true,
    },
    dashboard: {
      isActive: false,
    },
    accounts: {
      isActive: false,
    },
    wallets: {
      isActive: false,
    },
    auditslog: {
      isActive: false,
    },
    help: {
      isActive: false,
    },
    settings: {
      isActive: false,
    },
  };

  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "START_HERE": {
        return {
          ...state,
          starthere: { isActive: true },
          dashboard: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
          auditslog: { isActive: false },
          help: { isActive: false },
          settings: { isActive: false },
        };
      }
      case "DASHBOARD": {
        return {
          ...state,
          starthere: { isActive: false },
          dashboard: { isActive: true },
          accounts: { isActive: false },
          wallets: { isActive: false },
          auditslog: { isActive: false },
          help: { isActive: false },
          settings: { isActive: false },
        };
      }
      case "ACCOUNTS": {
        return {
          ...state,
          starthere: { isActive: false },
          dashboard: { isActive: false },
          accounts: { isActive: true },
          wallets: { isActive: false },
          auditslog: { isActive: false },
          help: { isActive: false },
          settings: { isActive: false },
        };
      }
      case "WALLETS": {
        return {
          ...state,
          starthere: { isActive: false },
          dashboard: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: true },
          auditslog: { isActive: false },
          help: { isActive: false },
          settings: { isActive: false },
        };
      }
      case "AUDITS_LOG": {
        return {
          ...state,
          starthere: { isActive: false },
          dashboard: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
          auditslog: { isActive: true },
          help: { isActive: false },
          settings: { isActive: false },
        };
      }
      case "HELP": {
        return {
          ...state,
          starthere: { isActive: false },
          dashboard: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
          auditslog: { isActive: false },
          help: { isActive: true },
          settings: { isActive: false },
        };
      }
      case "SETTINGS": {
        return {
          ...state,
          starthere: { isActive: false },
          dashboard: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
          auditslog: { isActive: false },
          help: { isActive: false },
          settings: { isActive: true },
        };
      }
      case "DEFAULT": {
        return {
          ...state,
          starthere: { isActive: true },
          dashboard: { isActive: false },
          accounts: { isActive: false },
          wallets: { isActive: false },
          auditslog: { isActive: false },
          help: { isActive: false },
          settings: { isActive: false },
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  useEffect(() => {
    if (pathname === "/corporate-admin/start-here") {
      return dispatch({ type: "USER_MANAGEMENT" });
    } else if (pathname === "/corporate-admin/dashboard") {
      return dispatch({ type: "DASHBOARD" });
    } else if (pathname.includes("/corporate-admin/settings")) {
      setShowDropDown(true);
      return dispatch({ type: "SETTINGS" });
    } else if (pathname === "/corporate-admin/user-management") {
      return dispatch({ type: "USER_MANAGEMENT" });
    } else if (pathname.includes("/corporate-admin/accounts")) {
      return dispatch({ type: "ACCOUNTS" });
    } else if (pathname.includes("/corporate-admin/wallets")) {
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
    <section className="hidden lg:flex flex-col bg-white text-gray-600 border-solid mt-10 fixed z-30 lg:h-full shadow-md  text-3xl h-20 bottom-0  w-full lg:w-[260px]">
      <div className="flex-row items-center gap-x-1 lg:flex hidden justify-start pt-[20px] pl-[25px] mb-[60px]">
        <Image src={Logo} alt="logo" />
      </div>
      <section className="flex flex-row lg:flex-col lg:gap-y-1 w-full overflow-y-auto scrollbar-hide h-[400px]">
        <Link
          href="/corporate-admin/start-here"
          onClick={() => handleDispatch("START_HERE")}
          className={`w-full h-[44px] flex items-center pl-[20px] justify-center  ${
            state.starthere.isActive
              ? "bg-[#e3f6f5] text-[#2C698D]"
              : "text-[#787878]"
          } `}
        >
          <div className="flex flex-col w-full text-[14px] gap-x-1 lg:flex-row items-center  ">
            <Image src={StartHereIcon} alt="start here" />
            <span className="ml-1">Start Here</span>
          </div>
        </Link>

        <Link
          href="/corporate-admin/dashboard"
          onClick={() => handleDispatch("DASHBOARD")}
          className={`w-full h-[44px] flex items-center pl-[20px] justify-center  ${
            state.dashboard.isActive
              ? "bg-[#e3f6f5] text-[#2C698D]"
              : "text-[#787878]"
          } `}
        >
          <div className="flex flex-col w-full text-[14px] gap-x-1 lg:flex-row items-center  ">
            <Image src={DashboardIcon} alt="dashboard" />
            <span className="ml-1">Dashboard</span>
          </div>
        </Link>

        <Link
          href="/corporate-admin/accounts"
          onClick={() => handleDispatch("ACCOUNTS")}
          className={`w-full h-[44px] flex items-center pl-[20px] justify-center  ${
            state.accounts.isActive
              ? "bg-[#e3f6f5] text-[#2C698D]"
              : "text-[#787878]"
          } `}
        >
          <div className="flex flex-col w-full text-[14px] gap-x-1 lg:flex-row items-center  ">
            <Image src={AccountManagementIcon} alt="account management" />
            <span className="ml-1">Account Management</span>
          </div>
        </Link>

        <Link
          href="/corporate-admin/wallets"
          onClick={() => handleDispatch("WALLETS")}
          className={`w-full h-[44px] flex items-center pl-[20px] justify-center  ${
            state.wallets.isActive
              ? "bg-[#e3f6f5] text-[#2C698D]"
              : "text-[#787878]"
          } `}
        >
          <div className="flex flex-col w-full text-[14px] gap-x-1 lg:flex-row items-center  ">
            <Image src={WalletIcon} alt="wallet" />
            <span className="ml-1">Wallet</span>
          </div>
        </Link>

        <Link
          href="/corporate-admin/manage-users"
          onClick={() => handleDispatch("AUDITS_LOG")}
          className={`w-full h-[44px] flex items-center pl-[20px] justify-center  ${
            state.auditslog.isActive
              ? "bg-[#e3f6f5] text-[#2C698D]"
              : "text-[#787878]"
          } `}
        >
          <div className=" w-full flex flex-col  text-[14px] gap-x-1 lg:flex-row  items-center">
            <Image src={AuditLogsIcon} alt="audit log" />
            <span className="ml-1">Audit Log</span>
          </div>
        </Link>

        <Link
          href="/corporate-admin/accounts"
          onClick={() => handleDispatch("HELP")}
          className={`w-full h-[44px] flex items-center pl-[20px] justify-center  ${
            state.help.isActive
              ? "bg-[#e3f6f5] text-[#2C698D]"
              : "text-[#787878]"
          } `}
        >
          <div className="flex flex-col w-full text-[14px] gap-x-1 lg:flex-row items-center  ">
            <Image src={HelpIcon} alt="help" />
            <span className="ml-1">Help</span>
          </div>
        </Link>
        <Link
          href="/corporate-admin/accounts"
          onClick={() => handleDispatch("SETTINGS")}
          className={`w-full h-[44px] flex items-center pl-[20px] justify-center  ${
            state.settings.isActive
              ? "bg-[#e3f6f5] text-[#2C698D]"
              : "text-[#787878]"
          } `}
        >
          <div className="flex flex-col w-full text-[14px] gap-x-1 lg:flex-row items-center  ">
            <Image src={SettingsIcon} alt="settings" />
            <span className="ml-1">Settings</span>
          </div>
        </Link>
      </section>

      <article className="flex flex-col mt-auto justify-self-end">
        <div
          className="hover:lg:bg-PrimaryPurple lg:px-[20px] cursor-pointer rounded-md flex w-full text-sm gap-x-1 lg:flex-row items-center h-[44px]"
          onClick={handleSignOutModal}
        >
          <Image src={LogoutIcon} alt="logout" className="text-lg" />
          <span className="text-xs text-[#CF1322] ml-2">Logout</span>
        </div>
        <div className="lg:px-[20px] lg:py-[10px] bg-[#FAFAFA]">
          <div className="flex items-center">
            <Image
              src={Avatar}
              alt="avatar"
              height={40}
              width={40}
              className="rounded-full mr-2"
            />
            <div className="flex flex-col justify-center">
              <p className="text-[#262626] text-[14px] leading-none mb-1">
                {/* {session?.user?.username} */}
                Jones Canes
              </p>
              <p className="text-[#8C8C8C] text-[10px] leading-none">
                {/* {session?.user?.username} */}
                Super admin
              </p>
            </div>
            <Image
              src={RightArrow}
              alt="right arrow"
              className="ml-auto justify-self-end"
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
