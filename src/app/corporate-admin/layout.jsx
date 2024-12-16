"use client";

import React from "react";

import SignOutModal from "../auth/signoutModal";
import VerifiedIcon from "@mui/icons-material/Verified";
import Sidebar from "./sidebar";
import TopBar from "./topbar";

// import AuthGuard from "@/app/auth/AuthGuard";
import AuthGuard from "../auth/AuthGuard"
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <AuthGuard>
    <main className="w-screen max-h-full">
      <SignOutModal />
      <TopBar />
      <Sidebar />
      <div className="pt-20 bg-[#F0F0F0] ml-[16%]">{children}</div>
    </main>
  </AuthGuard>
  );
}
