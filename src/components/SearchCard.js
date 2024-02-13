import React from "react";

function SearchCard({ flight }) {
  return (
    <div className="search-card" onClick={() => alert("clicked")}>
      <div className="search-card-header">
        <div>
          {flight.flyFrom}-{flight.flyTo}
        </div>
        <div className="search-card-ranking">#17</div>
      </div>
      <div className="search-card-body">
        <div className="search-card-body-text-wrapper">
          <div className="search-card-body-text">
            <div>Departure: 10:00 AM</div>
          </div>
          <div className="search-card-body-text">
            <div>Price: $200</div>
          </div>
        </div>
        <div className="search-card-body-image">Test</div>
      </div>
    </div>
  );
}

export default SearchCard;
