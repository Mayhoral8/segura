import React, {useContext} from "react";
import Link from "next/link";
import { ConfigContext } from "@/contexts/ConfigContext";
import { signOut } from "next-auth/react";
import AnimateButton from "@/components/@extended/AnimateButton";

const SignoutModal = () => {

  const {setShowSignOutModal, showSignOutModal } =useContext(ConfigContext)
  const handleModal = ()=>{
      setShowSignOutModal(false)
  }

if(showSignOutModal){

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-40">
      <div className="bg-white w-[3 0%] h-[40%] rounded-md grid grid-flow-row items-center justify-center gap-y-4 px-10">
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
    </section>
  );
}
}

export default SignoutModal;
