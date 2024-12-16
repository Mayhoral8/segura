"use client";
import PropTypes from "prop-types";

// next
import { SessionProvider } from "next-auth/react";

// project import

import Toast from "../components/Toast";

// import Locales from "@/components/Locales";
// import ScrollTop from "@/components/ScrollTop";
// import RTLLayout from "@/components/RTLLayout";
// import Snackbar from "@/components/@extended/Snackbar";
// import Notistack from "@/components/third-party/Notistack";

import { ConfigProvider } from "../contexts/ConfigContext";
import ReactQueryProvider from "./reactqueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Spinner from "../components/Spinner";

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function ProviderWrapper({ children }) {
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider>
        <SessionProvider refetchInterval={0}>
          <Spinner />
          <Toast />
          {children}
        </SessionProvider>
      </ConfigProvider>
    </ReactQueryProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.node };
