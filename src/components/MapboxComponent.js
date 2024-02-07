import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import arcs from "../data/arcs";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { ArcLayer } from "@deck.gl/layers";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapboxComponent = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  const [lng] = useState(0);
  const [lat] = useState(0);
  const [zoom] = useState(2);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    const flightLayer = new MapboxOverlay({
      interleaved: true,
      layers: [
        new ArcLayer({
          id: "arc-layer",
          data: arcs,
          getSourcePosition: (d) => d.source,
          getTargetPosition: (d) => d.target,
          getSourceColor: [255, 0, 0],
          getTargetColor: [0, 255, 0],
          getWidth: 2,
        }),
      ],
    });

    map.current.on("load", () => {
      map.current.resize();
      map.current.addControl(flightLayer);
    });

    return () => map.current.remove();
  }, [lat, lng, zoom]);

  return (
    <div className="map-page">
      <div className="map-container" ref={mapContainerRef}></div>
    </div>
  );
};

export default MapboxComponent;
