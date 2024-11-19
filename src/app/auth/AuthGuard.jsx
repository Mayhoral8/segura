import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect to login page if unauthenticated
    console.log(status);
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);


  // Show loading spinner while session is being checked
  if (status === "loading") {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000061]">
        <ImSpinner8 className="animate-spin text-3xl text-black" />
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
