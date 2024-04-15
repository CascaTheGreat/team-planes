import React, { useState } from "react";
import ReactSlider from "react-slider";
import { motion } from "framer-motion";

const DoubleSlider = ({ setDate, hovered, sliderDate }) => {
  return (
    <ReactSlider
      className="slider double-slider"
      thumbClassName="thumb"
      trackClassName="track"
      defaultValue={[sliderDate, sliderDate + 1]}
      min={1987}
      max={2023}
      minDistance={1}
      onChange={(val) => {
        setDate(val);
      }}
      renderThumb={(props, state) => (
        <div {...props}>
          {hovered ? (
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
      ariaValuetext={(state) => `Year: ${state.valueNow}`}
      ariaLabelledby="year-slider-label"
      pearling={true}
    />
  );
};

export default DoubleSlider;
