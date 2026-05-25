import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useTheme } from "../hooks/useTheme";

export default function MainLayout() {
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-white dark:bg-darkBg text-neutral-900 dark:text-neutral-100 theme-transition">
      {/* Dynamic ambient grid layer */}
      <div className="absolute inset-0 z-0 bg-dot-grid-light dark:bg-dot-grid-dark pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-[15%] left-[5%] w-[300px] h-[300px] rounded-full bg-blue-500/5 dark:bg-blue-400/[0.02] blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[25%] right-[5%] w-[350px] h-[350px] rounded-full bg-purple-500/5 dark:bg-purple-500/[0.02] blur-[120px] pointer-events-none animate-pulse-slow" />

      <ScrollToTop />
      <Navbar />
      
      {/* Route Outlet */}
      <main className="relative z-10 flex-grow flex flex-col w-full max-w-6xl mx-auto px-6 py-8 md:py-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
