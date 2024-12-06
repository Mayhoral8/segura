"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Show loading spinner while session is being checked
  if (status === "loading") {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000061]">
        <AutorenewIcon className="animate-spin text-3xl text-[#2c698d]" />
      </div>
    );
  }

  // Only render children if authenticated
  if (status === "authenticated") {
    return <div>{children}</div>;
  }

  // Render nothing while redirecting
  return null;
};

export default AuthGuard;
