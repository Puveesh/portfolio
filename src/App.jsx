import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* <LoadingScreen onComplete={() => setIsLoading(false)} /> */}
      
      {/* {!isLoading && ( */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </AnimatePresence>
      {/* )} */}
    </>
  );
}
