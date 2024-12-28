"use client";
import PropTypes from "prop-types";

import { createContext, useEffect } from "react";
import { useSession } from "next-auth/react";
// project import

import { useState } from "react";
import { usePathname } from "next/navigation";

const ConfigContext = createContext();

function ConfigProvider({ children }) {
  const { data: session, status } = useSession();
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
  const [showSpinner, setShowSpinner] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showOtpModal, setShowOtpmodal] = useState(false);
  const [governmentIdfile, setGovernmentIdFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState(null);

  const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);
  const [previousLocation, setPreviousLocation] = useState();

  const [showSetupInfoModal, setShowSetupInfoModal] = useState(false);
  const [showCurrencySelectionModal, setShowCurrencySelectionModal] =
    useState(false);
  const [showSuccessfulWalletSetupModal, setShowSuccessfulWalletSetupModal] =
    useState(false);

    const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (pathname.includes("/corporate") || session === "authenticated") {
      localStorage.setItem("lastVisitedPage", pathname);
      setPreviousLocation(pathname);
    }
  }, [pathname]);
  const [directorsDocs, setDirectorsDocs] = useState([
    {
      name: "Passport Photograph",
      url: "test.com",
    },
    {
      name: "Government Id",
      url: "test.com",
    },
    {
      name: "Proof Of Address",
      url: "test.com",
    },
  ]);

  const [corporateDocs, setCorporateDocs] = useState([
    {
      name: "Certificate of Incorporation",
      url: ""
    },
    {
      name: "Memorandum & Articles of Assosciation",
      url: ""
    }, 
    {
      name: "Statement of Share Capital",
      url: ""
    },
    {
      name: "Approval for Account Opening",
      url: ""
    }
  ])
const [file, setFile] = useState(null)
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
        previousLocation,

        spinner: {
          showSpinner,
          setShowSpinner,
        },
        errorModal: {
          showErrorModal,
          setShowErrorModal,
          errorMsg,
          setErrorMsg,
        },

        login: {
          showOtpModal,
          setShowOtpmodal,
          showLoginSuccessModal,
          setShowLoginSuccessModal,
        },

        walletSetup: {
          showSetupInfoModal,
          setShowSetupInfoModal,
          showCurrencySelectionModal,
          setShowCurrencySelectionModal,
          showSuccessfulWalletSetupModal,
          setShowSuccessfulWalletSetupModal,
        },
        file,
        setFile,
        directorsDocs,
        setDirectorsDocs,
        corporateDocs,
        setCorporateDocs,
        governmentIdfile,
        setGovernmentIdFile,
        proofOfAddressFile,
        setProofOfAddressFile,
        passportFile,
        setPassportFile,
        showModal,
        setShowModal
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };

ConfigProvider.propTypes = { children: PropTypes.node };
