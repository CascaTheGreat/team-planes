import MapboxComponent from "../components/MapboxComponent";
import "../App.css";
import React from "react";
import ReactSlider from "react-slider";
import MapSearchBar from "../components/MapSearchBar";
import { motion } from "framer-motion";
import SingleSlider from "../components/singleSlider";
import DoubleSlider from "../components/doubleSlider";

function MapPage() {
  const [date, setDate] = React.useState(2020);
  const [source, setSource] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [hovered, setHovered] = React.useState(false);
  const [compare, setCompare] = React.useState(false);

  return (
    <div className="map-page">
      <MapboxComponent searchFrom={source} searchTo={dest} filterDate={date} />
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
        <MapSearchBar handlerFrom={setSource} handlerTo={setDest} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "tween", duration: 1 },
        }}
        exit={{ opacity: 0 }}
        className="date-slider"
      >
        <label id="year-slider-label" className="date=text">
          Year: {date}
        </label>
        <div
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
        >
          {!compare ? (
            <SingleSlider
              setDate={setDate}
              hovered={hovered}
              sliderDate={date}
            />
          ) : (
            <DoubleSlider
              setDate={setDate}
              hovered={hovered}
              sliderDate={date}
            />
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "tween", duration: 1 },
        }}
        exit={{ opacity: 0 }}
        className="compare-toggle"
      >
        <button
          onClick={() => {
            setCompare(!compare);
            if (compare) {
              setDate(date[0]);
            } else {
              setDate(2020);
            }
          }}
          className={compare ? "active" : "inactive"}
        >
          Compare
        </button>
      </motion.div>
    </div>
  );
}

export default MapPage;
