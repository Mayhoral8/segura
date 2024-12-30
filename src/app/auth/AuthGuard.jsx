"use client";

import React, { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";

const AuthGuard = ({ children }) => {
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

    // if (status === "authenticated" && session) {
    //   const permissions = session?.user?.permissions || [];

    //   // Determine redirection path based on permissions
    //   // const isCorporateAdmin = permissions.some(
    //   //   (permission) => permission.name === "PERMISSION_CORPORATE_CREATE"
    //   // );
    // }
  }, [status, session]);

  // Show loading spinner while session is being checked
  if (status === "loading") {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000061]">
        <CgSpinner className="animate-spin text-5xl text-[#2c698d]" />
      </div>
    );
  }

  // Render children only if authenticated
  if (status === "authenticated") {
    return <>{children}</>;
  }

  // Render nothing while redirecting or if unauthenticated
  return null;
};

export default AuthGuard;
