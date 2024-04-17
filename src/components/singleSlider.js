import React, { useState } from "react";
import ReactSlider from "react-slider";
import { motion } from "framer-motion";

const SingleSlider = ({ setDate, hovered, sliderDate }) => {
  const [hoveredChild, setHovered] = useState(hovered);
  return (
    <ReactSlider
      className="slider"
      thumbClassName="thumb"
      trackClassName="track"
      defaultValue={sliderDate}
      min={1987}
      max={2023}
      onChange={(val) => setDate(val)}
      renderThumb={(props, state) => (
        <div {...props} onMouseEnter={() => setHovered(true)}>
          {hoveredChild ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { type: "tween", duration: 0.3 },
              }}
              exit={{ opacity: 0 }}
              className="label"
            >
              {state.valueNow}
            </motion.div>
          ) : null}
        </div>
      )}
      style={{ position: "absolute", top: "50%", left: "50%" }}
      ariaLabel="Year Slider"
      ariaValuetext={(val) => `Year: ${val}`}
      ariaLabelledby="year-slider-label"
      onBeforeChange={() => setHovered(true)}
      onAfterChange={() => {
        setTimeout(() => setHovered(false), 2000);
      }}
    />
  );
};

export default SingleSlider;
