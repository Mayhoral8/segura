"use client";

import React, { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";
import {ConfigContext} from "../../contexts/ConfigContext"

const AuthGuard = ({ children }) => {
  const {setShowSpinner, showSpinner} = useContext(ConfigContext).spinner
  const isJwtExpired = (token) => {
    try {
      const decoded = jwtDecode(token);

      // Extract the expiry time (exp) from the token
      if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        return decoded.exp; // Token is expired if exp is less than current time
      } else {
        throw new Error("Token does not contain an 'exp' field.");
      }
    } catch (error) {
      console.error("Invalid token or decoding error:", error);
      return true; // Treat as expired if there's an error
    }
  };

  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(status)
  useEffect(() => {
    if (session?.expires) {
      const currentTime = new Date().getTime() / 1000;
      const expiryTime = isJwtExpired(session?.user?.accessToken);

      if (currentTime > expiryTime) {
        signOut(); // Automatically log the user out
      }
    }
    if (status === "unauthenticated") {
      localStorage.removeItem("lastVisitedPage");
      router.push("/auth/login");
      return;
    }
    // if(status === "loading"){
    //   setShowSpinner(true)
    // }

    // console.log(status);
  }, [status, session]);

  // Show loading spinner while session is being checked
 if (status === "authenticated") {
    return <>{children}</>;
  }



  // Render nothing while redirecting or if unauthenticated
  return null;
};

export default AuthGuard;
