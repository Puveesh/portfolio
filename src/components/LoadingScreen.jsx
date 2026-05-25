import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) {
        setTimeout(onComplete, 600); // Wait for exit animation
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const logoVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 1.5 },
      },
    },
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -20,
            transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] text-white"
        >
          {/* Subtle background grids */}
          <div className="absolute inset-0 bg-dot-grid-dark opacity-30 pointer-events-none" />

          {/* Glowing central indicator */}
          <div className="absolute w-[250px] h-[250px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* SVG Logo Monogram Outline */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-6"
            >
              {/* Outer Diamond boundary */}
              <motion.path
                d="M50 12 L88 50 L50 88 L12 50 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
              />
              {/* Inner Chevron-style line */}
              <motion.path
                d="M34 50 L50 34 L66 50"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              />
              {/* Inner Vertical Split */}
              <motion.path
                d="M50 34 V66"
                stroke="currentColor"
                strokeWidth="1.5"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
              />
            </svg>

            {/* Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-sm font-light tracking-[0.4em] uppercase text-neutral-400"
            >
               Puveesh Keshav M
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 1.4, duration: 0.6, ease: "easeInOut" }}
              className="h-[1px] bg-blue-500 mt-3"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
