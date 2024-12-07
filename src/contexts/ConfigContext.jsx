"use client";
import PropTypes from "prop-types";

import { createContext, useEffect } from "react";

// project import
// import defaultConfig from '@/config';
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";
import { usePathname } from "next/navigation";
// initial state

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext();

function ConfigProvider({ children }) {
  const pathname = usePathname();
  function createData(id, accNo, name, accBalance, currency, status) {
    return { id, accNo, name, accBalance, currency, status };
  }

  const initialAccounts = [
    createData(1, "1234567890", "Mayowa", 50000, "NGN", "Active"),
    createData(2, "9876543210", "Jane Doe", 20000, "NGN", "Blocked"),
    createData(3, "1122334455", "John Smith", 135000, "NGN", "Active"),
    createData(4, "6677889900", "David Mark", 42300, "NGN", "Active"),
    createData(5, "4433221100", "Alex Johnson", 50000, "NGN", "Blocked"),
    createData(6, "9988776655", "Mary Jane", 31000, "NGN", "Active"),
    createData(7, "5566778899", "Mike Brown", 8600, "NGN", "Active"),
    createData(8, "3344556677", "Anna Lee", 10000, "NGN", "Blocked"),
    createData(9, "2233445566", "Chris Paul", 44000, "NGN", "Active"),
    createData(10, "7788990011", "Tim Cook", 73200, "NGN", "Active"),
  ];

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showReqFundingForm, setShowRequestFundingForm] = useState(false);
  const [showAccountDetailsModal, setShowAccountDetailsModal] = useState(false);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [showCorporateDetails, setShowCorporateDetails] = useState(false);
  const [userInView, setUserInView] = useState({});

  const onChangeContainer = (container) => {
    setConfig({
      ...config,
      container: container,
    });
  };

  const onChangeLocalization = (lang) => {
    setConfig({
      ...config,
      i18n: lang,
    });
  };

  const onChangeMode = (mode) => {
    setConfig({
      ...config,
      mode,
    });
  };

  const onChangePresetColor = (theme) => {
    setConfig({
      ...config,
      presetColor: theme,
    });
  };

  const onChangeDirection = (direction) => {
    setConfig({
      ...config,
      themeDirection: direction,
    });
  };

  const onChangeMiniDrawer = (miniDrawer) => {
    setConfig({
      ...config,
      miniDrawer,
    });
  };

  const onChangeThemeLayout = (direction, miniDrawer) => {
    setConfig({
      ...config,
      miniDrawer,
      themeDirection: direction,
    });
  };

  const onChangeMenuOrientation = (layout) => {
    setConfig({
      ...config,
      menuOrientation: layout,
    });
  };

  const onChangeFontFamily = (fontFamily) => {
    setConfig({
      ...config,
      fontFamily,
    });
  };
  const check = () => {
    console.log("yes");
  };

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_TEST);
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        showSignOutModal,
        setShowSignOutModal,
        showAccountDetailsModal,
        setShowAccountDetailsModal,
        showReqFundingForm,
        setShowRequestFundingForm,
        accountsContext: {
          accounts,
          setAccounts,
          initialAccounts,
        },
        showCorporateDetails,
        setShowCorporateDetails,

        userContext: {
          userInView,
          setUserInView,
        },
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };

ConfigProvider.propTypes = { children: PropTypes.node };
