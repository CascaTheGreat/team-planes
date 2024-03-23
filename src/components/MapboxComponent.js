import React, { useEffect, useState, useRef } from "react";
import arcs_data from "../data/arcs.json";
import { ArcLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl";
import { getFlights } from "../helpers/firestore";
import "../App.css";

const INITIAL_VIEW_STATE = {
  latitude: 37.7749,
  longitude: -122.4194,
  zoom: 5,
  pitch: 45,
  bearing: 20,
};

function MapboxComponent({ searchFrom, searchTo, filterDate }) {
  let [arcs, setArcs] = useState(arcs_data);

  useEffect(() => {
    getFlights(filterDate, searchFrom, searchTo).then((data) => {
      console.log(data);
      setArcs(data);
    });
  }, [filterDate, searchFrom, searchTo]);

  let layers = [
    new ArcLayer({
      id: "arc-layer",
      data: arcs,
      pickable: true,
      getSourcePosition: (d) => d.source,
      getTargetPosition: (d) => d.dest,
      getSourceColor: [123, 30, 212],
      getTargetColor: [30, 27, 34],
      getWidth: (d) => d.width,
    }),
  ];

  return (
    <div className="map-container">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({ object }) =>
          object && `From: ${object.flyFrom}, To: ${object.flyTo}`
        }
        style={{
          width: "100%",
          height: "100%",
          left: "auto",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <Map
          attributionControl={false}
          initialViewState={INITIAL_VIEW_STATE}
          mapboxAccessToken={
            "pk.eyJ1IjoibGxlZGxvdzIyIiwiYSI6ImNsbmM5anpxYTA0OGwybW9udjQ1a3RhN2kifQ.4eYuK2hnBiMavi51EtheHQ"
          }
          mapStyle="mapbox://styles/mapbox/dark-v9"
          style={{ width: "100%", height: "100%" }}
          preventStyleDiffing={true}
        />
      </DeckGL>
    </div>
  );
}

export default MapboxComponent;
