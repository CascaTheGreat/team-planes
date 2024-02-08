import React from "react";
import "../App.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
      <button
        className="search-button"
        onClick={() => alert("Button clicked!")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          viewBox="0 -960 960 960"
          width="30"
        >
          <path
            fill="#7c1ed4"
            d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
