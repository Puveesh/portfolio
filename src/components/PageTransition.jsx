import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 12 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.45, 
      ease: [0.25, 1, 0.5, 1] 
    } 
  },
  exit: { 
    opacity: 0, 
    y: 10, 
    transition: { 
      duration: 0.3, 
      ease: [0.25, 1, 0.5, 1] 
    } 
  },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className="w-full flex-grow flex flex-col pointer-events-auto"
    >
      {children}
    </motion.div>
  );
}
