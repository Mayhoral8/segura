"use client";
import PropTypes from "prop-types";

// next
import { SessionProvider } from "next-auth/react";

import { Suspense } from "react";
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
      <SessionProvider refetchInterval={0}>
      <Suspense fallback={null}>
        <ConfigProvider>
          <Spinner />
          <Toast />
          {children}
        </ConfigProvider>
        </Suspense>
      </SessionProvider>
    </ReactQueryProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.node };
