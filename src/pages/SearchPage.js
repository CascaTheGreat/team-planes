import React from "react";
import { motion } from "framer-motion";

const SearchPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0, transition: { type: "tween", duration: 1 } }}
      exit={{ opacity: 0 }}
      className="App"
    >
      <h1>Search Page</h1>
    </motion.div>
  );
};

export default SearchPage;
