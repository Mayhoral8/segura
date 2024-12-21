"use client";
import React, { useEffect, useState, useContext } from "react";
import SignInForm from "./form";
import bgImg from "../../../assets/Login/login-bg.png";
import OTP from "../../../components/Auth/Login/OTP";
import SuccessModal from "../../../components/Auth/Login/SuccessModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";

const layout = () => {
  const [previousLocation, setPreviousLocation] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    if (lastVisitedPage) setPreviousLocation(lastVisitedPage);
    if (status !== "unauthenticated" && previousLocation) {
      router.push(previousLocation); // Perform navigation after render
    }
  }, [status, previousLocation, router]);

  if (status === "unauthenticated") {
    return (
      <>
        <OTP />
        <SuccessModal />
        <main className="flex justify-between w-full border h-screen">
          <section
            className="w-[36%] h-full"
            style={{
              backgroundImage: `url(${bgImg.src})`,
              backgroundSize: `450px 560px`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full w-full text-white px-8">
              <p className="text-5xl font-bold">
                Welcome back! You’ve been missed, Login to to access your
                dashboard.
              </p>
              <p className="mt-4 text-sm font-light">
                You have been missed, login to to access your Segura BaaS
                dashboard.
              </p>
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

export default layout;
