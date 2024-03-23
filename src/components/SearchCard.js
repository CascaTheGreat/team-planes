import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function SearchCard({ airport }) {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);

  React.useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/lledlow22/clu4ksxa4005z01nweknn0e3d",
      center: [airport.lon, airport.lat],
      zoom: 11,
      interactive: false,
      attributionControl: false,
    });
  }, [airport]);

  return (
    <div className="search-card">
      <div className="search-card-header">
        <div className="search-card-title">{airport.name}</div>
        <div className="search-card-ranking">#{airport.rank}</div>
      </div>
      <div className="search-card-body">
        <div className="search-card-body-text-wrapper">
          <div className="search-card-body-text">
            Yearly Flights: {airport.numRoutes}
          </div>
          <div className="search-card-body-text">
            Destinations: {airport.numDestinations}
          </div>
        </div>
        <div ref={mapContainer} className="search-card-body-image"></div>
      </div>
    </div>
  );
}

export default SearchCard;
