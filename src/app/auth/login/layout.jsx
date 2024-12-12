import React from "react";
import SignInForm from "./form";
import bgImg from "../../../assets/Login/login-bg.png";
import OTP from "../../../components/Auth/Login/OTP";
import SuccessModal from "../../../components/Auth/Login/SuccessModal";

const layout = () => {
  return (
    <>
      <OTP />
      <SuccessModal/>
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
};

export default layout;
