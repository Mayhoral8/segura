import React from "react";
import PropTypes from "prop-types";
import { publicSans } from "./fonts/fonts";
import "./globals.css";

// PROJECT IMPORTS
import ProviderWrapper from "./ProviderWrapper";

console.log(ProviderWrapper);

export const metadata = {
  title: "Segura",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${publicSans.className}`}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.node };
