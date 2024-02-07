import React from "react";
import SearchPage from "../pages/SearchPage";
import MapPage from "../pages/MapPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MapPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
