import React, { useContext } from "react";
import Link from "next/link";
import { ConfigContext } from "@/contexts/ConfigContext";
import { signOut } from "next-auth/react";
import AnimateButton from "@/components/@extended/AnimateButton";
import { AnimateModal } from "../../components/Animate";

const SignOutModal = () => {
  const { setShowSignOutModal, showSignOutModal } = useContext(ConfigContext);
  const handleModal = () => {
    setShowSignOutModal(false);
  };

  return (
    <AnimateModal isVisible={showSignOutModal}>
      <div className="bg-white w-[30%] h-[40%] rounded-md grid grid-flow-row items-center justify-center gap-y-4 px-10">
        <h2 className="font-bold text-3xl text-center">Sign Out</h2>
        <p className="text-lg">Are you sure you want to sign out?</p>
        <div className="flex flex-row gap-x-4 justify-center">
          <AnimateButton>
            <button
              className="h-10 w-24 rounded-md hover:bg-[#245674]  transition-all border bg-[#2c698d] text-white"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              Yes
            </button>
          </AnimateButton>

          <AnimateButton>
            <button
              className="h-10 w-24 rounded-md border bg-[#272643]  text-white"
              onClick={handleModal}
            >
              Cancel
            </button>
          </AnimateButton>
        </div>
      </div>
    </AnimateModal>
  );
};

export default SignOutModal;
