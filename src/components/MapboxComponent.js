import React, { useEffect, useState } from "react";
import arcs_data from "../data/arcs.json";
import { ArcLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl";
import { getFlights, compareFlights } from "../helpers/firestore";
import { interpolate } from "color-interpolate";
import "../App.css";
import { type } from "@testing-library/user-event/dist/type";
import { set } from "firebase/database";

const INITIAL_VIEW_STATE = {
  latitude: 37.7749,
  longitude: -122.4194,
  zoom: 5,
  pitch: 45,
  bearing: 20,
};

function MapboxComponent({ searchFrom, searchTo, filterDate }) {
  const [arcs, setArcs] = useState(arcs_data);
  const [max, setMax] = useState(2177);

  useEffect(() => {
    //Checks if the filterDate is an array or not
    if (!Array.isArray(filterDate)) {
      getFlights(filterDate, searchFrom, searchTo).then((data) => {
        setArcs(data);
      });
    } else {
      compareFlights(filterDate, searchFrom, searchTo).then((data) => {
        console.log(data);
        setArcs(data.arcs);
        setMax(data.max);
      });
    }
  }, [filterDate, searchFrom, searchTo]);

  let layers = [];
  if (!Array.isArray(filterDate)) {
    layers = [
      new ArcLayer({
        id: "arc-layer",
        data: arcs,
        pickable: true,
        widthMaxPixels: 15,
        getSourcePosition: (d) => d.source,
        getTargetPosition: (d) => d.dest,
        getWidth: (d) => Math.max(Math.floor((d.num_flights / 2177) * 10), 1),
        getSourceColor: (d) => [
          144,
          Math.floor((d.num_flights / 2177) * 194),
          144,
        ],
        getTargetColor: (d) => [
          144,
          Math.floor((d.num_flights / 2177) * 194),
          144,
        ],
        greatCircle: true,
      }),
    ];
  } else {
    layers = [
      new ArcLayer({
        id: "arc-layer",
        data: arcs,
        pickable: true,
        greatCircle: true,
        widthMaxPixels: 15,
        getSourcePosition: (d) => d.source,
        getTargetPosition: (d) => d.dest,
        getWidth: (d) =>
          Math.max(
            Math.floor(Math.pow(Math.abs(d.num_flights) / (max / 2), 2) * 10),
            1
          ),
        getSourceColor: (d) => d.color,
        getTargetColor: (d) => d.color,
      }),
    ];
  }

  return (
    <div className="map-container">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({ object }) =>
          object &&
          `From: ${object.flyFrom}, To: ${object.flyTo}${
            !Array.isArray(filterDate)
              ? `, Num Flights: ${object.num_flights}`
              : `, Change: ${object.change.toFixed(2)}%`
          }`
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
