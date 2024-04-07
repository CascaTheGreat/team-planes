import React, { useEffect, useState } from "react";
import arcs_data from "../data/arcs.json";
import { ArcLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl";
import { getFlights } from "../helpers/firestore";
import { interpolate } from "color-interpolate";
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
      setArcs(data);
    });
  }, [filterDate, searchFrom, searchTo]);

  function interpolateColor(value) {
    let colors = [
      "rgb(186, 99, 99)",
      "rgb(210, 136, 50)",
      "rgb(144, 194, 144)",
    ];

    let colormap = interpolate(colors);

    return colormap(value);
  }

  let layers = [
    new ArcLayer({
      id: "arc-layer",
      data: arcs,
      pickable: true,
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
