import React from "react";
import "../App.css";

function MapSearchBar({ handlerFrom, handlerTo }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="From..."
        onChange={(event) => handlerFrom(event.target.value)}
        className="map-search-input"
      />
      <input
        type="text"
        placeholder="To..."
        onChange={(event) => handlerTo(event.target.value)}
        className="map-search-input"
      />
    </div>
  );
}

export default MapSearchBar;
