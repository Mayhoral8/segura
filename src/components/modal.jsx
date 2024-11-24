import React from "react";
import Link from "next/link";
import AnimateButton from "./@extended/AnimateButton";

const Modal = ({ setShowModal }) => {
  const handleModal = () => {
    setShowModal(false);
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-40">
      <div className="bg-white w-[50%] h-[70%] rounded-md grid grid-flow-row items-center justify-center gap-y-4 px-10">
        <h2 className="text-3xl text-center font-bold"> Welcome! 🎉</h2>
        <p className="text-lg">
          You’re almost ready to dive in! To unlock full access to your
          dashboard, please complete one final step: submit a few details on
          your profile. Once submitted, our team will review and approve your
          information. Thank you for your patience – you’ll be all set in no
          time!
        </p>
        <div className="flex flex-row gap-x-4 justify-end">
          <Link href="/corporate/verify">
            <AnimateButton>
              <button className="h-10 w-24 rounded-md  border bg-[#2c698d] text-white">
                Start Now!
              </button>
            </AnimateButton>
          </Link>
          <AnimateButton>
            <button
              className="h-10 w-24 rounded-md border bg-[#272643]  text-white"
              onClick={handleModal}
            >
              Maybe later
            </button>
          </AnimateButton>
        </div>
      </div>
    </section>
  );
};

export default Modal;
