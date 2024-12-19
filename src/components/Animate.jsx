import React, { useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigContext } from "../contexts/ConfigContext";

export const AnimateModal = ({ children, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50 backdrop-blur-sm"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AnimateRightModal = ({ children, isVisible }) => {
  const { setShowAccountDetailsModal } = useContext(ConfigContext);
  const modalRef = useRef();
  const handleClickOutside = (e) => {
    if (modalRef && !modalRef.current.contains(e.target.value)) {
      setShowAccountDetailsModal(false);
    }
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={modalRef}
          onClick={handleClickOutside}
          initial={{ x: "50%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-end bg-[rgba(0,0,0,0.6)] z-50 h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AnimateDropdown = ({ children, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="absolute border mt-12 text-sm flex-col rounded-md w-[222px] bg-white  transition-transform shadow-sm z-10`"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AnimateSlide = ({ children, direction, currFormIndex }) => {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300, // Slide in from the right or left
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 }, // Center position
    exit: (direction) => ({
      x: direction < 0 ? -300 : 300, // Slide out to the left or right
      opacity: 0,
    }),
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currFormIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
