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
  const events = {
    2020: "COVID-19 Pandemic Disrupts Air Travel",
    2010: "Delta Acquires Northwest Airlines, Becomes World's Largest Airline",
    2001: "9/11 Attacks on World Trade Center and Pentagon",
    1996: "Delta Express, a Low-Cost Carrier, Begins Operations",
    2003: "Delta Begins Codesharing with Continental and Northwest Airlines",
    2000: "Delta Founds the SkyTeam Alliance",
    2005: "Delta Files for Bankruptcy",
    2007: "Delta Emerges from Bankruptcy",
  };

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
        {events[date] && <div className="event-text">{events[date]}</div>}
        <div
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
          onMouseDown={() => setHovered(true)}
          onMouseUp={() => setHovered(false)}
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
