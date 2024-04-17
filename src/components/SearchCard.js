import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function SearchCard({ airport }) {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);

  React.useEffect(() => {
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
          {airport.flights24 && (
            <>
              <div className="search-card-body-text forecasts">
                Annual Flight Trend Forecasts
                <div className="search-card-forecast">
                  2024:
                  <div className="search-card-forecast-year">
                    {airport.flights24} Flights
                  </div>
                  <div
                    className={`search-card-forecast-change ${
                      airport.percentChange[0] < 0 ? "negative" : ""
                    }`}
                  >
                    {(airport.percentChange[0] * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="search-card-forecast">
                  2025:
                  <div className="search-card-forecast-year">
                    {airport.flights25} Flights
                  </div>
                  <div
                    className={`search-card-forecast-change ${
                      airport.percentChange[1] < 0 ? "negative" : ""
                    }`}
                  >
                    {(airport.percentChange[1] * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="search-card-forecast">
                  2026:
                  <div className="search-card-forecast-year">
                    {airport.flights26} Flights
                  </div>
                  <div
                    className={`search-card-forecast-change ${
                      airport.percentChange[2] < 0 ? "negative" : ""
                    }`}
                  >
                    {(airport.percentChange[2] * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="search-card-forecast">
                  2027:
                  <div className="search-card-forecast-year">
                    {airport.flights27} Flights
                  </div>
                  <div
                    className={`search-card-forecast-change ${
                      airport.percentChange[3] < 0 ? "negative" : ""
                    }`}
                  >
                    {(airport.percentChange[3] * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="search-card-forecast">
                  2028:
                  <div className="search-card-forecast-year">
                    {airport.flights28} Flights
                  </div>
                  <div
                    className={`search-card-forecast-change ${
                      airport.percentChange[4] < 0 ? "negative" : ""
                    }`}
                  >
                    {(airport.percentChange[4] * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div ref={mapContainer} className="search-card-body-image"></div>
      </div>
    </div>
  );
}

export default SearchCard;
