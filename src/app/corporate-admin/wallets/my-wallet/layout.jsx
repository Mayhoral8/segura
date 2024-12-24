import React from "react";
import Intro from "../../../../components/WalletSetupModals/Intro";
import ChooseCurrency from "../../../../components/WalletSetupModals/ChooseCurrency";
import Page from "../page";

const Layout = () => {
  return (
    <>
      <Intro />
      <ChooseCurrency />
      <Page />
    </>
  );
};

export default Layout;
