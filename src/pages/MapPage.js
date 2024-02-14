import MapboxComponent from "../components/MapboxComponent";
import "../App.css";
import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";

function MapPage() {
  const [date, setDate] = React.useState(20);
  const [search, setSearch] = React.useState("");
  return (
    <div className="map-page">
      <MapboxComponent searchFrom={search} searchTo={""} />
      <RangeSlider
        id="date-slider"
        defaultValue={[0, 50]}
        thumbDisabled={[true, false]}
        rangeSlideDisabled={true}
        onInput={(value, userInteraction) => {
          setDate(value[1]);
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "tween", duration: 1 },
        }}
        exit={{ opacity: 0 }}
        className="search-page"
        style={{ position: "absolute", width: "100%", top: "-15px" }}
      >
        <SearchBar handler={setSearch} />
      </motion.div>
    </div>
  );
}

export default MapPage;
