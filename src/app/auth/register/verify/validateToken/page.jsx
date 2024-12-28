"use client";
import React, { useState, useEffect, useContext, Suspense } from "react";
import { ConfigContext } from "../../../../../contexts/ConfigContext";
import { useRouter, useSearchParams } from "next/navigation"; // Next.js router
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaCircleXmark } from "react-icons/fa6";
import mainBg from "../../../../../assets/forgot-password/main-bg.png"
import { CgSpinner } from "react-icons/cg";

const VerifyEmailPage = () => {
  const {setShowSpinner} = useContext(ConfigContext).spinner
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());
  const [isMounted, setIsMounted] = useState(false);
  const token = currentParams.get("token");

  // Ensure the router is available and only run code on the client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wait for router to be ready and query params to be available

  useEffect(() => {
    if (isMounted && token) {
      // Call API to verify email with the token
      verifyEmail(token);
    } else {
      setError("Invalid verification link.");
      setLoading(false);
    }
  }, [isMounted, token]);

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(
        `https://api-dev.segura-pay.com/api/v1/auth/validateToken?token=${token}`
      );
      const responseData = await response.json();
      if (response.ok) {
        setVerified(true);
      } else {
        throw new Error("Email verification failed.");
      }
    } catch (err) {
      // setError("An error occurred. Please try again.");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const redirectToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="fixed flex items-center justify-center bottom-0 right-0 left-0 top-0 bg-[#0000006c] backdrop-blur-sm" style={{
      backgroundImage: `url(${mainBg.src})`,
      backgroundSize: `cover`,
      backgroundRepeat: "no-repeat",
    }}>
      {loading ? (
         <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.36)] z-50 fixed ">
         <CgSpinner className=" text-6xl animate-spin text-[#2c698d] " />
       </div>
      ) : (
        <article className="bg-white w-[30%] h-[40%] flex flex-col items-center justify-center">
          {/* <h2>Email Verification</h2> */}

          {verified ? (
            <div className="flex flex-col justify-center text-center gap-y-3">
            <IoCheckmarkCircleOutline className="text-green-400 text-4xl mx-auto block" />
            <h3 className="font-bold">Email Verification Successful</h3>
            
            <button onClick={redirectToLogin} className="border p-1 bg-[#2c698d] text-white rounded-md">Login</button>
          </div>
          ) : (
            <div className="flex flex-col justify-center text-center gap-y-2">
              <FaCircleXmark className="text-red-400 text-3xl block mx-auto" />
              <h3>Verification Failed</h3>
              <p>{error}</p>
              <button onClick={redirectToLogin} className="border p-1 bg-[#2c698d] text-white rounded-md">Try Again</button>
            </div>
          )}
        </article>
      )}
    </div>
    </Suspense>
  );
};

export default VerifyEmailPage;
