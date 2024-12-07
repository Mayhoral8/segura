"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { CgSpinner } from "react-icons/cg";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      const permissions = session?.user?.permissions || [];

      // Adjusted to check for permissions array of objects
      const isCorporateAdmin = permissions.some(
        (permission) => permission.name === "PERMISSION_CORPORATE_CREATE"
      );

      if (isCorporateAdmin) {
        router.push("/corporate-admin/dashboard");
      } else {
        router.push("/corporate/dashboard");
      }
    }
  }, [status, router, session]);

  // Show loading spinner while session is being checked
  if (status === "loading") {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000061]">
        <CgSpinner className="animate-spin text-5xl text-[#2c698d]" />
      </div>
    );
  }

  // Render children only if authenticated and the correct path is loaded
  if (status === "authenticated") {
    return <>{children}</>;
  }

  // Render nothing while redirecting or if unauthenticated
  return null;
};

export default AuthGuard;
