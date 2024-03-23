import MapboxComponent from "../components/MapboxComponent";
import "../App.css";
import React from "react";
import ReactSlider from "react-slider";
import MapSearchBar from "../components/MapSearchBar";
import { motion } from "framer-motion";
import { getFlights } from "../helpers/firestore";

function MapPage() {
  const [date, setDate] = React.useState(2020);
  const [source, setSource] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [hovered, setHovered] = React.useState(false);

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
        className="date-slider"
      >
        <label id="year-slider-label" className="date=text">
          Label
        </label>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <ReactSlider
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
            defaultValue={date}
            min={1987}
            max={2023}
            onChange={(val) => setDate(val)}
            renderThumb={(props, state) => (
              <div {...props}>
                {hovered ? <div className="label">{state.valueNow}</div> : null}
              </div>
            )}
            style={{ position: "absolute", top: "50%", left: "50%" }}
            ariaLabel="Year Slider"
            ariaValuetext={(val) => `Year: ${val}`}
            ariaLabelledby="year-slider-label"
          />
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
        className="search-page"
        style={{ position: "absolute", width: "100%", top: "-15px" }}
      >
        <MapSearchBar handlerFrom={setSource} handlerTo={setDest} />
      </motion.div>
    </div>
  );
}

export default MapPage;
