import MapboxComponent from "../components/MapboxComponent";
import "../App.css";
import { motion } from "framer-motion";

function MapPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0, transition: { type: "tween", duration: 1 } }}
      exit={{ opacity: 0, x: -200 }}
    >
      <MapboxComponent />
    </motion.div>
  );
}

export default MapPage;
