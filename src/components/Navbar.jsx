import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../utils/cn";
import { portfolioData } from "../data/portfolioData";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full glassmorphism glass-light dark:glass-dark border-b border-neutral-200/50 dark:border-neutral-800/50"
    >
      <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-1 hover:opacity-85 transition-opacity">
          <span className="text-base font-bold tracking-[0.2em] text-neutral-900 dark:text-white uppercase">
            PK<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-medium uppercase tracking-wider theme-transition hover:text-neutral-900 dark:hover:text-white",
                  isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="absolute inset-0 -z-10 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50"
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Theme Toggle + Call to Action */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <a
            href={portfolioData.personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 rounded-lg bg-neutral-900 dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            <span>Resume</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-neutral-200/50 dark:border-neutral-800/50 bg-white/95 dark:bg-darkBg/95 md:hidden pointer-events-auto"
          >
            <div className="flex flex-col space-y-3 p-6">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block text-sm uppercase tracking-wider font-semibold py-1.5 transition-colors",
                        isActive ? "text-blue-500" : "text-neutral-600 dark:text-neutral-400"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
                href={portfolioData.personalInfo.resumeUrl}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-1.5 rounded-lg bg-neutral-900 dark:bg-white py-3 text-xs uppercase tracking-wider font-semibold text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                <span>Download Resume</span>
                <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
