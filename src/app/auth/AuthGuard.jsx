"use client";

import React, { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import { ConfigContext } from "../../contexts/ConfigContext";

const AuthGuard = ({ children }) => {
  const { previousLocation } = useContext(ConfigContext);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    if (status === "authenticated" && session) {
      const permissions = session?.user?.permissions || [];

      // Determine redirection path based on permissions
      const isCorporateAdmin = permissions.some(
        (permission) => permission.name === "PERMISSION_CORPORATE_CREATE"
      );

     
    }
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
