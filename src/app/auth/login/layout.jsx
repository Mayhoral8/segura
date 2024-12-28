"use client";
import React, { useEffect, useState } from "react";
import SignInForm from "./form";
import bgImg from "../../../assets/Login/login-bg.png";
import OTP from "../../../components/Auth/Login/OTP";
import SuccessModal from "../../../components/Auth/Login/SuccessModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import Logo from "@/assets/auth/logo.svg";
import Symbol from "@/assets/auth/seguraSymbol.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";


const Layout = () => {
  const [previousLocation, setPreviousLocation] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  const lastVisitedPage = localStorage.getItem("lastVisitedPage");
  useEffect(() => {
    if (lastVisitedPage) setPreviousLocation(lastVisitedPage);
    if (status !== "unauthenticated" && lastVisitedPage) {
      router.push(lastVisitedPage); // Perform navigation after render
    }
    if(status === "authenticated" && !lastVisitedPage){
      router.push("/corporate-admin/onboarding")
    }
  }, [status, previousLocation, router]);

  if (status === "unauthenticated") {
    return (
      <>
        <OTP />
        <SuccessModal />
        <main className="flex justify-between w-full  h-screen">
          <section className="h-screen bg-[#272643] w-[35%] relative flex flex-col justify-between p-5 text-white overflow-hidden">
            <div className="flex flex-col items-center justify-center h-full w-full text-white relative z-10">
              <p className="text-5xl font-bold relative z-10">
                Welcome back! You’ve been missed, Login to to access your
                dashboard.
              </p>
              <p className="mt-4 text-sm font-light relative z-10">
                You have been missed, login to to access your Segura BaaS
                dashboard.
              </p>
            </div>
            <div className="absolute z-0 bottom-[0px] -right-24">
              <Image
                src={Symbol}
                alt="symbol"
                className="scale-75 opacity-40"
              />
            </div>
          </section>
          <section className="w-[60%] h-full">
            <SignInForm />
          </section>
        </main>
      </>
    );
  } else {
    return (
      <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)] z-50 fixed ">
        <CgSpinner className=" text-6xl animate-spin text-[#2c698d] " />
      </div>
    );
  }
};

export default Layout;
