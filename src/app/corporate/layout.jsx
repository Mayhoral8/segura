"use client";

import React from "react";

import SignOutModal from "@/app/auth/signoutModal";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Sidebar from "./sidebar";
import TopBar from "@/app/corporate/topbar";

import AuthGuard from "@/app/auth/AuthGuard";
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    // <AuthGuard>
    <main className="w-screen max-h-full">
      <SignOutModal />
      <TopBar />
      <Sidebar />
      <div className="mt-24 ml-[16%]">{children}</div>
    </main>
    // </AuthGuard>
  );
}
